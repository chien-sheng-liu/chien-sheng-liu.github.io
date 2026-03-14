import { FaUserTie, FaGraduationCap, FaChalkboardTeacher, FaProjectDiagram, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas, FaCode, FaDatabase, FaRobot, FaPython, FaMicrophone, FaAward, FaLightbulb, FaCloud, FaChartLine, FaCog } from "react-icons/fa";

export const highlights = [
  {
    icon: <FaUserTie size={28} />,
    title: "AI Team Leader & Architect",
    description: "Built data teams from scratch, led multimillion NT$ projects, and designed/deployed custom LLMs and deep learning architectures.",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    metrics: ["10‑person team", "NT$60M revenue", "8+ projects"],
  },
  {
    icon: <FaProjectDiagram size={28} />,
    title: "End‑to‑end AI Product Mindset",
    description: "From discovery and architecture to model development and delivery—turning AI into business value across the full lifecycle.",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    metrics: ["Full lifecycle", "Business value", "Tech translation"],
  },
  {
    icon: <FaGraduationCap size={28} />,
    title: "MSc in Data Science (Germany)",
    description: "University of Mannheim—one of Europe’s top business schools—with a focus on data science and business applications.",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    metrics: ["Top school", "Global perspective", "Strong foundation"],
  },
];

export const experiences = [
  {
    date: "2024/8-Present",
    title: "Data Scientist (Deputy Manager)",
    company: "Datarget Innovation Inc.",
    description: `Built and lead a 10‑person data team across Data Science, Data Engineering, and PM. • Acted as PM for discovery, planning, timeline control, and cross‑functional collaboration. • Won and delivered 8+ projects/tenders totaling around NT$60M. • Led custom LLM (RAG, LangChain, LoRA fine‑tuning) and hybrid GCP/on‑prem deployments.`,
  },
  {
    date: "2023/4-Present",
    title: "Data Science Instructor",
    company: "DeepCoding",
    description: `Long‑term workshop instructor at National Yang Ming Chiao Tung University, teaching data analysis, data science, and visualization. • Provide 1‑on‑1 coaching; mentored 5+ students on career planning, resume polish, and successful job placement.`,
  },
  {
    date: "2023/7-2024/6",
    title: "Machine Learning Engineer",
    company: "OneAD",
    description: `Developed and deployed ML models to optimize ad delivery, improving CTR by 20% and dwell time by 30%. • Refactored user targeting model, boosting inference speed by 40% and cutting GCP cost by 30%. • Built a Meta ads precise audience platform combining LLM and RAG, significantly improving campaign accuracy.`,
  },
  {
    date: "2022/3-2024/2",
    title: "Data Analyst Engineer",
    company: "HelloFresh (Germany)",
    description: `Deployed 3 custom ML models across 18 markets, saving 10% ad budget with 85% accuracy. • Built Tableau dashboards for conversion journey visualization and KPI‑driven decisions. • Used Google Clean Room for effectiveness analysis, reducing ad cost by 10% and audience overlap by 15%.`,
  },
];

export const education = [
  {
    date: "2020/9-2023/1",
    title: "MSc Wirtschaftsinformatik (Data Science)",
    company: "University of Mannheim, Germany",
    description: "Graduate degree focused on data science and business information systems. Ranked #1 business school in Germany.",
  },
  {
    date: "2019/10-2020/3",
    title: "Exchange in Industrial Engineering",
    company: "University of Bayreuth, Germany",
    description: "Interdisciplinary study combining business and engineering with international exposure.",
  },
  {
    date: "2015/9-2020/01",
    title: "BBA in Information Management (Minor in Business Administration)",
    company: "Chung Yuan Christian University, Taiwan",
    description: "Solid foundation across information management and business administration.",
  },
];

export const speechCategories = [
  {
    category: "AI Technical Talks",
    icon: <FaRobot size={24} />,
    color: "from-blue-500 to-cyan-500",
    count: 6,
    totalAudience: "250+",
    speeches: [
      { date: "2025/7/20", title: "Build Your Own AI Bot", company: "DeepCoding", audience: "10+" },
      { date: "2025/5/24", title: "Build Your Academic Research ChatGPT", company: "NYCU", audience: "30+" },
      { date: "2025/5/20", title: "LLM & RAG: Principles and Implementation", company: "NYCU IM", audience: "40+" },
      { date: "2024/12/1", title: "Build a Personal Chatbot with Python", company: "NYCU", audience: "80+" },
      { date: "2024/3/15", title: "Comprehensive Data Analytics", company: "NYCU", audience: "50+" },
      { date: "2024/1/5", title: "Python Automation Workflows", company: "NYCU", audience: "40+" },
    ]
  },
  {
    category: "Career Coaching & Training",
    icon: <FaChalkboardTeacher size={24} />,
    color: "from-purple-500 to-pink-500",
    count: 3,
    totalAudience: "100+",
    speeches: [
      { date: "2025/5/22", title: "Dive into AI/Data Consulting", company: "GDG (Taipei)", audience: "30+" },
      { date: "2025/3/22", title: "Study in Germany: Application & Careers", company: "Gutenberg Language Institute", audience: "20+" },
      { date: "2025/3/25", title: "Dream Abroad: Germany—From Study to Work", company: "留德青山", audience: "50+" },
    ]
  },
  {
    category: "Tech Talks",
    icon: <FaCode size={24} />,
    color: "from-green-500 to-emerald-500",
    count: 4,
    totalAudience: "600+",
    speeches: [
      { date: "2025/9/6", title: "PyCon Taiwan 2025", company: "Conference", audience: "500+" },
      { date: "2025/5/18", title: "WiDS Taipei", company: "Event", audience: "120+" },
      { date: "2024/11/18", title: "Data Science Meetup", company: "Community", audience: "28" },
      { date: "2024/1/5", title: "Python Automation Workflows", company: "NYCU", audience: "40+" },
    ]
  }
];

export const languages = [
  { icon: <FaGlobeAsia size={28} />, title: "Chinese (Traditional)", description: "Native", level: "Native", color: "from-red-500 to-orange-500" },
  { icon: <FaGlobeAmericas size={28} />, title: "English", description: "Fluent (CEFR C1)", level: "Professional", color: "from-blue-500 to-purple-500" },
  { icon: <FaGlobeEurope size={28} />, title: "Deutsch", description: "Upper‑intermediate (CEFR B2)", level: "Conversational", color: "from-yellow-500 to-red-500" },
];

export const skills = [
  {
    category: "Programming & Development",
    icon: <FaCode size={24} />,
    color: "from-green-500 to-blue-500",
    items: [
      { name: "Python", level: 95, icon: <FaPython /> },
      { name: "SQL", level: 90, icon: <FaDatabase /> },
      { name: "JavaScript", level: 75, icon: <FaCode /> },
      { name: "Git/GitHub", level: 85, icon: <FaCode /> },
    ]
  },
  {
    category: "Machine Learning & AI",
    icon: <FaRobot size={24} />,
    color: "from-purple-500 to-pink-500",
    items: [
      { name: "Machine Learning", level: 95, icon: <FaRobot /> },
      { name: "Deep Learning", level: 88, icon: <FaRobot /> },
      { name: "NLP & LLM", level: 90, icon: <FaRobot /> },
      { name: "Computer Vision", level: 80, icon: <FaRobot /> },
    ]
  },
  {
    category: "Cloud & Big Data",
    icon: <FaCloud size={24} />,
    color: "from-cyan-500 to-blue-500",
    items: [
      { name: "Google Cloud Platform", level: 85, icon: <FaCloud /> },
      { name: "BigQuery", level: 90, icon: <FaDatabase /> },
      { name: "Docker", level: 75, icon: <FaCog /> },
      { name: "Apache Spark", level: 70, icon: <FaDatabase /> },
    ]
  },
  {
    category: "Analytics & Visualization",
    icon: <FaChartLine size={24} />,
    color: "from-orange-500 to-red-500",
    items: [
      { name: "Tableau", level: 90, icon: <FaChartLine /> },
      { name: "Power BI", level: 85, icon: <FaChartLine /> },
      { name: "Pandas/NumPy", level: 95, icon: <FaPython /> },
      { name: "Statistical Analysis", level: 88, icon: <FaChartLine /> },
    ]
  }
];

export const stats = [
  { label: "Experience", value: "4+", suffix: " yrs", icon: <FaAward /> },
  { label: "Projects", value: "15+", suffix: "", icon: <FaProjectDiagram /> },
  { label: "Students Mentored", value: "100+", suffix: "", icon: <FaChalkboardTeacher /> },
  { label: "Tech Talks", value: "10+", suffix: "", icon: <FaMicrophone /> },
];

export const pageText = {
  title: "About",
  subtitle: "I am a data leader and product builder. I discover value deep within data and turn it into AI products and strategies that drive business growth. From building high‑performing teams from 0 to 1, to leading complex, multi‑country projects and nurturing the next generation of data talent, my goal is consistent: create data solutions that not only solve problems but create enduring value.",
  sections: {
    experience: "Experience",
    education: "Education",
    speeches: "Talks & Sharing",
    languages: "Languages",
    skills: "Skills"
  },
  cta: {
    title: "Let’s create value together",
    description: "Whether you’re a business seeking AI transformation or an individual pursuing career growth, I’d be glad to share insights and explore the possibilities of data science with you.",
    tagline: "Keep learning, keep innovating"
  }
};

