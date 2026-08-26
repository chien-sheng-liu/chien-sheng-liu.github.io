export const SITE_URL = "https://morris-liu.com";
export const PERSON_ID = `${SITE_URL}/#morris-liu`;

const localeConfig = {
  zh: {
    htmlLang: "zh-TW",
    hreflang: "zh-Hant",
    ogLocale: "zh_TW",
    title: "Morris Liu｜Data & AI Consultant · BI & Analytics Lead",
    description: "Morris Liu 的 Data & AI 作品集，呈現跨市場 BI、資料分析、AI 產品、資料工程與顧問交付經驗。",
  },
  en: {
    htmlLang: "en",
    hreflang: "en",
    ogLocale: "en_HK",
    title: "Morris Liu | Data & AI Consultant · BI & Analytics Lead",
    description: "The portfolio of Morris Liu, a Hong Kong-based Data & AI Consultant and BI & Analytics Lead working across markets, industries, and delivery teams.",
  },
};

export function getLocaleConfig(locale = "zh") {
  return localeConfig[locale] || localeConfig.zh;
}

export function localizedPath(locale, path = "/") {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? `/en${normalized}` || "/en" : normalized || "/";
}

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

function languageAlternates(path) {
  return {
    "zh-Hant": localizedPath("zh", path),
    en: localizedPath("en", path),
    "x-default": localizedPath("zh", path),
  };
}

export function buildSiteMetadata(locale = "zh") {
  const config = getLocaleConfig(locale);
  const path = localizedPath(locale, "/");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: config.title,
      template: "%s | Morris Liu",
    },
    description: config.description,
    applicationName: "Morris Liu Portfolio",
    authors: [{ name: "Morris Liu", url: SITE_URL }],
    creator: "Morris Liu",
    publisher: "Morris Liu",
    alternates: {
      canonical: path,
      languages: languageAlternates("/"),
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: path,
      siteName: "Morris Liu",
      locale: config.ogLocale,
      alternateLocale: locale === "en" ? ["zh_TW"] : ["en_HK"],
      type: "website",
      images: [{ url: "/profile.webp", width: 1600, height: 1200, alt: "Morris Liu" }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: ["/profile.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    },
  };
}

export function buildPageMetadata({
  locale = "zh",
  path,
  title,
  description,
  image = "/profile.webp",
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}) {
  const config = getLocaleConfig(locale);
  const canonical = localizedPath(locale, path);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Morris Liu",
      locale: config.ogLocale,
      alternateLocale: locale === "en" ? ["zh_TW"] : ["en_HK"],
      type,
      images: [{ url: image, width: 1536, height: 1024, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(tags?.length ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function websiteJsonLd(locale = "zh") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Morris Liu",
    alternateName: "Morris Liu Data & AI Portfolio",
    inLanguage: getLocaleConfig(locale).htmlLang,
    publisher: { "@id": PERSON_ID },
  };
}

export function personJsonLd(locale = "zh") {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Morris Liu",
    alternateName: "Chien-Sheng Liu",
    url: SITE_URL,
    image: absoluteUrl("/profile.webp"),
    jobTitle: "Data & AI Consultant · BI & Analytics Lead",
    description: locale === "en"
      ? "A Hong Kong-based Data & AI consultant and analytics lead connecting business problems, data systems, and AI products."
      : "位於香港的 Data & AI Consultant 與 BI & Analytics Lead，連結商業問題、資料系統與 AI 產品。",
    sameAs: [
      "https://www.linkedin.com/in/chienshengliu/",
      "https://github.com/chien-sheng-liu",
      "https://www.mentarix-data.com/zh-TW",
    ],
    knowsAbout: [
      "Business Intelligence",
      "Data Analytics",
      "Data Engineering",
      "Data Science",
      "Artificial Intelligence",
      "Large Language Models",
      "Data Strategy",
    ],
  };
}

export function profilePageJsonLd(locale = "zh") {
  const path = localizedPath(locale, "/about");
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(path)}#profile-page`,
    url: absoluteUrl(path),
    inLanguage: getLocaleConfig(locale).htmlLang,
    mainEntity: personJsonLd(locale),
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectJsonLd(project, locale = "zh") {
  const path = localizedPath(locale, `/projects/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(path)}#case-study`,
    url: absoluteUrl(path),
    name: project.title,
    headline: project.title,
    description: project.seoDescription || project.description,
    abstract: project.description,
    image: absoluteUrl(project.socialImage),
    inLanguage: getLocaleConfig(locale).htmlLang,
    creator: { "@id": PERSON_ID, "@type": "Person", name: "Morris Liu" },
    about: [project.industry, ...project.categories],
    keywords: project.technologies.join(", "),
  };
}

export function articleJsonLd(meta, slug, locale = "zh") {
  const path = localizedPath(locale, `/articles/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    headline: meta.title,
    description: meta.seoDescription || meta.summary,
    datePublished: meta.date || undefined,
    dateModified: meta.updated || meta.date || undefined,
    inLanguage: getLocaleConfig(locale).htmlLang,
    author: { "@id": PERSON_ID, "@type": "Person", name: "Morris Liu" },
    publisher: { "@id": PERSON_ID, "@type": "Person", name: "Morris Liu" },
    keywords: meta.keywords?.length ? meta.keywords.join(", ") : meta.tags?.join(", "),
  };
}
