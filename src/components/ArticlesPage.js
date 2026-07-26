"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroTypewriter from "./HeroTypewriter";

const heroImages = [
  "/media/selected-work/foodtech-editorial.webp",
  "/media/selected-work/o2o-editorial.webp",
  "/media/selected-work/gaming-editorial.webp",
];

const content = {
  zh: {
    label: "NOTES / 00",
    role: "思考筆記",
    location: "訂閱 ↗",
    title: ["思考", "筆記"],
    heroLines: ["記下方法，也記下判斷", "談資料、AI 與職涯", "短一點，實用一點"],
    marquee: "AI · DATA CAREER · CONSULTING · GERMANY / HK · ",
    gridEn: "Latest Notes",
    gridZh: "最新筆記",
    all: "全部",
    readMore: "閱讀全文",
    ctaKicker: "SAY HELLO",
    ctaTitle: "想聊聊某篇筆記，或分享你的觀點？",
    ctaButton: "聯絡我",
  },
  en: {
    label: "NOTES / 00",
    role: "Thinking / Notes",
    location: "Subscribe ↗",
    title: ["Notes", "&Ideas"],
    heroLines: ["Notes on methods and judgment", "Data, AI, and career lessons", "Short, practical, useful"],
    marquee: "AI · DATA CAREER · CONSULTING · GERMANY / HK · ",
    gridEn: "Latest Notes",
    gridZh: "Latest writing",
    all: "All",
    readMore: "Read more",
    ctaKicker: "SAY HELLO",
    ctaTitle: "Want to talk through a note, or share your take?",
    ctaButton: "Contact me",
  },
};

export default function ArticlesPage({ posts, locale = "zh" }) {
  const t = content[locale] || content.zh;
  const prefix = locale === "en" ? "/en" : "";
  const linkPrefix = locale === "zh" ? "/articles" : `/${locale}/articles`;
  const [activeFilter, setActiveFilter] = useState(null);

  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.category).filter(Boolean))],
    [posts],
  );

  const filteredPosts = useMemo(
    () => (activeFilter ? posts.filter((p) => p.category === activeFilter) : posts),
    [posts, activeFilter],
  );

  return (
    <main className="jre-about-page">
      <section className="jre-about-hero">
        <div className="jre-about-hero__meta jre-reveal">
          <span>{t.label}</span>
          <span>{t.role}</span>
          <span>{t.location}</span>
        </div>

        <div className="jre-about-hero__title jre-reveal">
          <h1>
            <span>{t.title[0]}</span>
            <span>{t.title[1]}</span>
          </h1>
          <HeroTypewriter texts={categories.length > 0 ? categories.slice(0, 4) : t.heroLines} />
          <div className="jre-about-hero__visuals" aria-hidden="true">
            <figure className="jre-about-hero__visual jre-about-hero__visual--main">
              <Image
                src={heroImages[0]}
                alt=""
                fill
                priority
                sizes="(min-width: 900px) 34vw, 82vw"
              />
            </figure>
            <figure className="jre-about-hero__visual jre-about-hero__visual--finance">
              <Image
                src={heroImages[1]}
                alt=""
                fill
                sizes="(min-width: 900px) 16vw, 42vw"
              />
            </figure>
            <figure className="jre-about-hero__visual jre-about-hero__visual--maritime">
              <Image
                src={heroImages[2]}
                alt=""
                fill
                sizes="(min-width: 900px) 15vw, 38vw"
              />
            </figure>
          </div>
          <i className="jre-about-hero__shape jre-about-hero__shape--circle" />
          <i className="jre-about-hero__shape jre-about-hero__shape--pill" />
        </div>

      </section>

      <div className="jre-about-marquee" aria-hidden="true">
        <div>
          <span>{t.marquee}</span>
          <span>{t.marquee}</span>
        </div>
      </div>

      <section className="jre-about-craft">
        <header className={`jre-section-title jre-reveal ${locale === "zh" ? "jre-section-title--zh" : ""}`}>
          <h2>{t.gridEn}</h2>
          <p>{t.gridZh}</p>
        </header>

        <div className="jre-filter-pills jre-reveal">
          <button
            type="button"
            className={activeFilter === null ? "is-active" : ""}
            onClick={() => setActiveFilter(null)}
          >
            {t.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={activeFilter === cat ? "is-active" : ""}
              onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="jre-about-craft__grid">
          {filteredPosts.map((post, index) => (
            <Link
              className="jre-reveal jre-craft-card jre-clickable-card"
              key={post.slug}
              href={`${linkPrefix}/${post.slug}`}
            >
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{post.category}</small>
              </div>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <ul>
                {post.tags.slice(0, 4).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <i className="jre-article-card__meta">{post.date} · {post.readingTime}</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="jre-about-cta">
        <p className="jre-reveal">{t.ctaKicker}</p>
        <h2 className="jre-reveal">{t.ctaTitle}</h2>
        <Link className="jre-pill-button jre-pill-button--blue jre-reveal" href={`${prefix}/contact`}>
          {t.ctaButton}<span>↗</span>
        </Link>
      </section>
    </main>
  );
}
