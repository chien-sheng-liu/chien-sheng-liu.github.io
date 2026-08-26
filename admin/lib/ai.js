import OpenAI from "openai";
import { AppError } from "./errors.js";
import { TONES } from "./constants.js";
import { visualId } from "./visuals.js";

function client() {
  if (!process.env.OPENAI_API_KEY) throw new AppError("尚未設定 OPENAI_API_KEY。", 503);
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function model() {
  return process.env.OPENAI_MODEL || "gpt-5.6";
}

function imageModel() {
  return process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
}

function openAIRequestError(error, fallbackMessage) {
  const detail = error?.message || "OpenAI API 未回傳錯誤說明。";
  if (error?.status === 429 || /quota|billing/i.test(detail)) {
    return new AppError(
      "OpenAI API 額度已用完，草稿沒有遺失。",
      429,
      "請到 https://platform.openai.com/settings/organization/billing 檢查餘額或付款設定；加值後可直接重試。",
    );
  }
  if (error?.status === 401) {
    return new AppError(
      "OPENAI_API_KEY 無效或已失效。",
      503,
      "請更新 admin/.env 的 OPENAI_API_KEY，然後重新啟動 Admin。",
    );
  }
  if (error?.status === 403) {
    return new AppError(
      "OpenAI 專案沒有執行這項功能的權限。",
      403,
      `${detail} 請檢查專案權限；GPT Image 也可能需要完成組織驗證。`,
    );
  }
  return new AppError(fallbackMessage, 502, detail);
}

const sourceSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "url", "publisher", "accessedAt"],
  properties: {
    title: { type: "string" },
    url: { type: "string" },
    publisher: { type: "string" },
    accessedAt: { type: "string" },
  },
};

const localeSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "seoTitle", "seoDescription", "keywords", "body"],
  properties: {
    title: { type: "string" },
    summary: { type: "string" },
    seoTitle: { type: "string" },
    seoDescription: { type: "string" },
    keywords: { type: "array", items: { type: "string" } },
    body: { type: "string" },
  },
};

async function structured(name, schema, input, options = {}) {
  let response;
  try {
    response = await client().responses.create({
      model: model(),
      input,
      ...(options.webSearch
        ? {
            tools: [{ type: "web_search" }],
            include: ["web_search_call.action.sources"],
          }
        : {}),
      reasoning: { effort: options.reasoning || "medium" },
      text: {
        format: {
          type: "json_schema",
          name,
          strict: true,
          schema,
        },
      },
    });
  } catch (error) {
    throw openAIRequestError(error, "AI 服務請求失敗，已保留目前草稿。");
  }
  try {
    return { data: JSON.parse(response.output_text), response };
  } catch {
    throw new AppError("AI 回傳內容無法解析，請重試。", 502, {
      responseId: response.id,
    });
  }
}

function tonePrompt(article) {
  const preset = TONES.find((tone) => tone.value === article.tone);
  return [preset?.prompt, article.customPrompt].filter(Boolean).join("\n");
}

function formatSources(sources = []) {
  if (!sources.length) return "";
  return [
    "## 來源",
    "",
    ...sources.map(
      (source, index) =>
        `${index + 1}. [${source.title || source.publisher || source.url}](${source.url})（${source.publisher || "來源"}，查閱於 ${source.accessedAt}）`,
    ),
  ].join("\n");
}

function sourceUrlsFromResponse(response) {
  const urls = new Set();
  const walk = (value) => {
    if (!value || typeof value !== "object") return;
    if (typeof value.url === "string" && /^https?:\/\//.test(value.url)) urls.add(value.url);
    for (const child of Object.values(value)) {
      if (Array.isArray(child)) child.forEach(walk);
      else if (child && typeof child === "object") walk(child);
    }
  };
  walk(response.output);
  return urls;
}

export async function researchArticle(article, brief = {}) {
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["researchSummary", "facts", "risks", "titleIdeas", "sources"],
    properties: {
      researchSummary: { type: "string" },
      facts: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["claim", "sourceUrl", "confidence"],
          properties: {
            claim: { type: "string" },
            sourceUrl: { type: "string" },
            confidence: { type: "string", enum: ["high", "medium", "low"] },
          },
        },
      },
      risks: { type: "array", items: { type: "string" } },
      titleIdeas: { type: "array", items: { type: "string" } },
      sources: { type: "array", items: sourceSchema },
    },
  };
  const today = new Date().toISOString().slice(0, 10);
  const { data, response } = await structured(
    "article_research",
    schema,
    [
      {
        role: "developer",
        content:
          "你是嚴謹的繁體中文文章研究員。搜尋第一手或高可信度來源，區分事實與推論。不要捏造 URL、數據或引言。所有 facts 必須附實際查閱的 sourceUrl。",
      },
      {
        role: "user",
        content: [
          `研究日期：${today}`,
          `文章主題：${brief.topic || article.name}`,
          `預計分類：${article.category}`,
          `SEO 關鍵字：${(brief.keywords || article.tags || []).join("、")}`,
          `作者筆記：\n${brief.notes || "無"}`,
          `指定參考網址：\n${(brief.urls || []).join("\n") || "無"}`,
          `自訂要求：\n${article.customPrompt || "無"}`,
        ].join("\n\n"),
      },
    ],
    { webSearch: true, reasoning: "high" },
  );
  const observedUrls = new Set(
    [...sourceUrlsFromResponse(response)].flatMap((url) => {
      try {
        const normalized = new URL(url).href;
        return [url, normalized, normalized.replace(/\/$/, "")];
      } catch {
        return [];
      }
    }),
  );
  data.sources = data.sources.filter((source) => {
    try {
      const normalized = new URL(source.url).href;
      return (
        observedUrls.has(source.url) ||
        observedUrls.has(normalized) ||
        observedUrls.has(normalized.replace(/\/$/, ""))
      );
    } catch {
      return false;
    }
  });
  const allowed = new Set(data.sources.map((source) => source.url));
  data.facts = data.facts.filter((fact) => allowed.has(fact.sourceUrl));

  return {
    ...data,
    markdown: [
      "# 研究筆記",
      "",
      data.researchSummary,
      "",
      "## 可用事實",
      "",
      ...data.facts.map(
        (fact) => `- ${fact.claim}（[來源](${fact.sourceUrl})，信心：${fact.confidence}）`,
      ),
      "",
      "## 需要人工確認",
      "",
      ...(data.risks.length ? data.risks.map((risk) => `- ${risk}`) : ["- 無"]),
      "",
      "## 標題候選",
      "",
      ...data.titleIdeas.map((title) => `- ${title}`),
      "",
      formatSources(data.sources),
    ].join("\n"),
  };
}

export async function generateOutline(article) {
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["recommendedTitle", "summary", "seoTitle", "seoDescription", "keywords", "sections"],
    properties: {
      recommendedTitle: { type: "string" },
      summary: { type: "string" },
      seoTitle: { type: "string" },
      seoDescription: { type: "string" },
      keywords: { type: "array", items: { type: "string" } },
      sections: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["heading", "purpose", "keyPoints"],
          properties: {
            heading: { type: "string" },
            purpose: { type: "string" },
            keyPoints: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
  };
  const { data } = await structured("article_outline", schema, [
    {
      role: "developer",
      content:
        "你是資深繁體中文編輯。根據研究筆記設計有明確論點、避免重複、適合人類作者再修改的大綱。不要加入研究筆記沒有支持的具體事實。",
    },
    {
      role: "user",
      content: [
        `主題：${article.name}`,
        `分類：${article.category}`,
        `目標長度：約 ${article.targetZh} 字`,
        `語氣：${tonePrompt(article)}`,
        `研究筆記：\n${article.research || "尚無研究資料"}`,
      ].join("\n\n"),
    },
  ]);
  return {
    ...data,
    markdown: [
      `# ${data.recommendedTitle}`,
      "",
      `> ${data.summary}`,
      "",
      ...data.sections.flatMap((section) => [
        `## ${section.heading}`,
        "",
        `目的：${section.purpose}`,
        "",
        ...section.keyPoints.map((point) => `- ${point}`),
        "",
      ]),
    ].join("\n"),
  };
}

export async function generateChinese(article, outline) {
  const { data } = await structured("article_zh", localeSchema, [
    {
      role: "developer",
      content: [
        "你是作者的 AI 初稿協作者，以自然繁體中文撰寫。",
        "正文使用 Markdown，從導言開始，不要重複 H1 標題。",
        "僅使用研究筆記支持的具體事實；重要事實以 Markdown 連結連回原始來源。",
        "結尾必須保留「## 來源」清單。不要使用虛構案例、虛構數據或虛構 URL。",
        "SEO description 控制在約 80–150 個中文字。",
      ].join("\n"),
    },
    {
      role: "user",
      content: [
        `文章：${article.name}`,
        `分類：${article.category}`,
        `標籤：${article.tags.join("、")}`,
        `目標長度：約 ${article.targetZh} 個中文字`,
        `語氣與自訂要求：${tonePrompt(article)}`,
        `大綱：\n${outline}`,
        `研究筆記：\n${article.research}`,
      ].join("\n\n"),
    },
  ]);
  return data;
}

export async function translateEnglish(article) {
  const zh = article.locales.zh;
  const { data } = await structured("article_en", localeSchema, [
    {
      role: "developer",
      content: [
        "You are a bilingual editor translating a finalized Traditional Chinese article into natural professional English.",
        "Preserve meaning, headings, Markdown links, factual qualifiers, and the Sources section.",
        "Do not introduce new facts or URLs. Avoid literal translation where idiomatic English is clearer.",
        "Return body Markdown without an H1 title.",
      ].join("\n"),
    },
    {
      role: "user",
      content: [
        `Target length: approximately ${article.targetEn} English words.`,
        `Tone: ${tonePrompt(article)}`,
        `Chinese title: ${zh.title}`,
        `Chinese summary: ${zh.summary}`,
        `Chinese keywords: ${zh.keywords.join(", ")}`,
        `Chinese article:\n${zh.body}`,
      ].join("\n\n"),
    },
  ]);
  return data;
}

export async function planArticleVisuals(article, requestedMax = 2) {
  const maxVisuals = Math.min(3, Math.max(1, Number(requestedMax) || 2));
  const visualSchema = {
    type: "object",
    additionalProperties: false,
    required: [
      "id",
      "kind",
      "purpose",
      "afterHeadingZh",
      "afterHeadingEn",
      "prompt",
      "altZh",
      "altEn",
      "captionZh",
      "captionEn",
    ],
    properties: {
      id: { type: "string" },
      kind: {
        type: "string",
        enum: ["concept", "process", "comparison", "system", "data-story"],
      },
      purpose: { type: "string" },
      afterHeadingZh: { type: "string" },
      afterHeadingEn: { type: "string" },
      prompt: { type: "string" },
      altZh: { type: "string" },
      altEn: { type: "string" },
      captionZh: { type: "string" },
      captionEn: { type: "string" },
    },
  };
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["needsVisuals", "rationale", "visuals"],
    properties: {
      needsVisuals: { type: "boolean" },
      rationale: { type: "string" },
      visuals: {
        type: "array",
        maxItems: maxVisuals,
        items: visualSchema,
      },
    },
  };
  const { data } = await structured(
    "article_visual_plan",
    schema,
    [
      {
        role: "developer",
        content: [
          "你是獨立的「視覺內容 Agent」，任務是改善理解，不是裝飾文章。",
          "只有當圖片能明顯降低認知負擔、解釋流程、比較概念、呈現系統關係或建立有用的心智模型時才配圖；否則 needsVisuals 必須為 false。",
          `最多規劃 ${maxVisuals} 張。避免每個段落都配圖，也不要規劃純封面照、無資訊量的辦公室照片或抽象 AI 發光圖片。`,
          "afterHeadingZh 與 afterHeadingEn 必須逐字使用文章現有的 H2/H3 標題，且不得選擇來源章節。",
          "每張圖應可同時用於中英文文章。圖中不要出現文字、字母、數字、Logo 或浮水印；需要精確資訊時由 caption 表達，避免把未查證數據畫進圖片。",
          "prompt 使用英文，描述清楚的橫式 editorial visual；alt 與 caption 則分別提供繁中與英文。",
          "id 使用 2–5 個小寫英文單字與連字號。",
        ].join("\n"),
      },
      {
        role: "user",
        content: [
          `文章分類：${article.category}`,
          `文章語氣：${tonePrompt(article)}`,
          `繁中標題：${article.locales.zh.title}`,
          `英文標題：${article.locales.en.title}`,
          `繁中正文：\n${article.locales.zh.body}`,
          `英文正文：\n${article.locales.en.body}`,
        ].join("\n\n"),
      },
    ],
    { reasoning: "high" },
  );

  const seen = new Set();
  const visuals = (data.needsVisuals ? data.visuals : [])
    .map((visual) => ({ ...visual, id: visualId(visual.id) }))
    .filter((visual) => {
      if (seen.has(visual.id)) return false;
      seen.add(visual.id);
      return true;
    })
    .slice(0, maxVisuals);
  return {
    version: 1,
    decision: visuals.length ? "generate" : "skip",
    rationale: data.rationale,
    plannedAt: new Date().toISOString(),
    visuals: visuals.map((visual) => ({ ...visual, status: "planned" })),
  };
}

export async function generateArticleVisual(visual) {
  const prompt = [
    "Create a horizontal editorial visual for a thoughtful professional article.",
    `Communication goal: ${visual.purpose}`,
    `Visual brief: ${visual.prompt}`,
    "Style: sophisticated editorial illustration, clear hierarchy, restrained warm neutral palette with one vivid blue accent, generous negative space, visually concrete and easy to understand.",
    "The image must stand on its own across Traditional Chinese and English versions.",
    "Do not render any words, letters, numbers, labels, logos, signatures, UI screenshots, or watermarks.",
    "Do not imply precise statistics or factual claims that are not explicitly described.",
  ].join("\n");
  try {
    const result = await client().images.generate({
      model: imageModel(),
      prompt,
      size: "1536x1024",
      quality: "medium",
      output_format: "webp",
      output_compression: 82,
      background: "opaque",
    });
    const encoded = result.data?.[0]?.b64_json;
    if (!encoded) throw new AppError("圖片模型沒有回傳可用的圖片。", 502);
    return {
      bytes: Buffer.from(encoded, "base64"),
      contentType: "image/webp",
      model: imageModel(),
      revisedPrompt: result.data?.[0]?.revised_prompt || "",
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw openAIRequestError(
      error,
      "視覺內容 Agent 產圖失敗，文字初稿仍已保留；可以稍後重試配圖。",
    );
  }
}

export async function rewriteSelection(article, { selection, instruction }) {
  if (!selection?.trim()) throw new AppError("請先選取要改寫的文字。");
  let response;
  try {
    response = await client().responses.create({
      model: model(),
      reasoning: { effort: "low" },
      input: [
        {
          role: "developer",
          content:
            "只回傳修改後的 Markdown 片段，不要加說明、引號或 code fence。保留原文事實、連結與語言。",
        },
        {
          role: "user",
          content: `語氣：${tonePrompt(article)}\n任務：${instruction}\n\n原文：\n${selection}`,
        },
      ],
    });
  } catch (error) {
    throw openAIRequestError(error, "AI 改寫失敗，原文沒有變更。");
  }
  return { text: response.output_text.trim() };
}
