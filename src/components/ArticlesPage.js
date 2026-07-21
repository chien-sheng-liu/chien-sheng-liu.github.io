"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookOpen, FaArrowRight, FaLightbulb } from "react-icons/fa";

const i18n = {
  zh: {
    tagline: "Thinking / Notes",
    title: "思考筆記",
    desc: "把 AI 系統、資料職涯、顧問交付與跨市場經驗，整理成可被快速掃描的實務筆記。",
    all: "全部",
    readMore: "閱讀全文",
    categories: ["AI", "Data Career", "Consulting", "Germany / HK Experience"],
    proof: ["AI systems", "Data career", "Consulting delivery", "Germany / HK"],
    featured: "Start here",
    featuredLabel: "Featured Note",
  },
  en: {
    tagline: "Thinking / Notes",
    title: "Thinking / Notes",
    desc: "Practical notes on AI systems, data careers, consulting delivery, and cross-market work across Germany and Hong Kong.",
    all: "All",
    readMore: "Read more",
    categories: ["AI", "Data Career", "Consulting", "Germany / HK Experience"],
    proof: ["AI systems", "Data career", "Consulting delivery", "Germany / HK"],
    featured: "Start here",
    featuredLabel: "Featured Note",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ArticlesPage({ posts, locale = "zh" }) {
  const t = i18n[locale] || i18n.zh;
  const [activeFilter, setActiveFilter] = useState(null);
  const linkPrefix = locale === "zh" ? "/articles" : `/${locale}/articles`;
  const featuredPost = useMemo(
    () => posts.find((p) => p.slug === "rag-primer") || posts[0],
    [posts],
  );

  const filteredPosts = useMemo(
    () => {
      const base = activeFilter ? posts.filter((p) => p.category === activeFilter) : posts;
      return base.filter((p) => p.slug !== featuredPost?.slug);
    },
    [posts, activeFilter, featuredPost?.slug],
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <motion.div className="mb-12" initial="hidden" animate="visible">
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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5"
            >
              <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                {t.title}
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-white/50 max-w-2xl leading-relaxed">
              {t.desc}
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
            >
              {t.proof.map((item) => (
                <span
                  key={item}
                  className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/55"
                >
                  <FaLightbulb className="shrink-0 text-[11px] text-sky-300/75" />
                  <span className="truncate">{item}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-8 min-w-0 overflow-hidden rounded-2xl border border-sky-400/15 bg-white/[0.055] p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:border-sky-300/30 sm:p-7"
            >
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-violet-400 via-sky-400 to-cyan-300" />
              <div className="grid gap-5 pl-2 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                <div className="min-w-0">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-sky-300/75">
                    {t.featuredLabel}
                  </p>
                  <h2 className="wrap-anywhere text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 wrap-anywhere text-sm leading-relaxed text-white/55">
                    {featuredPost.summary}
                  </p>
                </div>
                <div className="min-w-0">
                  <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/40">
                    <span className="rounded-full border border-sky-400/20 bg-sky-400/[0.08] px-3 py-1 font-semibold text-sky-300">
                      {featuredPost.category}
                    </span>
                    <span>{featuredPost.date}</span>
                    <span className="text-white/20">·</span>
                    <span>{featuredPost.readingTime}</span>
                  </div>
                  <Link
                    href={`${linkPrefix}/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-colors hover:bg-white/90"
                  >
                    {t.featured}
                    <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* Filter bar */}
          <motion.div
            className="flex max-w-full flex-nowrap justify-start gap-2 mb-10 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeFilter === null
                  ? "bg-white text-[#0a0a0a] border-white shadow-sm"
                  : "bg-white/[0.05] text-white/50 border-white/[0.08] hover:border-white/20 hover:text-white/80"
              }`}
            >
              {t.all}
            </button>
            {t.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-white text-[#0a0a0a] border-white shadow-sm"
                    : "bg-white/[0.05] text-white/50 border-white/[0.08] hover:border-white/20 hover:text-white/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Article cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden bg-white/[0.05] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08] hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/[0.06] to-indigo-400/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex min-w-0 items-center gap-2 text-sky-400">
                        <FaBookOpen className="shrink-0" />
                        {post.category && (
                          <span className="truncate text-xs uppercase tracking-wide font-medium">{post.category}</span>
                        )}
                      </div>
                      <div className="shrink-0 text-xs text-white/40">{post.date} · {post.readingTime}</div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-sm text-white/50 mb-4 leading-relaxed group-hover:text-white/65 transition-colors duration-300">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 bg-sky-500/[0.12] border border-sky-500/20 rounded-full text-[10px] font-medium text-sky-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`${linkPrefix}/${post.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-sky-400 group-hover:text-indigo-400 transition-colors duration-300"
                    >
                      {t.readMore}
                      <FaArrowRight className="ml-1.5 text-[10px] group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
