import { FaUserTie, FaGraduationCap, FaChalkboardTeacher, FaProjectDiagram, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas, FaCode, FaDatabase, FaRobot, FaPython, FaMicrophone, FaAward, FaLightbulb, FaCloud, FaChartLine, FaCog } from "react-icons/fa";

export const highlights = [
  {
    icon: <FaUserTie size={24} />,
    title: "AI Team & Delivery",
    description: "Built a 10‑person team, led 8+ projects, NT$60M+ revenue.",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    metrics: ["10 people", "8+ projects", "NT$60M+"],
  },
  {
    icon: <FaProjectDiagram size={24} />,
    title: "Business‑driven AI Productization",
    description: "Turn AI into revenue: discovery→architecture→models→launch & governance.",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    metrics: ["E2E", "Revenue/Efficiency", "Governance"],
  },
  {
    icon: <FaGraduationCap size={24} />,
    title: "International Data Science Background",
    description: "MSc, University of Mannheim. Hands‑on across markets.",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    metrics: ["MSc (DE)", "Multi‑market", "Biz apps"],
  },
];

export const experiences = [
  {
    date: "2026/4–Present",
    title: "Lead, Business Intelligence",
    company: "Lalamove (Hong Kong)",
    bullets: [
      "Launched cross‑market KPIs, supply‑demand and funnel analytics; faster decisions",
      "Co‑built governance with DE/DA (dbt/LookML); shorter delivery cycle",
      "Roadmapped data products; strengthened self‑serve analytics",
    ],
  },
  {
    date: "2024/8–2026/4",
    title: "Data Scientist (Deputy Manager)",
    company: "Datarget Innovation Inc.",
    bullets: [
      "Built and led a 10‑person team; 8+ projects; NT$60M+ revenue",
      "Delivered custom LLM (RAG/LoRA); hybrid cloud deployment",
      "Acted as PM: discovery, planning, cross‑functional sync, acceptance",
    ],
  },
  {
    date: "2023/4–Present",
    title: "Data Science Instructor",
    company: "DeepCoding",
    bullets: [
      "Workshops in data science/visualization; 100+ learners",
      "1‑on‑1 coached 5+ learners for transitions",
      "Hands‑on courses with verifiable outcomes",
    ],
  },
  {
    date: "2023/7–2024/6",
    title: "Machine Learning Engineer",
    company: "OneAD",
    bullets: [
      "CTR +20%, dwell +30% for ads",
      "Refactor: +40% inference speed, −30% GCP cost",
      "Built LLM + RAG audience platform",
    ],
  },
  {
    date: "2022/3–2024/2",
    title: "Data Analyst Engineer",
    company: "HelloFresh (Germany)",
    bullets: [
      "3 ML models across 18 markets; −10% ad budget",
      "Conversion‑journey dashboards for KPI decisions",
      "Clean Room analysis: −15% overlap",
    ],
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
  { label: "Students / mentees", value: "100+", suffix: "", icon: <FaChalkboardTeacher /> },
  { label: "Talks", value: "10+", suffix: "", icon: <FaMicrophone /> },
];

export const pageText = {
  title: "About",
  subtitle:
    "AI/Data Leader and Product‑minded Builder. BI Lead at Lalamove (Hong Kong). I turn data and AI into measurable, reusable products and processes, focusing on revenue, efficiency and UX outcomes.",
  sections: {
    experience: "Experience",
    education: "Education & Languages",
    speeches: "Selected Talks",
    languages: "Languages",
    skills: "Skills"
  },
  cta: {
    title: "Want to collaborate or chat?",
    description: "Planning AI/Data products, platforms or efficiency improvements? Let’s talk.",
    tagline: "Business‑driven. Builder mindset."
  }
};
