"use client";
import Link from "next/link";
import Image from "next/image";
import ParticlesBackground from "@/components/ParticlesBackground";
import { FaUserTie, FaGraduationCap, FaChalkboardTeacher, FaRobot, FaChartLine, FaArrowRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const coreDifferentiators = [
  {
    icon: <FaUserTie size={32} className="text-[var(--color-electric-blue)]" />,
    title: "Strategic Leadership",
    description: "I lead AI and data strategy end-to-end, translating technical potential into measurable business growth and competitive advantage.",
    highlight: "8+ projects delivered",
  },
  {
    icon: <FaGraduationCap size={32} className="text-[var(--color-electric-blue)]" />,
    title: "First‑Principles Thinking",
    description: "Trained in a top German university, I break down complex problems from fundamentals and design robust, innovative solutions—beyond off‑the‑shelf models.",
    highlight: "Top European academia",
  },
  {
    icon: <FaChalkboardTeacher size={32} className="text-[var(--color-electric-blue)]" />,
    title: "Industry Impact",
    description: "As an industry instructor, I share knowledge and build talent pipelines—keeping a pulse on the market while growing high‑performing teams.",
    highlight: "5+ mentees placed",
  },
];

const homepageServices = [
  {
    icon: <FaRobot size={28} className="text-[var(--color-electric-blue)]" />,
    title: "AI Product Development & Data Strategy",
    description: "Turn cutting‑edge AI into real products and craft data‑driven strategies to help you lead the market.",
    link: "/en/service",
    features: ["Custom LLMs", "RAG deployments", "Hybrid architectures"],
  },
  {
    icon: <FaUserTie size={28} className="text-[var(--color-electric-blue)]" />,
    title: "Career Coaching & Talent Enablement",
    description: "Personalized planning, resume optimization, and interview prep to help you find your niche and accelerate growth in AI.",
    link: "/en/service",
    features: ["1‑on‑1 mentoring", "Resume optimization", "Interview prep"],
  },
  {
    icon: <FaChartLine size={28} className="text-[var(--color-electric-blue)]" />,
    title: "Business Insights & Decision Optimization",
    description: "Uncover key insights through deep analytics and optimize decision processes for sustainable growth.",
    link: "/en/service",
    features: ["Data visualization", "KPI dashboards", "Impact analysis"],
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

export default function HomeEn() {
  return (
    <div className="relative min-h-screen text-[var(--color-white)] overflow-x-hidden">
      <ParticlesBackground />

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-violet-glow)] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>

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
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl items-center">

            <motion.div
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Profile */}
              <div className="relative w-52 h-52 mb-8 group z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-violet-glow)] rounded-full animate-spin-slow blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-[var(--color-electric-blue)]/20 to-[var(--color-violet-glow)]/20 rounded-full animate-pulse"></div>

                <Image
                  src="/profile.png"
                  alt="Chien-Sheng Liu"
                  width={208}
                  height={208}
                  priority
                  className="relative z-10 rounded-full border-4 border-[var(--color-gray-700)] shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
                  style={{ position: 'relative' }}
                />

                <div className="absolute -bottom-2 -right-2 z-30 bg-green-500 w-8 h-8 rounded-full border-4 border-[var(--color-deep-space)] flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

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

              <motion.div
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {["AI Strategy Consultant", "Career Mentor", "Data Science Expert"].map((tag, index) => (
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
                An experienced <span className="text-[var(--color-electric-blue)] font-semibold">AI strategy consultant</span> and <span className="text-[var(--color-violet-glow)] font-semibold">career mentor</span> dedicated to turning data into core advantage for organizations and empowering individuals to level up in the AI era.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/en/about">
                  <motion.button
                    className="group relative px-8 py-4 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-electric-blue)]/80 text-[var(--color-white)] font-bold rounded-full transition-all duration-300 shadow-lg shadow-[var(--color-electric-blue)]/30 hover:shadow-[var(--color-electric-blue)]/50 hover:shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center">
                      Explore my background
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </Link>
                <Link href="/en/contact">
                  <motion.button
                    className="group relative px-8 py-4 bg-transparent border-2 border-[var(--color-violet-glow)] text-[var(--color-violet-glow)] font-bold rounded-full transition-all duration-300 hover:bg-[var(--color-violet-glow)] hover:text-white shadow-lg shadow-[var(--color-violet-glow)]/30 hover:shadow-[var(--color-violet-glow)]/50 hover:shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-[var(--color-violet-glow)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center">
                      Get in touch
                      <FaStar className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Differentiators */}
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

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--color-electric-blue)]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* Services */}
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
                My Services
              </h2>
              <p className="text-xl text-[var(--color-gray-300)] max-w-3xl mx-auto leading-relaxed">
                End‑to‑end AI solutions from technical implementation to talent enablement—so you can win in digital transformation.
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

                      <div className="space-y-2 mb-6 w-full">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-[var(--color-gray-500)] group-hover:text-[var(--color-gray-400)] transition-colors duration-300">
                            <div className="w-2 h-2 bg-[var(--color-electric-blue)] rounded-full mr-3"></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="inline-flex items-center text-[var(--color-electric-blue)] font-semibold group-hover:text-[var(--color-violet-glow)] transition-colors duration-300">
                        Learn more
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>

                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--color-electric-blue)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/en/service">
                <motion.button
                  className="group relative px-12 py-6 bg-gradient-to-r from-[var(--color-violet-glow)] to-[var(--color-electric-blue)] text-[var(--color-white)] font-bold text-lg rounded-full transition-all duration-300 shadow-2xl shadow-[var(--color-violet-glow)]/30 hover:shadow-[var(--color-violet-glow)]/50 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    Explore full services
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

