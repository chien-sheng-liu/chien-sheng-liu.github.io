import fs from "node:fs";
import path from "node:path";
import { AppError } from "./errors.js";

const VISUAL_BLOCK =
  /\n?<!-- visual-agent:[a-z0-9-]+:start -->[\s\S]*?<!-- visual-agent:[a-z0-9-]+:end -->\n?/gi;

function safePart(value, label) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]*$/.test(normalized)) {
    throw new AppError(`${label} 格式不正確。`, 422);
  }
  return normalized;
}

export function visualId(value = "") {
  return (
    String(value)
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "article-visual"
  );
}

export function visualFilename(id) {
  return `${safePart(visualId(id), "圖片 ID")}.webp`;
}

export function removeVisualAgentBlocks(markdown = "") {
  return String(markdown).replace(VISUAL_BLOCK, "\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function insertArticleVisual(markdown, visual, locale, publicPath) {
  const id = safePart(visual.id, "圖片 ID");
  const sameVisual = new RegExp(
    `\\n?<!-- visual-agent:${escapeRegExp(id)}:start -->[\\s\\S]*?<!-- visual-agent:${escapeRegExp(id)}:end -->\\n?`,
    "gi",
  );
  const clean = String(markdown).replace(sameVisual, "\n\n").replace(/\n{3,}/g, "\n\n").trim();
  const heading = locale === "en" ? visual.afterHeadingEn : visual.afterHeadingZh;
  const alt = locale === "en" ? visual.altEn : visual.altZh;
  const caption = locale === "en" ? visual.captionEn : visual.captionZh;
  const block = [
    `<!-- visual-agent:${id}:start -->`,
    `![${String(alt || "").replaceAll("]", "\\]")}](${publicPath})`,
    caption ? `*${caption}*` : "",
    `<!-- visual-agent:${id}:end -->`,
  ]
    .filter(Boolean)
    .join("\n\n");

  if (heading) {
    const match = clean.match(
      new RegExp(`^#{2,3}[ \\t]+${escapeRegExp(heading)}[ \\t]*$`, "m"),
    );
    if (match?.index !== undefined) {
      const insertionPoint = match.index + match[0].length;
      return `${clean.slice(0, insertionPoint).trimEnd()}\n\n${block}\n\n${clean
        .slice(insertionPoint)
        .trimStart()}`.trim();
    }
  }

  const sources = clean.match(/^##\s+(來源|Sources)\s*$/im);
  const insertionPoint = sources?.index ?? clean.length;
  return `${clean.slice(0, insertionPoint).trimEnd()}\n\n${block}\n\n${clean
    .slice(insertionPoint)
    .trimStart()}`.trim();
}

function cachePath(articleId, filename) {
  const safeArticleId = String(articleId || "").replace(/[^a-zA-Z0-9-]/g, "");
  if (!safeArticleId) throw new AppError("缺少文章 ID。", 422);
  const safeFilename = path.basename(filename);
  if (safeFilename !== filename || !/^[a-z0-9][a-z0-9-]*\.webp$/.test(safeFilename)) {
    throw new AppError("圖片檔名格式不正確。", 422);
  }
  return path.join(
    /* turbopackIgnore: true */ process.cwd(),
    ".data",
    "visual-assets",
    safeArticleId,
    safeFilename,
  );
}

export function cacheVisualAsset(articleId, filename, bytes) {
  const filePath = cachePath(articleId, filename);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, bytes, { mode: 0o600 });
  return filePath;
}

export async function readVisualAsset(article, filename) {
  const filePath = cachePath(article.id, filename);
  if (fs.existsSync(filePath)) return fs.readFileSync(filePath);

  const asset = (article.visualAssets || []).find((item) => item.name === filename);
  if (!asset?.url) {
    throw new AppError(`找不到圖片資產：${filename}`, 409);
  }
  const response = await fetch(asset.url, { cache: "no-store" });
  if (!response.ok) {
    throw new AppError(`無法從 Notion 下載圖片：${filename}`, 502);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  cacheVisualAsset(article.id, filename, bytes);
  return bytes;
}

export async function materializeArticleVisuals(workspace, article) {
  const ready = (article.visualManifest?.visuals || []).filter(
    (visual) => visual.status === "ready" && visual.filename,
  );
  const written = [];
  for (const visual of ready) {
    const filename = visualFilename(visual.id);
    if (filename !== visual.filename) {
      throw new AppError(`圖片清單中的檔名不一致：${visual.filename}`, 409);
    }
    const bytes = await readVisualAsset(article, filename);
    const target = path.join(
      /* turbopackIgnore: true */ workspace,
      "public",
      "media",
      "articles",
      safePart(article.slug, "Slug"),
      filename,
    );
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, bytes);
    written.push(target);
  }
  return written;
}
