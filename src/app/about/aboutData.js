import { FaUserTie, FaGraduationCap, FaChalkboardTeacher, FaProjectDiagram, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas, FaCode, FaDatabase, FaRobot, FaPython, FaMicrophone, FaAward, FaLightbulb, FaCloud, FaChartLine, FaCog } from "react-icons/fa";

export const highlights = [
  {
    icon: <FaUserTie size={24} />,
    title: "AI 團隊與交付",
    description: "自 0 組建 10 人團隊，主導 8+ 專案，累計營收 NT$6,000萬+。",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    metrics: ["10 人", "8+ 專案", "NT$6,000萬+"],
  },
  {
    icon: <FaProjectDiagram size={24} />,
    title: "商業導向 AI 產品化",
    description: "端到端將 AI 轉化為收益：需求→架構→模型→上線與治理。",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    metrics: ["E2E", "營收/效率", "治理"],
  },
  {
    icon: <FaGraduationCap size={24} />,
    title: "國際化資料科學背景",
    description: "德國曼海姆大學 MSc，跨市場數據與 AI 實戰。",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    metrics: ["MSc 德國", "跨國市場", "商業應用"],
  },
];

export const experiences = [
  {
    date: "2026/4–Present",
    title: "Lead, Business Intelligence",
    company: "Lalamove 香港",
    bullets: [
      "跨市場 KPI、供需監控與漏斗分析落地，提升決策速度",
      "與 DE/DA 共建治理（dbt/LookML），縮短交付週期",
      "規劃數據產品路線圖，強化自助分析能力",
    ],
  },
  {
    date: "2024/8–2026/4",
    title: "Data Scientist 副理",
    company: "創代科技 Datarget",
    bullets: [
      "自 0 帶 10 人團隊，主導 8+ 專案，營收 NT$6,000萬+",
      "規劃與交付客製 LLM（RAG/LoRA），混合雲部署",
      "兼任 PM：需求、時程、跨部門同步、驗收",
    ],
  },
  {
    date: "2023/4–Present",
    title: "資料科學講師",
    company: "DeepCoding 鍵深坊",
    bullets: [
      "開授資料科學/視覺化工作坊，學員 100+",
      "1 對 1 指導 5+ 位學員轉職/升職",
      "規劃實作導向課程，產出可驗證成果",
    ],
  },
  {
    date: "2023/7–2024/6",
    title: "機器學習工程師",
    company: "果實夥伴 OneAD",
    bullets: [
      "CTR +20%、停留 +30%，提升投放成效",
      "模型重構：推論 +40% 速度、GCP 成本 -30%",
      "打造 LLM+RAG 受眾平台，提升精準度",
    ],
  },
  {
    date: "2022/3–2024/2",
    title: "數據分析工程師",
    company: "HelloFresh（德國）",
    bullets: [
      "18 市場部署 3 個 ML 模型，廣告預算 -10%",
      "轉化旅程儀表板，支援 KPI 決策",
      "Clean Room 成效分析：重疊 -15%",
    ],
  },
];

export const education = [
  {
    date: "2020/9–2023/1",
    title: "MSc 經濟資訊學",
    company: "曼海姆大學（德國）",
    description: "資料科學 × 商業應用",
  },
  {
    date: "2019/10–2020/3",
    title: "交換生｜經濟工程",
    company: "拜羅伊特大學（德國）",
    description: "跨領域與國際視野",
  },
  {
    date: "2015/9–2020/1",
    title: "學士｜資管（輔企管）",
    company: "中原大學（台灣）",
    description: "資訊 × 管理",
  },
];

export const speechCategories = [
  {
    category: "AI 技術分享",
    icon: <FaRobot size={24} />,
    color: "from-blue-500 to-cyan-500",
    count: 6,
    totalAudience: "250+",
    speeches: [

      {
        date: "2025/7/20",
        title: "打造自己AI機器人",
        company: "DeepCoding 鍵深坊",
        audience: "10+"
      },
      {
        date: "2025/5/24",
        title: "打造自己的學術研究ChatGPT",
        company: "陽明交大陽明校區",
        audience: "30+"
      },
      {
        date: "2025/5/20",
        title: "LLM 與 RAG 原理分享與系統實作",
        company: "陽明交大管科系",
        audience: "40+"
      },
      {
        date: "2024/12/1",
        title: "Python Code 打造個人 Chatbot",
        company: "陽明交大教發中心",
        audience: "80+"
      },
      {
        date: "2024/3/15",
        title: "資料分析全面洞察",
        company: "陽明交大教發中心",
        audience: "50+"
      },
      {
        date: "2024/1/5",
        title: "Python自動化工作流程",
        company: "陽明交大教發中心",
        audience: "40+"
      },
    ]
  },
  {
    category: "職涯指導與教學培訓",
    icon: <FaChalkboardTeacher size={24} />,
    color: "from-purple-500 to-pink-500",
    count: 3,
    totalAudience: "100+",
    speeches: [
      {
        date: "2025/5/22",
        title: "Dive into AI/Data Consulting",
        company: "北大 Google Development Group",
        audience: "30+"
      },
      {
        date: "2025/3/22",
        title: "德國留學申請與職涯探索",
        company: "谷登堡外語學院",
        audience: "20+"
      },
      {
        date: "2025/3/25",
        title: "海外築夢 - 德國留學到職場分享會",
        company: "留德青山",
        audience: "50+"
      }
    ]
  },
  {
    category: "技術分享",
    icon: <FaCode size={24} />,
    color: "from-green-500 to-emerald-500",
    count: 4,
    totalAudience: "600+",
    speeches: [
      {
        date: "2025/9/6",
        title: "PyCon Taiwan 2025",
        company: "陽明交大教發中心",
        audience: "500+"
      },
      {
        date: "2025/5/18",
        title: "WiDS Taipei",
        company: "陽明交大教發中心",
        audience: "120+"
      },
      {
        date: "2024/11/18",
        title: "Data Science 小聚",
        company: "自行發起",
        audience: "28"
      },
      {
        date: "2024/1/5",
        title: "Python自動化工作流程",
        company: "陽明交大教發中心",
        audience: "40+"
      }
    ]
  }
];

export const languages = [
  {
    icon: <FaGlobeAsia size={28} />,
    title: "中文 (繁體)",
    description: "母語",
    level: "Native",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: <FaGlobeAmericas size={28} />,
    title: "English",
    description: "流利 (CEFR C1)",
    level: "Professional",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: <FaGlobeEurope size={28} />,
    title: "Deutsch",
    description: "中高等 (CEFR B2)",
    level: "Conversational",
    color: "from-yellow-500 to-red-500",
  },
];

export const skills = [
  {
    category: "程式設計與開發",
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
    category: "機器學習與 AI",
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
    category: "雲端與大數據",
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
    category: "數據分析與視覺化",
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
  { label: "專業經驗", value: "4+", suffix: "年", icon: <FaAward /> },
  { label: "專案", value: "15+", suffix: "個", icon: <FaProjectDiagram /> },
  { label: "學生 / mentees", value: "100+", suffix: "位", icon: <FaChalkboardTeacher /> },
  { label: "演講 / 分享", value: "10+", suffix: "場", icon: <FaMicrophone /> },
];

export const pageText = {
  title: "關於我",
  subtitle:
    "AI / Data Leader 與 Product‑minded Builder。現任 Lalamove 香港 BI Lead，專長把資料與 AI 做成能落地、能衡量、能複用的產品與流程。關心營收、效率與體驗的可量化提升。",
  sections: {
    experience: "經歷",
    education: "教育與語言",
    speeches: "精選演講",
    languages: "語言",
    skills: "技能"
  },
  cta: {
    title: "想合作或交流？",
    description: "如果你在規劃 AI / Data 產品、數據平台或效能提升，歡迎聊聊。",
    tagline: "Business‑driven. Builder mindset."
  }
};
