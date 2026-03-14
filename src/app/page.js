"use client";
import Link from "next/link";
import Image from "next/image";
import ParticlesBackground from "../components/ParticlesBackground";
import { FaUserTie, FaGraduationCap, FaChalkboardTeacher, FaRobot, FaChartLine, FaArrowRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const coreDifferentiators = [
  {
    icon: <FaUserTie size={32} className="text-[var(--color-electric-blue)]" />,
    title: "戰略領導力",
    description: "不僅是管理團隊，更是制定與執行 AI 數據戰略，將技術潛力轉化為可衡量的商業增長與市場競爭優勢。",
    highlight: "8+ 專案成功執行",
  },
  {
    icon: <FaGraduationCap size={32} className="text-[var(--color-electric-blue)]" />,
    title: "第一性原理思維",
    description: "德國頂尖學府的訓練，讓我擅長從問題本質出發，解構複雜挑戰，建立穩固且創新的解決方案，而不僅是套用現成模型。",
    highlight: "德國頂尖學府背景",
  },
  {
    icon: <FaChalkboardTeacher size={32} className="text-[var(--color-electric-blue)]" />,
    title: "行業影響力",
    description: "作為業界講師，我不只分享知識，更建立人才生態系。這讓我能洞悉產業脈動，並為組織吸引、培育頂尖人才。",
    highlight: "5+ 位學生成功就業",
  },
];

const homepageServices = [
  {
    icon: <FaRobot size={28} className="text-[var(--color-electric-blue)]" />,
    title: "AI 產品開發與數據戰略",
    description: "將前沿 AI 技術轉化為實際產品，並制定數據驅動的商業策略，助您在市場中取得領先。",
    link: "/service",
    features: ["客製化語言模型", "RAG 系統部署", "混合架構設計"],
  },
  {
    icon: <FaUserTie size={28} className="text-[var(--color-electric-blue)]" />,
    title: "職涯諮詢與人才賦能",
    description: "提供個人化職涯規劃、履歷優化與面試指導，助您在 AI 領域找到理想定位並加速成長。",
    link: "/service",
    features: ["一對一指導", "履歷優化", "面試準備"],
  },
  {
    icon: <FaChartLine size={28} className="text-[var(--color-electric-blue)]" />,
    title: "商業洞察與決策優化",
    description: "透過深度數據分析，揭示關鍵商業洞察，優化決策流程，實現可持續的業務增長。",
    link: "/service",
    features: ["數據視覺化", "KPI 儀表板", "成效分析"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen text-[var(--color-white)] overflow-x-hidden">
      <ParticlesBackground />

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Multiple Aurora Layers */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-violet-glow)] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-[var(--color-electric-blue)] rounded-full opacity-60"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-2/3 left-1/5 w-1 h-1 bg-[var(--color-violet-glow)] rounded-full opacity-80"
          variants={floatingVariants}
          animate="animate"
          style={{animationDelay: '1s'}}
        />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl items-center">

            <motion.div
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Profile Image - 修復路徑和 z-index */}
              <div className="relative w-52 h-52 mb-8 group z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-violet-glow)] rounded-full animate-spin-slow blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-[var(--color-electric-blue)]/20 to-[var(--color-violet-glow)]/20 rounded-full animate-pulse"></div>

                {/* 修復圖片路徑 - 移除專案結構路徑 */}
                <Image
                  src="/profile.png"
                  alt="Chien-Sheng Liu"
                  width={208}
                  height={208}
                  priority
                  className="relative z-10 rounded-full border-4 border-[var(--color-gray-700)] shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
                  style={{ position: 'relative' }}
                />

                {/* Status Badge */}
                <div className="absolute -bottom-2 -right-2 z-30 bg-green-500 w-8 h-8 rounded-full border-4 border-[var(--color-deep-space)] flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced Title and Description */}
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-violet-glow)] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Morris
                <div className="text-2xl md:text-3xl font-medium text-[var(--color-gray-300)] mt-2">
                  Chien-Sheng Liu
                </div>
              </motion.h1>

              {/* Professional Tags */}
              <motion.div
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {['AI 策略顧問', '職涯導師', '資料科學專家'].map((tag, index) => (
                  <span key={index} className="px-4 py-2 bg-[var(--color-electric-blue)]/20 border border-[var(--color-electric-blue)]/40 rounded-full text-sm font-medium text-[var(--color-electric-blue)] backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-[var(--color-gray-300)] max-w-xl mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                作為一位經驗豐富的 <span className="text-[var(--color-electric-blue)] font-semibold">AI 策略顧問</span> 與 <span className="text-[var(--color-violet-glow)] font-semibold">職涯導師</span>，我致力於協助企業將數據轉化為核心競爭力，並賦能個人在快速變遷的 AI 時代中實現職涯躍升。
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/about">
                  <motion.button
                    className="group relative px-8 py-4 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-electric-blue)]/80 text-[var(--color-white)] font-bold rounded-full transition-all duration-300 shadow-lg shadow-[var(--color-electric-blue)]/30 hover:shadow-[var(--color-electric-blue)]/50 hover:shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center">
                      探索我的專業背景
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="group relative px-8 py-4 bg-transparent border-2 border-[var(--color-violet-glow)] text-[var(--color-violet-glow)] font-bold rounded-full transition-all duration-300 hover:bg-[var(--color-violet-glow)] hover:text-white shadow-lg shadow-[var(--color-violet-glow)]/30 hover:shadow-[var(--color-violet-glow)]/50 hover:shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-[var(--color-violet-glow)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center">
                      立即諮詢
                      <FaStar className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Enhanced Core Differentiators */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {coreDifferentiators.map((insight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-2xl p-8 border border-[var(--color-gray-700)]/50 transition-all duration-500 hover:border-[var(--color-electric-blue)]/50 hover:shadow-2xl hover:shadow-[var(--color-electric-blue)]/10 overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)]/5 via-transparent to-[var(--color-violet-glow)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex items-start space-x-6">
                    <motion.div
                      className="flex-shrink-0 mt-1 p-3 bg-[var(--color-electric-blue)]/10 rounded-xl border border-[var(--color-electric-blue)]/20 group-hover:bg-[var(--color-electric-blue)]/20 transition-all duration-300"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {insight.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-[var(--color-white)] group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">
                          {insight.title}
                        </h3>
                        <span className="px-3 py-1 bg-[var(--color-violet-glow)]/20 border border-[var(--color-violet-glow)]/30 rounded-full text-xs font-semibold text-[var(--color-violet-glow)]">
                          {insight.highlight}
                        </span>
                      </div>
                      <p className="text-[var(--color-gray-400)] leading-relaxed group-hover:text-[var(--color-gray-300)] transition-colors duration-300">
                        {insight.description}
                      </p>
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--color-electric-blue)]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className="py-24 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--color-electric-blue)] to-[var(--color-violet-glow)]">
                我的服務
              </h2>
              <p className="text-xl text-[var(--color-gray-300)] max-w-3xl mx-auto leading-relaxed">
                提供全方位的 AI 解決方案，從技術實現到人才培育，助您在數位轉型的道路上取得成功
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {homepageServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-2xl p-8 border border-[var(--color-gray-700)]/50 transition-all duration-500 hover:border-[var(--color-electric-blue)]/50 hover:shadow-2xl hover:shadow-[var(--color-electric-blue)]/10 overflow-hidden"
                  whileHover={{ y: -12, scale: 1.03 }}
                >
                  {/* Service Card Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-electric-blue)]/5 via-transparent to-[var(--color-violet-glow)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <Link href={service.link} className="block relative">
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="mb-6 p-4 bg-[var(--color-electric-blue)]/10 rounded-2xl border border-[var(--color-electric-blue)]/20 group-hover:bg-[var(--color-electric-blue)]/20 transition-all duration-300"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        {service.icon}
                      </motion.div>

                      <h3 className="text-2xl font-bold text-[var(--color-white)] mb-4 group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-[var(--color-gray-400)] mb-6 leading-relaxed group-hover:text-[var(--color-gray-300)] transition-colors duration-300">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 mb-6 w-full">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-[var(--color-gray-500)] group-hover:text-[var(--color-gray-400)] transition-colors duration-300">
                            <div className="w-2 h-2 bg-[var(--color-electric-blue)] rounded-full mr-3"></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="inline-flex items-center text-[var(--color-electric-blue)] font-semibold group-hover:text-[var(--color-violet-glow)] transition-colors duration-300">
                        了解更多
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>

                  {/* Corner Glow */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--color-electric-blue)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/service">
                <motion.button
                  className="group relative px-12 py-6 bg-gradient-to-r from-[var(--color-violet-glow)] to-[var(--color-electric-blue)] text-[var(--color-white)] font-bold text-lg rounded-full transition-all duration-300 shadow-2xl shadow-[var(--color-violet-glow)]/30 hover:shadow-[var(--color-violet-glow)]/50 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    探索完整服務內容
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaArrowRight />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}