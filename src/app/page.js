"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import FlightTimeline from "../components/FlightTimeline";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const heroStats = [
  { value: "15+", label: "交付專案" },
  { value: "3", label: "跨市場" },
  { value: "NT$8,000萬", label: "累計營收" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#01030a] text-white">
      <ParticlesBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.2),transparent_55%),radial-gradient(circle_at_55%_25%,rgba(168,85,247,0.18),transparent_50%)]" />

      <main className="relative z-10 pb-12">

        {/* ═══ HERO — Full-screen centered ═══ */}
        <section className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            {/* Profile photo with glow rings */}
            <motion.div variants={fadeUp} className="relative mb-8">
              {/* Pulse rings */}
              <div className="absolute inset-[-30%] rounded-full border border-cyan-400/20" style={{ animation: "pulse-ring 3s ease-out infinite" }} />
              <div className="absolute inset-[-20%] rounded-full border border-purple-400/15" style={{ animation: "pulse-ring 3s ease-out 1s infinite" }} />

              {/* Aura glow */}
              <div className="absolute inset-[-40%] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.25),transparent_60%)] blur-2xl" />
              <div className="absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15),transparent_55%)] blur-xl" />

              {/* Photo */}
              <div
                className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
                style={{ animation: "hero-float 6s ease-in-out infinite" }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/15 shadow-[0_0_80px_-20px_rgba(14,165,233,0.4)]">
                  <Image src="/profile.png" alt="Morris Liu" fill sizes="320px" className="object-cover" priority />
                </div>
              </div>
            </motion.div>

            {/* Name & role */}
            <motion.div variants={fadeUp}>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/50 mb-3">
                AI + Strategy
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] text-white mb-4">
                我把 AI 作品
                <br />
                <span
                  className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                  style={{ animation: "text-shimmer 6s linear infinite" }}
                >
                  變成清楚的敘事
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto">
                策略、資料與產品節奏放進一條故事線
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm px-5 py-2.5 text-center"
                >
                  <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/45">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
              >
                安排對談
                <FaArrowRight className="ml-2 text-sm transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
            style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
          >
            <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <FaChevronDown className="text-xs" />
          </div>
        </section>

        {/* ═══ Flight Timeline ═══ */}
        <FlightTimeline />

        {/* ═══ CTA — frosted glass ═══ */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl px-8 py-10 text-center"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                想讓 AI 作品說得更好？
              </h3>
              <p className="text-sm text-white/50 mb-6">
                30 分鐘對談，把目標轉成敘事
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full border border-white/30 bg-white/10 px-7 py-3 text-base font-semibold text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
              >
                安排對談
                <FaArrowRight className="ml-2 text-sm transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
