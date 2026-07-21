"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";

const stats = [
  { to: 5,   prefix: "",  suffix: "+", label: "Years in Data & AI" },
  { to: 4,   prefix: "",  suffix: "",  label: "Countries cross-market" },
  { to: 3, prefix: "$", suffix: "M", label: "USD AI-driven Revenue" },
  { to: 25,  prefix: "",  suffix: "+",  label: "End-to-end Projects" },
];

const roles = [
  "Data & AI Advisory", "Mentarix Founder", "Business Intelligence", "LLM Products",
  "Decision Systems", "Cross-market Delivery", "RAG / LoRA", "Cloud & BigQuery",
];

const typewriterTexts = ["into decisions", "into advisory delivery", "into usable systems"];

const proofChips = [
  "WSP Data & AI",
  "Founder of Mentarix",
  "15+ AI/BI Projects",
  "Taiwan · Germany · Hong Kong",
];

function Counter({ to, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, to]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function MaskLine({ children, delay = 0, className = "" }) {
  return (
    <div className={`overflow-hidden leading-[1.0] pb-3 ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function HomeEn() {
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">

      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed select-none z-[200]"
        style={{
          inset: "-150%",
          width: "400%",
          height: "400%",
          backgroundImage: `url("${GRAIN}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "260px 260px",
          opacity: 0.042,
          animation: "grain 0.7s steps(1) infinite",
        }}
      />

      {/* Cursor spotlight */}
      {mounted && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30"
          style={{
            background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px, rgba(99,102,241,0.07), transparent 50%)`,
          }}
        />
      )}

      {/* ══════ HERO ══════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[48%] hidden lg:block pointer-events-none select-none"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src="/profile.png" alt="Morris Liu" fill className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/25" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pt-28 pb-20">

          <motion.div
            className="lg:hidden relative w-32 h-32 mx-auto mb-10 rounded-full overflow-hidden ring-1 ring-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/profile.png" alt="Morris Liu" fill className="object-cover object-top" priority />
          </motion.div>

          <div className="overflow-hidden mb-9">
            <motion.p
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.65 }}
              className="text-[11px] tracking-[0.45em] uppercase text-white/30 font-medium"
            >
              Morris Liu · Data & AI Consultant · Founder
            </motion.p>
          </div>

          <div className="mb-8">
            <MaskLine delay={0.22} className="text-[clamp(3rem,9.5vw,8.5rem)] font-bold tracking-tight text-white">
              I turn Data & AI
            </MaskLine>
            <MaskLine delay={0.40} className="text-[clamp(3rem,9.5vw,8.5rem)] font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                <TypewriterText texts={typewriterTexts} speed={80} pause={2500} />
              </span>
            </MaskLine>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.6 }}
            className="text-base sm:text-lg text-white/38 max-w-[22rem] mb-10"
          >
            WSP Data & AI consultant and Mentarix founder, connecting cross-market analytics, AI products, and business execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/en/about"
              className="group flex items-center gap-2 px-6 py-3 bg-white text-[#0a0a0a] text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
            >
              My Journey
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/en/contact" className="text-sm text-white/38 hover:text-white/75 transition-colors">
              Contact →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.96, duration: 0.6 }}
            className="mt-7 flex max-w-2xl flex-wrap gap-2"
          >
            {proofChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-white/42 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20"
          style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
        >
          <FaChevronDown className="text-xs" />
        </motion.div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="border-t border-white/[0.07] py-20 px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: "easeOut" }}
            >
              <div className="text-[clamp(2.8rem,6vw,5rem)] font-bold text-white leading-none tracking-tight mb-2">
                <Counter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/28 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════ FOUNDER NOTE ══════ */}
      <section className="border-t border-white/[0.07] py-16 px-6 sm:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"
        >
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-cyan-300/60 font-medium mb-5">
              Founder Proof
            </p>
            <h2 className="text-[clamp(1.9rem,4vw,3.7rem)] font-bold text-white leading-[1.02] tracking-tight">
              Founder of<br />Mentarix
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base sm:text-lg text-white/68 leading-relaxed mb-5">
              Mentarix Data Studio is where I productize my data engineering, BI, and GenAI delivery experience, and a founder proof point that strategy can become working systems.
            </p>
            <p className="text-sm sm:text-base text-white/40 leading-relaxed mb-6">
              The main story remains Morris Liu: WSP Data & AI consultant, cross-market BI/AI builder, and founder of Mentarix.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {["Founder", "Data Engineering", "BI", "GenAI"].map((item) => (
                <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/55">
                  {item}
                </span>
              ))}
              <a
                href="https://www.mentarix-data.com/zh-TW"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-300/75 transition-colors hover:text-cyan-200"
              >
                View founded company
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <section className="border-y border-white/[0.07] py-5 overflow-hidden">
        <div
          className="flex gap-10 whitespace-nowrap w-max"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...roles, ...roles].map((role, i) => (
            <span key={`${role}-${i}`} className="text-xl font-semibold text-white/[0.12] shrink-0">
              {role} <span className="text-white/[0.07] mx-2">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="py-32 px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-white leading-[0.92] tracking-tight mb-6">
              Want to turn Data & AI<br />into business action?
            </h2>
            <p className="text-white/32 text-lg mb-10">A 30-min chat to turn business problems into deliverable analytics paths.</p>
            <Link
              href="/en/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0a0a0a] font-semibold rounded-full hover:bg-white/90 transition-colors text-sm"
            >
              Contact Morris
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
