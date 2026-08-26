export const NOTION_VERSION = "2026-03-11";

export const ARTICLE_STATUSES = [
  "Draft",
  "Ready",
  "Publishing",
  "Published",
  "Unpublishing",
  "Unpublished",
  "Archived",
  "Error",
];

export const TONES = [
  { value: "professional", label: "專業分析", prompt: "專業、具體、重視判斷依據，避免空泛商業術語。" },
  { value: "approachable", label: "親切解說", prompt: "自然親切、清楚易懂，像對聰明朋友解釋複雜概念。" },
  { value: "personal", label: "個人敘事", prompt: "第一人稱、有觀點與經驗感，但不過度戲劇化。" },
  { value: "tutorial", label: "教學指南", prompt: "步驟清晰、包含例子與實務注意事項。" },
  { value: "custom", label: "自訂", prompt: "" },
];

export const DEFAULT_ARTICLE = {
  name: "未命名文章",
  slug: "",
  status: "Draft",
  category: "AI",
  tags: [],
  tone: "professional",
  customPrompt: "",
  targetZh: 1500,
  targetEn: 1000,
  autoVisuals: true,
  maxVisuals: 2,
  visualManifest: {
    version: 1,
    decision: "pending",
    rationale: "",
    visuals: [],
  },
  visualAssets: [],
  publishedAt: "",
  prUrl: "",
  commitSha: "",
  deployUrl: "",
  lastError: "",
  research: "",
  locales: {
    zh: {
      id: "",
      locale: "zh",
      title: "",
      summary: "",
      seoTitle: "",
      seoDescription: "",
      keywords: [],
      body: "",
      sourceHash: "",
      lastEditedTime: "",
    },
    en: {
      id: "",
      locale: "en",
      title: "",
      summary: "",
      seoTitle: "",
      seoDescription: "",
      keywords: [],
      body: "",
      sourceHash: "",
      lastEditedTime: "",
    },
  },
};

export const REQUIRED_ENV = ["OPENAI_API_KEY", "NOTION_API_KEY"];
