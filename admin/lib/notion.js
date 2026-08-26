import { ARTICLE_STATUSES, DEFAULT_ARTICLE, NOTION_VERSION, TONES } from "./constants.js";
import { readLocalConfig, writeLocalConfig } from "./config.js";
import { AppError } from "./errors.js";
import { contentHash } from "./hash.js";
import { suggestArticleSlug } from "./slug.js";
import {
  cacheVisualAsset,
  insertArticleVisual,
  removeVisualAgentBlocks,
  visualFilename,
} from "./visuals.js";

const NOTION_BASE = "https://api.notion.com/v1";
const NOTION_ID_PATTERN = /([0-9a-f]{32})/i;

function token() {
  if (!process.env.NOTION_API_KEY) {
    throw new AppError("尚未設定 NOTION_API_KEY。", 503);
  }
  return process.env.NOTION_API_KEY;
}

async function notionRequest(path, options = {}) {
  const response = await fetch(`${NOTION_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token()}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new AppError(
      payload.message || `Notion API 錯誤（${response.status}）`,
      response.status === 401 || response.status === 403 ? 503 : response.status,
      payload,
    );
  }
  return payload;
}

async function notionFileRequest(path, formData) {
  const response = await fetch(`${NOTION_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Notion-Version": NOTION_VERSION,
    },
    body: formData,
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new AppError(
      payload.message || `Notion 圖片上傳錯誤（${response.status}）`,
      response.status === 401 || response.status === 403 ? 503 : response.status,
      payload,
    );
  }
  return payload;
}

function splitText(value = "") {
  return String(value)
    .match(/[\s\S]{1,1900}/g)
    ?.slice(0, 100)
    .map((content) => ({ type: "text", text: { content } })) || [];
}

export function parseNotionDatabaseId(reference = "") {
  const value = String(reference).trim();
  if (!value) throw new AppError("請貼上 Notion 資料庫網址或 Database ID。");

  let candidate = value.split(/[?#]/, 1)[0];
  try {
    const url = new URL(value);
    if (!/(^|\.)notion\.(so|site)$/i.test(url.hostname)) {
      throw new AppError("請貼上 notion.so 或 notion.site 的資料庫網址。");
    }
    candidate = url.pathname;
  } catch (error) {
    if (error instanceof AppError) throw error;
  }

  const compact = candidate.replaceAll("-", "");
  const match = compact.match(NOTION_ID_PATTERN);
  if (!match) throw new AppError("找不到 Notion Database ID，請確認貼上的是資料庫網址。");
  const id = match[1].toLowerCase();
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

const props = {
  title: (value) => ({ title: splitText(value) }),
  text: (value) => ({ rich_text: splitText(value) }),
  select: (value) => ({ select: value ? { name: value } : null }),
  multi: (values = []) => ({
    multi_select: values.filter(Boolean).slice(0, 100).map((name) => ({ name })),
  }),
  number: (value) => ({ number: Number.isFinite(Number(value)) ? Number(value) : null }),
  checkbox: (value) => ({ checkbox: Boolean(value) }),
  date: (value) => ({ date: value ? { start: value } : null }),
  url: (value) => ({ url: value || null }),
  relation: (id) => ({ relation: id ? [{ id }] : [] }),
};

function plain(property) {
  if (!property) return "";
  if (property.type === "title") return property.title?.map((item) => item.plain_text).join("") || "";
  if (property.type === "rich_text") {
    return property.rich_text?.map((item) => item.plain_text).join("") || "";
  }
  if (property.type === "select") return property.select?.name || "";
  if (property.type === "url") return property.url || "";
  if (property.type === "number") return property.number ?? "";
  if (property.type === "date") return property.date?.start || "";
  return "";
}

function multi(property) {
  return property?.multi_select?.map((item) => item.name) || [];
}

function relation(property) {
  return property?.relation?.[0]?.id || "";
}

function fileAssets(property) {
  return (property?.files || []).map((item) => ({
    name: item.name || "",
    type: item.type,
    url: item.file?.url || item.external?.url || "",
    expiryTime: item.file?.expiry_time || "",
    raw: item,
  }));
}

function parseVisualManifest(value) {
  try {
    const parsed = JSON.parse(value || "");
    if (!parsed || !Array.isArray(parsed.visuals)) throw new Error("invalid manifest");
    return parsed;
  } catch {
    return {
      version: 1,
      decision: "pending",
      rationale: "",
      visuals: [],
    };
  }
}

function articleProperties(article) {
  return {
    Name: props.title(article.name || article.locales?.zh?.title || "未命名文章"),
    Slug: props.text(article.slug),
    Status: props.select(article.status || "Draft"),
    Category: props.select(article.category || "AI"),
    Tags: props.multi(article.tags),
    Tone: props.select(article.tone || "professional"),
    "Custom Prompt": props.text(article.customPrompt),
    "Target ZH": props.number(article.targetZh || 1500),
    "Target EN": props.number(article.targetEn || 1000),
    "Auto Visuals": props.checkbox(article.autoVisuals !== false),
    "Max Visuals": props.number(Math.min(3, Math.max(1, Number(article.maxVisuals) || 2))),
    "Visual Manifest": props.text(JSON.stringify(article.visualManifest || DEFAULT_ARTICLE.visualManifest)),
    "Published At": props.date(article.publishedAt),
    "PR URL": props.url(article.prUrl),
    "Commit SHA": props.text(article.commitSha),
    "Deploy URL": props.url(article.deployUrl),
    "Last Error": props.text(article.lastError),
  };
}

function localeProperties(locale, articlePageId) {
  return {
    Name: props.title(locale.title || (locale.locale === "en" ? "English draft" : "中文草稿")),
    Article: props.relation(articlePageId),
    Locale: props.select(locale.locale),
    Summary: props.text(locale.summary),
    "SEO Title": props.text(locale.seoTitle),
    "SEO Description": props.text(locale.seoDescription),
    Keywords: props.multi(locale.keywords),
    "Source Hash": props.text(locale.sourceHash),
    "Markdown Source": props.text(locale.body),
  };
}

function mapArticlePage(page) {
  const p = page.properties;
  const visualManifestSource = plain(p["Visual Manifest"]);
  return {
    id: page.id,
    name: plain(p.Name),
    slug: plain(p.Slug),
    status: plain(p.Status) || "Draft",
    category: plain(p.Category),
    tags: multi(p.Tags),
    tone: plain(p.Tone) || "professional",
    customPrompt: plain(p["Custom Prompt"]),
    targetZh: Number(plain(p["Target ZH"])) || 1500,
    targetEn: Number(plain(p["Target EN"])) || 1000,
    autoVisuals: visualManifestSource ? p["Auto Visuals"]?.checkbox !== false : true,
    maxVisuals: Math.min(3, Math.max(1, Number(plain(p["Max Visuals"])) || 2)),
    visualManifest: parseVisualManifest(visualManifestSource),
    visualAssets: fileAssets(p["Visual Assets"]),
    publishedAt: plain(p["Published At"]),
    prUrl: plain(p["PR URL"]),
    commitSha: plain(p["Commit SHA"]),
    deployUrl: plain(p["Deploy URL"]),
    lastError: plain(p["Last Error"]),
    lastEditedTime: page.last_edited_time,
    url: page.url,
  };
}

function mapLocalePage(page) {
  const p = page.properties;
  return {
    id: page.id,
    articleId: relation(p.Article),
    locale: plain(p.Locale),
    title: plain(p.Name),
    summary: plain(p.Summary),
    seoTitle: plain(p["SEO Title"]),
    seoDescription: plain(p["SEO Description"]),
    keywords: multi(p.Keywords),
    sourceHash: plain(p["Source Hash"]),
    body: plain(p["Markdown Source"]),
    lastEditedTime: page.last_edited_time,
    url: page.url,
  };
}

async function queryAll(dataSourceId) {
  const results = [];
  let startCursor;
  do {
    const payload = await notionRequest(`/data_sources/${dataSourceId}/query`, {
      method: "POST",
      body: JSON.stringify({
        page_size: 100,
        ...(startCursor ? { start_cursor: startCursor } : {}),
      }),
    });
    results.push(...payload.results.filter((item) => item.object === "page"));
    startCursor = payload.has_more ? payload.next_cursor : undefined;
  } while (startCursor);
  return results;
}

export async function retrieveMarkdown(pageId) {
  const result = await notionRequest(`/pages/${pageId}/markdown`);
  if (result.truncated) {
    throw new AppError("Notion 頁面內容過長且回傳被截斷，請先在 Notion 精簡未知區塊。", 409);
  }
  return result.markdown || "";
}

export async function replaceMarkdown(pageId, markdown) {
  return notionRequest(`/pages/${pageId}/markdown`, {
    method: "PATCH",
    body: JSON.stringify({
      type: "replace_content",
      replace_content: { new_str: markdown || "" },
    }),
  });
}

function ids() {
  const config = readLocalConfig();
  if (!config.articlesDataSourceId || !config.localesDataSourceId) {
    throw new AppError("尚未初始化 Notion data sources。", 503);
  }
  return config;
}

let schemaReadyKey = "";
let schemaReadyPromise;

async function ensureCurrentSchema() {
  const config = ids();
  const key = `${config.articlesDataSourceId}:${config.localesDataSourceId}`;
  if (schemaReadyKey !== key || !schemaReadyPromise) {
    schemaReadyKey = key;
    schemaReadyPromise = ensureNotionSchema().catch((error) => {
      schemaReadyPromise = undefined;
      throw error;
    });
  }
  return schemaReadyPromise;
}

export async function listArticles({ includeContent = false } = {}) {
  await ensureCurrentSchema();
  const config = ids();
  const [articlePages, localePages] = await Promise.all([
    queryAll(config.articlesDataSourceId),
    queryAll(config.localesDataSourceId),
  ]);
  const articles = articlePages.map((page) => ({
    ...DEFAULT_ARTICLE,
    ...mapArticlePage(page),
    locales: {
      zh: { ...DEFAULT_ARTICLE.locales.zh },
      en: { ...DEFAULT_ARTICLE.locales.en },
    },
  }));
  const byId = new Map(articles.map((article) => [article.id, article]));
  for (const page of localePages) {
    const locale = mapLocalePage(page);
    const article = byId.get(locale.articleId);
    if (article && (locale.locale === "zh" || locale.locale === "en")) {
      article.locales[locale.locale] = { ...article.locales[locale.locale], ...locale };
    }
  }
  if (includeContent) {
    await Promise.all(
      articles.flatMap((article) =>
        ["zh", "en"].map(async (locale) => {
          const record = article.locales[locale];
          if (record.id && !record.body) record.body = await retrieveMarkdown(record.id);
        }),
      ),
    );
  }
  return articles.sort((a, b) => b.lastEditedTime.localeCompare(a.lastEditedTime));
}

export async function getArticle(articleId) {
  await ensureCurrentSchema();
  const config = ids();
  const articlePage = await notionRequest(`/pages/${articleId}`);
  const localePages = await queryAll(config.localesDataSourceId);
  const article = {
    ...DEFAULT_ARTICLE,
    ...mapArticlePage(articlePage),
    research: await retrieveMarkdown(articleId),
    locales: {
      zh: { ...DEFAULT_ARTICLE.locales.zh },
      en: { ...DEFAULT_ARTICLE.locales.en },
    },
  };
  const matching = localePages.map(mapLocalePage).filter((item) => item.articleId === articleId);
  await Promise.all(
    matching.map(async (locale) => {
      if (locale.locale !== "zh" && locale.locale !== "en") return;
      article.locales[locale.locale] = {
        ...article.locales[locale.locale],
        ...locale,
        body: locale.body || (await retrieveMarkdown(locale.id)),
      };
    }),
  );
  article.englishCurrent = englishIsCurrent(article);
  return article;
}

export async function createArticle(input = {}) {
  const config = ids();
  const article = {
    ...DEFAULT_ARTICLE,
    ...input,
    locales: {
      zh: { ...DEFAULT_ARTICLE.locales.zh, ...input.locales?.zh, locale: "zh" },
      en: { ...DEFAULT_ARTICLE.locales.en, ...input.locales?.en, locale: "en" },
    },
  };
  const parent = await notionRequest("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: config.articlesDataSourceId },
      properties: articleProperties(article),
      markdown: article.research || "",
    }),
  });
  try {
    await Promise.all(
      ["zh", "en"].map((locale) =>
        notionRequest("/pages", {
          method: "POST",
          body: JSON.stringify({
            parent: { type: "data_source_id", data_source_id: config.localesDataSourceId },
            properties: localeProperties(article.locales[locale], parent.id),
            markdown: article.locales[locale].body || "",
          }),
        }),
      ),
    );
  } catch (error) {
    await notionRequest(`/pages/${parent.id}`, {
      method: "PATCH",
      body: JSON.stringify({ in_trash: true }),
    }).catch(() => {});
    throw error;
  }
  return getArticle(parent.id);
}

async function assertUnchanged(pageId, expectedLastEditedTime) {
  if (!expectedLastEditedTime) return;
  const current = await notionRequest(`/pages/${pageId}`);
  if (current.last_edited_time !== expectedLastEditedTime) {
    throw new AppError("這篇內容已在 Notion 被修改，請重新載入後再儲存。", 409, {
      currentLastEditedTime: current.last_edited_time,
    });
  }
}

export async function updateArticle(articleId, input) {
  let changes = input;
  await assertUnchanged(articleId, changes.expectedLastEditedTime);
  const existing = await getArticle(articleId);
  if (existing.status === "Published" && changes.slug && changes.slug !== existing.slug) {
    throw new AppError("已發布文章的 slug 已鎖定。", 409);
  }
  const merged = { ...existing, ...changes };
  if (!merged.slug) merged.slug = suggestArticleSlug(merged);
  if (
    existing.slug &&
    merged.slug !== existing.slug &&
    existing.visualManifest?.visuals?.some((visual) => visual.status === "ready")
  ) {
    const previousPrefix = `/media/articles/${existing.slug}/`;
    const nextPrefix = `/media/articles/${merged.slug}/`;
    const zhBody = (
      changes.locales?.zh?.body ?? existing.locales.zh.body
    ).replaceAll(previousPrefix, nextPrefix);
    const enBody = (
      changes.locales?.en?.body ?? existing.locales.en.body
    ).replaceAll(previousPrefix, nextPrefix);
    merged.visualManifest = {
      ...existing.visualManifest,
      visuals: existing.visualManifest.visuals.map((visual) => ({
        ...visual,
        publicPath: visual.publicPath?.replace(previousPrefix, nextPrefix) || visual.publicPath,
      })),
    };
    changes = {
      ...changes,
      visualManifest: merged.visualManifest,
      locales: {
        ...changes.locales,
        zh: { ...changes.locales?.zh, body: zhBody },
        en: {
          ...changes.locales?.en,
          body: enBody,
          sourceHash: contentHash(zhBody),
        },
      },
    };
  }
  await notionRequest(`/pages/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: articleProperties(merged) }),
  });
  if (typeof changes.research === "string" && changes.research !== existing.research) {
    await replaceMarkdown(articleId, changes.research);
  }

  for (const locale of ["zh", "en"]) {
    const localeChanges = changes.locales?.[locale];
    if (!localeChanges) continue;
    const current = existing.locales[locale];
    if (!current.id) throw new AppError(`缺少 ${locale} Notion locale 頁面。`, 409);
    await assertUnchanged(current.id, localeChanges.expectedLastEditedTime);
    const next = { ...current, ...localeChanges, locale };
    await notionRequest(`/pages/${current.id}`, {
      method: "PATCH",
      body: JSON.stringify({ properties: localeProperties(next, articleId) }),
    });
    if (typeof localeChanges.body === "string" && localeChanges.body !== current.body) {
      await replaceMarkdown(current.id, localeChanges.body);
    }
  }
  return getArticle(articleId);
}

function writableNotionFile(item) {
  if (item?.type === "file" && item.file?.url) {
    return { name: item.name, type: "file", file: item.file };
  }
  if (item?.type === "external" && item.external?.url) {
    return { name: item.name, type: "external", external: item.external };
  }
  if (item?.type === "file_upload" && item.file_upload?.id) {
    return { name: item.name, type: "file_upload", file_upload: item.file_upload };
  }
  return null;
}

export async function setArticleVisualPlan(articleId, plan) {
  const article = await getArticle(articleId);
  const slug = article.slug || suggestArticleSlug(article);
  if (!slug) throw new AppError("視覺內容 Agent 需要先有英文標題，才能建立圖片路徑。", 422);
  const zhBody = removeVisualAgentBlocks(article.locales.zh.body);
  const enBody = removeVisualAgentBlocks(article.locales.en.body);
  await updateArticle(articleId, {
    slug,
    visualManifest: plan,
    expectedLastEditedTime: article.lastEditedTime,
    locales: {
      zh: {
        body: zhBody,
        expectedLastEditedTime: article.locales.zh.lastEditedTime,
      },
      en: {
        body: enBody,
        sourceHash: contentHash(zhBody),
        expectedLastEditedTime: article.locales.en.lastEditedTime,
      },
    },
  });
  await notionRequest(`/pages/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify({
      properties: {
        "Visual Assets": { files: [] },
      },
    }),
  });
  return getArticle(articleId);
}

export async function saveArticleVisual(articleId, visualId, generated) {
  let article = await getArticle(articleId);
  const visual = (article.visualManifest?.visuals || []).find((item) => item.id === visualId);
  if (!visual) throw new AppError("這張圖片不在目前的視覺規劃中。", 409);

  const filename = visualFilename(visual.id);
  cacheVisualAsset(articleId, filename, generated.bytes);
  const upload = await notionRequest("/file_uploads", {
    method: "POST",
    body: JSON.stringify({
      mode: "single_part",
      filename,
      content_type: generated.contentType,
    }),
  });
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([generated.bytes], { type: generated.contentType }),
    filename,
  );
  const sent = await notionFileRequest(`/file_uploads/${upload.id}/send`, formData);
  if (sent.status !== "uploaded") {
    throw new AppError(`Notion 尚未完成圖片上傳：${filename}`, 502, sent);
  }

  const page = await notionRequest(`/pages/${articleId}`);
  const retained = (page.properties["Visual Assets"]?.files || [])
    .filter((item) => item.name !== filename)
    .map(writableNotionFile)
    .filter(Boolean);
  const publicPath = `/media/articles/${article.slug}/${filename}`;
  const manifest = {
    ...article.visualManifest,
    visuals: article.visualManifest.visuals.map((item) =>
      item.id === visual.id
        ? {
            ...item,
            filename,
            publicPath,
            status: "ready",
            model: generated.model,
            generatedAt: new Date().toISOString(),
          }
        : item,
    ),
  };
  await notionRequest(`/pages/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify({
      properties: {
        "Visual Assets": {
          files: [
            ...retained,
            {
              name: filename,
              type: "file_upload",
              file_upload: { id: upload.id },
            },
          ],
        },
        "Visual Manifest": props.text(JSON.stringify(manifest)),
      },
    }),
  });

  article = await getArticle(articleId);
  const zhBody = insertArticleVisual(
    article.locales.zh.body,
    visual,
    "zh",
    publicPath,
  );
  const enBody = insertArticleVisual(
    article.locales.en.body,
    visual,
    "en",
    publicPath,
  );
  return updateArticle(articleId, {
    locales: {
      zh: {
        body: zhBody,
        expectedLastEditedTime: article.locales.zh.lastEditedTime,
      },
      en: {
        body: enBody,
        sourceHash: contentHash(zhBody),
        expectedLastEditedTime: article.locales.en.lastEditedTime,
      },
    },
  });
}

export async function setArticleStatus(articleId, status, extra = {}) {
  if (!ARTICLE_STATUSES.includes(status)) throw new AppError("不支援的文章狀態。");
  const existing = await getArticle(articleId);
  return updateArticle(articleId, {
    status,
    lastError: "",
    ...extra,
    expectedLastEditedTime: existing.lastEditedTime,
  });
}

export async function trashArticle(articleId) {
  const article = await getArticle(articleId);
  if (!["Draft", "Ready", "Unpublished", "Archived"].includes(article.status)) {
    throw new AppError("文章仍在網站上，請先完成下架。", 409);
  }
  await Promise.all(
    ["zh", "en"].map((locale) =>
      notionRequest(`/pages/${article.locales[locale].id}`, {
        method: "PATCH",
        body: JSON.stringify({ in_trash: true }),
      }),
    ),
  );
  await notionRequest(`/pages/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify({ in_trash: true }),
  });
}

export async function markEnglishFromChinese(articleId, english) {
  const article = await getArticle(articleId);
  const zhHash = contentHash(article.locales.zh.body);
  return updateArticle(articleId, {
    locales: {
      en: {
        ...english,
        sourceHash: zhHash,
        expectedLastEditedTime: article.locales.en.lastEditedTime,
      },
    },
  });
}

export function englishIsCurrent(article) {
  return Boolean(
    article.locales.en.body &&
      article.locales.en.sourceHash === contentHash(article.locales.zh.body),
  );
}

const articleSchema = {
  Name: { title: {} },
  Slug: { rich_text: {} },
  Status: {
    select: {
      options: ARTICLE_STATUSES.map((name, index) => ({
        name,
        color: ["gray", "blue", "yellow", "green", "orange", "purple", "red"][index % 7],
      })),
    },
  },
  Category: { select: { options: [{ name: "AI", color: "blue" }] } },
  Tags: { multi_select: { options: [] } },
  Tone: {
    select: {
      options: TONES.map((tone) => ({ name: tone.value, color: "gray" })),
    },
  },
  "Custom Prompt": { rich_text: {} },
  "Target ZH": { number: { format: "number" } },
  "Target EN": { number: { format: "number" } },
  "Auto Visuals": { checkbox: {} },
  "Max Visuals": { number: { format: "number" } },
  "Visual Assets": { files: {} },
  "Visual Manifest": { rich_text: {} },
  "Published At": { date: {} },
  "PR URL": { url: {} },
  "Commit SHA": { rich_text: {} },
  "Deploy URL": { url: {} },
  "Last Error": { rich_text: {} },
};

function localeSchema(articlesDataSourceId) {
  return {
    Name: { title: {} },
    Article: {
      relation: {
        data_source_id: articlesDataSourceId,
        single_property: {},
      },
    },
    Locale: {
      select: {
        options: [
          { name: "zh", color: "red" },
          { name: "en", color: "blue" },
        ],
      },
    },
    Summary: { rich_text: {} },
    "SEO Title": { rich_text: {} },
    "SEO Description": { rich_text: {} },
    Keywords: { multi_select: { options: [] } },
    "Source Hash": { rich_text: {} },
    "Markdown Source": { rich_text: {} },
  };
}

function expectedSchemaType(definition) {
  return Object.keys(definition)[0];
}

async function addMissingProperties(dataSourceId, requiredSchema, label) {
  let dataSource = await notionRequest(`/data_sources/${dataSourceId}`);
  const existing = dataSource.properties || {};
  const changes = {};

  if (!existing.Name) {
    const titleEntry = Object.entries(existing).find(([, property]) => property.type === "title");
    if (titleEntry) {
      changes[titleEntry[0]] = { name: "Name" };
    }
  }

  for (const [name, definition] of Object.entries(requiredSchema)) {
    let property = existing[name];
    if (name === "Name" && !property) {
      property = Object.values(existing).find((item) => item.type === "title");
    }
    if (!property) {
      changes[name] = definition;
      continue;
    }
    const expectedType = expectedSchemaType(definition);
    if (property.type !== expectedType) {
      throw new AppError(
        `${label} 的「${name}」欄位目前是 ${property.type}，系統需要 ${expectedType}。請先重新命名該欄位後再連接。`,
        409,
      );
    }
  }

  if (Object.keys(changes).length) {
    dataSource = await notionRequest(`/data_sources/${dataSourceId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties: changes }),
    });
  }
  return dataSource;
}

function selectArticlesDataSource(database) {
  const sources = database.data_sources || [];
  if (!sources.length) throw new AppError("這個 Notion database 裡沒有可用的 data source。", 409);
  const named = sources.find((source) => /^(articles?|文章)$/i.test(source.name?.trim() || ""));
  if (named) return named;
  if (sources.length === 1) return sources[0];
  throw new AppError(
    "這個 database 有多個資料表。請先把要存文章的資料表命名為「Articles」，再重新連接。",
    409,
  );
}

export async function initializeNotion(databaseReference) {
  const databaseId = parseNotionDatabaseId(databaseReference);
  const database = await notionRequest(`/databases/${databaseId}`);
  const articlesSource = selectArticlesDataSource(database);
  const articlesDataSourceId = articlesSource.id;

  await addMissingProperties(articlesDataSourceId, articleSchema, "Articles");

  const localesSource = (database.data_sources || []).find(
    (source) => source.name?.trim().toLowerCase() === "article locales",
  );
  let localesDataSourceId = localesSource?.id;
  let createdLocales = false;

  if (localesDataSourceId) {
    await addMissingProperties(
      localesDataSourceId,
      localeSchema(articlesDataSourceId),
      "Article Locales",
    );
  } else {
    const created = await notionRequest("/data_sources", {
      method: "POST",
      body: JSON.stringify({
        parent: { type: "database_id", database_id: databaseId },
        title: splitText("Article Locales"),
        properties: localeSchema(articlesDataSourceId),
      }),
    });
    localesDataSourceId = created.id;
    createdLocales = true;
  }

  if (!localesDataSourceId) throw new AppError("Notion 未回傳 Locales data source ID。", 502);
  const current = readLocalConfig();
  writeLocalConfig({
    ...current,
    notionDatabaseId: databaseId,
    articlesDataSourceId,
    localesDataSourceId,
  });
  return { databaseId, articlesDataSourceId, localesDataSourceId, createdLocales };
}

export async function ensureNotionSchema() {
  const config = ids();
  await Promise.all([
    addMissingProperties(config.articlesDataSourceId, articleSchema, "Articles"),
    addMissingProperties(
      config.localesDataSourceId,
      localeSchema(config.articlesDataSourceId),
      "Article Locales",
    ),
  ]);
}
