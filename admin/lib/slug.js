export function slugifyArticleTitle(value = "") {
  const slug = String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length <= 90) return slug;
  const boundary = slug.slice(0, 91).lastIndexOf("-");
  return slug.slice(0, boundary >= 56 ? boundary : 90).replace(/-+$/g, "");
}

export function suggestArticleSlug(article = {}) {
  return slugifyArticleTitle(
    article.locales?.en?.title || article.name || article.locales?.zh?.title || "",
  );
}
