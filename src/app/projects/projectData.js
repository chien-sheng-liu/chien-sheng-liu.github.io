import { FaChartLine, FaBrain, FaMedkit, FaShoppingCart, FaPython, FaDatabase, FaCloud, FaCode, FaStar } from "react-icons/fa";

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
    title: "金融市場情緒分析儀",
    description: "開發一個 NLP 模型，自動爬取財經新聞與社群媒體評論，透過 BERT 進行情緒分析與實體識別，將市場情緒量化為指標，輔助投資決策。後端使用 Flask 建立 API 服務。",
    icon: <FaBrain size={28} />,
    categoryIcon: <FaCode size={16} />,
    category: "NLP",
    technologies: ["BERT", "Flask", "NLP", "Python"],
    metrics: [
      { label: "情緒準確率", value: "89%" },
      { label: "處理速度", value: "1000/秒" },
      { label: "API 響應", value: "< 200ms" }
    ],
    link: "#",
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
];

export const stats = [
  { label: "完成專案", value: "12+", icon: <FaCode /> },
  { label: "技術棧", value: "15+", icon: <FaPython /> },
  { label: "部署平台", value: "5+", icon: <FaCloud /> },
  { label: "GitHub Stars", value: "200+", icon: <FaStar /> },
];