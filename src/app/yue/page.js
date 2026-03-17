"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ParticlesBackground from "@/components/ParticlesBackground";
import { motion } from "framer-motion";
import { FaArrowRight, FaRobot, FaShieldAlt, FaFeather, FaQuoteLeft } from "react-icons/fa";
import { highlights, experiences, education, languages, pageText } from "@/app/yue/about/aboutData";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const heroTags = ["前端工程師", "流程設計師", "AI / Data"];
const heroSignals = [
  { label: "8+", desc: "AI 專案" },
  { label: "120+", desc: "人才 Coaching" },
  { label: "3", desc: "市場經驗" },
];
const pillars = [
  { icon: <FaRobot />, title: "ROI 先行", desc: "所有假設要綁營收或效率" },
  { icon: <FaShieldAlt />, title: "策略即產品", desc: "將 C‑level 決策同 backlog 對齊" },
  { icon: <FaFeather />, title: "教練式合作", desc: "交付同時賦能團隊複製" },
];
const services = {
  primary: {
    title: "AI 產品與數據策略",
    desc: "12 週內走完策略、PoC、治理，令 AI 直接對齊 KPI。",
    tags: ["LLM / RAG", "產品藍圖", "ROI 守門"],
    cta: { label: "啟動藍圖", href: "/yue/service" },
  },
  secondary: [
    {
      title: "商業洞察與決策優化",
      desc: "儀表板 + 實驗解鎖管理層決策。",
      tags: ["KPI 框架", "Insight Ops", "A/B"],
      cta: { label: "規劃洞察", href: "/yue/service" },
    },
    {
      title: "人才賦能與職涯教練",
      desc: "敘事、履歷、面試節奏一次到位。",
      tags: ["1:1 Coaching", "Pitch / CV", "Team"],
      cta: { label: "預約諮詢", href: "/yue/contact" },
    },
  ],
};
const stats = [
  { value: "2x", label: "上市速度" },
  { value: "10+", label: "國際講座" },
  { value: "MSc", label: "DE Intl Mgmt" },
  { value: "92", label: "NPS" },
];

const Pill = ({ children, tone = "default" }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-tight ${
      tone === "primary"
        ? "border-[var(--color-electric-blue)]/50 bg-[var(--color-electric-blue)]/10 text-[var(--color-electric-blue)]"
        : "border-white/10 bg-white/5 text-[var(--color-gray-300)]"
    }`}
  >
    {children}
  </span>
);

export default function HomeYue() {
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch('/api/content/projects?locale=yue').then(r=>r.json()).then(d=>setProjects((d.items||[]).slice(0,3))).catch(()=>{});
    fetch('/api/content/articles?locale=yue').then(r=>r.json()).then(d=>setArticles((d.items||[]).slice(0,3))).catch(()=>{});
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-[var(--color-white)]">
      <ParticlesBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(0,191,255,0.15),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(138,43,226,0.1),transparent_50%)]" />

      <main className="relative z-10 space-y-16 pb-16">
        {/* HERO */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16">
          <div className="mx-auto max-w-6xl">
            {/* Left: Textual hero */}
            <motion.div variants={stagger} initial="hidden" animate="visible" className="rounded-[40px] border border-white/10 bg-gradient-to-br from-[#1a2a48] via-[#0f1b33] to-[#0a1326] p-9 shadow-[0_60px_160px_-60px_rgba(0,191,255,0.55)]">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div className="space-y-5">
                <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-gray-300)]">Hello，我係 Morris</motion.p>
                <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-semibold leading-tight text-white">將 AI 變成作品同故事</motion.h1>
                <motion.p variants={fadeUp} className="text-sm md:text-base text-[var(--color-gray-200)] max-w-xl">{pageText?.subtitle}</motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">{heroTags.map((t) => (<Pill key={t}>{t}</Pill>))}</motion.div>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
                  <Link href="/yue/contact" className="group inline-flex items-center rounded-full border border-[var(--color-electric-blue)]/60 bg-[var(--color-electric-blue)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-electric-blue)]">打個招呼<FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /></Link>
                </motion.div>
                <motion.p variants={fadeUp} className="mt-6 text-sm md:text-base text-[var(--color-gray-200)] max-w-2xl border-t border-white/10 pt-6">{pageText?.subtitle}</motion.p>
              </div>
              <motion.div variants={fadeUp} className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.35),transparent_60%)] blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/15 shadow-[0_30px_100px_-60px_rgba(0,191,255,0.6)]">
                  <Image src="/profile.png" alt="Morris portrait" fill sizes="256px" className="object-cover" />
                </div>
              </motion.div>
              </div>
            </motion.div>

            
          </div>
        </section>

        {/* 重點 */}
        <section id="about" className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4"><h2 className="text-sm uppercase tracking-[0.35em] text-[var(--color-gray-400)]">重點</h2></div>
            <div className="grid gap-5 md:grid-cols-3">
              {highlights.slice(0,3).map((h, idx) => (
                <motion.div key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="rounded-2xl border border-white/10 bg-[#111c2f] p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-electric-blue)]/14 text-[var(--color-electric-blue)]">{h.icon}</div>
                    <h3 className="text-base font-semibold text-white">{h.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-gray-300)]">{h.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 經歷 */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4"><h2 className="text-sm uppercase tracking-[0.35em] text-[var(--color-gray-400)]">經歷</h2></div>
            <div className="space-y-4">
              {experiences.slice(0,5).map((exp, idx) => (
                <motion.div key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="rounded-2xl border border-white/10 bg-[#111c2f] p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">{exp.title}</h3>
                    <span className="text-xs text-[var(--color-gray-500)]">{exp.date}</span>
                  </div>
                  <div className="text-sm text-[var(--color-gray-300)]">{exp.company}</div>
                  <ul className="mt-2 space-y-1">
                    {(exp.bullets||[]).slice(0,3).map((b,i)=>(<li key={i} className="text-sm text-[var(--color-gray-300)]">• {b}</li>))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 教育 / 語言 */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4"><h2 className="text-sm uppercase tracking-[0.35em] text-[var(--color-gray-400)]">教育 / 語言</h2></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {education.slice(0,3).map((ed, idx)=>(
                  <div key={idx} className="rounded-2xl border border-white/10 bg-[#111c2f] p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-white">{ed.title}</h3>
                      <span className="text-xs text-[var(--color-gray-500)]">{ed.date}</span>
                    </div>
                    <p className="text-sm text-[var(--color-gray-300)]">{ed.company}</p>
                    {ed.description && <p className="text-xs text-[var(--color-gray-500)] mt-1">{ed.description}</p>}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {languages.map((l,idx)=>(
                  <div key={idx} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111c2f] px-5 py-4">
                    <span className="text-sm text-white">{l.title}</span>
                    <span className="text-xs text-[var(--color-electric-blue)]">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-[20px] border border-white/5 bg-[#0b1220] px-6 py-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45 }}>
              <h3 className="text-2xl font-semibold text-white">想一齊打造更好嘅作品？</h3>
              <p className="mt-2 text-sm text-[var(--color-gray-400)]">畀我個訊息，或者直接約時間傾吓。</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/yue/contact" className="group inline-flex items-center rounded-full border border-[var(--color-electric-blue)]/60 bg-[var(--color-electric-blue)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-electric-blue)]">打個招呼<FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /></Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
