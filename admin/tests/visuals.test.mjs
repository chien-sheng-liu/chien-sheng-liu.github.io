import assert from "node:assert/strict";
import test from "node:test";

import {
  insertArticleVisual,
  removeVisualAgentBlocks,
  visualFilename,
  visualId,
} from "../lib/visuals.js";

const article = [
  "導言。",
  "",
  "## 先理解系統",
  "",
  "這裡是第一段。",
  "",
  "## 來源",
  "",
  "1. [Source](https://example.com)",
].join("\n");

function fixture(id, heading = "先理解系統") {
  return {
    id,
    afterHeadingZh: heading,
    afterHeadingEn: "Understand the system",
    altZh: "系統關係圖",
    altEn: "System relationship visual",
    captionZh: "這張圖說明各角色之間的關係。",
    captionEn: "This visual explains the relationship between the actors.",
  };
}

test("normalizes visual IDs and filenames", () => {
  assert.equal(visualId("  System / Flow  "), "system-flow");
  assert.equal(visualFilename("system-flow"), "system-flow.webp");
});

test("inserts a visual after the requested heading", () => {
  const output = insertArticleVisual(
    article,
    fixture("system-flow"),
    "zh",
    "/media/articles/example/system-flow.webp",
  );
  assert.match(
    output,
    /## 先理解系統\n\n<!-- visual-agent:system-flow:start -->/,
  );
  assert.match(output, /!\[系統關係圖\]\(\/media\/articles\/example\/system-flow\.webp\)/);
});

test("adding a second visual preserves the first and re-running one replaces only itself", () => {
  const first = insertArticleVisual(
    article,
    fixture("system-flow"),
    "zh",
    "/media/articles/example/system-flow.webp",
  );
  const second = insertArticleVisual(
    first,
    fixture("role-comparison", "不存在的標題"),
    "zh",
    "/media/articles/example/role-comparison.webp",
  );
  assert.equal((second.match(/visual-agent:system-flow:start/g) || []).length, 1);
  assert.equal((second.match(/visual-agent:role-comparison:start/g) || []).length, 1);

  const replaced = insertArticleVisual(
    second,
    { ...fixture("system-flow"), captionZh: "更新後說明。" },
    "zh",
    "/media/articles/example/system-flow.webp",
  );
  assert.equal((replaced.match(/visual-agent:system-flow:start/g) || []).length, 1);
  assert.match(replaced, /更新後說明。/);
  assert.match(replaced, /visual-agent:role-comparison:start/);
});

test("can remove every generated visual block without touching article text", () => {
  const output = insertArticleVisual(
    article,
    fixture("system-flow"),
    "zh",
    "/media/articles/example/system-flow.webp",
  );
  const clean = removeVisualAgentBlocks(output);
  assert.doesNotMatch(clean, /visual-agent/);
  assert.match(clean, /這裡是第一段。/);
  assert.match(clean, /## 來源/);
});
