import assert from "node:assert/strict";
import test from "node:test";

import { parseNotionDatabaseId } from "../lib/notion.js";

test("parses a copied Notion database URL without confusing the view ID", () => {
  const id = parseNotionDatabaseId(
    "https://www.notion.so/3aa99551057080d994a4d138f47dd3e0?v=3aa99551057080ae9ef5000c5ce31528&source=copy_link",
  );
  assert.equal(id, "3aa99551-0570-80d9-94a4-d138f47dd3e0");
});

test("parses dashed and compact database IDs", () => {
  assert.equal(
    parseNotionDatabaseId("3aa99551-0570-80d9-94a4-d138f47dd3e0"),
    "3aa99551-0570-80d9-94a4-d138f47dd3e0",
  );
  assert.equal(
    parseNotionDatabaseId("3aa99551057080d994a4d138f47dd3e0"),
    "3aa99551-0570-80d9-94a4-d138f47dd3e0",
  );
});

test("rejects non-Notion URLs", () => {
  assert.throws(
    () => parseNotionDatabaseId("https://example.com/3aa99551057080d994a4d138f47dd3e0"),
    /notion\.so/,
  );
});
