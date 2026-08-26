import matter from "gray-matter";
import { contentHash } from "./hash.js";
import { AppError } from "./errors.js";

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validatePublishable(article) {
  const errors = [];
  if (!SLUG_PATTERN.test(article.slug || "")) {
    errors.push("Slug 只能使用小寫英數字與單一連字號。");
  }
  if (!article.category) errors.push("缺少文章分類。");
  if (!article.locales?.zh?.body?.trim()) errors.push("缺少中文正文。");
  if (!article.locales?.en?.body?.trim()) errors.push("缺少英文正文。");

  for (const locale of ["zh", "en"]) {
    const content = article.locales?.[locale] || {};
    const label = locale === "zh" ? "中文" : "英文";
    if (!content.title?.trim()) errors.push(`${label}缺少標題。`);
    if (!content.summary?.trim()) errors.push(`${label}缺少摘要。`);
    if (!content.seoTitle?.trim()) errors.push(`${label}缺少 SEO title。`);
    if (!content.seoDescription?.trim()) errors.push(`${label}缺少 SEO description。`);
    if (!content.keywords?.length) errors.push(`${label}缺少 SEO keywords。`);
    if (!/##\s+(來源|Sources)/i.test(content.body || "")) {
      errors.push(`${label}正文缺少來源章節。`);
    }
  }
  if (
    article.locales?.en?.sourceHash !== contentHash(article.locales?.zh?.body || "")
  ) {
    errors.push("英文版本不是由最新中文內容產生，請重新翻譯。");
  }
  if (errors.length) throw new AppError("文章尚未符合發布條件。", 422, errors);
  return true;
}

export function exportLocaleMarkdown(article, locale) {
  const localized = article.locales[locale];
  const date =
    article.publishedAt?.slice(0, 10) || new Date().toISOString().slice(0, 10);
  return matter.stringify(localized.body.trimEnd(), {
    title: localized.title,
    date,
    updated: new Date().toISOString().slice(0, 10),
    summary: localized.summary,
    tags: article.tags,
    category: article.category,
    seoTitle: localized.seoTitle,
    seoDescription: localized.seoDescription,
    keywords: localized.keywords,
  });
}
