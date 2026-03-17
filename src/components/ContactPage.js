"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";
import Card3D from "./Card3D";
import AnimatedGradientBg from "./AnimatedGradientBg";

const TO_EMAIL = "liu_chiensheng@outlook.com";
const CALENDAR_URL = "https://calendar.app.google/jPexFUzauM39fYfV9";
const LINKEDIN_URL = "https://www.linkedin.com/in/chienshengliu/";

/** Locale-specific text bundles */
const i18n = {
  zh: {
    heroTitle: "與我聯繫",
    heroDesc: (
      <>
        我非常樂意與您討論潛在的合作機會、專案想法，或任何與{" "}
        <span className="text-sky-500 font-semibold">數據科學</span>、
        <span className="text-indigo-500 font-semibold">AI</span> 相關的話題。
      </>
    ),
    quickInfo: [
      { icon: <FaMapMarkerAlt size={20} />, label: "位置", value: "香港, 香港" },
      { icon: <FaClock size={20} />, label: "回覆時間", value: "24-48 小時內" },
      { icon: <FaGlobe size={20} />, label: "語言", value: "中文, English, Deutsch" },
    ],
    sectionTitle: "聯絡方式",
    email: { label: "Email", desc: "最快的聯繫方式" },
    linkedin: { label: "LinkedIn", desc: "專業社交網路" },
    calendar: { label: "預約會談（Google Calendar）", value: "預約 30 分鐘諮詢", desc: "直接選擇可用時段進行預約" },
    commitTitle: "回覆承諾",
    commitDesc: "我承諾在 24-48 小時內回覆所有訊息。對於緊急事項，請直接透過 Email 聯繫，並在主旨標註「緊急」。",
    ctaTitle: "準備開始合作了嗎？",
    ctaDesc: "無論是 AI 專案開發、職涯諮詢，或是任何數據科學相關的挑戰，我都很樂意與您討論並提供專業建議。",
    ctaOnline: "線上且隨時準備回覆",
    calendarModal: {
      title: "選擇可約時段",
      tz: "時區：HKT（UTC+8）。你也可以直接開啟 Google Calendar 預約。",
      slots: ["本週三 20:00 - 20:30", "本週六 10:00 - 10:30", "下週一 19:30 - 20:00"],
      book: "預約",
      openCal: "開啟 Google Calendar",
      later: "稍後再說",
    },
  },
  en: {
    heroTitle: "Contact Me",
    heroDesc: (
      <>
        I&apos;d love to discuss potential collaborations, project ideas, or anything related to{" "}
        <span className="text-sky-500 font-semibold">Data Science</span> and{" "}
        <span className="text-indigo-500 font-semibold">AI</span>.
      </>
    ),
    quickInfo: [
      { icon: <FaMapMarkerAlt size={20} />, label: "Location", value: "Hong Kong" },
      { icon: <FaClock size={20} />, label: "Response", value: "24–48 hours" },
      { icon: <FaGlobe size={20} />, label: "Languages", value: "Chinese, English, Deutsch" },
    ],
    sectionTitle: "Contact Methods",
    email: { label: "Email", desc: "Fastest way to reach me" },
    linkedin: { label: "LinkedIn", desc: "Professional network" },
    calendar: { label: "Book a call (Google Calendar)", value: "Schedule a 30-min chat", desc: "Preview timeslots or book directly" },
    commitTitle: "Response Commitment",
    commitDesc: "I commit to replying within 24–48 hours. For urgent matters, please email directly and include \"URGENT\" in the subject.",
    ctaTitle: "Ready to collaborate?",
    ctaDesc: "Whether it\u2019s AI development, career consulting, or any data challenge, I\u2019m happy to discuss and provide professional advice.",
    ctaOnline: "Online and ready to reply",
    calendarModal: {
      title: "Pick a timeslot",
      tz: "Timezone: HKT (UTC+8). You can also book directly via Google Calendar.",
      slots: ["Wed 8:00–8:30 PM", "Sat 10:00–10:30 AM", "Mon 7:30–8:00 PM"],
      book: "Book",
      openCal: "Open Google Calendar",
      later: "Maybe later",
    },
  },
  yue: {
    heroTitle: "聯絡我",
    heroDesc: (
      <>
        歡迎討論合作、項目諗法，或者任何關於{" "}
        <span className="text-sky-500 font-semibold">數據科學</span> 同{" "}
        <span className="text-indigo-500 font-semibold">AI</span> 嘅主題。
      </>
    ),
    quickInfo: [
      { icon: <FaMapMarkerAlt size={20} />, label: "位置", value: "香港" },
      { icon: <FaClock size={20} />, label: "回覆時間", value: "24–48 小時" },
      { icon: <FaGlobe size={20} />, label: "語言", value: "中文、English、Deutsch" },
    ],
    sectionTitle: "聯絡方式",
    email: { label: "Email", desc: "最快聯絡方式" },
    linkedin: { label: "LinkedIn", desc: "專業社交網絡" },
    calendar: { label: "預約會談（Google Calendar）", value: "預約 30 分鐘", desc: "睇可約時段或直接預約" },
    commitTitle: "回覆承諾",
    commitDesc: "我承諾 24–48 小時內回覆。如有急事，請直接 Email 並喺主旨註明「緊急」。",
    ctaTitle: "準備開始合作未？",
    ctaDesc: "無論係 AI 開發、職涯諮詢，或者任何數據挑戰，我都樂意傾下同提供專業建議。",
    ctaOnline: "在線，隨時回覆",
    calendarModal: {
      title: "揀時段",
      tz: "時區：HKT（UTC+8）。你亦可直接開 Google Calendar 預約。",
      slots: ["本週三 20:00 - 20:30", "本週六 10:00 - 10:30", "下週一 19:30 - 20:00"],
      book: "預約",
      openCal: "開啟 Google Calendar",
      later: "稍後再說",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactPage({ locale = "zh" }) {
  const t = i18n[locale] || i18n.zh;
  const [calendarOpen, setCalendarOpen] = useState(false);

  const contactInfo = [
    { icon: <FaEnvelope size={24} />, label: t.email.label, value: TO_EMAIL, href: `mailto:${TO_EMAIL}`, description: t.email.desc, color: "from-red-500 to-orange-500" },
    { icon: <FaLinkedin size={24} />, label: t.linkedin.label, value: "Chien-Sheng (Morris) Liu", href: LINKEDIN_URL, description: t.linkedin.desc, color: "from-blue-600 to-blue-400" },
    { icon: <FaCalendarAlt size={24} />, label: t.calendar.label, value: t.calendar.value || t.calendar.label, href: CALENDAR_URL, description: t.calendar.desc, color: "from-green-600 to-emerald-400", type: "calendar" },
  ];

  return (
    <div className="relative min-h-screen text-[#1d1d1f] overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.heroDesc}
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-4 mb-12" variants={containerVariants} initial="hidden" animate="visible">
            {t.quickInfo.map((info, index) => (
              <motion.div key={index} variants={itemVariants} className="flex items-center space-x-3 px-6 py-3 bg-white/70 backdrop-blur-sm shadow-sm rounded-full border border-slate-200/60">
                <div className="text-sky-500">{info.icon}</div>
                <div>
                  <span className="text-slate-400 text-sm">{info.label}:</span>
                  <span className="text-[#1d1d1f] font-medium ml-2">{info.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Contact cards */}
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <motion.h2 className="text-3xl font-bold text-[#1d1d1f] mb-8" variants={itemVariants}>
              {t.sectionTitle}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((item, index) => {
                const inner = (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    <div className="relative flex items-center space-x-6">
                      <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-sky-600 transition-colors duration-300">{item.label}</h3>
                        <p className="text-slate-500 font-medium mt-1 group-hover:text-slate-700 transition-colors duration-300">{item.value}</p>
                        <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-all duration-300">
                        <span className="text-sky-500 text-sm">→</span>
                      </div>
                    </div>
                  </>
                );
                return (
                  <ScrollReveal key={index} delay={index * 100}>
                    <Card3D intensity={5}>
                      {item.type === "calendar" ? (
                        <button type="button" onClick={() => setCalendarOpen(true)} className="group block relative w-full overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm transition-all duration-500 hover:border-sky-300 hover:shadow-md text-left">
                          {inner}
                        </button>
                      ) : (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm transition-all duration-500 hover:border-sky-300 hover:shadow-md">
                          {inner}
                        </a>
                      )}
                    </Card3D>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Commitment box */}
            <ScrollReveal delay={300}>
              <div className="relative overflow-hidden bg-indigo-50/60 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200/60">
                <div className="relative">
                  <h3 className="text-lg font-bold text-indigo-500 mb-2">{t.commitTitle}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.commitDesc}</p>
                </div>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="relative mt-24">
          <AnimatedGradientBg variant="bottom" />
          <ScrollReveal>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-[#1d1d1f] mb-4">{t.ctaTitle}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">{t.ctaDesc}</p>
              <div className="inline-flex items-center space-x-2 px-8 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-full text-sky-600 shadow-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium">{t.ctaOnline}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Calendar modal */}
      {calendarOpen && (
        <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel border border-white/40 rounded-2xl p-6 relative shadow-2xl">
            <button onClick={() => setCalendarOpen(false)} className="absolute top-3 right-3 rounded-full bg-slate-100 hover:bg-slate-200 px-2 py-1 text-sm text-slate-600">✕</button>
            <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">{t.calendarModal.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{t.calendarModal.tz}</p>
            <div className="space-y-2 mb-4">
              {t.calendarModal.slots.map((slot, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50/80 border border-slate-200/60 rounded-xl px-4 py-3">
                  <div className="text-[#1d1d1f] text-sm">{slot}</div>
                  <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-indigo-500 text-sm font-semibold">{t.calendarModal.book}</a>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-sky-500 text-white font-semibold">{t.calendarModal.openCal}</a>
              <button onClick={() => setCalendarOpen(false)} className="text-sm text-slate-500 hover:text-slate-800">{t.calendarModal.later}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
