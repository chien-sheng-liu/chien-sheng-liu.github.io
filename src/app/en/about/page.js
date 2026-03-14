'use client';

import { useState } from 'react';
import { CreativeTimeline } from '@/components/CreativeTimeline';
import { FaMicrophone, FaLightbulb, FaRobot } from "react-icons/fa";
import { motion } from 'framer-motion';
import {
  highlights,
  experiences,
  education,
  speechCategories,
  languages,
  skills,
  stats,
  pageText
} from './aboutData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    x: [-5, 5, -5],
    rotate: [-2, 2, -2],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const sumAudience = (speeches) => {
  let sum = 0;
  let hasPlus = false;
  speeches.forEach(s => {
    const raw = String(s?.audience ?? '');
    const n = parseInt(raw.replace(/[^\d]/g, ''), 10);
    if (!Number.isNaN(n)) sum += n;
    if (raw.includes('+')) hasPlus = true;
  });
  return { sum, hasPlus };
};

const aggregateSpeechStats = (categories) => {
  let talks = 0;
  let audience = 0;
  let anyPlus = false;
  categories.forEach(cat => {
    const list = cat?.speeches ?? [];
    talks += list.length;
    const { sum, hasPlus } = sumAudience(list);
    audience += sum;
    if (hasPlus) anyPlus = true;
  });
  return { talks, audience, audiencePlus: anyPlus, categories: categories.length };
};

const ExpandableSpeechList = ({ speeches, initiallyVisible = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  const toShow = expanded ? speeches : speeches.slice(0, initiallyVisible);

  return (
    <motion.div layout className="space-y-3">
      {toShow.map((speech, i) => (
        <motion.div
          key={`${speech.title}-${i}`}
          layout
          className="p-3 bg-[var(--color-gray-900)]/30 rounded-lg border border-[var(--color-gray-600)]/20 group/item hover:border-[var(--color-electric-blue)]/30 transition-colors duration-300"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-semibold text-white group-hover/item:text-[var(--color-electric-blue)] transition-colors duration-300 leading-tight">
              {speech.title}
            </h4>
            <span className="text-xs text-[var(--color-gray-500)] whitespace-nowrap ml-2">
              {speech.date}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-[var(--color-gray-400)]">
            <span>{speech.company}</span>
            <div className="flex items-center space-x-1">
              <FaMicrophone className="w-3 h-3" />
              <span>{speech.audience}</span>
            </div>
          </div>
        </motion.div>
      ))}

      {speeches.length > initiallyVisible && (
        <div className="text-center pt-2">
          <button
            onClick={() => setExpanded(v => !v)}
            className="inline-flex items-center gap-1 text-xs text-[var(--color-electric-blue)] hover:underline"
          >
            {expanded ? "Collapse talks" : `+${speeches.length - initiallyVisible} more talks`}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="inline-block">▾</motion.span>
          </button>
        </div>
      )}
    </motion.div>
  );
};

const AboutPageEn = () => {
  const statsAuto = aggregateSpeechStats(speechCategories);

  return (
    <div className="relative min-h-screen text-[var(--color-white)] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-violet-glow)] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>

        <motion.div className="absolute top-1/4 right-1/5 w-8 h-8 border-2 border-[var(--color-electric-blue)]/20 rounded-full" variants={floatingVariants} animate="animate" />
        <motion.div className="absolute top-2/3 left-1/6 w-6 h-6 bg-[var(--color-violet-glow)]/30 rounded-lg" variants={floatingVariants} animate="animate" style={{animationDelay: '2s'}} />
        <motion.div className="absolute top-1/3 left-1/2 text-[var(--color-electric-blue)]/20 text-2xl" variants={floatingVariants} animate="animate" style={{animationDelay: '3s'}}>
          <FaRobot />
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--color-electric-blue)] to-[var(--color-violet-glow)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {pageText.title}
          </motion.h1>
          <motion.p className="text-xl text-[var(--color-gray-300)] max-w-4xl mx-auto leading-relaxed mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            {pageText.subtitle}
          </motion.p>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16" variants={containerVariants} initial="hidden" animate="visible">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="relative p-6 bg-gradient-to-br from-[var(--color-gray-800)]/60 to-[var(--color-gray-800)]/30 backdrop-blur-lg rounded-2xl border border-[var(--color-gray-700)]/50 text-center group hover:border-[var(--color-electric-blue)]/50 transition-all duration-300" whileHover={{ y: -5, scale: 1.05 }}>
                <div className="text-[var(--color-electric-blue)] mb-3 flex justify-center text-2xl">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}<span className="text-[var(--color-electric-blue)]">{stat.suffix}</span>
                </div>
                <div className="text-sm text-[var(--color-gray-400)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Highlights */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {highlights.map((highlight, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/90 to-[var(--color-gray-800)]/60 backdrop-blur-xl rounded-3xl p-8 border border-[var(--color-gray-700)]/50 transition-all duration-500 hover:border-[var(--color-electric-blue)]/50 hover:shadow-2xl hover:shadow-[var(--color-electric-blue)]/10" whileHover={{ y: -8, scale: 1.02 }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${highlight.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative text-center">
                <motion.div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${highlight.color} rounded-2xl mb-6 shadow-lg`} whileHover={{ rotate: 5, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="text-white">{highlight.icon}</div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">{highlight.title}</h3>
                <p className="text-[var(--color-gray-400)] leading-relaxed mb-6 group-hover:text-[var(--color-gray-300)] transition-colors duration-300">{highlight.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {highlight.metrics.map((metric, i) => (
                    <span key={i} className="px-3 py-1 bg-[var(--color-electric-blue)]/10 border border-[var(--color-electric-blue)]/20 rounded-full text-xs font-medium text-[var(--color-electric-blue)]">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-electric-blue)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col items-center w-full space-y-24">
          <section className="w-full">
            <motion.h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-electric-blue)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              {pageText.sections.experience}
            </motion.h2>
            <CreativeTimeline events={experiences} />
          </section>

          <section className="w-full">
            <motion.h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-violet-glow)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              {pageText.sections.education}
            </motion.h2>
            <CreativeTimeline events={education} />
          </section>

          <section className="w-full">
            <motion.h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-electric-blue)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              {pageText.sections.speeches}
            </motion.h2>

            {/* Quick stats about talks */}
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {[
                { label: 'Total Talks', value: String(statsAuto.talks) },
                { label: 'Categories', value: String(statsAuto.categories) },
                { label: 'Audience', value: `${statsAuto.audience}${statsAuto.audiencePlus ? '+' : ''}` },
                { label: 'Highlights', value: 'Selected' },
              ].map((s, i) => (
                <motion.div key={i} variants={itemVariants} className="relative p-6 bg-gradient-to-br from-[var(--color-gray-800)]/60 to-[var(--color-gray-800)]/30 backdrop-blur-lg rounded-2xl border border-[var(--color-gray-700)]/50 text-center group hover:border-[var(--color-electric-blue)]/50 transition-all duration-300" whileHover={{ y: -5, scale: 1.05 }}>
                  <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-sm text-[var(--color-gray-400)]">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {speechCategories.map((category, index) => (
                <motion.div key={index} variants={itemVariants} className="group relative overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-3xl p-8 border border-[var(--color-gray-700)]/50 transition-all duration-500 hover:border-[var(--color-electric-blue)]/50 hover:shadow-2xl hover:shadow-[var(--color-electric-blue)]/10" whileHover={{ y: -8, scale: 1.02 }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-electric-blue)]/5 to-[var(--color-violet-glow)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative text-center">
                    <motion.div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl mb-6 shadow-lg`} whileHover={{ rotate: 5, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <div className="text-white">{category.icon}</div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">{category.category}</h3>
                    <p className="text-[var(--color-gray-400)] mb-2 group-hover:text-[var(--color-gray-300)] transition-colors duration-300">
                      Talks: <span className="font-semibold text-[var(--color-electric-blue)]">{category.speeches.length}</span>
                      {' '}· Audience: <span className="font-semibold text-[var(--color-electric-blue)]">{category.totalAudience}</span>
                    </p>

                    <ExpandableSpeechList speeches={category.speeches} initiallyVisible={2} />
                  </div>
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-[var(--color-electric-blue)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="w-full">
            <motion.h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-electric-blue)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              {pageText.sections.languages}
            </motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {languages.map((lang, index) => (
                <motion.div key={index} variants={itemVariants} className="group relative overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-3xl p-8 border border-[var(--color-gray-700)]/50 transition-all duration-500 hover:border-[var(--color-electric-blue)]/50 hover:shadow-2xl hover:shadow-[var(--color-electric-blue)]/10 text-center" whileHover={{ y: -8, scale: 1.05 }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-electric-blue)]/5 to-[var(--color-violet-glow)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <motion.div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${lang.color} rounded-2xl mb-6 shadow-lg`} whileHover={{ rotate: 5, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <div className="text-white">{lang.icon}</div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">{lang.title}</h3>
                    <p className="text-[var(--color-gray-400)] mb-3 group-hover:text-[var(--color-gray-300)] transition-colors duration-300">{lang.description}</p>
                    <span className="px-4 py-2 bg-[var(--color-electric-blue)]/10 border border-[var(--color-electric-blue)]/20 rounded-full text-sm font-medium text-[var(--color-electric-blue)]">{lang.level}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="w-full">
            <motion.h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-violet-glow)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              Skills
            </motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              {skills.map((skillCategory, index) => (
                <motion.div key={index} variants={itemVariants} className="group relative overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-2xl p-6 border border-[var(--color-gray-700)]/50 transition-all duration-500 hover:border-[var(--color-electric-blue)]/50 hover:shadow-xl hover:shadow-[var(--color-electric-blue)]/10 text-center" whileHover={{ y: -5, scale: 1.02 }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${skillCategory.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <motion.div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${skillCategory.color} rounded-xl mb-4 shadow-lg`} whileHover={{ rotate: 5, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <div className="text-white text-lg">{skillCategory.icon}</div>
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">{skillCategory.category}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {skillCategory.items.map((skill, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-2 bg-[var(--color-gray-900)]/40 rounded-full border border-[var(--color-gray-600)]/30 hover:border-[var(--color-electric-blue)]/50 transition-all duration-300 text-sm font-medium text-white hover:text-[var(--color-electric-blue)] cursor-default">
                          <span className="text-[var(--color-electric-blue)] mr-2 text-xs">{skill.icon}</span>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-[var(--color-electric-blue)]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>

        {/* Call to Action */}
        <motion.div className="text-center mt-24" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">{pageText.cta.title}</h3>
            <p className="text-xl text-[var(--color-gray-300)] mb-8 leading-relaxed">{pageText.cta.description}</p>
            <div className="inline-flex items-center space-x-2 px-8 py-3 bg-[var(--color-electric-blue)]/10 border border-[var(--color-electric-blue)]/30 rounded-full text-[var(--color-electric-blue)]">
              <FaLightbulb className="animate-pulse" />
              <span className="font-medium">{pageText.cta.tagline}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPageEn;

