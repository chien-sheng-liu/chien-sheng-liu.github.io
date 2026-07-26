"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeProfileData } from "@/data/homeProfileData";
import HeroTypewriter from "./HeroTypewriter";

function TrainIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="3" width="16" height="12" rx="4" />
      <path d="M4 10h16" />
      <path d="M8 15l-2 4M16 15l2 4" />
      <circle cx="8" cy="18.4" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="16" cy="18.4" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

const copy = {
  zh: {
    label: "關於我 / 00",
    title: ["關於", "我"],
    role: "資料與人工智慧顧問",
    location: "香港 ↗ 亞洲",
    heroLines: [
      "WSP 資料與 AI 顧問",
      "台灣 · 德國 · 香港 · 中國",
      "三種書寫 · 五種口說",
      "教學 · 寫作 · 城市散步",
    ],
    facts: [
      ["目前", "WSP 資料與人工智慧顧問"],
      ["足跡", "台灣 · 德國 · 香港 · 中國大陸"],
      ["語言", "三文五語"],
      ["工作之外", "教學 · 寫作 · 城市散步"],
    ],
    marquee: "資料 · 人工智慧 · 人群 · 城市 · 學習 · ",
    storyEn: "我的故事",
    storyZh: "一條不是直線的路",
    storyLead: "從工程、研究、分析到顧問，每一站都留下了一種看事情的方法。",
    storyBody: [
      "我不是從一開始就知道自己要成為什麼。軟體工程讓我學會把事情做對，資料分析讓我開始問「為什麼」，而在德國生活與研究的幾年，則讓我習慣從不同文化和市場重新理解同一個問題。",
      "回到亞洲後，我帶過資料與人工智慧團隊、做過模型與平台，也走進客戶的會議室。現在最在意的，是讓策略、資料與人的日常工作真正接得起來。",
    ],
    numbers: [
      ["04", "生活與工作過的市場"],
      ["25+", "端到端資料與人工智慧專案"],
      ["100+", "課堂與工作坊學員"],
    ],
    journeyEn: "經歷",
    journeyZh: "工作旅程",
    journeyLead: "不是職稱清單，而是我一路累積的視角與手感。",
    workLabel: "工作內容",
    stopLabel: "站點",
    craftEn: "我在做的事",
    craftZh: "我喜歡做的事",
    tracks: [
      {
        number: "01",
        label: "傾聽",
        title: "先把問題聽懂",
        body: "從使用者、利害關係人與商業現場出發，把模糊期待整理成值得解的問題。",
        tags: ["需求探索", "策略", "指標定義"],
      },
      {
        number: "02",
        label: "實作",
        title: "動手把它做出來",
        body: "從資料管線、分析到 LLM 工作流，不只提方向，也在意產品最後是否真的能用。",
        tags: ["資料平台", "資料分析", "LLM／RAG"],
      },
      {
        number: "03",
        label: "分享",
        title: "把知識分享出去",
        body: "透過課程、演講與寫作，把難懂的技術轉成更多人可以帶走的方法。",
        tags: ["教學", "演講", "寫作"],
      },
    ],
    educationEn: "學歷",
    educationZh: "學習的地方",
    notesEn: "文章與分享",
    notesZh: "最近分享過的題目",
    languageTitle: "我使用的語言",
    ctaKicker: "來聊聊",
    ctaTitle: "想聊資料、人工智慧，或只是交換一段異地生活？",
    ctaButton: "寫信給我",
    present: "現在",
    close: "關閉",
  },
  en: {
    label: "ABOUT / 00",
    title: ["About", "Morris Liu"],
    role: "Data & AI Consultant",
    location: "Hong Kong ↗ Asia",
    heroLines: [
      "WSP Data & AI",
      "TW · DE · HK · CN",
      "3 written · 5 spoken",
      "Teaching · writing · walks",
    ],
    facts: [
      ["NOW", "WSP Data & AI Advisory"],
      ["PLACES", "Taiwan · Germany · Hong Kong · Mainland China"],
      ["LANGUAGE", "3 written · 5 spoken"],
      ["OFF WORK", "Teaching · writing · long city walks"],
    ],
    marquee: "DATA · AI · PEOPLE · CITIES · LEARNING · ",
    storyEn: "My Story",
    storyZh: "A path that was never linear",
    storyLead: "From engineering and research to analytics and advisory, every stop changed how I see a problem.",
    storyBody: [
      "I did not begin with a fixed answer for what I wanted to become. Software engineering taught me to build things right; analytics taught me to ask why. Living and studying in Germany taught me to see the same question again through another culture and market.",
      "Back in Asia, I have led data and AI teams, built models and platforms, and sat with clients in the meeting room. What matters most to me now is making strategy, data, and everyday work genuinely connect.",
    ],
    numbers: [
      ["04", "markets lived and worked in"],
      ["25+", "end-to-end data and AI projects"],
      ["100+", "learners across classes and workshops"],
    ],
    journeyEn: "Experience",
    journeyZh: "A working journey",
    journeyLead: "Less a list of titles, more the perspectives and instincts I picked up along the way.",
    workLabel: "WHAT I DID",
    stopLabel: "STOP",
    craftEn: "What I Do",
    craftZh: "The work I enjoy",
    tracks: [
      {
        number: "01",
        label: "LISTEN",
        title: "Understand before solving",
        body: "Start with users, stakeholders, and the real business context, then turn ambiguity into a question worth solving.",
        tags: ["Discovery", "Strategy", "KPI framing"],
      },
      {
        number: "02",
        label: "BUILD",
        title: "Make the idea tangible",
        body: "From data pipelines and analytics to LLM workflows, I care about whether the final product actually gets used.",
        tags: ["Data platform", "Analytics", "LLM / RAG"],
      },
      {
        number: "03",
        label: "SHARE",
        title: "Pass the knowledge on",
        body: "Through classes, talks, and writing, I translate difficult technology into methods other people can carry forward.",
        tags: ["Teaching", "Speaking", "Writing"],
      },
    ],
    educationEn: "Education",
    educationZh: "Places that shaped me",
    notesEn: "Notes & Talks",
    notesZh: "Things I have shared lately",
    languageTitle: "Languages I live with",
    ctaKicker: "SAY HELLO",
    ctaTitle: "Want to talk data, AI, or exchange a story about living abroad?",
    ctaButton: "Write to me",
    present: "Present",
    close: "Close",
  },
};

export default function AboutPage({ locale = "zh" }) {
  const [openExperience, setOpenExperience] = useState(null);
  const profile = homeProfileData[locale];
  const t = copy[locale];
  const prefix = locale === "en" ? "/en" : "";
  const openItem = openExperience === null ? null : profile.experience[openExperience];

  useEffect(() => {
    if (openExperience === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenExperience(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [openExperience]);

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
          <HeroTypewriter texts={t.heroLines} />
          <div className="jre-about-hero__visuals" aria-hidden="true">
            <figure className="jre-about-hero__visual jre-about-hero__visual--main">
              <Image
                src="/media/selected-work/autollm-editorial.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 900px) 34vw, 82vw"
              />
            </figure>
            <figure className="jre-about-hero__visual jre-about-hero__visual--finance">
              <Image
                src="/media/selected-work/financial-agents-editorial.webp"
                alt=""
                fill
                sizes="(min-width: 900px) 16vw, 42vw"
              />
            </figure>
            <figure className="jre-about-hero__visual jre-about-hero__visual--maritime">
              <Image
                src="/media/selected-work/maritime-editorial.webp"
                alt=""
                fill
                sizes="(min-width: 900px) 15vw, 38vw"
              />
            </figure>
            <i className="jre-about-hero__shape jre-about-hero__shape--circle" />
            <i className="jre-about-hero__shape jre-about-hero__shape--pill" />
          </div>
        </div>

      </section>

      <div className="jre-about-marquee" aria-hidden="true">
        <div>
          <span>{t.marquee}</span>
          <span>{t.marquee}</span>
        </div>
      </div>

      <section className="jre-about-story">
        <header className={`jre-section-title jre-reveal ${locale === "zh" ? "jre-section-title--zh" : ""}`}>
          <h2>{t.storyEn}</h2>
          <p>{t.storyZh}</p>
        </header>
        <div className="jre-about-story__grid">
          <p className="jre-about-story__lead jre-reveal">{t.storyLead}</p>
          <div className="jre-about-story__body jre-reveal">
            {t.storyBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <div className="jre-about-numbers">
          {t.numbers.map(([value, label]) => (
            <div className="jre-reveal" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="jre-about-journey">
        <header className={`jre-section-title jre-reveal ${locale === "zh" ? "jre-section-title--zh" : ""}`}>
          <h2>{t.journeyEn}</h2>
          <p>{t.journeyZh}</p>
        </header>
        <p className="jre-about-journey__lead jre-reveal">{t.journeyLead}</p>
        <div className="jre-about-timeline">
          <svg
            className="jre-about-timeline__line jre-about-timeline__line--desktop"
            viewBox="0 0 1000 760"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="jre-about-timeline__sleepers"
              d="M167 30 H910 Q965 30 965 85 V315 Q965 375 905 375 H95 Q35 375 35 435 V660 Q35 720 95 720 H833"
            />
            <path
              className="jre-about-timeline__route"
              d="M167 30 H910 Q965 30 965 85 V315 Q965 375 905 375 H95 Q35 375 35 435 V660 Q35 720 95 720 H833"
            />
            <path
              className="jre-about-timeline__rail-gap"
              d="M167 30 H910 Q965 30 965 85 V315 Q965 375 905 375 H95 Q35 375 35 435 V660 Q35 720 95 720 H833"
            />
            <path
              className="jre-about-timeline__progress"
              d="M167 30 H910 Q965 30 965 85 V315 Q965 375 905 375 H95 Q35 375 35 435 V660 Q35 720 95 720 H833"
            />
          </svg>
          <svg
            className="jre-about-timeline__line jre-about-timeline__line--mobile"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="jre-about-timeline__sleepers" d="M50 0 C18 70 82 135 50 210 C18 285 82 350 50 430 C18 510 82 575 50 650 C18 730 82 800 50 870 C24 925 64 965 50 1000" />
            <path className="jre-about-timeline__route" d="M50 0 C18 70 82 135 50 210 C18 285 82 350 50 430 C18 510 82 575 50 650 C18 730 82 800 50 870 C24 925 64 965 50 1000" />
            <path className="jre-about-timeline__rail-gap" d="M50 0 C18 70 82 135 50 210 C18 285 82 350 50 430 C18 510 82 575 50 650 C18 730 82 800 50 870 C24 925 64 965 50 1000" />
            <path className="jre-about-timeline__progress" d="M50 0 C18 70 82 135 50 210 C18 285 82 350 50 430 C18 510 82 575 50 650 C18 730 82 800 50 870 C24 925 64 965 50 1000" />
          </svg>
          <div className="jre-about-timeline__train" aria-hidden="true">
            <TrainIcon />
          </div>
          {profile.experience.map((item, index) => (
            <article
              className={`jre-about-job jre-career-stop ${index === 0 ? "is-current" : ""}`}
              key={`${item.company}-${item.date}`}
            >
              <div className="jre-about-job__station" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="jre-about-job__card">
                <header>
                  <div className="jre-about-job__mark">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={`${item.company} logo`}
                        fill
                        sizes="92px"
                        className={item.logoClass || ""}
                      />
                    ) : (
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    )}
                  </div>
                  <div className="jre-about-job__meta">
                    <span>{t.stopLabel} {String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.date.slice(0, 4)}</strong>
                    <p>{item.date}</p>
                    <small>{item.place}</small>
                  </div>
                </header>
                <div className="jre-about-job__title">
                  <strong>{item.company}</strong>
                  <h3>{item.title}</h3>
                </div>
                <button
                  type="button"
                  className="jre-about-job__details"
                  aria-haspopup="dialog"
                  aria-expanded={openExperience === index}
                  onClick={() => setOpenExperience(index)}
                >
                    {t.workLabel}
                    <span aria-hidden="true">＋</span>
                </button>
              </div>
            </article>
          ))}
          {openItem && (
            <div
              className="jre-about-job-modal"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setOpenExperience(null);
              }}
            >
              <article
                className="jre-about-job-modal__card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="jre-job-modal-title"
              >
                <button
                  type="button"
                  className="jre-about-job-modal__close"
                  onClick={() => setOpenExperience(null)}
                  aria-label={t.close}
                >
                  <span aria-hidden="true">×</span>
                </button>
                <header>
                  <div>
                    <span>{openItem.date}</span>
                    <small>{openItem.place}</small>
                  </div>
                  <p>{t.workLabel}</p>
                </header>
                <strong>{openItem.company}</strong>
                <h3 id="jre-job-modal-title">{openItem.title}</h3>
                {openItem.bullets?.length ? (
                  <ul className="jre-about-job-modal__bullets">
                    {openItem.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : (
                  <p className="jre-about-job-modal__summary">{openItem.summary}</p>
                )}
                <ul className="jre-about-job-modal__tags">
                  {openItem.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            </div>
          )}
        </div>
      </section>

      <section className="jre-about-craft">
        <header className={`jre-section-title jre-reveal ${locale === "zh" ? "jre-section-title--zh" : ""}`}>
          <h2>{t.craftEn}</h2>
          <p>{t.craftZh}</p>
        </header>
        <div className="jre-about-craft__grid">
          {t.tracks.map((track) => (
            <article className="jre-reveal jre-craft-card" key={track.number}>
              <div><span>{track.number}</span><small>{track.label}</small></div>
              <h3>{track.title}</h3>
              <p>{track.body}</p>
              <ul>{track.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="jre-about-learning">
        <div>
          <header className={`jre-section-title jre-reveal ${locale === "zh" ? "jre-section-title--zh" : ""}`}>
            <h2>{t.educationEn}</h2>
            <p>{t.educationZh}</p>
          </header>
          <div className="jre-about-education">
            {profile.education.map((item, index) => (
              <article className="jre-reveal" key={item.school}>
                <span>0{index + 1}</span>
                <p>{item.date}</p>
                <h3>{item.degree}</h3>
                <strong>{item.school}</strong>
                <small>{item.place}</small>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <div className="jre-about-talks jre-reveal">
            <p>{t.notesEn}</p>
            <h2>{t.notesZh}</h2>
            {profile.talks.slice(0, 4).map(([date, title, place]) => (
              <article key={`${date}-${title}`}>
                <span>{date}</span>
                <h3>{title}</h3>
                <p>{place}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="jre-language-marquee" aria-label={t.languageTitle}>
        <p className="jre-reveal">{t.languageTitle}</p>
        <div>
          {[0, 1].map((group) => (
            <span aria-hidden={group === 1} key={group}>
              {profile.languages.map(([language, level]) => (
                <strong key={language}>{language}<small>{level}</small><i>·</i></strong>
              ))}
            </span>
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
