"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { homeProfileData } from "@/data/homeProfileData";
import CtaSection from "@/components/sections/CtaSection";
import TypewriterText from "@/components/TypewriterText";

const MENTARIX_URL = "https://www.mentarix-data.com/zh-TW";

const projectMedia = [
  "/media/selected-work/autollm-editorial.webp",
  "/media/selected-work/financial-agents-editorial.webp",
  "/media/selected-work/maritime-editorial.webp",
];

const content = {
  zh: {
    season: "MORRIS LIU — PERSONAL PORTFOLIO",
    heroTop: "DATA / AI / PEOPLE",
    heroName: ["Morris", "Liu"],
    heroRole: "Data & AI Consultant",
    heroRoles: ["Data & AI Consultant", "跨市場分析工作者", "AI 產品實作者", "講師與分享者"],
    heroLocation: "Hong Kong · Taiwan · Germany",
    status: "目前在香港，持續把複雜的資料與 AI 問題，做成真正有人使用的決策工具。",
    scroll: "Scroll",
    resume: "查看完整經歷",
    indexTitle: "目次",
    index: [
      ["01", "關於我", "#about"],
      ["02", "工作經歷", "#experience"],
      ["03", "代表作品", "#work"],
      ["04", "聯絡方式", "#contact"],
    ],
    aboutEn: "About",
    aboutZh: "關於我",
    atGlance: "MORRIS AT A GLANCE",
    aboutQuick: [
      ["CURRENT", "WSP Data & AI Advisory"],
      ["FOUNDER", "Mentarix Data Studio"],
      ["FOCUS", "Data Strategy · BI · LLM / RAG"],
      ["PROOF", "帶過 8 人團隊 · 25+ 專案 · 15 個市場"],
    ],
    strengths: [
      {
        lead: "從人的問題開始，",
        strong: "不是從模型開始。",
        body: "我喜歡先把模糊的期待問清楚，再把策略、資料與產品接成一條可以被驗證的路徑。",
      },
      {
        lead: "跨過城市與職能，",
        strong: "把經驗帶回現場。",
        body: "從台灣、德國到香港，我做過研究、工程、分析、管理與顧問工作，也一直保留動手做的習慣。",
      },
    ],
    experienceEn: "Experience",
    experienceZh: "工作經歷",
    experienceLead: "幾段塑造我工作方式的經歷。",
    experienceLink: "完整時間軸",
    workEn: "Selected Work",
    workZh: "代表作品",
    workLead: "不是產品型錄，而是我真正解過的問題。",
    cases: [
      ["01", "AutoLLM Platform", "把分散的 LLM 能力整理成可管理、可觀測的產品系統。"],
      ["02", "Financial Multi-Agent", "讓研究流程保留來源、推理脈絡與安全邊界。"],
      ["03", "Maritime Risk Prediction", "從即時訊號辨識風險，提早把異常帶到決策者面前。"],
    ],
    workLink: "查看全部作品",
    profileLabel: "PROFILE",
    companyLabel: "COMPANY / ROLE",
    companyRows: [
      ["WSP", "Data & AI Consultant"],
      ["Mentarix Data Studio", "Founder"],
    ],
    ctaTitle: "如果你正在找一個能把資料、AI 與人串起來的人。",
    ctaBody: "職涯機會、團隊交流或單純想認識彼此，都歡迎來信。",
    ctaButton: "聯絡我",
  },
  en: {
    season: "MORRIS LIU — PERSONAL PORTFOLIO",
    heroTop: "DATA / AI / PEOPLE",
    heroName: ["Morris", "Liu"],
    heroRole: "Data & AI Consultant",
    heroRoles: ["Data & AI Consultant", "Cross-market analyst", "AI product builder", "Teacher and speaker"],
    heroLocation: "Hong Kong · Taiwan · Germany",
    status: "Based in Hong Kong, turning complex data and AI questions into decision tools that people actually use.",
    scroll: "Scroll",
    resume: "View full experience",
    indexTitle: "Index",
    index: [
      ["01", "About", "#about"],
      ["02", "Experience", "#experience"],
      ["03", "Selected work", "#work"],
      ["04", "Contact", "#contact"],
    ],
    aboutEn: "About",
    aboutZh: "A little about me",
    atGlance: "MORRIS AT A GLANCE",
    aboutQuick: [
      ["CURRENT", "WSP Data & AI Advisory"],
      ["FOUNDER", "Mentarix Data Studio"],
      ["FOCUS", "Data Strategy · BI · LLM / RAG"],
      ["PROOF", "Led 8 people · 25+ projects · 15 markets"],
    ],
    strengths: [
      {
        lead: "Start with the human question,",
        strong: "not with the model.",
        body: "I clarify the ambiguity first, then connect strategy, data, and product into a path that can be tested and used.",
      },
      {
        lead: "Move across cities and roles,",
        strong: "bring it back to the work.",
        body: "From Taiwan and Germany to Hong Kong, I have worked in research, engineering, analytics, management, and advisory—while staying hands-on.",
      },
    ],
    experienceEn: "Experience",
    experienceZh: "A working journey",
    experienceLead: "A few chapters that shaped how I work.",
    experienceLink: "Full timeline",
    workEn: "Selected Work",
    workZh: "Problems I have worked on",
    workLead: "Not a product catalogue—real problems I have helped solve.",
    cases: [
      ["01", "AutoLLM Platform", "Turning scattered LLM capabilities into a manageable and observable product system."],
      ["02", "Financial Multi-Agent", "Keeping sources, reasoning, and safety boundaries visible throughout research."],
      ["03", "Maritime Risk Prediction", "Reading live signals early enough to bring risk to decision-makers."],
    ],
    workLink: "View all work",
    profileLabel: "PROFILE",
    companyLabel: "COMPANY / ROLE",
    companyRows: [
      ["WSP", "Data & AI Consultant"],
      ["Mentarix Data Studio", "Founder"],
    ],
    ctaTitle: "Looking for someone who can connect data, AI, and people?",
    ctaBody: "For career opportunities, team conversations, or a simple hello—my inbox is open.",
    ctaButton: "Contact me",
  },
};

const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function EditorialHome({ locale = "zh" }) {
  const t = content[locale];
  const profile = homeProfileData[locale];
  const prefix = locale === "en" ? "/en" : "";
  const reduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.classList.add("jre-home-active");
    return () => document.body.classList.remove("jre-home-active");
  }, []);

  useEffect(() => {
    if (reduced || sessionStorage.getItem("morris-jre-intro-seen")) {
      setIntroDone(true);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("morris-jre-intro-seen", "1");
      setIntroDone(true);
    }, 1350);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <div className="jre-home">
      <AnimatePresence>
        {!introDone && (
          <motion.div
            className="jre-loader"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="jre-loader__ring"
              initial={{ rotate: -100, scale: 0.75, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <p><small>MORRIS LIU</small>Portfolio</p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="jre-home-hero">
        <p className="jre-home-hero__season">{t.season}</p>
        <div className="jre-home-hero__orbit" aria-hidden="true">
          <svg viewBox="0 0 600 600">
            <motion.circle
              cx="300"
              cy="300"
              r="270"
              pathLength="100"
              initial={reduced ? false : { rotate: -35, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: reduced ? 0 : 1.35, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>
        <motion.div
          className="jre-home-hero__portrait"
          initial={reduced ? false : { clipPath: "inset(0 0 100% 0)", y: 30 }}
          animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
          transition={{ duration: reduced ? 0 : 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/profile.png"
            alt="Morris Liu"
            fill
            priority
            sizes="(min-width: 900px) 38vw, 76vw"
          />
          <span>BASED IN HONG KONG</span>
        </motion.div>
        <i className="jre-home-hero__shape jre-home-hero__shape--lime" aria-hidden="true" />
        <i className="jre-home-hero__shape jre-home-hero__shape--paper" aria-hidden="true" />
        <i className="jre-home-hero__shape jre-home-hero__shape--dot" aria-hidden="true" />
        <motion.div
          className="jre-home-hero__title"
          initial="hidden"
          animate="visible"
        >
          <span>{t.heroTop}</span>
          <h1>
            {t.heroName.map((line, index) => (
              <span className="jre-home-hero__line" key={line}>
                <motion.i variants={reveal} custom={index + 1}>{line}</motion.i>
              </span>
            ))}
          </h1>
          <p className="jre-home-hero__type">
            <TypewriterText
              texts={t.heroRoles}
              speed={62}
              pause={1700}
              disabled={reduced}
            />
          </p>
          <small>{t.heroLocation}</small>
          <Link href={`${prefix}/about`} className="jre-hero-resume">
            {t.resume}<span aria-hidden="true">→</span>
          </Link>
        </motion.div>
        <motion.aside
          className="jre-home-hero__status"
          initial={reduced ? false : { y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.85, duration: 0.7 }}
        >
          <span>NOW / 2026</span>
          <p>{t.status}</p>
        </motion.aside>
        <a className="jre-home-hero__scroll" href="#about">
          <span>{t.scroll}</span><i aria-hidden="true">⌄</i>
        </a>
      </section>

      <section className="jre-benefit" id="about">
        <p className="jre-benefit__eyebrow jre-reveal">{t.atGlance}</p>
        <div className="jre-about-quick jre-reveal">
          {t.aboutQuick.map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
        <div className="jre-benefit__content">
          {t.strengths.map((item, index) => (
            <article className="jre-reveal" key={item.strong}>
              <span>0{index + 1}</span>
              <h3>{item.lead}<strong>{item.strong}</strong></h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="jre-profile-strip jre-reveal">
          <div className="jre-profile-strip__photo">
            <Image src="/profile.png" alt="Morris Liu" fill sizes="(min-width: 900px) 26vw, 86vw" />
          </div>
          <div className="jre-profile-strip__copy">
            <p>
              <span>{t.profileLabel}</span>
              {locale === "zh"
                ? "三文五語，走過台灣、德國、香港與中國大陸；我把 Data、BI 與 AI 做成真正能被團隊採用的工作流。"
                : "Across Taiwan, Germany, Hong Kong, and Mainland China, I turn data, BI, and AI into workflows teams actually adopt."}
            </p>
            <Link href={`${prefix}/about`}>{t.resume}<span>↗</span></Link>
          </div>
          <div className="jre-profile-strip__companies">
            <span>{t.companyLabel}</span>
            {t.companyRows.map(([company, role]) => (
              <div key={company}>
                {company.includes("Mentarix") ? (
                  <a href={MENTARIX_URL} target="_blank" rel="noopener noreferrer">
                    <strong>{company}</strong>
                  </a>
                ) : (
                  <strong>{company}</strong>
                )}
                <small>{role}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="jre-experience" id="experience">
        <header className="jre-section-title jre-reveal">
          <h2>{t.experienceEn}</h2><p>{t.experienceZh}</p>
        </header>
        <p className="jre-experience__lead jre-reveal">{t.experienceLead}</p>
        <div className="jre-experience__rail">
          {profile.experience.slice(0, 3).map((item, index) => (
            <article className="jre-experience-card jre-reveal" key={`${item.company}-${item.date}`}>
              <div className="jre-experience-card__media">
                <div className={`jre-experience-card__logo ${item.logoClass || ""}`}>
                  <Image
                    src={item.logo}
                    alt={`${item.company} logo`}
                    fill
                    sizes="(min-width: 900px) 18vw, 58vw"
                  />
                </div>
                <span>0{index + 1}</span>
              </div>
              <p>{item.date} / {item.place}</p>
              <h3>{item.title}</h3>
              <strong>{item.company}</strong>
              <small>{item.summary}</small>
            </article>
          ))}
        </div>
        <Link className="jre-pill-button jre-pill-button--blue" href={`${prefix}/about`}>
          {t.experienceLink}<span>→</span>
        </Link>
      </section>

      <section className="jre-work" id="work">
        <div className="jre-marquee" aria-hidden="true">
          <div className="jre-marquee__track">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index}>
                {t.workEn}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
        <header className="jre-section-title jre-section-title--light jre-reveal">
          <h2>{t.workEn}</h2><p>{t.workZh}</p>
        </header>
        <p className="jre-work__lead jre-reveal">{t.workLead}</p>
        <div className="jre-work__list">
          {t.cases.map(([number, title, description], index) => (
            <Link href={`${prefix}/projects`} className="jre-work-row jre-reveal" key={title}>
              <div className="jre-work-row__image">
                <Image
                  src={projectMedia[index]}
                  alt={`${title} editorial illustration`}
                  fill
                  sizes="(min-width: 900px) 28vw, 90vw"
                />
              </div>
              <div className="jre-work-row__copy">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <i aria-hidden="true">VIEW CASE ↗</i>
              </div>
            </Link>
          ))}
        </div>
        <Link className="jre-pill-button jre-pill-button--white" href={`${prefix}/projects`}>
          {t.workLink}<span>→</span>
        </Link>
      </section>

      <div id="contact">
        <CtaSection
          title={t.ctaTitle}
          description={t.ctaBody}
          buttonLabel={t.ctaButton}
          buttonHref={`${prefix}/contact`}
        />
      </div>
    </div>
  );
}
