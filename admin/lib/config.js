import fs from "node:fs";
import path from "node:path";

const dataDirectory = path.join(/* turbopackIgnore: true */ process.cwd(), ".data");
const configPath = path.join(dataDirectory, "config.json");

export function readLocalConfig() {
  let stored = {};
  try {
    stored = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {
    stored = {};
  }
  return {
    notionDatabaseId: process.env.NOTION_DATABASE_ID || stored.notionDatabaseId || "",
    articlesDataSourceId:
      process.env.NOTION_ARTICLES_DATA_SOURCE_ID || stored.articlesDataSourceId || "",
    localesDataSourceId:
      process.env.NOTION_LOCALES_DATA_SOURCE_ID || stored.localesDataSourceId || "",
    repository:
      process.env.GITHUB_REPOSITORY || "chien-sheng-liu/chien-sheng-liu.github.io",
    defaultBranch: process.env.GITHUB_DEFAULT_BRANCH || "main",
    siteUrl: process.env.SITE_URL || "https://morris-liu.com",
  };
}

export function writeLocalConfig(config) {
  fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, {
    mode: 0o600,
  });
}

export function publicConfig() {
  const local = readLocalConfig();
  return {
    ...local,
    model: process.env.OPENAI_MODEL || "gpt-5.6",
    imageModel: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
    connections: {
      openai: Boolean(process.env.OPENAI_API_KEY),
      notion: Boolean(process.env.NOTION_API_KEY),
      notionDataSources: Boolean(local.articlesDataSourceId && local.localesDataSourceId),
    },
  };
}
