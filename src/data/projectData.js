import { FaChartLine, FaBrain, FaMedkit, FaShoppingCart, FaPython, FaDatabase, FaCloud, FaCode, FaStar } from "react-icons/fa";

/* ── Shared project structure — only text differs per locale ── */

const projectBase = [
  {
    icon: <FaChartLine size={28} />,
    categoryIcon: <FaDatabase size={16} />,
    category: { zh: "LLM", en: "LLM", yue: "LLM" },
    technologies: ["LLM", "GCP", "Agent", "Text-to-SQL", "Next.js", "FastAPI", "Neo4j"],
    link: "#",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    title: {
      zh: "公部門的大型語言模型建置 - 運用 GraphRAG",
      en: "Public Sector LLM Chatbots – GraphRAG",
      yue: "公部門大型語言模型聊天機械人（GraphRAG）",
    },
    description: {
      zh: "使用 OpenAI、Gemma、Gemini 等語言模型為公部門建置聊天機器人，並且採行雲地混合架構，同時也採用AI代理，為相關單位減少行政作業",
      en: "Built chatbots using OpenAI, Gemma, and Gemini with hybrid cloud/on‑prem architecture and agent workflows to reduce administrative workload for government agencies.",
      yue: "採用 OpenAI、Gemma、Gemini，建立聊天機械人，混合雲端/地端架構，結合代理流程，為政府單位減省行政工作。",
    },
    metrics: {
      zh: [{ label: "機器人數", value: "7+" }, { label: "處理數據", value: "5T+" }, { label: "工作提升", value: "40%" }],
      en: [{ label: "Bots", value: "7+" }, { label: "Data processed", value: "5T+" }, { label: "Work efficiency", value: "40%" }],
      yue: [{ label: "機械人數", value: "7+" }, { label: "處理數據", value: "5T+" }, { label: "工作效益", value: "40%" }],
    },
  },
  {
    icon: <FaBrain size={28} />,
    categoryIcon: <FaCode size={16} />,
    category: { zh: "NLP", en: "NLP", yue: "NLP" },
    technologies: ["BERT", "Flask", "NLP", "Python"],
    link: "#",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    title: {
      zh: "金融市場情緒分析儀",
      en: "Market Sentiment Analyzer",
      yue: "金融市場情緒分析",
    },
    description: {
      zh: "開發一個 NLP 模型，自動爬取財經新聞與社群媒體評論，透過 BERT 進行情緒分析與實體識別，將市場情緒量化為指標，輔助投資決策。後端使用 Flask 建立 API 服務。",
      en: "NLP pipeline that crawls financial news and social media; uses BERT for sentiment and NER to quantify market signals. Backend APIs via Flask.",
      yue: "NLP 流程自動爬財經新聞同社群，BERT 做情緒分析同實體識別，量化市場信號；Flask 提供 API。",
    },
    metrics: {
      zh: [{ label: "情緒準確率", value: "89%" }, { label: "處理速度", value: "1000/秒" }, { label: "API 響應", value: "< 200ms" }],
      en: [{ label: "Sentiment accuracy", value: "89%" }, { label: "Throughput", value: "1000/s" }, { label: "API latency", value: "< 200ms" }],
      yue: [{ label: "情緒準確率", value: "89%" }, { label: "處理速度", value: "1000/秒" }, { label: "API 延遲", value: "< 200ms" }],
    },
  },
  {
    icon: <FaMedkit size={28} />,
    categoryIcon: <FaBrain size={16} />,
    category: { zh: "深度學習", en: "Deep Learning", yue: "深度學習" },
    technologies: ["PyTorch", "ResNet", "CNN", "Medical AI"],
    link: "#",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    title: {
      zh: "東部AI智慧決策分析平台",
      en: "Medical Imaging – Early Anomaly Detection",
      yue: "醫療影像早期徵狀辨識",
    },
    description: {
      zh: "基於 PyTorch 和 ResNet，訓練一個卷積神經網路 (CNN) 來辨識 X 光片中的早期病徵。模型在公開數據集上的 AUC 分數達到 0.95，展現了高精度的輔助診斷潛力。",
      en: "CNN (PyTorch/ResNet) for chest X‑ray anomaly detection achieving AUC 0.95 on public datasets; demonstrates strong assistive diagnostic potential.",
      yue: "用 PyTorch/ResNet 訓練 CNN，喺 X 光片檢測早期異常，AUC 達 0.95，具備臨床輔助潛力。",
    },
    metrics: {
      zh: [{ label: "AUC 分數", value: "0.95" }, { label: "準確率", value: "94%" }, { label: "部署方式", value: "雲地混合" }],
      en: [{ label: "AUC", value: "0.95" }, { label: "Accuracy", value: "94%" }, { label: "Deployment", value: "Hybrid" }],
      yue: [{ label: "AUC", value: "0.95" }, { label: "準確率", value: "94%" }, { label: "部署", value: "雲地混合" }],
    },
  },
  {
    icon: <FaShoppingCart size={28} />,
    categoryIcon: <FaCloud size={16} />,
    category: { zh: "深度學習", en: "Deep Learning", yue: "深度學習" },
    technologies: ["Deep Learning", "Streaming", "SQL"],
    link: "#",
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    title: {
      zh: "海運 - 高風險與船舶航行異常預測",
      en: "Maritime – High‑Risk & Anomaly Prediction",
      yue: "海運高風險與航行異常預測",
    },
    description: {
      zh: "蒐集我國氣象、船舶靜態資料、船舶即時AIS資料，並建立 Clickhouse 即時流式資料庫，並以深度學習模型進行不間斷預測船舶擱淺以及異常行為，以防止我國周遭發生船難",
      en: "Integrated national weather, vessel static data, and real‑time AIS streams into ClickHouse and deep learning to predict grounding and anomalous behaviors and help prevent maritime incidents.",
      yue: "整合氣象、船舶靜態資料、即時 AIS 流，建立 ClickHouse 流式庫，同深度學習連續預測擱淺及異常行為。",
    },
    metrics: {
      zh: [{ label: "資料來源", value: "15+" }, { label: "處理數據", value: "20TB+" }, { label: "部署方式", value: "地端部署" }],
      en: [{ label: "Sources", value: "15+" }, { label: "Data processed", value: "20TB+" }, { label: "Deployment", value: "On‑prem" }],
      yue: [{ label: "資料來源", value: "15+" }, { label: "處理數據", value: "20TB+" }, { label: "部署方式", value: "地端" }],
    },
    extraTech: {
      zh: "非結構化與結構化資料",
      en: "Structured & Unstructured Data",
      yue: "結構化/非結構化",
    },
  },
];

const statsBase = [
  { value: "12+", icon: <FaCode />, label: { zh: "完成專案", en: "Projects", yue: "完成項目" } },
  { value: "15+", icon: <FaPython />, label: { zh: "技術棧", en: "Tech Stack", yue: "技術棧" } },
  { value: "5+", icon: <FaCloud />, label: { zh: "部署平台", en: "Platforms", yue: "部署平台" } },
  { value: "200+", icon: <FaStar />, label: { zh: "GitHub Stars", en: "GitHub Stars", yue: "GitHub Stars" } },
];

/** Resolve locale-specific fields and return flat project/stats arrays */
export function getProjectData(locale = "zh") {
  const projects = projectBase.map((p) => ({
    title: p.title[locale] || p.title.zh,
    description: p.description[locale] || p.description.zh,
    icon: p.icon,
    categoryIcon: p.categoryIcon,
    category: p.category[locale] || p.category.zh,
    technologies: [...p.technologies, ...(p.extraTech?.[locale] ? [p.extraTech[locale]] : [])],
    metrics: p.metrics[locale] || p.metrics.zh,
    link: p.link,
    color: p.color,
    bgGradient: p.bgGradient,
  }));

  const stats = statsBase.map((s) => ({
    value: s.value,
    icon: s.icon,
    label: s.label[locale] || s.label.zh,
  }));

  return { projects, stats };
}
