import { FaChartLine, FaChartBar, FaDice, FaBrain, FaMedkit, FaShoppingCart, FaRobot, FaPython, FaDatabase, FaCloud, FaCode, FaStar } from "react-icons/fa";

export const projects = [
  {
    title: "公部門的大型語言模型建置 - 運用 GraphRAG",
    description: "使用 OpenAI、Gemma、Gemini 等語言模型為公部門建置聊天機器人，並且採行雲地混合架構，同時也採用AI代理，為相關單位減少行政作業",
    icon: <FaChartLine size={28} />,
    categoryIcon: <FaDatabase size={16} />,
    category: "LLM",
    technologies: ["LLM", "GCP", "Agent", "Text-to-SQL", "Next.js", "FastAPI", "Neo4j"],
    metrics: [
      { label: "機器人數", value: "7+" },
      { label: "處理數據", value: "5T+" },
      { label: "工作提升", value: "40%" }
    ],
    link: "#",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "VICI — LLM Gateway + 多代理財務分析系統",
    description: "結合 LLM Gateway 與 Playwright 瀏覽器自動化的財務分析平台。多 Agent 協作（新聞 / 財務 / 交易 / 數據），搭配 Safety Guard 安全層與完整 Artifact 追溯。",
    icon: <FaBrain size={28} />,
    categoryIcon: <FaCode size={16} />,
    category: "LLM",
    technologies: ["FastAPI", "Playwright", "React", "OpenAI", "Claude", "Docker", "Python"],
    metrics: [
      { label: "Agent 數", value: "4" },
      { label: "安全層級", value: "5 層" },
      { label: "LLM 提供商", value: "3+" },
    ],
    link: "https://github.com/chien-sheng-liu/VICI-LLM-Engineer",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "東部AI智慧決策分析平台",
    description: "基於 PyTorch 和 ResNet，訓練一個卷積神經網路 (CNN) 來辨識 X 光片中的早期病徵。模型在公開數據集上的 AUC 分數達到 0.95，展現了高精度的輔助診斷潛力。",
    icon: <FaMedkit size={28} />,
    categoryIcon: <FaBrain size={16} />,
    category: "深度學習",
    technologies: ["PyTorch", "ResNet", "CNN", "醫療AI"],
    metrics: [
      { label: "AUC 分數", value: "0.95" },
      { label: "準確率", value: "94%" },
      { label: "部署方式", value: "雲地混合" }
    ],
    link: "#",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "海運 - 高風險與船舶航行異常預測",
    description: "蒐集我國氣象、船舶靜態資料、船舶即時AIS資料，並建立 Clickhouse 即時流式資料庫，並以深度學習模型進行不間斷預測船舶擱淺以及異常行為，以防止我國周遭發生船難",
    icon: <FaShoppingCart size={28} />,
    categoryIcon: <FaCloud size={16} />,
    category: "深度學習",
    technologies: ["Deep Learning", "Streaming ", "SQL", "非結構化與結構化資料"],
    metrics: [
      { label: "資料來源", value: "15+" },
      { label: "處理數據", value: "20TB+" },
      { label: "部署方式", value: "地端部署" }
    ],
    link: "#",
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
  },
  {
    title: "疫情干擾下的時間序列預測",
    description: "比較 SARIMA、Holt-Winters、Prophet 三種模型在 COVID-19 干擾下的預測表現，設計排除疫情 / 包含疫情 / 後疫情三組實驗，量化外部衝擊對時間序列預測的影響。",
    icon: <FaChartBar size={28} />,
    categoryIcon: <FaBrain size={16} />,
    category: "深度學習",
    technologies: ["Python", "SARIMA", "Prophet", "Holt-Winters", "pandas", "statsmodels"],
    metrics: [
      { label: "預測模型", value: "3" },
      { label: "實驗組數", value: "3" },
      { label: "研究機構", value: "Uni Mannheim" }
    ],
    link: "#",
    color: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-500/10 to-cyan-500/10",
  },
  {
    title: "OpenNet — 老虎機遊戲引擎與機率優化系統",
    description: "3×3 老虎機遊戲引擎，結合 Monte Carlo 模擬與啟發式搜索算法自動優化轉軸配置，在目標 RTP 95% 與勝率 ≥ 55% 的約束下找出最佳符號分布。全棧實現含 FastAPI 後端與 React 前端。",
    icon: <FaDice size={28} />,
    categoryIcon: <FaCode size={16} />,
    category: "演算法",
    technologies: ["Python", "FastAPI", "React", "Monte Carlo", "NumPy", "Vite"],
    metrics: [
      { label: "目標 RTP", value: "95%" },
      { label: "模擬次數", value: "100K" },
      { label: "獲勝模式", value: "5 種" }
    ],
    link: "#",
    color: "from-amber-500 to-rose-500",
    bgGradient: "from-amber-500/10 to-rose-500/10",
  },
  {
    title: "AutoLLM — No-Code RAG 聊天機器人平台",
    description: "生產級 RAG 平台，支援文檔上傳、向量檢索、多 LLM 切換（OpenAI / Gemini / Claude），搭配 Redis + PostgreSQL 雙層存儲與 Docker 微服務部署。",
    icon: <FaRobot size={28} />,
    categoryIcon: <FaCloud size={16} />,
    category: "LLM",
    technologies: ["FastAPI", "Next.js", "PostgreSQL", "pgvector", "Redis", "Docker", "OpenAI", "Gemini"],
    metrics: [
      { label: "LLM 提供商", value: "3+" },
      { label: "API 端點", value: "15+" },
      { label: "部署方式", value: "Docker" },
    ],
    link: "https://github.com/chien-sheng-liu/AutoLLM",
    color: "from-violet-500 to-indigo-500",
    bgGradient: "from-violet-500/10 to-indigo-500/10",
  },
];

export const stats = [
  { label: "完成專案", value: "12+", icon: <FaCode /> },
  { label: "技術棧", value: "15+", icon: <FaPython /> },
  { label: "部署平台", value: "5+", icon: <FaCloud /> },
  { label: "GitHub Stars", value: "200+", icon: <FaStar /> },
];