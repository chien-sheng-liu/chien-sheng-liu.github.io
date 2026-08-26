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

function equalArray(left = [], right = []) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function canonicalizeMarkdown(value = "") {
  return value
    .replace(/^```[^\n]*$/gm, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "IMAGE$1")
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function mismatchContext(expected, actual) {
  const left = canonicalizeMarkdown(expected);
  const right = canonicalizeMarkdown(actual);
  let index = 0;
  while (index < left.length && index < right.length && left[index] === right[index]) index += 1;
  return {
    index,
    expected: left.slice(Math.max(0, index - 24), index + 48),
    actual: right.slice(Math.max(0, index - 24), index + 48),
    expectedLength: left.length,
    actualLength: right.length,
  };
}

const adminRoot = process.cwd();
const siteRoot = path.resolve(adminRoot, "..");
loadEnv(path.join(adminRoot, ".env.local"));
loadEnv(path.join(adminRoot, ".env"));

const { listArticles } = await import("../lib/notion.js");
const { contentHash } = await import("../lib/hash.js");
const siteUrl = (process.env.SITE_URL || "https://morris-liu.com").replace(/\/$/, "");
const tracked = execFileSync("git", ["ls-files", "-z", "content/articles/**/*.md"], {
  cwd: siteRoot,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);
const expected = new Map();

for (const relativePath of tracked) {
  const [, , locale] = relativePath.split("/");
  const slug = path.basename(relativePath, ".md");
  const parsed = matter(fs.readFileSync(path.join(siteRoot, relativePath), "utf8"));
  if (!expected.has(slug)) expected.set(slug, {});
  expected.get(slug)[locale] = {
    ...parsed.data,
    body: parsed.content
      .trim()
      .replace(/(!\[[^\]]*\]\()\/(?!\/)/g, `$1${siteUrl}/`),
  };
}

const articles = await listArticles({ includeContent: true });
const errors = [];

for (const [slug, pair] of expected) {
  const matches = articles.filter((article) => article.slug === slug);
  if (matches.length !== 1) {
    errors.push(`${slug}: Notion 中應有 1 篇，實際為 ${matches.length} 篇`);
    continue;
  }
  const article = matches[0];
  const first = pair.zh || pair.en;
  if (article.category !== (pair.zh?.category || pair.en?.category || "AI")) {
    errors.push(`${slug}: category 不一致`);
  }
  if (!equalArray(article.tags, pair.zh?.tags || pair.en?.tags || [])) {
    errors.push(`${slug}: tags 不一致`);
  }
  if (article.publishedAt !== normalizeDate(pair.zh?.date || pair.en?.date)) {
    errors.push(`${slug}: published date 不一致`);
  }

  for (const locale of ["zh", "en"]) {
    const source = pair[locale];
    const target = article.locales[locale];
    if (!source) {
      errors.push(`${slug}: Markdown 缺少 ${locale}`);
      continue;
    }
    const expectedFields = {
      title: source.title,
      summary: source.summary || source.excerpt || "",
      seoTitle: source.seoTitle || source.title,
      seoDescription: source.seoDescription || source.summary || "",
    };
    for (const [field, value] of Object.entries(expectedFields)) {
      if ((target[field] || "").trim() !== (value || "").trim()) {
        errors.push(`${slug}/${locale}: ${field} 不一致`);
      }
    }
    if (canonicalizeMarkdown(target.body) !== canonicalizeMarkdown(source.body)) {
      const context = mismatchContext(source.body, target.body);
      errors.push(
        `${slug}/${locale}: 正文的文字或數字內容不一致 ${JSON.stringify(context)}`,
      );
    }
    if (!equalArray(target.keywords, source.keywords || source.tags || [])) {
      errors.push(`${slug}/${locale}: keywords 不一致`);
    }
  }
  if (article.locales.en.sourceHash !== contentHash(pair.zh.body)) {
    errors.push(`${slug}: 英文來源雜湊不一致`);
  }
  if (!article.name && first?.title) errors.push(`${slug}: Notion 主標題為空`);
}

if (errors.length) {
  console.error(`Notion migration verification failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Verified ${expected.size} bilingual article pairs (${tracked.length} Markdown files) against Notion.`,
);
