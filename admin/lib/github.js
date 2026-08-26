import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { readLocalConfig } from "./config.js";
import { AppError } from "./errors.js";
import { exportLocaleMarkdown, validatePublishable } from "./article-export.js";
import { getArticle, listArticles, setArticleStatus, updateArticle } from "./notion.js";
import { githubStatus } from "./github-status.js";
import { suggestArticleSlug } from "./slug.js";
import { materializeArticleVisuals } from "./visuals.js";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      GH_PROMPT_DISABLED: "true",
      GIT_TERMINAL_PROMPT: "0",
      ...options.env,
    },
    maxBuffer: 10 * 1024 * 1024,
    timeout: options.timeout || 15 * 60 * 1000,
  });
  if (result.status !== 0) {
    throw new AppError(
      `${command} ${args[0] || ""} 執行失敗。`,
      502,
      (result.stderr || result.stdout || "").trim(),
    );
  }
  return (result.stdout || "").trim();
}

function hasNpmScript(workspace, scriptName) {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(workspace, "package.json"), "utf8"),
    );
    return Boolean(packageJson.scripts?.[scriptName]);
  } catch {
    return false;
  }
}

function waitForPrChecks(prUrl, repository) {
  const result = spawnSync(
    "gh",
    [
      "pr",
      "checks",
      prUrl,
      "--repo",
      repository,
      "--watch",
      "--fail-fast",
      "--interval",
      "10",
    ],
    {
      encoding: "utf8",
      env: { ...process.env, GH_PROMPT_DISABLED: "true", GIT_TERMINAL_PROMPT: "0" },
      maxBuffer: 10 * 1024 * 1024,
      timeout: 20 * 60 * 1000,
    },
  );
  if (result.status === 0) return;
  const output = (result.stderr || result.stdout || "").trim();
  if (/no checks reported/i.test(output)) return;
  throw new AppError("GitHub PR checks 未通過。", 502, output);
}

function writeArticleFiles(workspace, article, mode) {
  const paths = ["zh", "en"].map((locale) =>
    path.join(
      /* turbopackIgnore: true */ workspace,
      "content",
      "articles",
      locale,
      `${article.slug}.md`,
    ),
  );
  if (mode === "publish") {
    paths.forEach((filePath, index) => {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, `${exportLocaleMarkdown(article, index === 0 ? "zh" : "en")}\n`);
    });
  } else {
    paths.forEach((filePath) => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
  }
  return paths;
}

async function writeArticleVisuals(workspace, article, mode) {
  const assetDirectory = path.join(
    /* turbopackIgnore: true */ workspace,
    "public",
    "media",
    "articles",
    article.slug,
  );
  if (mode === "publish") {
    return materializeArticleVisuals(workspace, article);
  }
  if (fs.existsSync(assetDirectory)) {
    fs.rmSync(assetDirectory, { recursive: true, force: true });
    return [assetDirectory];
  }
  return [];
}

function getMainSha(repository, branch) {
  return run("gh", [
    "api",
    `repos/${repository}/commits/${branch}`,
    "--jq",
    ".sha",
  ]);
}

function waitForDeploy(repository, sha) {
  let runs = [];
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const output = run("gh", [
      "run",
      "list",
      "--repo",
      repository,
      "--workflow",
      "deploy.yml",
      "--commit",
      sha,
      "--limit",
      "1",
      "--json",
      "databaseId",
    ]);
    runs = JSON.parse(output || "[]");
    if (runs[0]?.databaseId) break;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5000);
  }
  if (!runs[0]?.databaseId) return;
  run(
    "gh",
    ["run", "watch", String(runs[0].databaseId), "--repo", repository, "--exit-status"],
    { timeout: 20 * 60 * 1000 },
  );
}

export async function publishArticle(articleId, mode = "publish") {
  const config = readLocalConfig();
  const status = githubStatus();
  if (!status.authenticated) {
    throw new AppError("GitHub CLI 尚未登入，請先執行 gh auth login。", 503, status.message);
  }
  let article = await getArticle(articleId);
  if (mode === "publish") {
    if (!article.slug) {
      const slug = suggestArticleSlug(article);
      if (!slug) {
        throw new AppError("無法從標題產生網址，請先完成英文標題。", 422);
      }
      article = await updateArticle(articleId, {
        slug,
        expectedLastEditedTime: article.lastEditedTime,
      });
    }
    validatePublishable(article);
    const duplicate = (await listArticles()).find(
      (candidate) => candidate.id !== article.id && candidate.slug === article.slug,
    );
    if (duplicate) {
      throw new AppError(`Slug 已由「${duplicate.name}」使用。`, 409);
    }
  }
  if (mode === "unpublish" && !["Published", "Error"].includes(article.status)) {
    throw new AppError("只有已發布文章可以下架。", 409);
  }
  article = await setArticleStatus(
    articleId,
    mode === "publish" ? "Publishing" : "Unpublishing",
  );

  const prefix = path.join(/* turbopackIgnore: true */ os.tmpdir(), "morris-writing-studio-");
  const tempRoot = fs.mkdtempSync(prefix);
  const workspace = path.join(/* turbopackIgnore: true */ tempRoot, "repo");
  const branch = `content/${mode}-${article.slug}-${Date.now()}`;
  try {
    run("gh", ["repo", "clone", config.repository, workspace, "--", "--depth=1"]);
    run("git", ["checkout", "-b", branch], { cwd: workspace });
    const changedPaths = [
      ...writeArticleFiles(workspace, article, mode),
      ...(await writeArticleVisuals(workspace, article, mode)),
    ];
    run("git", ["add", "--all", "content/articles", "public/media/articles"], {
      cwd: workspace,
    });
    const diff = run("git", ["diff", "--cached", "--name-only"], { cwd: workspace });
    if (!diff) {
      const sha = getMainSha(config.repository, config.defaultBranch);
      return setArticleStatus(articleId, mode === "publish" ? "Published" : "Unpublished", {
        publishedAt:
          mode === "publish"
            ? article.publishedAt || new Date().toISOString().slice(0, 10)
            : article.publishedAt,
        commitSha: sha,
        deployUrl:
          mode === "publish"
            ? `${config.siteUrl}/${article.slug ? `articles/${article.slug}` : "articles"}`
            : "",
        lastError: "",
      });
    }

    run("npm", ["ci"], { cwd: workspace });
    if (hasNpmScript(workspace, "content:validate")) {
      run("npm", ["run", "content:validate"], { cwd: workspace });
    }
    run("npm", ["run", "lint"], { cwd: workspace });
    run("npm", ["run", "build"], {
      cwd: workspace,
      timeout: 20 * 60 * 1000,
      env: { NODE_ENV: "production" },
    });

    if (process.env.PUBLISH_DRY_RUN === "true") {
      return setArticleStatus(articleId, mode === "publish" ? "Ready" : "Published", {
        lastError: `Dry run 完成：${changedPaths.join(", ")}`,
      });
    }

    run(
      "git",
      ["commit", "-m", `${mode === "publish" ? "Publish" : "Unpublish"} article: ${article.slug}`],
      { cwd: workspace },
    );
    run("git", ["push", "-u", "origin", branch], { cwd: workspace });
    const prUrl = run("gh", [
      "pr",
      "create",
      "--repo",
      config.repository,
      "--base",
      config.defaultBranch,
      "--head",
      branch,
      "--title",
      `${mode === "publish" ? "Publish" : "Unpublish"}: ${article.locales.zh.title}`,
      "--body",
      [
        "Automated by Morris Writing Studio.",
        "",
        `- Article: \`${article.slug}\``,
        `- Action: ${mode}`,
        "- Local validation: content, lint, static build passed",
      ].join("\n"),
    ]);
    await setArticleStatus(articleId, article.status, { prUrl });
    waitForPrChecks(prUrl, config.repository);
    run("gh", [
      "pr",
      "merge",
      prUrl,
      "--repo",
      config.repository,
      "--merge",
      "--delete-branch",
    ]);
    const sha = getMainSha(config.repository, config.defaultBranch);
    waitForDeploy(config.repository, sha);
    return setArticleStatus(articleId, mode === "publish" ? "Published" : "Unpublished", {
      publishedAt:
        mode === "publish"
          ? article.publishedAt || new Date().toISOString().slice(0, 10)
          : article.publishedAt,
      commitSha: sha,
      deployUrl:
        mode === "publish"
          ? `${config.siteUrl}/${article.slug ? `articles/${article.slug}` : "articles"}`
          : "",
      prUrl,
    });
  } catch (error) {
    await setArticleStatus(articleId, "Error", {
      lastError:
        typeof error?.details === "string"
          ? `${error.message}\n${error.details}`.slice(0, 1900)
          : error.message,
    }).catch(() => {});
    throw error;
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}
