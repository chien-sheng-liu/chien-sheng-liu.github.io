import test from "node:test";
import assert from "node:assert/strict";
import { exportLocaleMarkdown, validatePublishable } from "../lib/article-export.js";
import { contentHash } from "../lib/hash.js";

function fixture() {
  const zhBody = "導言\n\n## 來源\n\n1. [OpenAI](https://openai.com)";
  return {
    slug: "good-article",
    category: "AI",
    tags: ["AI"],
    publishedAt: "2026-07-28",
    locales: {
      zh: {
        title: "好文章",
        summary: "摘要",
        seoTitle: "SEO 標題",
        seoDescription: "SEO 描述",
        keywords: ["AI"],
        body: zhBody,
      },
      en: {
        title: "A good article",
        summary: "Summary",
        seoTitle: "SEO title",
        seoDescription: "SEO description",
        keywords: ["AI"],
        body: "Intro\n\n## Sources\n\n1. [OpenAI](https://openai.com)",
        sourceHash: contentHash(zhBody),
      },
    },
  };
}

test("validates a complete bilingual article", () => {
  assert.equal(validatePublishable(fixture()), true);
});

test("rejects stale English content", () => {
  const article = fixture();
  article.locales.en.sourceHash = "stale";
  assert.throws(() => validatePublishable(article), /尚未符合發布條件/);
});

test("exports SEO frontmatter and body", () => {
  const output = exportLocaleMarkdown(fixture(), "zh");
  assert.match(output, /seoTitle: SEO 標題/);
  assert.match(output, /keywords:/);
  assert.match(output, /## 來源/);
});
