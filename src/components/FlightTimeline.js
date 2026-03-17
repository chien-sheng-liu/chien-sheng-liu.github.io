"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FaPlane } from "react-icons/fa";
import dynamic from "next/dynamic";
import FlightArc from "./FlightArc";

/* ── Lazy-load Globe (no SSR — Three.js needs browser) ── */
const GlobeBackground = dynamic(() => import("./GlobeBackground"), {
  ssr: false,
  loading: () => null,
});

/* ── DATA — unified into work / education ── */
const events = [
  { year: "2026", title: "Lead, BI",              org: "Lalamove",          flag: "🇭🇰", type: "work" },
  { year: "2024", title: "Manager · Data & AI",   org: "Datarget 創代科技", flag: "🇹🇼", type: "work" },
  { year: "2023", title: "ML Engineer",           org: "OneAD AdTech",      flag: "🇹🇼", type: "work" },
  { year: "2023", title: "資料科學講師",             org: "DeepCoding",        flag: "🇹🇼", type: "work" },
  { year: "2022", title: "Marketing DA",          org: "HelloFresh SE",     flag: "🇩🇪", type: "work" },
  { year: "2021", title: "Research Assistant",    org: "ZEW 經濟研究中心",    flag: "🇩🇪", type: "work" },
  { year: "2020", title: "MSc 經濟資訊學",          org: "曼海姆大學",          flag: "🇩🇪", type: "education" },
  { year: "2019", title: "交換生",                  org: "拜羅伊特大學",        flag: "🇩🇪", type: "education" },
  { year: "2017", title: "Software Eng. Intern",  org: "Getec · Mitac",     flag: "🇨🇳", type: "work" },
  { year: "2015", title: "學士 · 資訊管理",          org: "中原大學",           flag: "🇹🇼", type: "education" },
];

/* ── Type-based styling ── */
const typeStyle = {
  work: {
    border: "border-cyan-400/40",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    badge: "bg-cyan-400/15 text-cyan-300",
    dot: "bg-cyan-400",
    hex: "#22d3ee",
  },
  education: {
    border: "border-purple-400/40",
    text: "text-purple-400",
    glow: "shadow-[0_0_20px_rgba(167,139,250,0.1)]",
    badge: "bg-purple-400/15 text-purple-300",
    dot: "bg-purple-400",
    hex: "#a78bfa",
  },
};

/* ── SVG GEOMETRY — wide viewBox so cards never overlap ── */
const VB_W = 1400;
const VB_H = 1200;

const nodes = [
  { x: 1180, y: 40  },
  { x: 220,  y: 160 },
  { x: 1150, y: 280 },
  { x: 250,  y: 400 },
  { x: 1200, y: 520 },
  { x: 200,  y: 640 },
  { x: 1170, y: 760 },
  { x: 230,  y: 880 },
  { x: 1190, y: 1000 },
  { x: 210,  y: 1120 },
];

/* ── COMPONENT ── */
export default function FlightTimeline() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-3">
            Flight Log
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-semibold text-white mb-2">
            人生航線
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-xs text-white/35">
            台灣 → 中國 → 德國 → 香港
          </motion.p>
        </div>

        {/* ═══ DESKTOP ═══ */}
        <div className="hidden md:block relative" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>

          {/* 3D Globe background */}
          <GlobeBackground />

          {/* Flight arcs with animated dots */}
          <FlightArc nodes={nodes} vbW={VB_W} vbH={VB_H} />

          {/* Node dots on SVG layer */}
          <svg className="absolute inset-0 w-full h-full z-[8]" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {nodes.map((n, i) => {
              const s = typeStyle[events[i].type];
              return (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r="14" fill={s.hex} opacity="0.08" />
                  <circle cx={n.x} cy={n.y} r="5"  fill={s.hex} opacity="0.9" />
                  <circle cx={n.x} cy={n.y} r="5"  fill={s.hex} opacity="0.3">
                    <animate attributeName="r" values="5;14;5" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Cards — wrapper div handles positioning, motion.div handles animation */}
          {events.map((ev, idx) => {
            const n = nodes[idx];
            const toRight = n.x < VB_W / 2;
            const s = typeStyle[ev.type];
            return (
              <div
                key={idx}
                className="absolute z-[15]"
                style={{
                  left: `${(n.x / VB_W) * 100}%`,
                  top: `${(n.y / VB_H) * 100}%`,
                  transform: `translate(${toRight ? "20px" : "calc(-100% - 20px)"}, -50%)`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FlightCard ev={ev} s={s} align={toRight ? "left" : "right"} />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ═══ MOBILE ═══ */}
        <div className="md:hidden relative">
          {/* Subtle background globe for mobile */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <GlobeBackground />
          </div>

          <div className="space-y-3 relative z-10">
            {events.map((ev, idx) => {
              const s = typeStyle[ev.type];
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${isEven ? "justify-start" : "justify-end"}`}
                >
                  <MobileFlightCard ev={ev} s={s} isEven={isEven} />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Desktop card: frosted glass, 280px, two-type colors ── */
function FlightCard({ ev, s, align }) {
  return (
    <div
      className={`w-[220px] rounded-xl border ${s.border} bg-white/[0.04] backdrop-blur-xl px-3 py-2.5 ${s.glow} transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20`}
    >
      {/* Type badge */}
      <div className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider mb-2 ${s.badge}`}>
        {ev.type === "work" ? "Work" : "Education"}
      </div>

      <div className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
        <span className="text-base leading-none shrink-0">{ev.flag}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white leading-snug">{ev.title}</h3>
          <p className={`text-xs ${s.text} opacity-80 leading-snug`}>{ev.org}</p>
        </div>
        <span className="text-[10px] text-white/30 font-mono shrink-0">{ev.year}</span>
      </div>
    </div>
  );
}

/* ── Mobile card: frosted glass, same type styling ── */
function MobileFlightCard({ ev, s, isEven }) {
  return (
    <div
      className={`w-[85%] rounded-xl border ${s.border} bg-white/[0.04] backdrop-blur-xl px-4 py-3 ${s.glow} relative`}
    >
      {/* Dot indicator */}
      <div className={`absolute top-4 ${isEven ? "-right-2" : "-left-2"} w-3.5 h-3.5 rounded-full ${s.dot} ring-2 ring-black/50`} />

      {/* Type badge */}
      <div className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider mb-1.5 ${s.badge}`}>
        {ev.type === "work" ? "Work" : "Education"}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-lg leading-none shrink-0">{ev.flag}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white leading-snug">{ev.title}</h3>
          <p className={`text-sm ${s.text} opacity-80 leading-snug`}>{ev.org}</p>
        </div>
        <span className="text-[11px] text-white/30 font-mono shrink-0">{ev.year}</span>
      </div>
    </div>
  );
}
