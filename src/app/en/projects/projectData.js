import { FaChartLine, FaBrain, FaMedkit, FaShoppingCart, FaPython, FaDatabase, FaCloud, FaCode, FaStar } from "react-icons/fa";

export const projects = [
  {
    title: "Public Sector LLM Chatbots – GraphRAG",
    description: "Built chatbots using OpenAI, Gemma, and Gemini with hybrid cloud/on‑prem architecture and agent workflows to reduce administrative workload for government agencies.",
    icon: <FaChartLine size={28} />,
    categoryIcon: <FaDatabase size={16} />,
    category: "LLM",
    technologies: ["LLM", "GCP", "Agent", "Text‑to‑SQL", "Next.js", "FastAPI", "Neo4j"],
    metrics: [
      { label: "Bots", value: "7+" },
      { label: "Data processed", value: "5T+" },
      { label: "Work efficiency", value: "40%" }
    ],
    link: "#",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Market Sentiment Analyzer",
    description: "NLP pipeline that crawls financial news and social media; uses BERT for sentiment and NER to quantify market signals. Backend APIs via Flask.",
    icon: <FaBrain size={28} />,
    categoryIcon: <FaCode size={16} />,
    category: "NLP",
    technologies: ["BERT", "Flask", "NLP", "Python"],
    metrics: [
      { label: "Sentiment accuracy", value: "89%" },
      { label: "Throughput", value: "1000/s" },
      { label: "API latency", value: "< 200ms" }
    ],
    link: "#",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "Medical Imaging – Early Anomaly Detection",
    description: "CNN (PyTorch/ResNet) for chest X‑ray anomaly detection achieving AUC 0.95 on public datasets; demonstrates strong assistive diagnostic potential.",
    icon: <FaMedkit size={28} />,
    categoryIcon: <FaBrain size={16} />,
    category: "Deep Learning",
    technologies: ["PyTorch", "ResNet", "CNN", "Medical AI"],
    metrics: [
      { label: "AUC", value: "0.95" },
      { label: "Accuracy", value: "94%" },
      { label: "Deployment", value: "Hybrid" }
    ],
    link: "#",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Maritime – High‑Risk & Anomaly Prediction",
    description: "Integrated national weather, vessel static data, and real‑time AIS streams into ClickHouse and deep learning to predict grounding and anomalous behaviors and help prevent maritime incidents.",
    icon: <FaShoppingCart size={28} />,
    categoryIcon: <FaCloud size={16} />,
    category: "Deep Learning",
    technologies: ["Deep Learning", "Streaming", "SQL", "Structured & Unstructured Data"],
    metrics: [
      { label: "Sources", value: "15+" },
      { label: "Data processed", value: "20TB+" },
      { label: "Deployment", value: "On‑prem" }
    ],
    link: "#",
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
  },
];

export const stats = [
  { label: "Projects", value: "12+", icon: <FaCode /> },
  { label: "Tech Stack", value: "15+", icon: <FaPython /> },
  { label: "Platforms", value: "5+", icon: <FaCloud /> },
  { label: "GitHub Stars", value: "200+", icon: <FaStar /> },
];

