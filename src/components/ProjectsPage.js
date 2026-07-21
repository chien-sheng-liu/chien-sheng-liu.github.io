"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaArrowRight,
  FaDatabase,
  FaBrain,
  FaCloud,
  FaChartLine,
} from "react-icons/fa";
import { getProjectData } from "@/data/projectData";
import ProjectDetailModal from "./ProjectDetailModal";

/* ── i18n ── */
const i18n = {
  zh: {
    tagline: "Case Work",
    title: "Data & AI 案例集",
    desc: "用顧問案例方式呈現問題、方法與成果：從 LLM、BI、預測模型到可部署的資料產品。",
    all: "全部",
    problem: "問題",
    approach: "方法",
    impact: "成果",
    featured: "Featured Case",
    viewCode: "查看程式碼",
    viewDetail: "了解更多",
    ctaTitle: "有類似的 Data & AI 問題？",
    ctaDesc: "我可以協助把模糊需求拆成可驗收的分析、模型或資料產品路徑。",
    ctaBtn: "查看 GitHub 案例",
    updating: "持續更新中",
  },
  en: {
    tagline: "Case Work",
    title: "Data & AI Case Work",
    desc: "Case-style work across LLMs, BI, forecasting, and deployable data products: problem, method, and outcome.",
    all: "All",
    problem: "Problem",
    approach: "Approach",
    impact: "Impact",
    featured: "Featured Case",
    viewCode: "View Code",
    viewDetail: "Learn More",
    ctaTitle: "Working through a similar Data & AI problem?",
    ctaDesc: "I can help turn ambiguous requirements into deliverable analytics, model, or data-product paths.",
    ctaBtn: "View GitHub cases",
    updating: "Continuously updating",
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

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function ProjectsPage({ locale = "zh" }) {
  const t = i18n[locale] || i18n.zh;
  const { projects } = getProjectData(locale);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))],
    [projects],
  );
  const featuredProject = useMemo(
    () => projects.find((p) => p.title.includes("AutoLLM")) || projects[0],
    [projects],
  );

  const filteredProjects = useMemo(
    () => {
      const base = activeFilter ? projects.filter((p) => p.category === activeFilter) : projects;
      return base.filter((p) => p.title !== featuredProject?.title);
    },
    [projects, activeFilter, featuredProject?.title],
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-5xl mx-auto min-w-0">

          {/* ── Hero ── */}
          <motion.div className="mb-16" initial="hidden" animate="visible">
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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5 break-words"
            >
              <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                {t.title}
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="wrap-anywhere text-lg text-white/50 leading-relaxed max-w-2xl"
            >
              {t.desc}
            </motion.p>
          </motion.div>

          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-10 min-w-0 overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.06] p-5 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-white/20 sm:p-7"
              onClick={() => setSelectedProject(featuredProject)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedProject(featuredProject);
              }}
            >
              <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${featuredProject.color}`} />
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className="min-w-0 pl-2">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-300">
                    {t.featured}
                  </div>
                  <div className="mb-4 flex items-start gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${featuredProject.color} text-white shadow-md`}>
                      {featuredProject.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sky-400">{featuredProject.categoryIcon}</span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-sky-400">
                          {featuredProject.category}
                        </span>
                      </div>
                      <h2 className="wrap-anywhere text-2xl font-bold leading-tight text-white sm:text-3xl">
                        {featuredProject.title}
                      </h2>
                    </div>
                  </div>
                  <p className="wrap-anywhere text-sm leading-relaxed text-white/55">
                    {featuredProject.description}
                  </p>
                </div>

                <div className="min-w-0">
                  {featuredProject.caseNotes && (
                    <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                      {[
                        [t.problem, featuredProject.caseNotes.problem],
                        [t.approach, featuredProject.caseNotes.approach],
                        [t.impact, featuredProject.caseNotes.impact],
                      ].map(([label, text]) => (
                        <div key={label} className="rounded-lg border border-white/[0.08] bg-black/20 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                            {label}
                          </p>
                          <p className="wrap-anywhere text-xs leading-relaxed text-white/58">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex min-w-0 flex-wrap gap-1.5">
                    {featuredProject.technologies.slice(0, 8).map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-white/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 transition-colors group-hover:text-sky-300">
                    {t.viewDetail}
                    <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Filter bar ── */}
          <motion.div
            className="flex max-w-full flex-nowrap justify-start gap-2 mb-8 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className={`max-w-full shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeFilter === null
                  ? "bg-white text-[#0a0a0a] border-white shadow-sm"
                  : "bg-white/[0.05] text-white/50 border-white/[0.08] hover:border-white/20 hover:text-white/80"
              }`}
            >
              {t.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
                className={`max-w-full shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-white text-[#0a0a0a] border-white shadow-sm"
                    : "bg-white/[0.05] text-white/50 border-white/[0.08] hover:border-white/20 hover:text-white/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* ── Project cards ── */}
          <motion.div
            className="grid w-full min-w-0 grid-cols-1 lg:grid-cols-2 gap-6 mb-20 overflow-hidden"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-w-0 max-w-full overflow-hidden rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Accent strip */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${project.color}`}
                />

                <div className="min-w-0 pl-5 pr-4 sm:pr-6 py-5 sm:py-6">
                  {/* Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white shadow-md`}
                    >
                      {project.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sky-400">{project.categoryIcon}</span>
                        <span className="text-xs font-semibold text-sky-400 uppercase tracking-wide">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="wrap-anywhere text-[15px] sm:text-lg font-bold text-white leading-snug group-hover:text-sky-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="wrap-anywhere text-sm text-white/50 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {project.caseNotes && (
                    <div className="grid gap-2 mb-4">
                      {[
                        [t.problem, project.caseNotes.problem],
                        [t.approach, project.caseNotes.approach],
                        [t.impact, project.caseNotes.impact],
                      ].map(([label, text]) => (
                        <div key={label} className="rounded-lg border border-white/[0.08] bg-black/20 p-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-1">
                            {label}
                          </p>
                          <p className="wrap-anywhere text-xs leading-relaxed text-white/55">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech tags */}
                  <div className="flex min-w-0 flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 bg-white/[0.05] border border-white/[0.08] rounded-full text-[11px] font-medium text-white/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="min-w-0 text-center py-2.5 bg-white/[0.05] rounded-lg border border-white/[0.08]">
                        <div className="text-base font-bold text-white">{m.value}</div>
                        <div className="truncate text-[10px] text-white/40 mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                    {t.viewDetail}
                    <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 variants={fadeUp} custom={0} className="text-2xl font-bold text-white mb-3">
              {t.ctaTitle}
            </motion.h3>
            <motion.p variants={fadeUp} custom={1} className="text-white/50 mb-6 max-w-lg mx-auto">
              {t.ctaDesc}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/chien-sheng-liu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#0a0a0a] font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg"
              >
                <FaGithub />
                {t.ctaBtn}
                <FaArrowRight className="text-xs" />
              </a>
              <span className="flex items-center gap-2 text-sm text-white/40">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                {t.updating}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            locale={locale}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
