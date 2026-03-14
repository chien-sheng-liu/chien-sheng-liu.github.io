"use client";

import { FaGithub, FaArrowRight, FaEye, FaDatabase, FaCode, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { projects, stats } from "./projectData";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const floatingVariants = { animate: { y: [-10, 10, -10], x: [-5, 5, -5], rotate: [-3, 3, -3], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } } };

const ProjectsPageYue = () => {
  return (
    <div className="relative min-h-screen text-[var(--color-white)] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-violet-glow)] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
        <motion.div className="absolute top-1/4 right-1/5 text-[var(--color-electric-blue)]/20 text-4xl font-mono" variants={floatingVariants} animate="animate">{"< />"}</motion.div>
        <motion.div className="absolute top-2/3 left-1/6 w-6 h-6 border-2 border-[var(--color-violet-glow)]/30 rounded" variants={floatingVariants} animate="animate" style={{animationDelay: '2s'}} />
        <motion.div className="absolute top-1/3 left-1/2 text-[var(--color-electric-blue)]/20 text-2xl" variants={floatingVariants} animate="animate" style={{animationDelay: '3s'}}>{"{ }"}</motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--color-electric-blue)] to-[var(--color-violet-glow)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            個人項目
          </motion.h1>
          <motion.p className="text-xl text-[var(--color-gray-300)] max-w-4xl mx-auto leading-relaxed mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            以下係我喺 <span className="text-[var(--color-electric-blue)] font-semibold">數據科學</span>、<span className="text-[var(--color-violet-glow)] font-semibold">機器學習</span> 同全端開發領域嘅精選項目，展示點樣將複雜數據問題變成商業成果。
          </motion.p>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16" variants={containerVariants} initial="hidden" animate="visible">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="relative p-6 bg-gradient-to-br from-[var(--color-gray-800)]/60 to-[var(--color-gray-800)]/30 backdrop-blur-lg rounded-2xl border border-[var(--color-gray-700)]/50 text-center group hover:border-[var(--color-electric-blue)]/50 transition-all duration-300" whileHover={{ y: -5, scale: 1.05 }}>
                <div className="text-[var(--color-electric-blue)] mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--color-gray-400)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants} className="relative group overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-2xl border border-[var(--color-gray-700)]/50 hover:border-[var(--color-electric-blue)]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--color-electric-blue)]/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-electric-blue)]/5 via-transparent to-[var(--color-violet-glow)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <motion.div className="flex-shrink-0 p-3 bg-[var(--color-electric-blue)]/10 rounded-xl border border-[var(--color-electric-blue)]/20 group-hover:bg-[var(--color-electric-blue)]/20 transition-all duration-300" whileHover={{ rotate: 5, scale: 1.1 }}>{project.icon}</motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 mb-1"><span className="text-[var(--color-electric-blue)]">{project.categoryIcon}</span><span className="text-sm font-semibold text-[var(--color-electric-blue)]">{project.category}</span></div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">{project.title}</h3>
                    </div>
                  </div>
                </div>
                <p className="text-[var(--color-gray-400)] leading-relaxed mb-6 group-hover:text-[var(--color-gray-300)] transition-colors duration-300">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (<span key={i} className="px-3 py-1 bg-[var(--color-electric-blue)]/10 border border-[var(--color-electric-blue)]/20 rounded-full text-xs font-medium text-[var(--color-electric-blue)] backdrop-blur-sm">{tech}</span>))}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-3 bg-[var(--color-gray-900)]/30 rounded-lg border border-[var(--color-gray-600)]/20">
                      <div className="text-lg font-bold text-white">{metric.value}</div>
                      <div className="text-xs text-[var(--color-gray-500)]">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href={project.link} className="group/btn flex-1 flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-electric-blue)]/80 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-electric-blue)]/30">
                    <FaGithub />
                    <span>查看程式碼</span>
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </a>
                  <button className="flex items-center justify-center w-12 h-12 bg-[var(--color-gray-700)]/50 hover:bg-[var(--color-violet-glow)]/20 rounded-xl transition-all duration-300 group/eye">
                    <FaEye className="text-[var(--color-gray-400)] group-hover/eye:text-[var(--color-violet-glow)] transition-colors duration-300" />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-electric-blue)]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-10 bg-[var(--color-electric-blue)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">想知更多細節？</h3>
            <p className="text-xl text-[var(--color-gray-300)] mb-8 leading-relaxed">每個項目都有佢獨特嘅挑戰同解法。我好樂意分享更多技術細節、實作過程同當中嘅得著。</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a href="https://github.com/chien-sheng-liu" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-violet-glow)] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-2xl shadow-[var(--color-electric-blue)]/30 hover:shadow-[var(--color-electric-blue)]/50" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <FaGithub className="text-xl" />
                <span>睇 GitHub</span>
                <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}><FaArrowRight /></motion.div>
              </motion.a>
              <div className="flex items-center space-x-2 text-[var(--color-gray-400)]"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div><span className="font-medium">持續更新緊</span></div>
            </div>
            <motion.div className="mt-16 pt-8 border-t border-[var(--color-gray-700)]/30" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-[var(--color-gray-500)]">
                <div className="flex items-center space-x-2"><FaCode className="text-[var(--color-electric-blue)]" /><span>100% 開源</span></div>
                <div className="flex items-center space-x-2"><FaStar className="text-[var(--color-violet-glow)]" /><span>實戰驗證</span></div>
                <div className="flex items-center space-x-2"><FaDatabase className="text-[var(--color-electric-blue)]" /><span>完整文檔</span></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPageYue;

