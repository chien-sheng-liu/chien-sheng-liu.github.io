"use client";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaBriefcase,
  FaMicrophone,
  FaHandshake,
} from "react-icons/fa";

const TO_EMAIL = "liu_chiensheng@outlook.com";
const CALENDAR_URL = "https://calendar.app.google/MANJXP2ZZiaWF5T26";
const LINKEDIN_URL = "https://www.linkedin.com/in/chienshengliu/";

const i18n = {
  zh: {
    tagline: "Let's Talk",
    heroTitle: "找 Morris 聊聊",
    heroDesc: "職涯機會、演講教學、Data & AI 合作，都可以用最直接的方式開始對焦。",
    location: "香港",
    languages: "三文五語 · 中文 · English · Deutsch · 粵語 · 台語",
    fitNote: "適合：職涯機會、演講教學、Data & AI 合作。不適合：大量制式推銷或無關外包信件。",
    responseNote: "通常 24 小時內回覆",
    channels: { email: "Email", linkedin: "LinkedIn", calendar: "Calendar" },
    intents: [
      {
        key: "career",
        icon: <FaBriefcase />,
        title: "Career / Hiring",
        subtitle: "職涯、招募、顧問角色",
        desc: "適合討論 Data & AI、BI、Advisory、跨市場分析相關機會。",
        color: "from-sky-500 to-cyan-500",
        links: [
          { label: "Email", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
          { label: "LinkedIn", href: LINKEDIN_URL, icon: <FaLinkedin />, external: true },
        ],
      },
      {
        key: "speaking",
        icon: <FaMicrophone />,
        title: "Speaking / Teaching",
        subtitle: "演講、課程、工作坊",
        desc: "適合邀請 LLM、RAG、資料分析、AI 顧問職涯與海外經驗分享。",
        color: "from-violet-500 to-indigo-500",
        links: [
          { label: "預約時間", href: CALENDAR_URL, icon: <FaCalendarAlt />, external: true },
          { label: "Email", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
        ],
      },
      {
        key: "collaboration",
        icon: <FaHandshake />,
        title: "Data & AI Collaboration",
        subtitle: "分析路徑、資料產品、GenAI",
        desc: "適合把模糊業務問題拆成可交付的資料、模型或 AI 產品方向。",
        color: "from-emerald-500 to-teal-500",
        links: [
          { label: "30 分鐘對談", href: CALENDAR_URL, icon: <FaCalendarAlt />, external: true },
          { label: "Email", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
        ],
      },
    ],
  },
  en: {
    tagline: "Let's Talk",
    heroTitle: "Talk to Morris",
    heroDesc: "Career opportunities, speaking invitations, and Data & AI collaboration can all start with a clear first conversation.",
    location: "Hong Kong",
    languages: "3 written · 5 spoken · Chinese · English · Deutsch · Cantonese · Taiwanese",
    fitNote: "Best for: hiring, speaking, collaboration. Not for cold vendor outreach.",
    responseNote: "Usually reply within 24 hours",
    channels: { email: "Email", linkedin: "LinkedIn", calendar: "Calendar" },
    intents: [
      {
        key: "career",
        icon: <FaBriefcase />,
        title: "Career / Hiring",
        subtitle: "Roles, hiring, advisory track",
        desc: "Best for Data & AI, BI, advisory, and cross-market analytics opportunities.",
        color: "from-sky-500 to-cyan-500",
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
        color: "from-violet-500 to-indigo-500",
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
        color: "from-emerald-500 to-teal-500",
        links: [
          { label: "30-min chat", href: CALENDAR_URL, icon: <FaCalendarAlt />, external: true },
          { label: "Email", href: `mailto:${TO_EMAIL}`, icon: <FaEnvelope /> },
        ],
      },
    ],
  },
};

const directChannels = [
  { key: "email", icon: <FaEnvelope />, href: `mailto:${TO_EMAIL}`, value: TO_EMAIL },
  { key: "linkedin", icon: <FaLinkedin />, href: LINKEDIN_URL, value: "Chien-Sheng (Morris) Liu", external: true },
  { key: "calendar", icon: <FaCalendarAlt />, href: CALENDAR_URL, value: "30 min", external: true },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ContactPage({ locale = "zh" }) {
  const t = i18n[locale] || i18n.zh;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div className="mb-14" initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.35em] text-indigo-400/70 font-medium mb-4"
            >
              {t.tagline}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="break-words text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5"
            >
              <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                {t.heroTitle}
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="wrap-anywhere text-lg text-white/50 leading-relaxed mb-6 max-w-2xl"
            >
              {t.heroDesc}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-3 text-sm text-white/40"
            >
              <span className="inline-flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-xs text-sky-400" />
                {t.location}
              </span>
              <span className="text-white/20">·</span>
              <span className="inline-flex items-center gap-1.5">
                <FaGlobe className="text-xs text-sky-400" />
                {t.languages}
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={4}
              className="wrap-anywhere mt-5 max-w-2xl rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium leading-relaxed text-white/55"
            >
              {t.fitNote}
            </motion.p>
          </motion.div>

          {/* Contact intents */}
          <div className="grid gap-4 md:grid-cols-3 mb-12">
            {t.intents.map((intent, i) => (
              <motion.div
                key={intent.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                custom={i}
                variants={fadeUp}
                className="group flex min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-black/20"
              >
                <div className={`mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${intent.color} text-lg text-white shadow-lg`}>
                  {intent.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300/70">
                    {intent.subtitle}
                  </p>
                  <h3 className="wrap-anywhere text-lg font-bold leading-tight text-white">
                    {intent.title}
                  </h3>
                  <p className="wrap-anywhere mt-3 text-sm leading-relaxed text-white/48">
                    {intent.desc}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {intent.links.map((link) => (
                    <a
                      key={`${intent.key}-${link.label}`}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/55 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <span className="text-[10px] text-sky-300/80">{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Direct channels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 grid gap-3 sm:grid-cols-3"
          >
            {directChannels.map((ch) => (
              <a
                key={ch.key}
                href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                className="group min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 transition-colors hover:border-white/20"
              >
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-white/40">
                  <span className="text-sky-300/70">{ch.icon}</span>
                  {t.channels[ch.key]}
                </div>
                <p className="truncate text-sm font-medium text-white/65 group-hover:text-white">
                  {ch.value}
                </p>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center justify-center gap-2 text-sm text-white/40"
          >
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            {t.responseNote}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
