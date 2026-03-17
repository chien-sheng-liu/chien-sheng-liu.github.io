"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import DotGridBackground from "@/components/DotGridBackground";
import TypewriterText from "@/components/TypewriterText";
import Card3D from "@/components/Card3D";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/**
 * Shared Hero section for EN/YUE profile-style homepages.
 *
 * Props:
 * - greeting: string ("Hi, I'm Morris")
 * - titlePrefix: string ("I turn AI")
 * - typewriterTexts: string[]
 * - subtitle: string
 * - tags: string[]
 * - ctaLabel: string
 * - ctaHref: string
 */
export default function HeroSection({
  greeting,
  titlePrefix,
  typewriterTexts,
  subtitle,
  tags = [],
  ctaLabel,
  ctaHref,
}) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <AnimatedGradientBg variant="hero" />
      <DotGridBackground className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Text */}
            <div className="space-y-6">
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.35em] text-indigo-500/70 font-medium">
                {greeting}
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.92] tracking-tight text-[#1d1d1f]">
                {titlePrefix}
                <br />
                <span className="bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  <TypewriterText texts={typewriterTexts} speed={80} pause={2500} />
                </span>
              </motion.h1>
              {subtitle && (
                <motion.p variants={fadeUp} className="text-lg text-slate-500 max-w-xl">
                  {subtitle}
                </motion.p>
              )}
              {tags.length > 0 && (
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-[11px] font-medium tracking-tight text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/40 hover:shadow-xl transition-all duration-300"
                >
                  {ctaLabel}
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div variants={fadeUp} className="relative mx-auto">
              <Card3D intensity={6}>
                <div
                  className="relative h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
                  style={{ animation: "hero-float 6s ease-in-out infinite" }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/60 shadow-2xl shadow-indigo-200/40">
                    <Image src="/profile.png" alt="Morris portrait" fill sizes="288px" className="object-cover" />
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
