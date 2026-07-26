"use client";

import Link from "next/link";
import ReadingProgress from "./ReadingProgress";
import ArticleToc from "./ArticleToc";
import MarkdownRenderer from "./MarkdownRenderer";

const i18n = {
  zh: { back: "回到文章列表", backPrefix: "/articles" },
  en: { back: "Back to articles", backPrefix: "/en/articles" },
};

export default function ArticleDetailPage({ meta, html, toc, locale = "zh" }) {
  const t = i18n[locale] || i18n.zh;

  return (
    <main className="jre-about-page">
      <ReadingProgress />

      <section className="jre-article-hero">
        <Link href={t.backPrefix} className="jre-article-hero__back jre-reveal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t.back}
        </Link>

        <div className="jre-article-hero__meta jre-reveal">
          <span>{meta.date}</span>
          {meta.readingTime && <span>{meta.readingTime}</span>}
        </div>

        <h1 className="jre-reveal">{meta.title}</h1>

        {meta.tags && meta.tags.length > 0 && (
          <div className="jre-article-hero__tags jre-reveal">
            {meta.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        {meta.summary && <p className="jre-article-hero__summary jre-reveal">{meta.summary}</p>}
      </section>

      <section className="jre-article-content">
        <div className="jre-article-layout jre-reveal">
          <ArticleToc toc={toc} locale={locale} />
          <article className="leading-relaxed">
            <MarkdownRenderer html={html} />
          </article>
        </div>

        <div className="jre-article-back">
          <Link href={t.backPrefix}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t.back}
          </Link>
        </div>
      </section>
    </main>
  );
}
