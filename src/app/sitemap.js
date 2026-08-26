import { getProjectSlugs } from "@/data/projectData";
import { listArticles } from "@/lib/content";
import { SITE_URL, absoluteUrl, localizedPath } from "@/lib/seo";

export const dynamic = "force-static";

const corePaths = ["/", "/about", "/projects", "/articles", "/contact"];

function localizedEntries(path) {
  const zhPath = localizedPath("zh", path);
  const enPath = localizedPath("en", path);
  const alternates = {
    languages: {
      "zh-Hant": absoluteUrl(zhPath),
      en: absoluteUrl(enPath),
      "x-default": absoluteUrl(zhPath),
    },
  };

  return [
    { url: absoluteUrl(zhPath), alternates },
    { url: absoluteUrl(enPath), alternates },
  ];
}

export default async function sitemap() {
  const [zhArticles, enArticles] = await Promise.all([
    listArticles("zh"),
    listArticles("en"),
  ]);
  const articleSlugs = [...new Set([
    ...zhArticles.map((article) => article.slug),
    ...enArticles.map((article) => article.slug),
  ])];

  return [
    ...corePaths.flatMap(localizedEntries),
    ...getProjectSlugs().flatMap((slug) => localizedEntries(`/projects/${slug}`)),
    ...articleSlugs.flatMap((slug) => localizedEntries(`/articles/${slug}`)),
  ].map((entry) => ({
    ...entry,
    changeFrequency: "monthly",
    priority: entry.url === `${SITE_URL}/` || entry.url === `${SITE_URL}/en` ? 1 : 0.7,
  }));
}
