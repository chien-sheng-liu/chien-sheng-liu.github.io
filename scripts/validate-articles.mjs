import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const output = execFileSync("git", ["ls-files", "-z", "content/articles/**/*.md"], {
  cwd: root,
  encoding: "utf8",
});
const files = output.split("\0").filter(Boolean);
const errors = [];
const byLocale = { zh: new Set(), en: new Set() };
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parse(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;
  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon > 0) frontmatter[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return { frontmatter, body: match[2].trim() };
}

for (const file of files) {
  const parts = file.split("/");
  const locale = parts[2];
  const slug = path.basename(file, ".md");
  if (!byLocale[locale]) {
    errors.push(`${file}: locale 必須是 zh 或 en`);
    continue;
  }
  byLocale[locale].add(slug);
  if (!slugPattern.test(slug)) errors.push(`${file}: slug 格式無效`);
  const parsed = parse(fs.readFileSync(path.join(root, file), "utf8"));
  if (!parsed) {
    errors.push(`${file}: 缺少有效 frontmatter`);
    continue;
  }
  for (const field of ["title", "date", "tags", "category"]) {
    if (!parsed.frontmatter[field]) errors.push(`${file}: 缺少 ${field}`);
  }
  if (!parsed.body) errors.push(`${file}: 正文為空`);
  if (parsed.frontmatter.updated) {
    for (const field of ["summary", "seoTitle", "seoDescription", "keywords"]) {
      if (!parsed.frontmatter[field]) errors.push(`${file}: 新格式文章缺少 ${field}`);
    }
    if (!/##\s+(來源|Sources)/i.test(parsed.body)) errors.push(`${file}: 缺少來源章節`);
  }
}

for (const slug of new Set([...byLocale.zh, ...byLocale.en])) {
  if (!byLocale.zh.has(slug)) errors.push(`${slug}: 缺少中文版本`);
  if (!byLocale.en.has(slug)) errors.push(`${slug}: 缺少英文版本`);
}

if (errors.length) {
  console.error(`Article validation failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Validated ${files.length} tracked article files (${byLocale.zh.size} bilingual pairs).`);
