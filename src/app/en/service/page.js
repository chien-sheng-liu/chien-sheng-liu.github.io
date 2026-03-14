'use client';

import { motion } from 'framer-motion';
import { FaLightbulb, FaArrowRight, FaCheckCircle, FaUsers, FaStar, FaTrophy, FaRocket, FaChartLine, FaEnvelope, FaPhone } from 'react-icons/fa';
import Link from 'next/link';

const services = [
  {
    icon: <FaLightbulb size={32} />,
    title: "Career Coaching & Talent Enablement",
    subtitle: "Career Consulting & Talent Development",
    type: "Advisory",
    description: "1‑on‑1 guidance from skills assessment to career strategy to help you achieve breakthrough growth.",
    features: [
      "Resume review & optimization",
      "Mock interviews & feedback",
      "Skills tree planning",
      "Industry trends analysis",
      "Salary negotiation strategy",
      "Career transition guidance"
    ],
    process: ["Needs assessment", "Skills analysis", "Strategy", "Hands‑on guidance", "Follow‑ups"],
    clients: "Job seekers, career changers",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "AI & Data Science Consulting",
    subtitle: "AI & Data Science Consulting",
    type: "Advisory",
    description: "End‑to‑end data solutions from strategy to implementation—turn data into competitive advantage.",
    features: [
      "Data strategy",
      "AI model development",
      "Data architecture design",
      "ML deployment",
      "Performance optimization",
      "Team training"
    ],
    process: ["Problem definition", "Data assessment", "Solution design", "Modeling", "Deployment"],
    clients: "SMBs, startups",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: <FaRocket size={32} />,
    title: "AI Product Development",
    subtitle: "AI Product Development",
    type: "Delivery",
    description: "Build intelligent data products from concept to launch with robust engineering.",
    features: [
      "Product discovery",
      "System architecture",
      "Frontend & backend",
      "AI integration",
      "Cloud deployment",
      "Maintenance & support"
    ],
    process: ["Discovery", "Prototyping", "Implementation", "Testing & release", "Operate"],
    clients: "Product teams, enterprises",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
];

const achievements = [
  { icon: <FaTrophy />, label: "Success cases", value: "50+", color: "text-yellow-500" },
  { icon: <FaUsers />, label: "Clients served", value: "30+", color: "text-blue-500" },
  { icon: <FaStar />, label: "Satisfaction", value: "98%", color: "text-green-500" },
  { icon: <FaRocket />, label: "Projects delivered", value: "40+", color: "text-purple-500" },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const floatingVariants = { animate: { y: [-8, 8, -8], x: [-3, 3, -3], rotate: [-2, 2, -2], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } } };

const ServicePageEn = () => {
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
            Services
          </motion.h1>
          <motion.p className="text-xl text-[var(--color-gray-300)] max-w-3xl mx-auto leading-relaxed" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8, delay:0.4}}>
            From advisory to delivery—practical AI that drives measurable impact.
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
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><FaCheckCircle className="text-[var(--color-electric-blue)] mr-2" />What's included</h4>
                <div className="grid grid-cols-1 gap-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-[var(--color-gray-400)]"><div className="w-2 h-2 bg-[var(--color-electric-blue)] rounded-full mr-3"></div>{feature}</div>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><FaArrowRight className="text-[var(--color-violet-glow)] mr-2" />Process</h4>
                <div className="flex flex-wrap gap-2">
                  {service.process.map((step, i) => (
                    <span key={i} className="px-3 py-1 bg-[var(--color-electric-blue)]/10 border border-[var(--color-electric-blue)]/20 rounded-full text-xs font-medium text-[var(--color-electric-blue)]">{i + 1}. {step}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-[var(--color-gray-900)]/30 rounded-xl border border-[var(--color-gray-600)]/20">
                <div className="text-center">
                  <FaUsers className="text-[var(--color-violet-glow)] mx-auto mb-1" />
                  <div className="text-xs text-[var(--color-gray-400)] mb-1">Best for</div>
                  <div className="text-xs font-semibold text-white whitespace-pre-line">{service.clients}</div>
                </div>
              </div>
              <motion.button className={`w-full py-4 px-6 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group/btn`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span>Contact now</span>
                <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </motion.button>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-electric-blue)]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mb-20" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Testimonials</h2>
            <p className="text-xl text-[var(--color-gray-300)] max-w-3xl mx-auto">What clients say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name:"Mr. P", company:"Interior designer → Data analyst", content:"Transitioned into data analytics within 6 months—now earning 45K+", rating:5 },
              { name:"Mr. L", company:"Double major in European Languages & Economics", content:"Admitted to Univ. of Mannheim and Bonn (MSc Economics); now pursuing a PhD in the UK", rating:5 },
              { name:"Ms. L", company:"Semiconductor company", content:"Built Tableau dashboards for production analytics and monitoring", rating:5 },
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
              <h3 className="text-4xl font-bold text-white mb-6">Ready to start your data journey?</h3>
              <p className="text-xl text-[var(--color-gray-300)] mb-8 leading-relaxed">Whether you want career breakthroughs or business transformation, I provide tailored services. Let’s discuss your needs and craft the best solution.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                <Link href="/en/contact">
                  <motion.button className="group px-10 py-4 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-violet-glow)] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-2xl shadow-[var(--color-electric-blue)]/30 hover:shadow-[var(--color-electric-blue)]/50" whileHover={{scale:1.05,y:-3}} whileTap={{scale:0.95}}>
                    <span className="flex items-center space-x-3">
                      <FaEnvelope /><span>Contact me</span>
                      <motion.div animate={{x:[0,3,0]}} transition={{duration:2,repeat:Infinity}}><FaArrowRight /></motion.div>
                    </span>
                  </motion.button>
                </Link>
                <div className="flex items-center space-x-2 text-[var(--color-gray-400)]">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Typically reply within 24 hours</span>
                </div>
              </div>
              <div className="flex justify-center space-x-8 text-sm text-[var(--color-gray-500)]">
                <div className="flex items-center space-x-2"><FaEnvelope className="text-[var(--color-electric-blue)]" /><span>Email</span></div>
                <div className="flex items-center space-x-2"><FaPhone className="text-[var(--color-violet-glow)]" /><span>Video call</span></div>
                <div className="flex items-center space-x-2"><FaUsers className="text-[var(--color-electric-blue)]" /><span>On‑site meeting</span></div>
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

export default ServicePageEn;

