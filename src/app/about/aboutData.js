import { FaUserTie, FaGraduationCap, FaChalkboardTeacher, FaProjectDiagram, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas, FaCode, FaDatabase, FaRobot, FaPython, FaMicrophone, FaAward, FaLightbulb, FaCloud, FaChartLine, FaCog } from "react-icons/fa";

export const highlights = [
  {
    icon: <FaUserTie size={28} />,
    title: "AI 團隊領導者與架構師",
    description: "從零建立數據團隊，主導千萬級專案，並設計與部署客製化語言模型與深度學習架構。",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    metrics: ["10人團隊", "NT$6,000萬營收", "8+專案"],
  },
  {
    icon: <FaProjectDiagram size={28} />,
    title: "全端 AI 產品思維",
    description: "從需求訪談、架構設計、模型開發到儀表板交付，具備將 AI 技術轉化為商業價值的全流程能力。",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    metrics: ["全流程覆蓋", "商業價值", "技術轉化"],
  },
  {
    icon: <FaGraduationCap size={28} />,
    title: "德國頂尖大學資料科學碩士",
    description: "畢業於德國曼海姆大學，歐洲頂尖商學院之一，專攻資料科學與商業應用。",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    metrics: ["頂尖學府", "國際視野", "學術基礎"],
  },
];

export const experiences = [
  {
    date: "2024/8-Present",
    title: "Data Scientist 副理",
    company: "創代科技 Datarget Innovation Inc.",
    description: `自 0 建立並領導 10 人數據團隊，涵蓋 Data Science、Data Engineering、PM 職能。• 兼任 PM，負責需求訪談、專案規劃、時程控管與跨部門協作。• 主導並成功取得 8+ 個專案 / 標案，累積營收約 NT$ 6,000 萬。• 主導語言模型客製化（RAG、LangChain、LoRA 微調），並完成 GCP 與地端混合架構部署。`,
  },
  {
    date: "2023/4-Present",
    title: "資料科學講師",
    company: "DeepCoding 鍵深坊",
    description: `長期擔任國立陽明交通大學工作坊講師，授課內容涵蓋資料分析、資料科學與視覺化。• 提供一對一資料科學課程，並協助超過 5 位學生進行職涯規劃、履歷修改並成功就業。`,
  },
  {
    date: "2023/7-2024/6",
    title: "機器學習工程師",
    company: "果實夥伴 OneAD",
    description: `開發並部署機器學習模型以優化廣告投放，成功提高 20% CTR 及 30% 停留時間。• 重構用戶定位模型，使預測速度提升 40%，節省 30% GCP 成本。• 開發 Meta 廣告精準受眾平台，結合 LLM 與 RAG，顯著提高營銷活動的準確性。`,
  },
  {
    date: "2022/3-2024/2",
    title: "數據分析工程師",
    company: "HelloFresh (德國)",
    description: `針對 18 個市場部署 3 個客製化機器學習模型，節省 10% 廣告預算並達到 85% 準確率。• 創建 Tableau 儀表板以視覺化顧客轉化旅程，協助行銷部門進行 KPI 導向決策。• 運用 Google Clean Room 進行成效分析，成功降低 10% 廣告成本，並減少 15% 顧客重疊率。`,
  },
];

export const education = [
  {
    date: "2020/9-2023/1",
    title: "經濟資訊學碩士 (Wirtschaftsinformatik)",
    company: "曼海姆大學 Universität Mannheim, 德國",
    description: "專注於資料科學與商業資訊領域的碩士學位，德國商學院排名第一。",
  },
  {
    date: "2019/10-2020/3",
    title: "經濟工程系交換 (Wirtschaftsingenieurwesen)",
    company: "拜羅伊特大學 Universität Bayreuth, 德國",
    description: "跨領域學習，結合商業管理與工程技術，培養國際視野。",
  },
  {
    date: "2015/9-2020/01",
    title: "資訊管理學學士 & 企業管理系輔系",
    company: "中原大學 Chung Yuan Christian University, 台灣",
    description: "奠定資訊管理與企業管理的雙重專業基礎，成績優異。",
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
  { label: "專案成功", value: "15+", suffix: "個", icon: <FaProjectDiagram /> },
  { label: "學生指導", value: "100+", suffix: "位", icon: <FaChalkboardTeacher /> },
  { label: "技術演講", value: "10+", suffix: "場", icon: <FaMicrophone /> },
];

export const pageText = {
  title: "關於我",
  subtitle: "我是一位熱情的數據領袖與產品建構者。我的專業在於挖掘數據深處的潛力，並將其轉化為驅動商業增長的 AI 產品與策略。從 0 到 1 建立高效能團隊、主導橫跨多國的複雜專案，再到培育下一代數據人才，我的目標始終如一：打造不僅能解決問題，更能創造價值的數據解決方案。",
  sections: {
    experience: "專業經歷",
    education: "教育背景",
    speeches: "演講與分享",
    languages: "語言能力",
    skills: "專業技能"
  },
  cta: {
    title: "讓我們一起創造價值",
    description: "無論您是企業主尋求 AI 轉型，還是個人追求職涯發展，我都很樂意與您分享經驗，共同探索數據科學的無限可能。",
    tagline: "持續學習，持續創新"
  }
};