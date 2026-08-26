import assert from "node:assert/strict";
import test from "node:test";

import { slugifyArticleTitle, suggestArticleSlug } from "../lib/slug.js";

test("creates a publishable slug from an English article title", () => {
  assert.equal(
    slugifyArticleTitle("Driver-Claimed Orders & Dispatching: A Practical Guide"),
    "driver-claimed-orders-and-dispatching-a-practical-guide",
  );
});

test("prefers the English title and limits slug length", () => {
  const slug = suggestArticleSlug({
    name: "中文標題",
    locales: {
      en: {
        title:
          "What Is the Difference Between Driver-Claimed Orders and Dispatching in Logistics? Evaluating Nighttime Orders",
      },
    },
  });
  assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(slug.length <= 90);
  assert.ok(slug.startsWith("what-is-the-difference"));
  assert.doesNotMatch(slug, /-logistic$/);
});
