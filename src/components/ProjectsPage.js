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
    tagline: "Projects",
    title: "Data & AI 案例集",
    desc: "用案例方式呈現問題、方法與成果：從 LLM、BI、預測模型到可部署的資料產品。",
    all: "全部",
    problem: "問題",
    outcome: "成果",
    viewCode: "查看程式碼",
    viewDetail: "了解更多",
    ctaTitle: "想把問題拆成可交付的 Data & AI 案例？",
    ctaDesc: "每個專案都從業務問題開始，最後回到可用、可量化、可維護的交付。",
    ctaBtn: "查看 GitHub",
    updating: "持續更新中",
  },
  en: {
    tagline: "Projects",
    title: "Data & AI Case Work",
    desc: "Case-style work across LLMs, BI, forecasting, and deployable data products: problem, method, and outcome.",
    all: "All",
    problem: "Problem",
    outcome: "Outcome",
    viewCode: "View Code",
    viewDetail: "Learn More",
    ctaTitle: "Want to turn a business problem into a Data & AI case?",
    ctaDesc: "Every project starts with a business question and ends with something usable, measurable, and maintainable.",
    ctaBtn: "View GitHub",
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

  const filteredProjects = useMemo(
    () => (activeFilter ? projects.filter((p) => p.category === activeFilter) : projects),
    [projects, activeFilter],
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
              className={`max-w-full px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
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
                className={`max-w-full px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
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
                    <div className="grid grid-cols-1 gap-2 mb-4">
                      <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2">
                        <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">{t.problem}</div>
                        <div className="wrap-anywhere text-xs text-white/65 leading-snug">{project.caseNotes.problem}</div>
                      </div>
                      <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2">
                        <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">{t.outcome}</div>
                        <div className="wrap-anywhere text-xs text-white/65 leading-snug">{project.caseNotes.outcome}</div>
                      </div>
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-5">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="min-w-0 text-center py-2.5 px-1 bg-white/[0.05] rounded-lg border border-white/[0.08]">
                        <div className="text-base font-bold text-white">{m.value}</div>
                        <div className="text-[10px] text-white/40 mt-0.5 truncate">{m.label}</div>
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
