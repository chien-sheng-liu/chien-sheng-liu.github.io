import { FaUserTie, FaGraduationCap, FaChalkboardTeacher, FaProjectDiagram, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas, FaCode, FaDatabase, FaRobot, FaPython, FaMicrophone, FaAward, FaLightbulb, FaCloud, FaChartLine, FaCog } from "react-icons/fa";

export const highlights = [
  {
    icon: <FaUserTie size={28} />,
    title: "AI 團隊領導同架構設計",
    description: "由零開始建立數據團隊，主導千萬級項目，設計同部署客製化 LLM 同深度學習架構。",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    metrics: ["10人團隊", "NT$6,000萬營收", "8+項目"],
  },
  {
    icon: <FaProjectDiagram size={28} />,
    title: "端到端 AI 產品思維",
    description: "由需求訪談、架構設計、模型開發到交付，全流程將 AI 技術變成商業價值。",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    metrics: ["全流程覆蓋", "創造價值", "技術轉化"],
  },
  {
    icon: <FaGraduationCap size={28} />,
    title: "德國頂尖大學資料科學碩士",
    description: "曼海姆大學畢業（德國商學院排名前列），專注資料科學同商業應用。",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    metrics: ["頂尖學府", "國際視野", "紮實底子"],
  },
];

export const experiences = [
  {
    date: "2024/8-Present",
    title: "Data Scientist 副理",
    company: "創代科技 Datarget Innovation Inc.",
    description: `建立並帶領 10 人數據團隊，涵蓋 Data Science、Data Engineering、PM。• 兼任 PM，負責需求、規劃、時程同跨部門協作。• 主導 8+ 個專案/標案，累積營收約 NT$6,000 萬。• 主導 LLM 客製（RAG、LangChain、LoRA），完成 GCP 同地端混合部署。`,
  },
  {
    date: "2023/4-Present",
    title: "資料科學講師",
    company: "DeepCoding 鍵深坊",
    description: `長期任教於陽明交大工作坊，內容涵蓋資料分析、資料科學同視覺化。• 提供一對一指導，協助 5+ 位學生職涯規劃、履歷修改同成功就業。`,
  },
  {
    date: "2023/7-2024/6",
    title: "機器學習工程師",
    company: "果實夥伴 OneAD",
    description: `開發部署機器學習模型優化廣告，提升 20% CTR 同 30% 停留時間。• 重構定位模型，推論速度+40%，GCP 成本 -30%。• 建立 Meta 廣告精準受眾平台，結合 LLM 與 RAG。`,
  },
  {
    date: "2022/3-2024/2",
    title: "數據分析工程師",
    company: "HelloFresh (德國)",
    description: `喺 18 個市場部署 3 個客製 ML 模型，節省 10% 廣告預算並達到 85% 準確率。• 建立 Tableau 儀表板，協助 KPI 導向決策。• 使用 Google Clean Room 做成效分析，成本 -10%，重疊 -15%。`,
  },
];

export const education = [
  { date: "2020/9-2023/1", title: "經濟資訊學碩士", company: "曼海姆大學（德國）", description: "主修資料科學與商業資訊，德國頂尖商學院。" },
  { date: "2019/10-2020/3", title: "經濟工程系交換", company: "拜羅伊特大學（德國）", description: "跨領域學習，結合管理與工程。" },
  { date: "2015/9-2020/01", title: "資管學士（企管輔系）", company: "中原大學（台灣）", description: "建立資訊管理與企業管理嘅雙重基礎。" },
];

export const speechCategories = [
  { category: "AI 技術分享", icon: <FaRobot size={24} />, color: "from-blue-500 to-cyan-500", count: 6, totalAudience: "250+", speeches: [
    { date: "2025/7/20", title: "打造自己 AI 機械人", company: "DeepCoding", audience: "10+" },
    { date: "2025/5/24", title: "打造自己嘅學術 ChatGPT", company: "陽明交大", audience: "30+" },
    { date: "2025/5/20", title: "LLM 同 RAG 原理同實作", company: "陽明交大管科系", audience: "40+" },
    { date: "2024/12/1", title: "Python 打造個人 Chatbot", company: "陽明交大教發中心", audience: "80+" },
    { date: "2024/3/15", title: "資料分析全面洞察", company: "陽明交大教發中心", audience: "50+" },
    { date: "2024/1/5", title: "Python 自動化工作流程", company: "陽明交大教發中心", audience: "40+" },
  ]},
  { category: "職涯指導與培訓", icon: <FaChalkboardTeacher size={24} />, color: "from-purple-500 to-pink-500", count: 3, totalAudience: "100+", speeches: [
    { date: "2025/5/22", title: "Dive into AI/Data Consulting", company: "GDG", audience: "30+" },
    { date: "2025/3/22", title: "德國留學申請與職涯", company: "谷登堡外語學院", audience: "20+" },
    { date: "2025/3/25", title: "海外築夢：德國留學到職場", company: "留德青山", audience: "50+" },
  ]},
  { category: "技術分享", icon: <FaCode size={24} />, color: "from-green-500 to-emerald-500", count: 4, totalAudience: "600+", speeches: [
    { date: "2025/9/6", title: "PyCon Taiwan 2025", company: "Conference", audience: "500+" },
    { date: "2025/5/18", title: "WiDS Taipei", company: "Event", audience: "120+" },
    { date: "2024/11/18", title: "Data Science 小聚", company: "Community", audience: "28" },
    { date: "2024/1/5", title: "Python 自動化工作流程", company: "陽明交大教發中心", audience: "40+" },
  ]},
];

export const languages = [
  { icon: <FaGlobeAsia size={28} />, title: "中文（繁體）", description: "母語", level: "Native", color: "from-red-500 to-orange-500" },
  { icon: <FaGlobeAmericas size={28} />, title: "English", description: "流利（CEFR C1）", level: "Professional", color: "from-blue-500 to-purple-500" },
  { icon: <FaGlobeEurope size={28} />, title: "Deutsch", description: "中高等（CEFR B2）", level: "Conversational", color: "from-yellow-500 to-red-500" },
];

export const skills = [
  { category: "程式設計與開發", icon: <FaCode size={24} />, color: "from-green-500 to-blue-500", items: [
    { name: "Python", level: 95, icon: <FaPython /> },
    { name: "SQL", level: 90, icon: <FaDatabase /> },
    { name: "JavaScript", level: 75, icon: <FaCode /> },
    { name: "Git/GitHub", level: 85, icon: <FaCode /> },
  ]},
  { category: "機器學習與 AI", icon: <FaRobot size={24} />, color: "from-purple-500 to-pink-500", items: [
    { name: "Machine Learning", level: 95, icon: <FaRobot /> },
    { name: "Deep Learning", level: 88, icon: <FaRobot /> },
    { name: "NLP & LLM", level: 90, icon: <FaRobot /> },
    { name: "Computer Vision", level: 80, icon: <FaRobot /> },
  ]},
  { category: "雲端與大數據", icon: <FaCloud size={24} />, color: "from-cyan-500 to-blue-500", items: [
    { name: "Google Cloud Platform", level: 85, icon: <FaCloud /> },
    { name: "BigQuery", level: 90, icon: <FaDatabase /> },
    { name: "Docker", level: 75, icon: <FaCog /> },
    { name: "Apache Spark", level: 70, icon: <FaDatabase /> },
  ]},
  { category: "數據分析與視覺化", icon: <FaChartLine size={24} />, color: "from-orange-500 to-red-500", items: [
    { name: "Tableau", level: 90, icon: <FaChartLine /> },
    { name: "Power BI", level: 85, icon: <FaChartLine /> },
    { name: "Pandas/NumPy", level: 95, icon: <FaPython /> },
    { name: "Statistical Analysis", level: 88, icon: <FaChartLine /> },
  ]},
];

export const stats = [
  { label: "專業經驗", value: "4+", suffix: "年", icon: <FaAward /> },
  { label: "完成項目", value: "15+", suffix: "個", icon: <FaProjectDiagram /> },
  { label: "學生指導", value: "100+", suffix: "位", icon: <FaChalkboardTeacher /> },
  { label: "技術演講", value: "10+", suffix: "場", icon: <FaMicrophone /> },
];

export const pageText = {
  title: "關於我",
  subtitle: "我係一位熱衷數據嘅領袖同產品打造者。我鍾意喺數據入面搵到價值，變成推動業務增長嘅 AI 產品同策略。由 0 到 1 建立高效團隊、帶領跨國複雜專案，到培育下一代數據人才，我嘅目標都一樣：做出唔只解決問題、仲創造長遠價值嘅方案。",
  sections: { experience: "專業經歷", education: "教育背景", speeches: "演講與分享", languages: "語言能力", skills: "專業技能" },
  cta: { title: "一齊創造價值", description: "無論你係企業想做 AI 轉型，定係個人追求職涯發展，我都樂意分享經驗，一齊探索數據科學嘅可能。", tagline: "持續學習，持續創新" }
};

