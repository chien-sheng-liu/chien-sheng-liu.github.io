'use client';

import { motion } from 'framer-motion';
import { FaLightbulb, FaArrowRight, FaCheckCircle, FaUsers, FaStar, FaTrophy, FaRocket, FaChartLine, FaEnvelope, FaPhone } from 'react-icons/fa';
import Link from 'next/link';

const services = [
  {
    icon: <FaLightbulb size={32} />,
    title: "職涯諮詢同人才賦能",
    subtitle: "Career Consulting & Talent Development",
    type: "顧問制",
    description: "一對一專業指導，由技能評估到職涯策略，幫你達到突破性增長。",
    features: ["履歷健檢與優化", "模擬面試同回饋", "技能樹規劃", "行業趨勢分析", "薪酬談判策略", "轉職指導"],
    process: ["需求評估", "技能分析", "策略制定", "實作指導", "持續追蹤"],
    clients: "求職者、轉職者",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "AI 數據科學顧問",
    subtitle: "AI & Data Science Consulting",
    type: "顧問制",
    description: "由策略到實作嘅端到端數據方案，將數據變成競爭優勢。",
    features: ["數據戰略", "AI 模型開發", "數據架構設計", "機器學習部署", "性能優化", "團隊培訓"],
    process: ["問題定義", "數據評估", "方案設計", "模型開發", "部署上線"],
    clients: "中小企、新創",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: <FaRocket size={32} />,
    title: "AI 產品開發",
    subtitle: "AI Product Development",
    type: "服務制",
    description: "由概念到上線，打造智能數據產品同應用。",
    features: ["需求訪談", "系統架構設計", "前後端實作", "AI 模型整合", "雲端部署", "維護支援"],
    process: ["需求", "原型", "開發", "測試部署", "營運"],
    clients: "企業、產品團隊",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
];

const achievements = [
  { icon: <FaTrophy />, label: "成功案例", value: "50+", color: "text-yellow-500" },
  { icon: <FaUsers />, label: "服務客戶", value: "30+", color: "text-blue-500" },
  { icon: <FaStar />, label: "滿意度", value: "98%", color: "text-green-500" },
  { icon: <FaRocket />, label: "完成專案", value: "40+", color: "text-purple-500" },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const floatingVariants = { animate: { y: [-8, 8, -8], x: [-3, 3, -3], rotate: [-2, 2, -2], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } } };

const ServicePageYue = () => {
  return (
    <div className="relative min-h-screen text-[var(--color-white)] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-violet-glow)] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{animationDelay:'2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay:'4s'}}></div>
        <motion.div className="absolute top-1/4 right-1/5 text-[var(--color-electric-blue)]/20 text-3xl" variants={floatingVariants} animate="animate"><FaLightbulb /></motion.div>
        <motion.div className="absolute top-2/3 left-1/6 w-6 h-6 border-2 border-[var(--color-violet-glow)]/30 rounded-full" variants={floatingVariants} animate="animate" style={{animationDelay:'2s'}}/>
        <motion.div className="absolute top-1/3 left-1/2 text-[var(--color-electric-blue)]/20 text-2xl" variants={floatingVariants} animate="animate" style={{animationDelay:'3s'}}><FaRocket /></motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div className="text-center mb-16" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}}>
          <motion.h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--color-electric-blue)] to-[var(--color-violet-glow)]" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8, delay:0.2}}>
            服務內容
          </motion.h1>
          <motion.p className="text-xl text-[var(--color-gray-300)] max-w-3xl mx-auto leading-relaxed" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8, delay:0.4}}>
            由顧問到交付——務實嘅 AI，帶嚟實際可量化嘅影響。
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" variants={containerVariants} initial="hidden" animate="visible">
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-2xl p-8 border border-[var(--color-gray-700)]/50 transition-all duration-500 hover:border-[var(--color-electric-blue)]/50 hover:shadow-2xl hover:shadow-[var(--color-electric-blue)]/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-electric-blue)]/5 to-[var(--color-violet-glow)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <motion.div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-gray-700)] to-[var(--color-gray-900)] rounded-2xl mb-6" whileHover={{ rotate: 5, scale: 1.05 }}>
                  <span className="text-white">{service.icon}</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">{service.title}</h3>
                <p className="text-sm text-[var(--color-gray-400)] mb-4">{service.subtitle}</p>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-electric-blue)]/10 border border-[var(--color-electric-blue)]/20 text-[var(--color-electric-blue)]`}>
                    {service.type}
                  </span>
                </div>
                <p className="text-[var(--color-gray-400)] leading-relaxed mb-6 group-hover:text-[var(--color-gray-300)] transition-colors duration-300">{service.description}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><FaCheckCircle className="text-[var(--color-electric-blue)] mr-2" />服務內容</h4>
                <div className="grid grid-cols-1 gap-3">
                  {service.features.map((feature, i) => (<div key={i} className="flex items-center text-sm text-[var(--color-gray-400)]"><div className="w-2 h-2 bg-[var(--color-electric-blue)] rounded-full mr-3"></div>{feature}</div>))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><FaArrowRight className="text-[var(--color-violet-glow)] mr-2" />服務流程</h4>
                <div className="flex flex-wrap gap-2">
                  {service.process.map((step, i) => (<span key={i} className="px-3 py-1 bg-[var(--color-electric-blue)]/10 border border-[var(--color-electric-blue)]/20 rounded-full text-xs font-medium text-[var(--color-electric-blue)]">{i + 1}. {step}</span>))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-[var(--color-gray-900)]/30 rounded-xl border border-[var(--color-gray-600)]/20">
                <div className="text-center"><FaUsers className="text-[var(--color-violet-glow)] mx-auto mb-1" /><div className="text-xs text-[var(--color-gray-400)] mb-1">適合對象</div><div className="text-xs font-semibold text-white whitespace-pre-line">{service.clients}</div></div>
              </div>
              <motion.button className={`w-full py-4 px-6 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group/btn`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span>即刻聯絡</span>
                <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </motion.button>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-electric-blue)]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mb-20" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">客戶見證</h2>
            <p className="text-xl text-[var(--color-gray-300)] max-w-3xl mx-auto">聽下客戶點講</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name:"P 先生", company:"室內設計師 → 數據分析師", content:"半年內成功轉職，月薪 45K+", rating:5 },
              { name:"L 先生", company:"歐語雙主修經濟", content:"錄取曼海姆/波昂經濟碩士，現赴英讀博", rating:5 },
              { name:"L 小姐", company:"半導體公司", content:"協助建立 Tableau 儀表板，完成產線監控分析", rating:5 },
            ].map((t, i) => (
              <motion.div key={i} className="relative overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-2xl p-6 border border-[var(--color-gray-700)]/50" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.1}} whileHover={{y:-5}}>
                <div className="flex items-center mb-4">{[...Array(t.rating)].map((_, k) => <FaStar key={k} className="text-yellow-500 mr-1" />)}</div>
                <p className="text-[var(--color-gray-300)] mb-4 italic">"{t.content}"</p>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-[var(--color-gray-400)]">{t.company}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="text-center" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
          <div className="max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/90 to-[var(--color-gray-800)]/60 backdrop-blur-xl rounded-3xl p-12 border border-[var(--color-gray-700)]/50">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)]/5 to-[var(--color-violet-glow)]/5"></div>
            <div className="relative">
              <h3 className="text-4xl font-bold text-white mb-6">準備開始你嘅數據旅程？</h3>
              <p className="text-xl text-[var(--color-gray-300)] mb-8 leading-relaxed">無論你係個人搵突破，定係企業想轉型，我都可以提供客製服務。傾一傾你嘅需要，一齊搵最佳方案。</p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                <Link href="/yue/contact">
                  <motion.button className="group px-10 py-4 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-violet-glow)] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-2xl shadow-[var(--color-electric-blue)]/30 hover:shadow-[var(--color-electric-blue)]/50" whileHover={{scale:1.05,y:-3}} whileTap={{scale:0.95}}>
                    <span className="flex items-center space-x-3"><FaEnvelope /><span>立即聯絡我</span><motion.div animate={{x:[0,3,0]}} transition={{duration:2,repeat:Infinity}}><FaArrowRight /></motion.div></span>
                  </motion.button>
                </Link>
                <div className="flex items-center space-x-2 text-[var(--color-gray-400)]"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div><span className="font-medium">通常 24 小時內回覆</span></div>
              </div>
              <div className="flex justify-center space-x-8 text-sm text-[var(--color-gray-500)]">
                <div className="flex items-center space-x-2"><FaEnvelope className="text-[var(--color-electric-blue)]" /><span>Email 諮詢</span></div>
                <div className="flex items-center space-x-2"><FaPhone className="text-[var(--color-violet-glow)]" /><span>視像會議</span></div>
                <div className="flex items-center space-x-2"><FaUsers className="text-[var(--color-electric-blue)]" /><span>現場拜訪</span></div>
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--color-electric-blue)]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--color-violet-glow)]/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicePageYue;

