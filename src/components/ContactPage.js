"use client";

import Image from "next/image";
import {
  FaEnvelope,
  FaLinkedin,
  FaCalendarAlt,
  FaBriefcase,
  FaMicrophone,
  FaHandshake,
} from "react-icons/fa";
import HeroTypewriter from "./HeroTypewriter";

const TO_EMAIL = "liu_chiensheng@outlook.com";
const CALENDAR_URL = "https://calendar.app.google/MANJXP2ZZiaWF5T26";
const LINKEDIN_URL = "https://www.linkedin.com/in/chienshengliu/";

const heroImages = [
  "/media/selected-work/foodtech-editorial.webp",
  "/media/selected-work/martech-editorial.webp",
  "/media/selected-work/adtech-editorial.webp",
];

const i18n = {
  zh: {
    label: "聯絡 / 00",
    role: "職涯／合作",
    heroTitle: ["很高興", "認識你"],
    heroLines: ["聊職涯、合作與分享", "把問題直接告訴我", "通常 24 小時內回覆"],
    location: "香港",
    languages: "三文五語 · 中文 · 英文 · 德文 · 粵語 · 台語",
    fitNote: "職涯與團隊交流優先；演講、教學與具體的資料或人工智慧合作邀請也歡迎來信。",
    intentsEn: "聯絡方式",
    intentsZh: "合作方向",
    formatTitle: "快速合作格式",
    formats: [
      { title: "職涯機會", desc: "請附角色、地點、團隊背景，以及希望我協助解決的資料與人工智慧問題。" },
      { title: "演講教學", desc: "請附主題、參與對象、日期、形式，以及期待帶走的重點。" },
      { title: "專案合作", desc: "請附業務背景、資料或人工智慧問題、期待成果與時間線。" },
    ],
    responseNote: "通常 24 小時內回覆",
    ctaKicker: "歡迎來信",
    ctaTitle: "一起聊聊吧。",
    channels: { email: "寫信", linkedin: "LinkedIn", calendar: "預約時間" },
    intents: [
      {
        key: "career",
        icon: <FaBriefcase />,
        title: "職涯與招募",
        subtitle: "職涯、招募、顧問角色",
        desc: "適合討論資料與人工智慧、BI、顧問服務及跨市場分析相關機會。",
        links: [
          { label: "電子郵件", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
          { label: "LinkedIn", href: LINKEDIN_URL, icon: <FaLinkedin />, external: true },
        ],
      },
      {
        key: "speaking",
        icon: <FaMicrophone />,
        title: "演講與教學",
        subtitle: "演講、課程、工作坊",
        desc: "適合邀請 LLM、RAG、資料分析、人工智慧顧問職涯與海外經驗分享。",
        links: [
          { label: "預約時間", href: CALENDAR_URL, icon: <FaCalendarAlt />, external: true },
          { label: "電子郵件", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
        ],
      },
      {
        key: "collaboration",
        icon: <FaHandshake />,
        title: "資料與人工智慧合作",
        subtitle: "分析路徑、資料產品、生成式 AI",
        desc: "適合把模糊業務問題拆成可交付的資料、模型或人工智慧產品方向。",
        links: [
          { label: "30 分鐘對談", href: CALENDAR_URL, icon: <FaCalendarAlt />, external: true },
          { label: "電子郵件", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
        ],
      },
    ],
  },
  en: {
    label: "CONTACT / 00",
    role: "Career / Contact",
    heroTitle: ["Good to", "meet you"],
    heroLines: ["Career · work · talks", "Tell me what you need", "Replies within 24 hours"],
    location: "Hong Kong",
    languages: "3 written · 5 spoken · Chinese · English · Deutsch · Cantonese · Taiwanese",
    fitNote: "Career and team conversations come first; thoughtful speaking, teaching, and Data / AI invitations are welcome too.",
    intentsEn: "Ways to Reach Me",
    intentsZh: "How I can help",
    formatTitle: "Quick Collaboration Format",
    formats: [
      { title: "Role", desc: "Share the role, location, team context, and the Data & AI problem you want solved." },
      { title: "Speaking", desc: "Share the topic, audience, date, format, and what people should take away." },
      { title: "Collaboration", desc: "Share the business context, data or AI problem, target outcome, and timeline." },
    ],
    responseNote: "Usually reply within 24 hours",
    ctaKicker: "SAY HELLO",
    ctaTitle: "Say hello your way.",
    channels: { email: "Email", linkedin: "LinkedIn", calendar: "Book time" },
    intents: [
      {
        key: "career",
        icon: <FaBriefcase />,
        title: "Career / Hiring",
        subtitle: "Roles, hiring, advisory track",
        desc: "Best for Data & AI, BI, advisory, and cross-market analytics opportunities.",
        links: [
          { label: "Email", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
          { label: "LinkedIn", href: LINKEDIN_URL, icon: <FaLinkedin />, external: true },
        ],
      },
      {
        key: "speaking",
        icon: <FaMicrophone />,
        title: "Speaking / Teaching",
        subtitle: "Talks, lectures, workshops",
        desc: "Best for LLM, RAG, analytics, AI consulting career, and international experience sessions.",
        links: [
          { label: "Book time", href: CALENDAR_URL, icon: <FaCalendarAlt />, external: true },
          { label: "Email", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
        ],
      },
      {
        key: "collaboration",
        icon: <FaHandshake />,
        title: "Data & AI Collaboration",
        subtitle: "Analytics paths, data products, GenAI",
        desc: "Best for turning ambiguous business problems into deliverable data, model, or AI product directions.",
        links: [
          { label: "30-min chat", href: CALENDAR_URL, icon: <FaCalendarAlt />, external: true },
          { label: "Email", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
        ],
      },
    ],
  },
};

const directChannels = [
  { key: "email", href: `mailto:${TO_EMAIL}` },
  { key: "linkedin", href: LINKEDIN_URL, external: true },
  { key: "calendar", href: CALENDAR_URL, external: true },
];

export default function ContactPage({ locale = "zh" }) {
  const t = i18n[locale] || i18n.zh;

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
            <span>{t.heroTitle[0]}</span>
            <span>{t.heroTitle[1]}</span>
          </h1>
          <HeroTypewriter texts={t.heroLines} />
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

      <section className="jre-about-craft">
        <header className={`jre-section-title jre-reveal ${locale === "zh" ? "jre-section-title--zh" : ""}`}>
          <h2>{t.intentsEn}</h2>
          <p>{t.intentsZh}</p>
        </header>
        <p className="jre-about-journey__lead jre-reveal">{t.fitNote}</p>

        <div className="jre-about-craft__grid">
          {t.intents.map((intent) => (
            <article className="jre-reveal jre-craft-card" key={intent.key}>
              <div>
                <span>{intent.icon}</span>
                <small>{intent.subtitle}</small>
              </div>
              <h3>{intent.title}</h3>
              <p>{intent.desc}</p>
              <ul className="jre-craft-card__links">
                {intent.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="jre-benefit">
        <p className="jre-benefit__eyebrow jre-reveal">{t.formatTitle}</p>
        <div className="jre-contact-format jre-reveal">
          {t.formats.map((format) => (
            <article key={format.title}>
              <span>{format.title}</span>
              <h3>{format.title}</h3>
              <p>{format.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jre-about-cta jre-contact-cta">
        <p className="jre-reveal">{t.ctaKicker}</p>
        <h2 className="jre-reveal">{t.ctaTitle}</h2>
        <div className="jre-about-cta__actions jre-reveal">
          {directChannels.map((ch) => (
            <a
              key={ch.key}
              className="jre-pill-button"
              href={ch.href}
              target={ch.external ? "_blank" : undefined}
              rel={ch.external ? "noopener noreferrer" : undefined}
            >
              {t.channels[ch.key]}<span>↗</span>
            </a>
          ))}
        </div>
        <div className="jre-about-cta__status jre-reveal">
          <i />
          {t.responseNote}
        </div>
      </section>
    </main>
  );
}
