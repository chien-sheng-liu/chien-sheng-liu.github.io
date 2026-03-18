import { FaChartLine, FaBrain, FaMedkit, FaShoppingCart, FaPython, FaDatabase, FaCloud, FaCode, FaStar } from "react-icons/fa";

export const projects = [
  {
    title: "公部門大型語言模型聊天機械人（GraphRAG）",
    description: "採用 OpenAI、Gemma、Gemini，建立聊天機械人，混合雲端/地端架構，結合代理流程，為政府單位減省行政工作。",
    icon: <FaChartLine size={28} />,
    categoryIcon: <FaDatabase size={16} />,
    category: "LLM",
    technologies: ["LLM", "GCP", "Agent", "Text-to-SQL", "Next.js", "FastAPI", "Neo4j"],
    metrics: [
      { label: "機械人數", value: "7+" },
      { label: "處理數據", value: "5T+" },
      { label: "工作效益", value: "40%" }
    ],
    link: "#",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "金融市場情緒分析",
    description: "NLP 流程自動爬財經新聞同社群，BERT 做情緒分析同實體識別，量化市場信號；Flask 提供 API。",
    icon: <FaBrain size={28} />,
    categoryIcon: <FaCode size={16} />,
    category: "NLP",
    technologies: ["BERT", "Flask", "NLP", "Python"],
    metrics: [
      { label: "情緒準確率", value: "89%" },
      { label: "處理速度", value: "1000/秒" },
      { label: "API 延遲", value: "< 200ms" }
    ],
    link: "#",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "醫療影像早期徵狀辨識",
    description: "用 PyTorch/ResNet 訓練 CNN，喺 X 光片檢測早期異常，AUC 達 0.95，具備臨床輔助潛力。",
    icon: <FaMedkit size={28} />,
    categoryIcon: <FaBrain size={16} />,
    category: "深度學習",
    technologies: ["PyTorch", "ResNet", "CNN", "醫療AI"],
    metrics: [
      { label: "AUC", value: "0.95" },
      { label: "準確率", value: "94%" },
      { label: "部署", value: "雲地混合" }
    ],
    link: "#",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "海運高風險與航行異常預測",
    description: "整合氣象、船舶靜態資料、即時 AIS 流，建立 ClickHouse 流式庫，同深度學習連續預測擱淺及異常行為。",
    icon: <FaShoppingCart size={28} />,
    categoryIcon: <FaCloud size={16} />,
    category: "深度學習",
    technologies: ["Deep Learning", "Streaming", "SQL", "結構化/非結構化"],
    metrics: [
      { label: "資料來源", value: "15+" },
      { label: "處理數據", value: "20TB+" },
      { label: "部署方式", value: "地端" }
    ],
    link: "#",
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
  },
];

export const stats = [
  { label: "完成項目", value: "12+", icon: <FaCode /> },
  { label: "技術棧", value: "15+", icon: <FaPython /> },
  { label: "部署平台", value: "5+", icon: <FaCloud /> },
  { label: "GitHub Stars", value: "200+", icon: <FaStar /> },
];

