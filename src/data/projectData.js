import { FaChartLine, FaChartBar, FaDice, FaBrain, FaMedkit, FaShoppingCart, FaRobot, FaPython, FaDatabase, FaCloud, FaCode, FaStar } from "react-icons/fa";
import { cvProjects } from "./cvProjects";

/* ── Shared project structure — only text differs per locale ── */

const existingProjects = [
  // {
  //   icon: <FaChartLine size={28} />,
  //   categoryIcon: <FaDatabase size={16} />,
  //   category: { zh: "LLM", en: "LLM" },
  //   technologies: ["LLM", "GCP", "Agent", "Text-to-SQL", "Next.js", "FastAPI", "Neo4j"],
  //   link: "#",
  //   color: "from-blue-500 to-cyan-500",
  //   bgGradient: "from-blue-500/10 to-cyan-500/10",
  //   title: {
  //     zh: "公部門的大型語言模型建置 - 運用 GraphRAG",
  //     en: "Public Sector LLM Chatbots – GraphRAG",
  //   },
  //   description: {
  //     zh: "使用 OpenAI、Gemma、Gemini 等語言模型為公部門建置聊天機器人，並且採行雲地混合架構，同時也採用AI代理，為相關單位減少行政作業",
  //     en: "Built chatbots using OpenAI, Gemma, and Gemini with hybrid cloud/on‑prem architecture and agent workflows to reduce administrative workload for government agencies.",
  //   },
  //   detailDescription: {
  //     zh: "本專案為多個公部門單位建置 7 套以上的智慧聊天機器人系統。採用 GraphRAG 架構，將知識庫以知識圖譜形式儲存於 Neo4j，結合 Text-to-SQL 讓使用者以自然語言查詢結構化資料。系統部署於 GCP 與地端的混合架構，並透過 AI Agent 自動化行政流程，大幅提升公務效率。",
  //     en: "This project delivered 7+ intelligent chatbot systems for multiple government agencies. Using a GraphRAG architecture, knowledge bases are stored as knowledge graphs in Neo4j, combined with Text-to-SQL to enable natural language queries over structured data. The system is deployed on a hybrid GCP/on-prem architecture, with AI Agents automating administrative workflows to significantly improve operational efficiency.",
  //   },
  //   highlights: {
  //     zh: ["建置 7+ 套聊天機器人，涵蓋法規查詢、案件追蹤、內部知識庫", "GraphRAG + Neo4j 知識圖譜實現跨文件關聯推理", "Text-to-SQL 讓非技術人員直接用自然語言查詢資料庫", "GCP + 地端混合部署，符合政府資安規範", "AI Agent 自動化公文分類、摘要與派案流程"],
  //     en: ["Built 7+ chatbot systems covering regulation lookup, case tracking, and internal knowledge bases", "GraphRAG + Neo4j knowledge graph for cross-document reasoning", "Text-to-SQL enabling non-technical users to query databases in natural language", "Hybrid GCP/on-prem deployment meeting government security standards", "AI Agent automating document classification, summarization, and routing"],
  //   },
  //   metrics: {
  //     zh: [{ label: "機器人數", value: "7+" }, { label: "處理數據", value: "5T+" }, { label: "工作提升", value: "40%" }],
  //     en: [{ label: "Bots", value: "7+" }, { label: "Data processed", value: "5T+" }, { label: "Work efficiency", value: "40%" }],
  //   },
  // },
  {
    groupOrder: 2,
    slug: "financial-multi-agent-analysis",
    featured: false,
    socialImage: "/media/selected-work/financial-agents-editorial.webp",
    icon: <FaBrain size={28} />,
    categoryIcon: <FaCode size={16} />,
    category: { zh: "AI 與資料科學", en: "AI & Data Science" },
    technologies: ["FastAPI", "Playwright", "React", "OpenAI", "Claude", "Docker", "Python"],
    industry: { zh: "金融科技、投資研究與決策支援", en: "FinTech, Investment Research & Decision Support" },
    industryContext: {
      zh: "投資研究需要同時處理行情、基本面、新聞與技術指標，資料來源與更新節奏不同，且任何結論都必須保留來源及推理軌跡。多代理系統適合拆分專業任務，但金融情境同時要求安全控制、可重放流程與完整稽核。",
      en: "Investment research combines market data, fundamentals, news, and technical indicators with different sources and update cycles, while every conclusion must retain its evidence and reasoning trail. Multi-agent systems can separate specialist tasks, but financial use also requires safety controls, replayable workflows, and complete auditability.",
    },
    link: "https://github.com/chien-sheng-liu/Finance-Decision-ChatBot",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    title: {
      zh: "股票多代理財務分析系統",
      en: "Stock Multi-Agent Financial Analyzer",
    },
    description: {
      zh: "結合 LLM Gateway 與 Playwright 瀏覽器自動化的財務分析平台。多 Agent 協作（新聞 / 財務 / 交易 / 資料），搭配 Safety Guard 安全層與完整 Artifact 追溯。",
      en: "Financial analysis platform combining an LLM Gateway with Playwright browser automation. Multi-agent collaboration (news / finance / trader / data) with Safety Guard and full artifact traceability.",
    },
    caseNotes: {
      zh: {
        problem: "投資研究流程分散，資料來源、推理過程與報告產出難以追溯。",
        approach: "用多代理工作流串接新聞、財務、交易與資料擷取，並加入 LLM Gateway 與安全層。",
        impact: "把分析、審計日誌與可重放 artifacts 整合成可驗證的研究流程。",
      },
      en: {
        problem: "Investment research workflows were fragmented, with weak traceability across sources, reasoning, and reports.",
        approach: "Connected news, finance, trader, and data agents through an LLM Gateway with safety controls.",
        impact: "Packaged analysis, audit logs, and replayable artifacts into a verifiable research workflow.",
      },
    },
    detailDescription: {
      zh: "VICI 是一套生產級的 LLM Gateway + 多代理財務分析系統。Gateway 層採用 Provider 抽象設計（策略模式），支援 OpenAI / Claude / Mock 一鍵切換，內建 Safety Guard 五層安全架構（輸入驗證→Prompt 掃描→Provider 白名單→輸出脫敏→審計日誌）。四個專業 Agent（News / Finance / Trader / YFinance）各司其職，透過 Playwright 無頭瀏覽器自動抓取股票行情與新聞，再由 LLM 生成帶情緒分析的投資報告與簡報。每次運行產出完整 Artifact（report.md / slides.pdf / run.json / trace.zip / SHA256 校驗），支援 Deterministic Dry-run 離線測試。",
      en: "VICI is a production-grade LLM Gateway + multi-agent financial analysis system. The Gateway layer uses a Provider abstraction (strategy pattern) supporting one-click switching between OpenAI / Claude / Mock, with a built-in 5-layer Safety Guard (input validation → prompt scan → provider allowlist → output redaction → audit log). Four specialized agents (News / Finance / Trader / YFinance) collaborate via Playwright headless browser to scrape stock data and news, then LLM generates investment reports with sentiment analysis. Each run produces full artifacts (report.md / slides.pdf / run.json / trace.zip / SHA256 checksums), with deterministic dry-run for offline testing.",
    },
    highlights: {
      zh: [
        "LLM Gateway 抽象層：OpenAI / Claude / Mock 可插拔切換，重試機制 + 請求追蹤 + 結構化日誌",
        "Safety Guard 五層安全：輸入驗證 → Prompt 掃描 → Provider 白名單 → 輸出脫敏 → 審計日誌",
        "四專業 Agent 協作：News（情緒分析）/ Finance（基本面）/ Trader（技術指標）/ YFinance（資料擷取）",
        "Playwright 瀏覽器自動化：截圖追蹤 + Trace 錄製可重放 + Yahoo TW 股票資料擷取",
        "完整 Artifact 追溯：report.md / slides.pdf / run.json / trace.zip / SHA256 校驗",
      ],
      en: [
        "LLM Gateway abstraction: pluggable OpenAI / Claude / Mock switching with retry, request tracking, and structured logging",
        "5-layer Safety Guard: input validation → prompt scan → provider allowlist → output redaction → audit log",
        "4 specialized agents: News (sentiment) / Finance (fundamentals) / Trader (technical indicators) / YFinance (data extraction)",
        "Playwright browser automation: screenshot tracing + replayable trace recording + Yahoo TW stock scraping",
        "Full artifact traceability: report.md / slides.pdf / run.json / trace.zip / SHA256 checksums",
      ],
    },
    metrics: {
      zh: [{ label: "Agent 數", value: "4" }, { label: "安全層級", value: "5 層" }, { label: "LLM 提供商", value: "3+" }],
      en: [{ label: "Agents", value: "4" }, { label: "Safety Layers", value: "5" }, { label: "LLM Providers", value: "3+" }],
    },
  },
  // {
  //   icon: <FaMedkit size={28} />,
  //   categoryIcon: <FaBrain size={16} />,
  //   category: { zh: "深度學習", en: "Deep Learning" },
  //   technologies: ["PyTorch", "ResNet", "CNN", "Medical AI"],
  //   link: "#",
  //   color: "from-green-500 to-emerald-500",
  //   bgGradient: "from-green-500/10 to-emerald-500/10",
  //   title: {
  //     zh: "區域 AI 智慧決策分析平台",
  //     en: "Medical Imaging – Early Anomaly Detection",
  //   },
  //   description: {
  //     zh: "基於 PyTorch 和 ResNet，訓練一個卷積神經網路 (CNN) 來辨識 X 光片中的早期病徵。模型在公開數據集上的 AUC 分數達到 0.95，展現了高精度的輔助診斷潛力。",
  //     en: "CNN (PyTorch/ResNet) for chest X‑ray anomaly detection achieving AUC 0.95 on public datasets; demonstrates strong assistive diagnostic potential.",
  //   },
  //   detailDescription: {
  //     zh: "本專案針對醫療影像領域，使用 PyTorch 框架與 ResNet 預訓練模型，建立一套自動化的胸部 X 光片異常檢測系統。透過遷移學習與資料增強技術，在有限的標註資料下仍達到 AUC 0.95 的優異表現。系統採用雲地混合部署架構，可同時服務於醫院內部與遠端診斷場景，為醫師提供即時的輔助診斷建議。",
  //     en: "This project targets medical imaging, using PyTorch and ResNet pre-trained models to build an automated chest X-ray anomaly detection system. Through transfer learning and data augmentation, it achieves AUC 0.95 even with limited labeled data. The system uses a hybrid cloud/on-prem architecture, serving both in-hospital and remote diagnostic scenarios, providing real-time assistive diagnostic suggestions to physicians.",
  //   },
  //   highlights: {
  //     zh: ["AUC 達 0.95，準確率 94%，具臨床輔助價值", "遷移學習 + 資料增強克服標註資料不足問題", "雲地混合部署，支援院內與遠端診斷", "自動生成熱力圖標示異常區域，提升醫師判讀效率", "符合醫療資料隱私規範的安全架構"],
  //     en: ["AUC 0.95, 94% accuracy with clinical assistive value", "Transfer learning + data augmentation overcoming limited labeled data", "Hybrid cloud/on-prem deployment for in-hospital and remote diagnosis", "Auto-generated heatmaps highlighting anomaly regions for faster physician review", "Secure architecture compliant with medical data privacy regulations"],
  //   },
  //   metrics: {
  //     zh: [{ label: "AUC 分數", value: "0.95" }, { label: "準確率", value: "94%" }, { label: "部署方式", value: "雲地混合" }],
  //     en: [{ label: "AUC", value: "0.95" }, { label: "Accuracy", value: "94%" }, { label: "Deployment", value: "Hybrid" }],
  //   },
  // },
  {
    groupOrder: 2,
    slug: "maritime-risk-anomaly-prediction",
    featured: false,
    socialImage: "/media/selected-work/maritime-editorial.webp",
    icon: <FaShoppingCart size={28} />,
    categoryIcon: <FaCloud size={16} />,
    category: { zh: "AI 與資料科學", en: "AI & Data Science" },
    technologies: ["Deep Learning", "Streaming", "SQL"],
    industry: { zh: "海運、船舶監控與公共安全", en: "Maritime, Vessel Monitoring & Public Safety" },
    industryContext: {
      zh: "船舶風險監控必須面對連續軌跡、即時氣象、船舶差異與罕見事故等問題，單靠固定規則難以涵蓋所有異常模式。資料平台與模型需要共同支援低延遲處理、風險排序、私有部署及作業人員覆核。",
      en: "Vessel-risk monitoring must handle continuous trajectories, real-time weather, vessel heterogeneity, and rare incidents that fixed rules cannot fully capture. The data platform and models must jointly support low-latency processing, risk prioritization, private deployment, and operator review.",
    },
    link: "#",
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    title: {
      zh: "海運 - 高風險與船舶航行異常預測",
      en: "Maritime – High‑Risk & Anomaly Prediction",
    },
    description: {
      zh: "整合氣象、船舶靜態資料與即時 AIS 串流，使用 ClickHouse 建立即時資料層，並以深度學習模型持續預測船舶擱淺風險與異常航行行為。",
      en: "Integrated national weather, vessel static data, and real‑time AIS streams into ClickHouse and deep learning to predict grounding and anomalous behaviors and help prevent maritime incidents.",
    },
    caseNotes: {
      zh: {
        problem: "船舶風險資料即時、異質且高風險，傳統監控難以及早預警。",
        approach: "整合氣象、AIS 與船舶靜態資料，建立 ClickHouse 串流資料庫與深度學習預測流程。",
        impact: "支援持續性的異常與擱淺風險預測，協助海事作業人員提早辨識高風險情境。",
      },
      en: {
        problem: "Maritime risk data is real-time, heterogeneous, and high-stakes, making early warning difficult.",
        approach: "Integrated weather, AIS, and vessel static data into ClickHouse streaming and deep learning pipelines.",
        impact: "Supported continuous anomaly and grounding-risk prediction so maritime operators could identify high-risk situations earlier.",
      },
    },
    detailDescription: {
      zh: "本專案整合多種即時與歷史資料來源，包含氣象資訊、船舶靜態資料及 AIS（船舶自動識別系統）串流資料。資料工程流程以 ClickHouse 建立即時資料層，處理時間對齊、軌跡清理、特徵彙整與品質檢核；資料科學流程則建立船舶擱淺風險與異常航行行為模型，並把預測結果串接至監控與告警介面。系統部署於私有環境，支援海事作業團隊持續監控、風險排序與提早介入。",
      en: "This project integrated multiple real-time and historical sources, including weather information, vessel master data, and AIS (Automatic Identification System) streams. The data-engineering workflow used ClickHouse as a real-time layer for temporal alignment, trajectory cleaning, feature aggregation, and quality controls; the data-science workflow modeled grounding risk and anomalous navigation behavior, then connected predictions to monitoring and alert interfaces. Deployed in a private environment, the system supported continuous maritime monitoring, risk prioritization, and earlier operational intervention.",
    },
    highlights: {
      zh: ["整合氣象、AIS 與船舶靜態資料等異質來源", "以 ClickHouse 建立即時串流、軌跡處理與特徵資料層", "深度學習模型持續預測擱淺風險與異常航行", "私有環境部署並串接監控及告警流程", "將模型分數轉化為可排序、可追蹤的作業風險"],
      en: ["Integrated heterogeneous weather, AIS, and vessel master data", "Built a ClickHouse layer for streaming, trajectory processing, and model features", "Continuously predicted grounding risk and anomalous navigation with deep learning", "Deployed privately and connected predictions to monitoring and alert workflows", "Converted model scores into prioritized, traceable operational risks"],
    },
    metrics: {
      zh: [{ label: "資料型態", value: "多源異質" }, { label: "處理方式", value: "即時串流" }, { label: "部署方式", value: "私有環境" }],
      en: [{ label: "Data", value: "Multi-source" }, { label: "Processing", value: "Real-time" }, { label: "Deployment", value: "Private" }],
    },
    extraTech: {
      zh: "非結構化與結構化資料",
      en: "Structured & Unstructured Data",
    },
  },
  {
    groupOrder: 2,
    slug: "covid-disrupted-time-series-forecasting",
    featured: false,
    socialImage: "/media/selected-work/martech-editorial.webp",
    icon: <FaChartBar size={28} />,
    categoryIcon: <FaBrain size={16} />,
    category: { zh: "AI 與資料科學", en: "AI & Data Science" },
    technologies: ["Python", "SARIMA", "Prophet", "Holt-Winters", "pandas", "statsmodels"],
    industry: { zh: "行銷科技、零售與需求預測", en: "MarTech, Retail & Demand Forecasting" },
    industryContext: {
      zh: "行銷與零售預測依賴歷史季節性、活動與市場趨勢，但疫情等結構性衝擊會破壞既有資料規律。產業需要的不只是最低誤差模型，也需要知道不同資料區間與外部衝擊下應採用何種可解釋策略。",
      en: "Marketing and retail forecasts depend on historical seasonality, campaigns, and market trends, but structural shocks such as a pandemic break established patterns. The industry needs not only the lowest-error model but an interpretable strategy for choosing methods across data windows and disruption regimes.",
    },
    link: "https://github.com/chien-sheng-liu/disrupted-timeseries-forecasting",
    color: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-500/10 to-cyan-500/10",
    title: {
      zh: "疫情干擾下的時間序列預測",
      en: "Disrupted Time-Series Forecasting under COVID-19",
    },
    description: {
      zh: "比較 SARIMA、Holt-Winters、Prophet 三種模型在 COVID-19 干擾下的預測表現，設計排除疫情 / 包含疫情 / 後疫情三組實驗，量化外部衝擊對時間序列預測的影響。",
      en: "Compared SARIMA, Holt-Winters, and Prophet under COVID-19 disruptions. Designed three experimental groups (excluding / including / post-COVID data) to quantify the impact of external shocks on time-series forecasting.",
    },
    caseNotes: {
      zh: {
        problem: "疫情等外部衝擊讓歷史資料失真，需求預測模型難以直接沿用。",
        approach: "以三組實驗比較 SARIMA、Holt-Winters 與 Prophet 在不同衝擊情境下的表現。",
        impact: "建立可解釋的模型選擇依據，支援零售、供應鏈與市場規劃預測。",
      },
      en: {
        problem: "External shocks distorted historical demand signals, making existing forecasting assumptions unreliable.",
        approach: "Compared SARIMA, Holt-Winters, and Prophet across excluding, including, and post-shock experiments.",
        impact: "Produced interpretable model-selection guidance for retail, supply chain, and market planning.",
      },
    },
    detailDescription: {
      zh: "本專案探討 COVID-19 疫情如何影響時間序列預測模型的準確度。透過嚴謹的實驗設計，將資料分為「排除疫情」「包含疫情」「後疫情」三組，分別以 SARIMA（含自動參數優化）、Holt-Winters（三重指數平滑）、Prophet（自動處理假日與異常值）進行建模與預測，最終比較各模型在不同情境下的 MAE、RMSE、MAPE 等指標表現，並提出面對外部干擾時的最佳預測策略。",
      en: "This project investigates how COVID-19 disruptions affect time-series forecasting accuracy. Through rigorous experimental design, data was split into three groups: excluding COVID, including COVID, and post-COVID. SARIMA (with auto-parameter optimization), Holt-Winters (triple exponential smoothing), and Prophet (automatic holiday and outlier handling) were applied to each group, comparing MAE, RMSE, and MAPE across scenarios and proposing optimal forecasting strategies for external disruptions.",
    },
    highlights: {
      zh: [
        "三模型比較框架：SARIMA（季節性）、Holt-Winters（趨勢平滑）、Prophet（異常值抵抗）",
        "實驗設計：排除疫情 / 包含疫情 / 後疫情三組對照實驗",
        "Auto SARIMA 自動參數優化，減少人工調參成本",
        "Prophet 添加疫情作為外部迴歸變數，提升預測穩健性",
        "可應用於零售需求預測、供應鏈管理、市場規劃等場景",
      ],
      en: [
        "Three-model comparison: SARIMA (seasonality), Holt-Winters (trend smoothing), Prophet (outlier resistance)",
        "Experimental design: excluding / including / post-COVID control groups",
        "Auto SARIMA for automated parameter optimization reducing manual tuning",
        "Prophet with COVID as external regressor for improved robustness",
        "Applicable to retail demand forecasting, supply chain management, and market planning",
      ],
    },
    metrics: {
      zh: [{ label: "預測模型", value: "3" }, { label: "實驗組數", value: "3" }, { label: "機構", value: "Uni Mannheim" }],
      en: [{ label: "Models", value: "3" }, { label: "Experiments", value: "3" }, { label: "Institution", value: "Uni Mannheim" }],
    },
  },
  {
    groupOrder: 2,
    slug: "slot-game-probability-optimizer",
    featured: false,
    socialImage: "/media/selected-work/gaming-editorial.webp",
    icon: <FaDice size={28} />,
    categoryIcon: <FaCode size={16} />,
    category: { zh: "AI 與資料科學", en: "AI & Data Science" },
    technologies: ["Python", "FastAPI", "React", "Monte Carlo", "NumPy", "Vite"],
    industry: { zh: "數位遊戲、機率設計與模擬", en: "Digital Gaming, Probability Design & Simulation" },
    industryContext: {
      zh: "機率型遊戲必須在數學回報、勝率、波動與玩家體驗之間取得平衡，任何轉軸或賠率調整都可能改變整體分布。大量模擬、可重現亂數與多目標搜尋，是驗證設計是否符合約束的重要方法。",
      en: "Probability-based games must balance mathematical return, win rate, volatility, and player experience, while any reel or payout change can alter the full outcome distribution. Large-scale simulation, reproducible randomness, and multi-objective search are essential for validating designs against constraints.",
    },
    link: "https://github.com/chien-sheng-liu/Slot-Game-Simulator",
    color: "from-amber-500 to-rose-500",
    bgGradient: "from-amber-500/10 to-rose-500/10",
    title: {
      zh: "老虎機遊戲引擎與機率優化系統",
      en: "Slot Game Engine & Probability Optimizer",
    },
    description: {
      zh: "3×3 老虎機遊戲引擎，結合 Monte Carlo 模擬與啟發式搜尋演算法自動優化轉軸配置，在目標 RTP 95% 與勝率 ≥ 55% 的約束下找出最佳符號分布。Full-stack 實作包含 FastAPI 後端與 React 前端。",
      en: "3×3 slot game engine combining Monte Carlo simulation with heuristic search to auto-optimize reel configurations under RTP 95% and win rate ≥ 55% constraints. Full-stack implementation with FastAPI backend and React frontend.",
    },
    caseNotes: {
      zh: {
        problem: "遊戲機率設計需要同時滿足 RTP、勝率與體驗限制，手動調參成本高。",
        approach: "用 Monte Carlo 模擬與啟發式搜索自動評估大量轉軸配置。",
        impact: "把數天人工試算壓縮成分鐘級優化，並保留可重現的驗證結果。",
      },
      en: {
        problem: "Game probability design had to balance RTP, win rate, and player experience under costly manual tuning.",
        approach: "Used Monte Carlo simulation and heuristic search to evaluate large reel-configuration spaces.",
        impact: "Reduced multi-day manual tuning into minute-level optimization with reproducible validation.",
      },
    },
    detailDescription: {
      zh: "這是一套老虎機遊戲引擎與機率優化系統。核心挑戰在於設計轉軸配置，使遊戲同時滿足 RTP（返還率）與勝率雙目標。系統以啟發式搜尋演算法迭代 800 步，每步透過 Monte Carlo 模擬 50,000 局來評估配置適應度，最終以 100,000 局精確驗證最佳候選。5 種符號（不同賠率）搭配 5 種獲勝模式（水平、垂直、對角、V 型、自訂），透過符號分布變異與適應性搜尋策略，在龐大的搜尋空間中收斂至目標配置。Full-stack 實作支援 CLI 與 API 雙模式，React 前端可即時體驗遊戲與查看統計資料。",
      en: "This is a slot game engine and probability optimization system. The core challenge is designing reel configurations that simultaneously meet RTP (Return to Player) and win rate targets. The system uses heuristic search iterating 800 steps, evaluating each configuration via 50,000-spin Monte Carlo simulation, with final 100,000-spin verification. Five symbols (varying multipliers) combined with five winning patterns (horizontal, vertical, diagonal, V-shape, custom), using symbol distribution mutation and adaptive search to efficiently converge in a massive search space. Full-stack implementation supports both CLI and API modes, with a React frontend for real-time gameplay and statistics.",
    },
    highlights: {
      zh: [
        "啟發式搜尋演算法：800 步迭代優化，平衡探索與利用，自動收斂至目標 RTP / 勝率",
        "Monte Carlo 模擬引擎：每次評估 50,000 局、精確驗證 100,000 局，確保統計信賴度",
        "多目標優化：同時滿足 RTP ≥ 0.95 與 Win Rate ≥ 0.55 的約束條件",
        "5 種獲勝模式 × 5 種符號賠率，支援 RNG seed 確保結果可重現",
        "全棧實現：FastAPI + React + Vite，CLI / API 雙模式，Makefile 自動化部署",
      ],
      en: [
        "Heuristic search: 800-step iterative optimization balancing exploration and exploitation",
        "Monte Carlo engine: 50,000-spin evaluation + 100,000-spin precise verification for statistical confidence",
        "Multi-objective optimization: meeting both RTP ≥ 0.95 and Win Rate ≥ 0.55 constraints",
        "5 winning patterns × 5 symbol multipliers with RNG seed for reproducible results",
        "Full-stack: FastAPI + React + Vite, CLI/API dual mode, Makefile automation",
      ],
    },
    metrics: {
      zh: [{ label: "目標 RTP", value: "95%" }, { label: "模擬次數", value: "100K" }, { label: "獲勝模式", value: "5 種" }],
      en: [{ label: "Target RTP", value: "95%" }, { label: "Simulations", value: "100K" }, { label: "Win Patterns", value: "5" }],
    },
  },
  {
    groupOrder: 2,
    slug: "autollm-rag-platform",
    featured: true,
    socialImage: "/media/selected-work/autollm-editorial.webp",
    icon: <FaRobot size={28} />,
    categoryIcon: <FaCloud size={16} />,
    category: { zh: "AI 與資料科學", en: "AI & Data Science" },
    technologies: ["FastAPI", "Next.js", "PostgreSQL", "pgvector", "Redis", "Docker", "OpenAI", "Gemini"],
    industry: { zh: "企業軟體、知識管理與生成式 AI", en: "Enterprise Software, Knowledge Management & GenAI" },
    industryContext: {
      zh: "企業知識分散於文件、系統與部門，通用聊天模型若沒有檢索、權限與來源引用，容易產生不可驗證回答。可產品化的 RAG 平台必須同時處理文件生命週期、向量檢索、模型切換、對話儲存、安全與維運。",
      en: "Enterprise knowledge is fragmented across documents, systems, and teams, while a general chatbot without retrieval, permissions, and citations can produce unverifiable answers. A product-ready RAG platform must manage the document lifecycle, vector search, provider switching, conversation storage, security, and operations together.",
    },
    link: "https://github.com/chien-sheng-liu/AutoLLM",
    color: "from-violet-500 to-indigo-500",
    bgGradient: "from-violet-500/10 to-indigo-500/10",
    title: {
      zh: "AutoLLM — No-Code RAG 聊天機器人平台",
      en: "AutoLLM — No-Code RAG Chatbot Platform",
    },
    description: {
      zh: "生產級 RAG 平台，支援文件上傳、向量檢索、多 LLM 切換（OpenAI / Gemini / Claude），搭配 Redis + PostgreSQL 雙層儲存與 Docker 微服務部署。",
      en: "Production-grade RAG platform with document upload, vector retrieval, multi-LLM switching (OpenAI / Gemini / Claude), dual-layer Redis + PostgreSQL storage, and Docker microservice deployment.",
    },
    caseNotes: {
      zh: {
        problem: "企業知識問答常卡在文件上傳、權限、模型切換與稽核紀錄，難以產品化。",
        approach: "建立 no-code RAG 流程，串接 pgvector、Redis、PostgreSQL 與多 LLM provider。",
        impact: "讓文件問答從數週建置縮短到數小時，並支援引用、串流與審計。",
      },
      en: {
        problem: "Enterprise Q&A often stalls on upload, permissions, model switching, and auditability before it can become a product.",
        approach: "Built a no-code RAG workflow across pgvector, Redis, PostgreSQL, and multiple LLM providers.",
        impact: "Reduced document Q&A setup from weeks to hours with citations, streaming, and audit support.",
      },
    },
    detailDescription: {
      zh: "AutoLLM 是一套 No-Code RAG 聊天機器人平台。使用者上傳文件後，系統自動完成解析、分塊、Embedding 生成與向量儲存（pgvector），再透過餘弦相似度檢索相關文件區塊，建立上下文並交由 LLM 生成附引用的答案。架構採用 FastAPI + Next.js，Redis 負責短期對話快取（3 天 TTL）、PostgreSQL 保存永久稽核紀錄，Provider 抽象層可一鍵切換 OpenAI / Gemini / Claude。所有服務以 Docker Compose 編排，支援串流回答（SSE）、JWT 認證、速率限制與自動版本管理。",
      en: "AutoLLM is a No-Code RAG chatbot platform. Users upload documents, and the system automatically parses, chunks, generates embeddings, and stores vectors (pgvector). Cosine similarity retrieval finds relevant chunks to build context for LLM-generated answers with citations. Built with FastAPI + Next.js full-stack, Redis for short-term conversation cache (3-day TTL), PostgreSQL for permanent audit storage, and a provider abstraction layer for one-click switching between OpenAI / Gemini / Claude. All services orchestrated via Docker Compose, supporting streaming responses (SSE), JWT auth, rate limiting, and automatic versioning.",
    },
    highlights: {
      zh: [
        "完整 RAG 流程：上傳 → 分塊 → Embedding → 向量檢索 → LLM 生成帶引用答案",
        "Provider 抽象層（策略模式），一鍵切換 OpenAI / Gemini / Claude",
        "Redis 短期快取 + PostgreSQL 永久稽核的雙層對話儲存架構",
        "pgvector 餘弦距離檢索，可配置 chunk_size / overlap / top_k",
        "Docker Compose 微服務部署，SSE 流式回答 + JWT 認證 + 速率限制",
      ],
      en: [
        "End-to-end RAG pipeline: upload → chunking → embedding → vector retrieval → LLM answers with citations",
        "Provider abstraction layer (strategy pattern) for one-click OpenAI / Gemini / Claude switching",
        "Dual-layer storage: Redis short-term cache + PostgreSQL permanent audit trail",
        "pgvector cosine retrieval with configurable chunk_size / overlap / top_k",
        "Docker Compose microservices with SSE streaming, JWT auth, and rate limiting",
      ],
    },
    metrics: {
      zh: [{ label: "LLM 提供商", value: "3+" }, { label: "API 端點", value: "15+" }, { label: "部署方式", value: "Docker" }],
      en: [{ label: "LLM Providers", value: "3+" }, { label: "API Endpoints", value: "15+" }, { label: "Deploy", value: "Docker" }],
    },
  },
];

const projectBase = [...cvProjects, ...existingProjects];

const statsBase = [
  { projectCount: true, icon: <FaCode />, label: { zh: "案例數", en: "Cases" } },
  { value: "10+", icon: <FaCloud />, label: { zh: "產業", en: "Industries" } },
  { value: "4", icon: <FaPython />, label: { zh: "能力領域", en: "Capability Areas" } },
  { value: "15", icon: <FaStar />, label: { zh: "跨市場經驗", en: "Markets" } },
];

/** Resolve locale-specific fields and return flat project/stats arrays */
export function getProjectData(locale = "zh") {
  const projects = [...projectBase]
    .sort((a, b) => (a.groupOrder ?? 99) - (b.groupOrder ?? 99))
    .map((p) => {
      const categories = (p.categories || [p.category]).map(
        (category) => category[locale] || category.zh,
      );

      return {
        slug: p.slug,
        featured: Boolean(p.featured),
        socialImage: p.socialImage || "/profile.webp",
        title: p.title[locale] || p.title.zh,
        seoTitle: p.seoTitle?.[locale] || p.seoTitle?.zh || p.title[locale] || p.title.zh,
        seoDescription: p.seoDescription?.[locale] || p.seoDescription?.zh || p.description[locale] || p.description.zh,
        industry: p.industry[locale] || p.industry.zh,
        industryContext: p.industryContext[locale] || p.industryContext.zh,
        description: p.description[locale] || p.description.zh,
        detailDescription: p.detailDescription?.[locale] || p.detailDescription?.zh || null,
        caseNotes: p.caseNotes?.[locale] || p.caseNotes?.zh || null,
        highlights: p.highlights?.[locale] || p.highlights?.zh || null,
        icon: p.icon,
        categoryIcon: p.categoryIcon,
        category: categories.join(" · "),
        categories,
        technologies: [...p.technologies, ...(p.extraTech?.[locale] ? [p.extraTech[locale]] : [])],
        metrics: p.metrics[locale] || p.metrics.zh,
        link: p.link,
        color: p.color,
        bgGradient: p.bgGradient,
      };
    });

  const stats = statsBase.map((s) => ({
    value: s.projectCount ? String(projects.length) : s.value,
    icon: s.icon,
    label: s.label[locale] || s.label.zh,
  }));

  return { projects, stats };
}

export function getProjectBySlug(slug, locale = "zh") {
  return getProjectData(locale).projects.find((project) => project.slug === slug) || null;
}

export function getProjectSlugs() {
  return projectBase.map((project) => project.slug).filter(Boolean);
}
