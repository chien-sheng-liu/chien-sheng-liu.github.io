import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

const adminRoot = process.cwd();
const siteRoot = path.resolve(adminRoot, "..");
loadEnv(path.join(adminRoot, ".env.local"));
loadEnv(path.join(adminRoot, ".env"));
const { createArticle, ensureNotionSchema, listArticles, updateArticle } =
  await import("../lib/notion.js");
const { contentHash } = await import("../lib/hash.js");
const syncExisting = process.argv.includes("--sync");
const siteUrl = (process.env.SITE_URL || "https://morris-liu.com").replace(/\/$/, "");

await ensureNotionSchema();

const tracked = execFileSync("git", ["ls-files", "-z", "content/articles/**/*.md"], {
  cwd: siteRoot,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);
const existing = await listArticles();
const existingBySlug = new Map(existing.map((article) => [article.slug, article]));
const pairs = new Map();

function normalizeDate(value) {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  const text = String(value);
  const isoDate = text.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  if (isoDate) return isoDate;
  const parsed = new Date(text);
  return Number.isNaN(parsed.valueOf()) ? "" : parsed.toISOString().slice(0, 10);
}

function prepareBody(body = "") {
  return body.replace(/(!\[[^\]]*\]\()\/(?!\/)/g, `$1${siteUrl}/`);
}

for (const relativePath of tracked) {
  const [, , locale] = relativePath.split("/");
  const slug = path.basename(relativePath, ".md");
  const parsed = matter(fs.readFileSync(path.join(siteRoot, relativePath), "utf8"));
  if (!pairs.has(slug)) pairs.set(slug, {});
  pairs.get(slug)[locale] = { ...parsed.data, body: prepareBody(parsed.content.trim()) };
}

let imported = 0;
let synced = 0;
for (const [slug, pair] of pairs) {
  const existingArticle = existingBySlug.get(slug);
  if (existingArticle && !syncExisting) {
    console.log(`Skip existing: ${slug}`);
    continue;
  }
  if (!pair.zh || !pair.en) {
    console.warn(`Skip incomplete pair: ${slug}`);
    continue;
  }
  const article = {
    name: pair.zh.title,
    slug,
    status: "Published",
    category: pair.zh.category || pair.en.category || "AI",
    tags: pair.zh.tags || pair.en.tags || [],
    tone: "professional",
    targetZh: 1500,
    targetEn: 1000,
    publishedAt: normalizeDate(pair.zh.date || pair.en.date),
    research: "# 遷移記錄\n\n由既有 Git Markdown 匯入；尚未建立 AI 研究筆記。",
    locales: {
      zh: {
        locale: "zh",
        title: pair.zh.title,
        summary: pair.zh.summary || pair.zh.excerpt || "",
        seoTitle: pair.zh.seoTitle || pair.zh.title,
        seoDescription: pair.zh.seoDescription || pair.zh.summary || "",
        keywords: pair.zh.keywords || pair.zh.tags || [],
        body: pair.zh.body,
        sourceHash: "",
      },
      en: {
        locale: "en",
        title: pair.en.title,
        summary: pair.en.summary || pair.en.excerpt || "",
        seoTitle: pair.en.seoTitle || pair.en.title,
        seoDescription: pair.en.seoDescription || pair.en.summary || "",
        keywords: pair.en.keywords || pair.en.tags || [],
        body: pair.en.body,
        sourceHash: contentHash(pair.zh.body),
      },
    },
  };
  if (existingArticle) {
    await updateArticle(existingArticle.id, {
      ...article,
      expectedLastEditedTime: existingArticle.lastEditedTime,
      locales: {
        zh: {
          ...article.locales.zh,
          expectedLastEditedTime: existingArticle.locales.zh.lastEditedTime,
        },
        en: {
          ...article.locales.en,
          expectedLastEditedTime: existingArticle.locales.en.lastEditedTime,
        },
      },
    });
    synced += 1;
    console.log(`Synced: ${slug}`);
  } else {
    await createArticle(article);
    imported += 1;
    console.log(`Imported: ${slug}`);
  }
}

console.log(`Import complete: ${imported} imported, ${synced} synced.`);
