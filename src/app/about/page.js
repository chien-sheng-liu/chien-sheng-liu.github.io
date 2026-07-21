"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import FlightTimeline from "../../components/FlightTimeline";
import CtaSection from "../../components/sections/CtaSection";
import { FaArrowRight, FaMicrophone, FaUsers } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const languages = [
  { name: "中文", level: "母語" },
  { name: "English", level: "C2" },
  { name: "Deutsch", level: "B2" },
  { name: "粵語", level: "中階" },
  { name: "台語", level: "母語" },
];

const capabilityMatrix = [
  {
    title: "Advisory",
    desc: "把模糊需求拆成可交付的分析問題、決策路徑與專案節奏。",
    label: "text-sky-300",
    metric: "Strategy to delivery",
    skills: ["Stakeholder alignment", "KPI framing", "Discovery", "Pre-sales", "Agile delivery"],
  },
  {
    title: "Analytics",
    desc: "從資料模型、BI 儀表板到成長分析，讓團隊能看見問題並追蹤結果。",
    label: "text-emerald-300",
    metric: "Signals to action",
    skills: ["SQL", "Python", "Tableau", "Power BI", "GA4", "Funnel analysis"],
  },
  {
    title: "Engineering",
    desc: "設計可維運的資料管道、倉儲與雲端部署，支撐長期分析與 AI 應用。",
    label: "text-cyan-300",
    metric: "Pipelines that last",
    skills: ["GCP", "Azure", "BigQuery", "dbt", "Docker", "Snowflake", "Airflow"],
  },
  {
    title: "AI Product",
    desc: "把 LLM、RAG 與模型能力包成可被業務採用、評估與持續改善的產品。",
    label: "text-violet-300",
    metric: "Models to products",
    skills: ["LLM", "RAG", "LoRA", "Model evaluation", "NLP", "GenAI workflow"],
  },
];

const speeches = [
  { date: "2025/07/20", title: "GenAI and LLM Application", org: "DeepCoding" },
  { date: "2025/05/24", title: "Build Your Own Academic ChatGPT with Streamlit & OpenAI", org: "National Yang Ming University" },
  { date: "2025/05/22", title: "Deep Dive into AI/Data in Data Consultancy", org: "Google GDG @ National Taipei University" },
  { date: "2025/05/20", title: "Foundation of LLM and Gen AI Application", org: "National Chiao Tung University" },
  { date: "2024/12/01", title: "Python Data Analysis for LLM", org: "National Chiao Tung University" },
  { date: "2024/03/15", title: "Data Analysis for Tableau, Python in Various Industries", org: "National Chiao Tung University" },
];

const volunteers = [
  { date: "2025/09/06", title: "PyCon Taiwan 2025", org: "Python Foundation" },
  { date: "2025/05/22", title: "Taiwan Women in Data Science (TWiDS)", org: "Stanford Data Science in Taiwan" },
];

const profileSummary = [
  { label: "Current Role", value: "WSP Data & AI Advisory", accent: "text-sky-300" },
  { label: "Founder Track", value: "Mentarix Data Studio", accent: "text-cyan-300" },
  { label: "Markets", value: "台灣 · 德國 · 香港 · 中國大陸", accent: "text-emerald-300" },
  { label: "Languages", value: "三文五語", accent: "text-violet-300" },
];

export default function About() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">

      <main className="relative z-10 pb-12">

        {/* ═══ INTRO ═══ */}
        <section className="px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
            >
              {/* Photo */}
              <motion.div variants={fadeUp} className="shrink-0 mx-auto sm:mx-0">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-2 ring-white/10 shadow-xl shadow-black/60">
                  <Image src="/profile.png" alt="Morris Liu" fill className="object-cover object-top" priority />
                </div>
              </motion.div>

              {/* Text */}
              <div className="w-full text-center sm:text-left space-y-3 flex-1 min-w-0 max-w-full">
                <motion.div variants={fadeUp}>
                  <p className="text-xs uppercase tracking-[0.35em] text-indigo-400/70 font-medium mb-1">個人經歷</p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">Morris Liu</h1>
                  <p className="text-sm text-white/40 mt-1 sm:hidden max-w-full break-words">
                    Data & AI Consultant @ WSP
                    <span className="block mt-0.5">香港</span>
                  </p>
                  <p className="hidden sm:block text-base text-white/40 mt-1">Consultant in Data & AI - Advisory Service @ WSP (Asia) Limited · 香港</p>
                </motion.div>

                <motion.p variants={fadeUp} className="wrap-anywhere text-sm sm:text-base text-white/50 max-w-[21rem] sm:max-w-xl mx-auto sm:mx-0 leading-relaxed">
                  WSP Data & AI 顧問、Mentarix 創辦人，跨台灣、德國、香港與中國大陸交付 BI、GenAI 與資料產品。
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium"
                    >
                      <span className="text-white font-semibold">{lang.name}</span>
                      {lang.level && <span className="text-white/40">{lang.level}</span>}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 身份總覽 ═══ */}
        <section className="px-4 sm:px-6 lg:px-8 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {profileSummary.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-2">
                  {item.label}
                </p>
                <p className={`wrap-anywhere text-sm font-semibold leading-snug ${item.accent}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══ 創辦者證明 ═══ */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 sm:p-7"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300/70">
                  Founder Proof
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Mentarix Data Studio
                </h2>
                <p className="mt-1 text-sm text-white/40">
                  創辦人 & AI 策略師 · 個人品牌延伸
                </p>
              </div>
              <a
                href="https://www.mentarix-data.com/zh-TW"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                查看創辦公司
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <p className="mt-5 max-w-3xl text-sm sm:text-base leading-relaxed text-white/55">
              Mentarix 是我將跨市場分析、資料工程與 AI 顧問交付經驗產品化的創辦者實驗場。它補強的是 Morris Liu 這個個人品牌的可信度，而不是取代這個網站的主角。
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["資料工程", "BI 儀表板", "預測模型", "GenAI 應用", "端到端交付"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1 text-xs font-medium text-cyan-200/75"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══ 人生航線 ═══ */}
        <FlightTimeline />

        {/* ═══ 能力矩陣 ═══ */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-white mb-8"
            >
              能力矩陣
            </motion.h2>
            <div className="grid gap-4 md:grid-cols-2">
              {capabilityMatrix.map((cat, ci) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.07, duration: 0.45 }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 transition-colors hover:border-white/20"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-[11px] font-semibold uppercase tracking-widest ${cat.label}`}>
                        {cat.title}
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">{cat.metric}</p>
                    </div>
                  </div>
                  <p className="wrap-anywhere mb-5 text-sm leading-relaxed text-white/50">
                    {cat.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/[0.08] bg-white/[0.045] px-3 py-1 text-xs font-medium text-white/55"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 演講紀錄 ═══ */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <FaMicrophone className="text-indigo-400 text-xl" />
                演講紀錄
              </h2>

              <div className="divide-y divide-white/[0.06]">
                {speeches.map((s, i) => (
                  <motion.div
                    key={s.date}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 group rounded-xl px-3 -mx-3 hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="text-xs font-mono text-white/30 shrink-0 w-24">{s.date}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white/80 group-hover:text-sky-400 transition-colors leading-snug">
                        {s.title}
                      </p>
                      <p className="text-xs text-white/30 mt-0.5">{s.org}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Volunteers */}
              <div className="mt-10">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
                  <FaUsers className="text-base" />
                  志工參與
                </h3>
                <div className="divide-y divide-white/[0.06]">
                  {volunteers.map((v, i) => (
                    <div
                      key={`vol-${i}`}
                      className="py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6"
                    >
                      <span className="text-xs font-mono text-white/30 shrink-0 w-24">{v.date}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white/80 leading-snug">{v.title}</p>
                        <p className="text-xs text-white/30 mt-0.5">{v.org}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <CtaSection
          title="想把 Data & AI 落到業務現場？"
          description="30 分鐘對談，把問題轉成可交付的分析路徑"
          buttonLabel="聯絡 Morris"
          buttonHref="/contact"
        />

      </main>
    </div>
  );
}
