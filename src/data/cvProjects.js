import { FaBrain, FaChartLine, FaDatabase, FaRobot } from "react-icons/fa";

const groups = {
  dataAnalytics: {
    groupOrder: 1,
    icon: <FaChartLine size={28} />,
    categoryIcon: <FaChartLine size={16} />,
    category: { zh: "資料分析", en: "Data Analytics" },
    socialImage: "/media/selected-work/logistics-editorial.webp",
    color: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
  },
  dataScience: {
    groupOrder: 2,
    icon: <FaBrain size={28} />,
    categoryIcon: <FaBrain size={16} />,
    category: { zh: "AI 與資料科學", en: "AI & Data Science" },
    socialImage: "/media/selected-work/autollm-editorial.webp",
    color: "from-violet-500 to-indigo-500",
    bgGradient: "from-violet-500/10 to-indigo-500/10",
  },
  dataEngineering: {
    groupOrder: 3,
    icon: <FaDatabase size={28} />,
    categoryIcon: <FaDatabase size={16} />,
    category: { zh: "資料工程", en: "Data Engineering" },
    socialImage: "/media/selected-work/martech-editorial.webp",
    color: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/10",
  },
  consulting: {
    groupOrder: 4,
    icon: <FaRobot size={28} />,
    categoryIcon: <FaRobot size={16} />,
    category: { zh: "顧問諮詢", en: "Consulting" },
    socialImage: "/media/selected-work/fmcg-editorial.webp",
    color: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
  },
};

const clientProject = ({ group, alsoGroups = [], ...project }) => ({
  ...groups[group],
  featured: false,
  categories: [groups[group].category, ...alsoGroups.map((groupName) => groups[groupName].category)],
  link: "#",
  seoTitle: project.seoTitle || project.title,
  seoDescription: project.seoDescription || project.description,
  ...project,
});

export const cvProjects = [
  clientProject({
    group: "dataAnalytics",
    slug: "o2o-logistics-cancellation-drivers",
    featured: true,
    technologies: ["SQL", "Cancellation Analysis", "Funnel Analysis", "Segmentation", "Data Visualisation"],
    industry: { zh: "O2O 即時物流平台業", en: "O2O On-Demand Logistics Platforms" },
    industryContext: {
      zh: "即時物流平台必須在短時間內媒合需求端與服務提供端；取消不只代表單筆訂單流失，也會降低供需流動性、使用者信任與整體營運效率。跨市場營運又會受到地區密度、供給結構與使用行為差異影響，因此需要一致定義及可比較的診斷框架。",
      en: "On-demand logistics platforms must match customers and service providers within a narrow time window. A cancellation is not only a lost order: it also weakens marketplace liquidity, participant trust, and operational efficiency, while cross-market differences in density, supply structure, and behavior require consistent definitions and comparable diagnostics.",
    },
    title: {
      zh: "跨國即時物流平台取消率驅動分析",
      en: "Cancellation Rate Driver Analysis for an On-Demand Logistics Platform",
    },
    description: {
      zh: "從訂單生命週期、使用者與服務提供者旅程切入，拆解取消率來源，辨識高風險市場、情境與流程節點，支援營運改善。",
      en: "Decomposed cancellation drivers across the order lifecycle and both sides of the marketplace to identify high-risk markets, scenarios, and journey stages for operational improvement.",
    },
    detailDescription: {
      zh: "本分析針對跨國即時物流平台的取消率問題，先統一訂單狀態、取消角色、取消原因與時間定義，再建立由下單、媒合、接受、到達到完成的完整漏斗。透過 SQL 將取消率依市場、時段、區域、訂單類型、服務供需狀態、使用者分群與服務提供者旅程切分，區分需求端主動取消、供給端取消及系統或營運因素。最後以影響規模、發生頻率與可改善性排序問題，形成可持續追蹤的取消率診斷框架與營運建議。",
      en: "This analysis addressed cancellation performance for a global on-demand logistics platform by first standardizing order states, cancelling party, reason codes, and timing definitions, then building a complete funnel from booking and matching through acceptance, arrival, and completion. SQL-based analysis segmented cancellation rates by market, time, location, order type, supply-demand conditions, customer cohort, and service-provider journey, separating demand-side, supply-side, and system or operational causes. Issues were prioritized by impact, frequency, and actionability to create a repeatable cancellation diagnostic framework and a set of operational recommendations.",
    },
    caseNotes: {
      zh: {
        problem: "整體取消率只能反映結果，無法說明是誰在何時取消、集中在哪些市場與流程節點，以及背後原因。",
        approach: "重新定義取消口徑並建立訂單漏斗，以多維分群、貢獻度與根因拆解定位高影響情境。",
        impact: "讓營運團隊能由單一比例深入到可行動的市場、族群與流程問題，並建立一致的後續監測方式。",
      },
      en: {
        problem: "The headline cancellation rate showed the outcome but not who cancelled, when it happened, where it concentrated, or why.",
        approach: "Standardized cancellation definitions and built an order funnel, using multidimensional segmentation, contribution analysis, and root-cause decomposition.",
        impact: "Enabled operations teams to move from one aggregate rate to actionable market, cohort, and journey problems with consistent ongoing monitoring.",
      },
    },
    highlights: {
      zh: ["統一取消角色、原因、時間與分母口徑", "建立下單至完成的端到端轉換漏斗", "依市場、時段、區域與供需狀態拆解取消率", "以影響規模與可改善性排序營運問題"],
      en: ["Standardized cancelling party, reason, timing, and denominator definitions", "Built an end-to-end booking-to-completion funnel", "Segmented cancellations by market, time, location, and supply-demand state", "Prioritized operational issues by impact and actionability"],
    },
    metrics: {
      zh: [{ label: "範圍", value: "多市場" }, { label: "角色", value: "BI／資料分析" }, { label: "產出", value: "取消診斷框架" }],
      en: [{ label: "Scope", value: "Multi-market" }, { label: "Role", value: "BI / Analytics" }, { label: "Output", value: "Driver Framework" }],
    },
  }),
  clientProject({
    group: "dataAnalytics",
    slug: "market-demand-supply-analysis",
    technologies: ["SQL", "Market Analysis", "Demand & Supply", "Cohort Analysis", "Operational Analytics"],
    industry: { zh: "O2O 即時物流平台業", en: "O2O On-Demand Logistics Platforms" },
    industryContext: {
      zh: "即時叫車與物流服務高度依賴在地市場條件，人口與商業密度、尖離峰需求、可用供給及服務習慣都會直接影響媒合與完成表現。區域平均值無法取代市場級分析，營運策略必須建立在當地供需結構之上。",
      en: "On-demand booking and logistics performance is highly local: population and commercial density, peak demand, available supply, and service behavior all shape matching and completion. Regional averages cannot replace market-level analysis, so operating decisions must be grounded in the local supply-demand structure.",
    },
    title: {
      zh: "特定市場叫車需求與供給分析",
      en: "Market-Specific On-Demand Booking Analysis",
    },
    description: {
      zh: "針對單一重點市場深入分析叫車需求、服務供給、媒合效率與完成表現，找出在地化的成長限制與營運機會。",
      en: "Conducted a deep dive into demand, supply availability, matching efficiency, and completion performance in a priority market to identify localized growth constraints and opportunities.",
    },
    detailDescription: {
      zh: "本專案聚焦於特定市場的叫車與即時媒合表現，將訂單需求、活躍服務供給、接受行為、媒合等待、取消及完成資料整合成市場營運視圖。分析依日期、時段、地區、使用者類型、服務類別與新舊客群建立切片，觀察需求高峰、供給缺口、接受率、完成率與轉換摩擦如何互相影響。除描述市場現況外，也比較不同區域與客群的表現差異，將發現整理為供給配置、服務流程、客群經營與成效監測建議。",
      en: "This project focused on on-demand booking and real-time matching performance in a priority market, combining order demand, active supply, acceptance behavior, matching wait, cancellation, and completion into one operational view. Analysis was sliced by date, time, geography, customer type, service category, and new-versus-returning cohorts to understand how demand peaks, supply gaps, acceptance, completion, and conversion friction interacted. Beyond describing current performance, comparisons across locations and cohorts translated findings into recommendations for supply allocation, service flow, customer strategy, and ongoing measurement.",
    },
    caseNotes: {
      zh: {
        problem: "區域整體指標掩蓋單一市場的供需結構與在地行為，使通用策略難以直接套用。",
        approach: "建立市場專屬的供需與轉換指標，依時空、服務與客群切片比較叫車到完成的完整旅程。",
        impact: "釐清該市場的主要供給缺口與需求摩擦，提供更具在地性的營運和成長決策依據。",
      },
      en: {
        problem: "Regional averages obscured the supply-demand structure and local behavior of one market, limiting the value of generic strategies.",
        approach: "Built market-specific supply, demand, and conversion measures, comparing the full booking-to-completion journey across time, location, service, and cohort slices.",
        impact: "Clarified the market's main supply gaps and demand friction, enabling more localized operational and growth decisions.",
      },
    },
    highlights: {
      zh: ["建立市場級需求、供給、媒合與完成指標", "辨識尖峰時段及地區供需缺口", "比較新舊客群與服務類別的轉換差異", "提出在地化供給配置與成長監測建議"],
      en: ["Built market-level demand, supply, matching, and completion measures", "Identified peak-time and geographic supply gaps", "Compared conversion across customer cohorts and service types", "Produced localized supply-allocation and growth-monitoring recommendations"],
    },
    metrics: {
      zh: [{ label: "範圍", value: "重點市場" }, { label: "分析", value: "供需與轉換" }, { label: "產出", value: "營運建議" }],
      en: [{ label: "Scope", value: "Priority Market" }, { label: "Analysis", value: "Supply & Demand" }, { label: "Output", value: "Operations Plan" }],
    },
  }),
  clientProject({
    group: "dataAnalytics",
    slug: "two-sided-marketplace-matching",
    technologies: ["SQL", "Marketplace Analytics", "User Journey", "Provider Journey", "Matching & Liquidity"],
    industry: { zh: "O2O 即時物流平台業", en: "O2O On-Demand Logistics Platforms" },
    industryContext: {
      zh: "雙邊市場的價值來自需求與供給同時活躍，任何只改善單邊的策略都可能改變另一側的等待、接受與留存。分析重點因此不是單一轉換率，而是市場流動性、媒合品質與雙方長期行為的平衡。",
      en: "A two-sided marketplace creates value only when both demand and supply remain active. Improving one side can change waiting, acceptance, and retention on the other, so the analytical focus must extend beyond a single conversion rate to liquidity, match quality, and long-term participant balance.",
    },
    title: {
      zh: "雙邊市場供需與媒合機制研究",
      en: "Two-Sided Marketplace Supply, Demand & Matching Study",
    },
    description: {
      zh: "同時研究需求端與服務提供端旅程，分析市場流動性、媒合效率與雙方行為如何共同影響訂單完成及留存。",
      en: "Studied both demand-side and service-provider journeys to understand how marketplace liquidity, matching efficiency, and participant behavior shaped completion and retention.",
    },
    detailDescription: {
      zh: "本研究以雙邊市場為核心，不只觀察下單者的轉換，也同步分析服務提供者的上線、接單、拒絕、取消與完成旅程。透過 SQL 串接訂單事件、媒合結果與雙方行為資料，建立需求密度、有效供給、接受率、媒合時間、完成率、取消率及重複使用等指標，並比較不同市場、時段與客群的流動性差異。分析特別關注單邊優化對另一側可能造成的影響，讓供給策略、需求成長與媒合規則能在同一框架下評估。",
      en: "This study treated the product as a two-sided marketplace, examining not only customer conversion but also service-provider availability, acceptance, rejection, cancellation, and completion journeys. SQL connected order events, matching outcomes, and participant behavior to measure demand density, effective supply, acceptance, match time, completion, cancellation, and repeat usage across markets, time periods, and cohorts. The analysis explicitly considered how optimizing one side could affect the other, enabling supply strategy, demand growth, and matching rules to be evaluated within one marketplace framework.",
    },
    caseNotes: {
      zh: {
        problem: "只分析需求端會忽略有效供給與媒合流動性，容易把雙邊互動問題誤判為單一轉換問題。",
        approach: "建立雙方旅程與市場健康度指標，分析需求密度、有效供給、接受、媒合、取消及留存的連動。",
        impact: "提供兼顧供給與需求的決策框架，協助評估成長措施對整體市場平衡的影響。",
      },
      en: {
        problem: "Demand-only analysis ignored effective supply and marketplace liquidity, often misclassifying two-sided interaction problems as simple conversion issues.",
        approach: "Built participant journeys and marketplace-health measures linking demand density, effective supply, acceptance, matching, cancellation, and retention.",
        impact: "Provided a balanced decision framework for evaluating how growth actions affected both sides and overall marketplace health.",
      },
    },
    highlights: {
      zh: ["整合需求端與服務提供端完整旅程", "建立需求密度、有效供給與市場流動性指標", "分析接受率、媒合時間、取消與完成的連動", "評估單邊策略對整體市場平衡的影響"],
      en: ["Connected complete demand-side and provider-side journeys", "Measured demand density, effective supply, and marketplace liquidity", "Linked acceptance, match time, cancellation, and completion", "Evaluated one-sided strategies against overall marketplace balance"],
    },
    metrics: {
      zh: [{ label: "市場", value: "雙邊平台" }, { label: "旅程", value: "需求端＋供給端" }, { label: "重點", value: "流動性與媒合" }],
      en: [{ label: "Market", value: "Two-sided" }, { label: "Journeys", value: "Demand + Supply" }, { label: "Focus", value: "Liquidity & Match" }],
    },
  }),
  clientProject({
    group: "dataAnalytics",
    slug: "cancellation-timing-order-lifecycle",
    technologies: ["SQL", "Time-to-Event Analysis", "Order Lifecycle", "Cohort Analysis", "Root Cause Analysis"],
    industry: { zh: "O2O 即時物流平台業", en: "O2O On-Demand Logistics Platforms" },
    industryContext: {
      zh: "即時服務的取消風險會隨訂單狀態與等待時間快速變化；媒合前取消、長時間等待後取消與服務提供者接受後取消，代表完全不同的體驗及營運問題。產業需要以時間與狀態理解取消，而不只是追蹤最終比例。",
      en: "Cancellation risk in on-demand services changes quickly with order state and waiting time. Pre-match cancellation, cancellation after a long wait, and post-acceptance cancellation represent different experience and operational failures, requiring a state- and time-aware view rather than one final rate.",
    },
    title: {
      zh: "取消時間與訂單生命週期分析",
      en: "Cancellation Timing & Order Lifecycle Analysis",
    },
    description: {
      zh: "研究取消發生的時間點與訂單狀態，區分媒合前後及不同等待階段的取消行為，定位最需要介入的時間窗口。",
      en: "Analyzed when cancellations occurred across order states, separating pre- and post-match behavior to identify the highest-value intervention windows.",
    },
    detailDescription: {
      zh: "本分析將取消率從單一結果指標延伸為時間事件研究，計算下單至取消、媒合至取消、接受至取消等關鍵時間差，並依訂單狀態建立取消時間分布與累積曲線。透過時間區間、取消角色、等待長度、媒合狀態、時段、市場與客群切分，辨識立即取消、長等待後取消、媒合後取消等不同機制，避免把性質不同的問題混在一起。成果用於定義早期預警指標、流程介入窗口與更精確的取消監控儀表板。",
      en: "This analysis extended cancellation rate from a single outcome metric into a time-to-event study, calculating intervals from booking to cancellation, matching to cancellation, and acceptance to cancellation while building state-based timing distributions and cumulative curves. Segmentation by time bucket, cancelling party, wait duration, match state, time of day, market, and cohort distinguished immediate cancellations, long-wait cancellations, and post-match cancellations rather than treating them as one behavior. Findings informed early-warning indicators, operational intervention windows, and more precise cancellation monitoring dashboards.",
    },
    caseNotes: {
      zh: {
        problem: "相同的取消結果可能發生於完全不同的訂單階段，若只看取消率，無法判斷應在哪個時間點介入。",
        approach: "建立訂單狀態與 time-to-event 分析，拆解各時間窗口、取消角色及等待條件下的行為。",
        impact: "找出取消風險開始上升的關鍵階段，讓產品與營運措施能對準適當的介入時機。",
      },
      en: {
        problem: "The same cancellation outcome could occur at very different order stages, so the rate alone could not show when intervention was needed.",
        approach: "Built order-state and time-to-event analysis across timing windows, cancelling parties, and waiting conditions.",
        impact: "Identified stages where cancellation risk began to rise, allowing product and operational actions to target the right intervention moments.",
      },
    },
    highlights: {
      zh: ["建立下單、媒合、接受到取消的時間差指標", "區分立即、長等待與媒合後取消機制", "以狀態分布與累積曲線呈現取消風險", "定義早期預警與流程介入時間窗口"],
      en: ["Measured booking-, match-, and acceptance-to-cancellation intervals", "Separated immediate, long-wait, and post-match cancellation mechanisms", "Visualized risk through state distributions and cumulative timing curves", "Defined early-warning and operational intervention windows"],
    },
    metrics: {
      zh: [{ label: "方法", value: "時間事件分析" }, { label: "範圍", value: "完整訂單週期" }, { label: "產出", value: "介入時間窗口" }],
      en: [{ label: "Method", value: "Time-to-event" }, { label: "Scope", value: "Order Lifecycle" }, { label: "Output", value: "Intervention Windows" }],
    },
  }),
  clientProject({
    group: "consulting",
    slug: "public-transport-ai-pilot-training",
    technologies: ["AI Strategy", "PoC Planning", "Workshops", "Railway", "Digital Transformation"],
    industry: { zh: "公共運輸與智慧移動", en: "Public Transport & Smart Mobility" },
    industryContext: {
      zh: "大型公共運輸具備高可靠度、安全與跨部門協作要求，AI 導入不能只評估模型效果，還必須考量既有系統、資料責任、營運流程及人員採用。顧問工作的核心是把模糊構想轉化為可治理、可驗收的試辦。",
      en: "Major public transport operations require reliability, safety, and cross-functional coordination. AI adoption cannot be judged by model performance alone; it must account for legacy systems, data ownership, operating processes, and workforce adoption, making a governable and testable pilot design essential.",
    },
    title: {
      zh: "大型公共運輸單位 AI 試辦與能力培訓",
      en: "Major Public Transport Operator AI Pilot & Capability Building",
    },
    description: {
      zh: "擔任 AI 規劃顧問與講師，協助盤點鐵路營運中的 AI 機會、規劃試辦路徑，並透過工作坊建立內部推動能力。",
      en: "Served as AI planning consultant and trainer to identify railway AI opportunities, shape pilot roadmaps, and build internal delivery capability through workshops.",
    },
    detailDescription: {
      zh: "本專案支援大型公共運輸單位推動 AI 數位轉型。工作從業務訪談、流程盤點與機會探索開始，依商業價值、資料可行性、營運影響與導入風險評估候選情境，形成可執行的試辦範圍、驗證指標與後續擴充路徑。另透過案例教材與跨部門工作坊，協助業務、資訊與管理團隊理解 AI 專案生命週期、資料責任、驗收方式及後續治理機制。",
      en: "This engagement supported a major public transport operator's AI-enabled digital transformation. Stakeholder interviews, process mapping, and opportunity discovery were used to prioritize candidate use cases by business value, data feasibility, operational impact, and delivery risk, producing executable pilot scopes, validation criteria, and scale-up paths. Case-based training and cross-functional workshops aligned business, technology, and management teams on the AI lifecycle, data ownership, acceptance methods, and long-term governance.",
    },
    caseNotes: {
      zh: {
        problem: "鐵路營運情境多元，但 AI 機會、資料條件與推動優先順序尚未形成共同框架。",
        approach: "以訪談、用例評估與工作坊建立試辦藍圖，明確定義價值、風險、資料需求與驗證方式。",
        impact: "將抽象的 AI 願景轉化為可執行試辦清單，並提升內部團隊參與後續導入的能力。",
      },
      en: {
        problem: "Railway operations offered many AI opportunities, but priorities, data readiness, and delivery ownership lacked a shared framework.",
        approach: "Combined interviews, use-case assessment, and workshops to define pilot value, risks, data needs, and validation methods.",
        impact: "Turned broad AI ambition into an actionable pilot portfolio while strengthening internal capability for adoption.",
      },
    },
    highlights: {
      zh: ["AI 機會盤點與價值／可行性排序", "試辦範圍、驗證指標與推動路線規劃", "跨部門 AI 能力培訓與共識工作坊"],
      en: ["AI opportunity discovery and value/feasibility prioritization", "Pilot scope, validation criteria, and delivery roadmap", "Cross-functional AI capability workshops"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2026" }, { label: "角色", value: "AI 顧問" }, { label: "重點", value: "試辦與培訓" }],
      en: [{ label: "Period", value: "2026" }, { label: "Role", value: "AI Consultant" }, { label: "Focus", value: "Pilot & Training" }],
    },
  }),
  clientProject({
    group: "consulting",
    slug: "healthcare-ai-adoption-pilot",
    socialImage: "/media/selected-work/foodtech-editorial.webp",
    technologies: ["AI Strategy", "Healthcare AI", "PoC", "Stakeholder Workshops", "AI Governance"],
    industry: { zh: "醫療與健康照護", en: "Healthcare & Life Sciences" },
    industryContext: {
      zh: "醫療 AI 涉及敏感資料、高錯誤成本與專業人員最終判斷，導入時必須同時處理臨床或行政價值、資料可用性、隱私、人工覆核及責任邊界。試辦規劃需要讓技術可行性與醫療流程風險同步被驗證。",
      en: "Healthcare AI involves sensitive data, high error costs, and professional human judgment. Adoption must address clinical or administrative value, data availability, privacy, human review, and accountability together, with pilots validating technical feasibility and workflow risk in parallel.",
    },
    title: {
      zh: "大型醫療機構 AI 導入試辦",
      en: "Major Healthcare Institution AI Adoption Pilot",
    },
    description: {
      zh: "協助規劃醫療場域的 AI 導入策略、試辦執行與利害關係人培訓，讓候選情境能在治理與可行性框架下推進。",
      en: "Supported healthcare AI adoption strategy, pilot implementation, and stakeholder capability building within a practical governance and feasibility framework.",
    },
    detailDescription: {
      zh: "本專案以大型醫療場域的實際服務與行政需求為起點，協助建立 AI 導入策略並規劃試辦。透過需求訪談、情境評估與跨角色工作坊，釐清資料可用性、流程整合、使用者責任、風險治理與成效驗證方式；同時將候選用例拆解為問題定義、輸入資料、預期輸出、人工覆核與試辦驗收項目，使技術團隊與業務利害關係人能以共同語言推進 AI 應用。",
      en: "This programme began with real service and administrative needs in a major healthcare environment to shape an AI adoption strategy and pilot plan. Interviews, use-case assessment, and cross-role workshops clarified data availability, workflow integration, user responsibilities, governance risks, and validation methods. Candidate use cases were decomposed into problem definitions, input data, expected outputs, human review, and pilot acceptance criteria, giving technical and operational stakeholders a shared foundation for implementation.",
    },
    caseNotes: {
      zh: {
        problem: "醫療 AI 必須同時兼顧臨床價值、資料條件、流程整合與治理風險。",
        approach: "建立用例評估框架與試辦計畫，並透過工作坊對齊技術、業務與治理角色。",
        impact: "形成可驗證、可治理的 AI 導入路徑，降低從概念進入試辦的落差。",
      },
      en: {
        problem: "Healthcare AI had to balance clinical value, data readiness, workflow integration, and governance risk.",
        approach: "Created a use-case assessment framework and pilot plan, aligning technical, operational, and governance stakeholders through workshops.",
        impact: "Established a governable, testable path from AI concepts to practical pilots.",
      },
    },
    highlights: {
      zh: ["醫療 AI 導入策略與用例評估", "試辦執行與驗證框架", "利害關係人能力培訓與治理對齊"],
      en: ["Healthcare AI strategy and use-case assessment", "Pilot delivery and validation framework", "Stakeholder capability building and governance alignment"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2026" }, { label: "角色", value: "AI 顧問" }, { label: "領域", value: "醫療 AI" }],
      en: [{ label: "Period", value: "2026" }, { label: "Role", value: "AI Consultant" }, { label: "Domain", value: "Healthcare AI" }],
    },
  }),
  clientProject({
    group: "consulting",
    slug: "highway-transport-ai-pilot",
    technologies: ["AI Strategy", "Proof of Concept", "Public Sector", "Workshops", "Roadmapping"],
    industry: { zh: "公路運輸與公共建設", en: "Highway Transport & Public Infrastructure" },
    industryContext: {
      zh: "公路與公共建設業務橫跨設施維護、運輸服務、行政流程與風險管理，資料通常分散在不同系統及權責單位。AI 試辦需要先釐清真正的業務問題、可取得資料與採購治理條件，才能避免技術與現場脫節。",
      en: "Highway and public-infrastructure operations span asset maintenance, transport services, administration, and risk management, with data distributed across systems and owners. AI pilots must clarify the real business problem, available data, and procurement and governance constraints before technology can fit operational reality.",
    },
    title: {
      zh: "公路運輸主管機關 AI 試辦",
      en: "Highway Transport Authority AI Pilot",
    },
    description: {
      zh: "負責 AI 機會辨識、概念驗證規劃與組織培訓，協助公路業務把數位轉型方向轉化為可執行的 AI 試辦。",
      en: "Led AI opportunity identification, proof-of-concept planning, and organizational training to convert highway digital transformation goals into executable pilots.",
    },
    detailDescription: {
      zh: "本專案以公路運輸業務與營運需求為核心，透過利害關係人訪談、服務流程盤點與痛點分析辨識具價值的 AI 應用，並將優先情境轉化為 PoC 範圍、資料需求、驗證標準、風險假設與推動時程。另以培訓、案例討論及工作坊強化內部團隊對 AI 專案評估、採購需求、治理責任與落地方式的理解。",
      en: "Centered on highway transport operations, the programme used stakeholder interviews, service-process mapping, and pain-point analysis to identify valuable AI applications, then translated priority use cases into PoC scope, data requirements, validation criteria, risk assumptions, and delivery timelines. Training, case discussions, and workshops improved internal understanding of AI evaluation, procurement requirements, governance responsibilities, and implementation.",
    },
    caseNotes: {
      zh: {
        problem: "數位轉型方向廣泛，缺少能連結業務需求、資料可行性與 AI 試辦的執行機制。",
        approach: "盤點流程與痛點，排序 AI 情境並定義 PoC、資料條件與驗證標準。",
        impact: "建立從機會辨識到試辦落地的共同方法，支援後續組織推動。",
      },
      en: {
        problem: "Broad digital transformation goals lacked an execution mechanism linking business needs, data feasibility, and AI pilots.",
        approach: "Mapped processes and pain points, prioritized AI use cases, and defined PoC scope, data needs, and success criteria.",
        impact: "Created a shared method from opportunity discovery to pilot delivery for future organizational adoption.",
      },
    },
    highlights: {
      zh: ["公路業務 AI 機會辨識", "PoC 範圍與驗證標準設計", "組織能力培訓與導入路線規劃"],
      en: ["AI opportunity discovery for highway operations", "PoC scope and validation design", "Organizational training and adoption roadmap"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2025" }, { label: "角色", value: "專案經理" }, { label: "重點", value: "AI PoC" }],
      en: [{ label: "Period", value: "2025" }, { label: "Role", value: "Project Manager" }, { label: "Focus", value: "AI PoC" }],
    },
  }),
  clientProject({
    group: "consulting",
    slug: "enterprise-ai-strategy-roadmap",
    technologies: ["AI Strategy", "Use Case Assessment", "Operating Model", "Roadmapping", "Enterprise AI"],
    industry: { zh: "消費品、零售與企業營運", en: "Consumer Goods, Retail & Enterprise Operations" },
    industryContext: {
      zh: "跨國消費品企業的資料與 AI 機會分布於銷售、行銷、供應鏈及管理職能，但各單位的資料成熟度、價值目標與風險承受度不同。導入策略需要建立一致的用例評估及治理方式，才能避免資源被零散 PoC 分散。",
      en: "In a global consumer enterprise, data and AI opportunities span sales, marketing, supply chain, and management functions, each with different maturity, value goals, and risk tolerance. A consistent use-case assessment and governance model is needed to prevent resources from fragmenting across isolated proofs of concept.",
    },
    title: {
      zh: "跨國消費品企業資料應用與 AI 導入",
      en: "Global Consumer Enterprise Data & AI Adoption",
    },
    description: {
      zh: "擔任專案經理與 Data & AI Lead，規劃企業 AI 策略、用例評估與導入路線，加速資料應用與商業創新。",
      en: "Served as project manager and AI/data lead for enterprise AI strategy, use-case assessment, and implementation planning to accelerate data adoption and business innovation.",
    },
    detailDescription: {
      zh: "本計畫聚焦於把企業資料能力轉化為可落地的 AI 應用。透過業務訪談與用例工作坊，建立需求清單並依商業價值、資料成熟度、技術複雜度與治理風險排序，進一步形成分階段導入路線、責任分工與試辦建議，支援跨部門採用。",
      en: "This programme focused on converting enterprise data capabilities into deployable AI applications. Business interviews and use-case workshops built a demand portfolio, prioritized by value, data maturity, technical complexity, and governance risk, then shaped a phased roadmap, ownership model, and pilot recommendations for cross-functional adoption.",
    },
    caseNotes: {
      zh: {
        problem: "企業擁有多元資料與 AI 構想，但缺少一致的價值評估、優先順序與導入藍圖。",
        approach: "建立用例評分框架，整合業務需求、資料成熟度、風險與執行成本。",
        impact: "形成跨部門可共同採用的 AI 路線圖，讓資源集中於高價值且可執行的情境。",
      },
      en: {
        problem: "The enterprise had diverse data and AI ideas but lacked consistent value assessment, prioritization, and an adoption roadmap.",
        approach: "Built a use-case scoring framework combining business demand, data maturity, risk, and delivery effort.",
        impact: "Produced a cross-functional AI roadmap that focused resources on high-value, executable opportunities.",
      },
    },
    highlights: {
      zh: ["企業 AI 策略與採用模式", "用例價值／可行性評估", "分階段導入路線與試辦建議"],
      en: ["Enterprise AI strategy and adoption model", "Use-case value and feasibility assessment", "Phased implementation roadmap and pilot recommendations"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2026" }, { label: "角色", value: "Data & AI Lead" }, { label: "重點", value: "企業 AI" }],
      en: [{ label: "Period", value: "2026" }, { label: "Role", value: "AI & Data Lead" }, { label: "Focus", value: "Enterprise AI" }],
    },
  }),

  clientProject({
    group: "dataEngineering",
    slug: "enterprise-data-integration-governance",
    technologies: ["Data Integration", "Data Governance", "Data Quality", "Operating Model", "Digital Transformation"],
    industry: { zh: "消費品、零售與企業資料", en: "Consumer Goods, Retail & Enterprise Data" },
    industryContext: {
      zh: "跨國消費品企業通常同時運作多個市場、品牌與業務系統，主檔、交易及績效資料容易出現定義不一致、重複與權責不清。資料整合與治理是後續 BI、預測及 AI 應用能否被信任的基礎工程。",
      en: "Global consumer enterprises operate across markets, brands, and business systems, where master, transaction, and performance data often suffers from inconsistent definitions, duplication, and unclear ownership. Integration and governance provide the trusted foundation required by BI, forecasting, and AI.",
    },
    title: {
      zh: "跨國消費品企業資料整合與治理",
      en: "Global Consumer Enterprise Data Integration & Governance",
    },
    description: {
      zh: "負責企業資料整合、治理框架與數位轉型規劃，建立跨來源資料可被一致管理與應用的基礎。",
      en: "Led enterprise data integration, governance framework design, and digital transformation planning to create a consistent foundation for trusted data use.",
    },
    detailDescription: {
      zh: "本專案針對分散於不同系統與部門的企業資料，規劃整合架構與治理框架。工作涵蓋資料來源盤點、關鍵資料定義、品質與權責機制、整合流程以及分階段推動藍圖，使後續報表、分析與 AI 應用能建立在一致且可追溯的資料基礎上。",
      en: "This project addressed enterprise data distributed across systems and functions by designing an integration architecture and governance framework. It covered source inventory, critical data definitions, quality and ownership controls, integration workflows, and a phased roadmap so reporting, analytics, and AI could rely on consistent, traceable data.",
    },
    caseNotes: {
      zh: {
        problem: "資料分散、定義不一致且權責不清，限制報表可信度與跨部門應用。",
        approach: "盤點來源與資料流，設計治理角色、品質規則、標準定義與整合路線。",
        impact: "建立可擴充的可信資料基礎，支援後續 BI、分析與 AI 導入。",
      },
      en: {
        problem: "Fragmented sources, inconsistent definitions, and unclear ownership limited reporting trust and cross-functional use.",
        approach: "Mapped sources and flows, then designed governance roles, quality rules, shared definitions, and an integration roadmap.",
        impact: "Established a scalable trusted-data foundation for BI, analytics, and AI adoption.",
      },
    },
    highlights: {
      zh: ["企業資料來源與資料流盤點", "治理角色、標準與品質框架", "整合架構及分階段轉型藍圖"],
      en: ["Enterprise source and data-flow inventory", "Governance roles, standards, and quality framework", "Integration architecture and phased transformation roadmap"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2026" }, { label: "角色", value: "資料負責人" }, { label: "重點", value: "資料治理" }],
      en: [{ label: "Period", value: "2026" }, { label: "Role", value: "Data Lead" }, { label: "Focus", value: "Governance" }],
    },
  }),
  clientProject({
    group: "dataAnalytics",
    slug: "enterprise-bi-dashboard-planning",
    technologies: ["Business Intelligence", "KPI Framework", "Dashboard Design", "Reporting", "Data Modelling"],
    industry: { zh: "消費品、零售與企業管理", en: "Consumer Goods, Retail & Enterprise Management" },
    industryContext: {
      zh: "消費品企業需要跨市場、產品與職能追蹤營運表現，但管理報表常因 KPI 定義、更新頻率與資料粒度不同而無法直接比較。BI 規劃的價值在於先統一決策語言，再決定儀表板和資料模型如何呈現。",
      en: "Consumer enterprises need to compare performance across markets, products, and functions, yet management reports often differ in KPI definitions, refresh timing, and granularity. BI planning creates value by establishing a common decision language before designing dashboards and data models.",
    },
    title: {
      zh: "跨國消費品企業 BI 儀表板規劃",
      en: "Global Consumer Enterprise BI Dashboard Planning",
    },
    description: {
      zh: "規劃企業報表平台、KPI 框架與 BI 解決方案，讓管理與營運團隊能以一致指標進行決策。",
      en: "Planned enterprise reporting platforms, KPI frameworks, and BI solutions so management and operations could make decisions from consistent measures.",
    },
    detailDescription: {
      zh: "本專案從管理與營運決策需求出發，盤點既有報表、資料來源與使用痛點，定義 KPI 架構、指標口徑、資訊層級與儀表板藍圖。規劃同時考量資料模型、更新流程、權限與維運方式，作為後續企業 BI 平台落地的設計基準。",
      en: "Starting from management and operational decisions, this project reviewed existing reports, sources, and user pain points to define a KPI architecture, metric definitions, information hierarchy, and dashboard blueprint. The plan also covered data models, refresh processes, permissions, and maintainability as the design baseline for enterprise BI delivery.",
    },
    caseNotes: {
      zh: {
        problem: "既有報表分散且 KPI 口徑不一，管理者難以快速取得一致的營運視圖。",
        approach: "由決策問題反推 KPI、資料模型、資訊架構與儀表板互動設計。",
        impact: "建立企業級 BI 藍圖與共同指標語言，降低後續開發與溝通成本。",
      },
      en: {
        problem: "Fragmented reports and inconsistent KPI definitions prevented a unified operational view.",
        approach: "Worked backward from decision needs to define KPIs, data models, information architecture, and dashboard interactions.",
        impact: "Created an enterprise BI blueprint and shared metric language, reducing downstream delivery and alignment costs.",
      },
    },
    highlights: {
      zh: ["管理與營運決策需求盤點", "KPI 定義及資訊架構設計", "企業儀表板與 BI 平台藍圖"],
      en: ["Management and operational decision discovery", "KPI definitions and information architecture", "Enterprise dashboard and BI platform blueprint"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2026" }, { label: "角色", value: "專案經理" }, { label: "重點", value: "BI 規劃" }],
      en: [{ label: "Period", value: "2026" }, { label: "Role", value: "Project Manager" }, { label: "Focus", value: "BI Planning" }],
    },
  }),
  clientProject({
    group: "dataAnalytics",
    slug: "enterprise-dashboard-optimization",
    technologies: ["Dashboard Optimisation", "Advanced Analytics", "Performance Reporting", "KPI", "BI"],
    industry: { zh: "消費品、零售與績效管理", en: "Consumer Goods, Retail & Performance Management" },
    industryContext: {
      zh: "成熟企業通常已擁有大量報表，但資訊增加不等於洞察增加；過度密集的頁面、不一致的指標與缺乏分析路徑，都會降低管理決策效率。儀表板優化必須同時處理內容、互動、指標與使用情境。",
      en: "Mature enterprises often have many reports, but more information does not guarantee more insight. Dense pages, inconsistent measures, and missing analytical paths reduce decision efficiency, so dashboard enhancement must address content, interaction, metrics, and user context together.",
    },
    title: {
      zh: "跨國消費品企業儀表板優化",
      en: "Global Consumer Enterprise Dashboard Enhancement",
    },
    description: {
      zh: "推動跨業務功能的儀表板優化、進階分析與績效報告改善，提升指標可讀性與決策效率。",
      en: "Led dashboard optimization, advanced analytics, and performance reporting improvements across multiple business functions.",
    },
    detailDescription: {
      zh: "本計畫針對既有儀表板的使用體驗、指標邏輯與分析深度進行改善。透過使用者訪談、報表使用情境盤點與 KPI 檢視，重整資訊層級、互動流程與績效追蹤方式，並導入更具行動性的分析視角，支援多個業務單位的日常管理。",
      en: "This programme improved the usability, metric logic, and analytical depth of existing dashboards. User interviews, reporting workflow reviews, and KPI audits reshaped information hierarchy, interactions, and performance tracking while introducing more actionable analytical views for multiple business functions.",
    },
    caseNotes: {
      zh: {
        problem: "既有儀表板資訊密度高、分析路徑不一致，難以快速定位績效變化原因。",
        approach: "檢視 KPI 與使用情境，重新設計資訊層級、互動與進階分析視角。",
        impact: "提高跨部門報表的一致性、可讀性與行動導向，縮短決策者取得洞察的路徑。",
      },
      en: {
        problem: "Dense dashboards and inconsistent analysis paths made performance drivers difficult to identify quickly.",
        approach: "Reviewed KPIs and user journeys, then redesigned information hierarchy, interactions, and advanced analytical views.",
        impact: "Improved consistency, readability, and actionability across business reporting, shortening the path to insight.",
      },
    },
    highlights: {
      zh: ["跨部門儀表板使用情境盤點", "KPI 與績效報告優化", "進階分析及決策導向資訊設計"],
      en: ["Cross-functional dashboard journey review", "KPI and performance reporting optimization", "Advanced analytics and decision-oriented information design"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2025" }, { label: "角色", value: "Data & AI Lead" }, { label: "重點", value: "儀表板優化" }],
      en: [{ label: "Period", value: "2025" }, { label: "Role", value: "AI & Data Lead" }, { label: "Focus", value: "Dashboard UX" }],
    },
  }),
  clientProject({
    group: "consulting",
    slug: "smart-government-cybersecurity-strategy",
    technologies: ["Digital Strategy", "Data Governance", "Smart Government", "Cybersecurity Strategy", "Roadmapping"],
    industry: { zh: "智慧政府、公共服務與資安", en: "Smart Government, Public Services & Cybersecurity" },
    industryContext: {
      zh: "地方政府數位服務橫跨多個局處、資料類型與法規責任，民眾體驗、行政效率及資安風險必須一起考量。若缺少共同治理與優先順序，個別系統投資容易形成新的資訊孤島。",
      en: "Local-government digital services span departments, data types, and regulatory responsibilities, requiring citizen experience, administrative efficiency, and cybersecurity risk to be considered together. Without shared governance and priorities, individual system investments can create new silos.",
    },
    title: {
      zh: "地方政府數位發展與資安策略",
      en: "Local Government Digital Development & Cybersecurity Strategy",
    },
    description: {
      zh: "規劃地方政府數位轉型路線、資料治理、智慧政府倡議與資安策略，建立可分階段推進的整體藍圖。",
      en: "Developed a phased local-government roadmap spanning digital transformation, data governance, smart-government initiatives, and cybersecurity strategy.",
    },
    detailDescription: {
      zh: "本顧問案整合數位服務、資料治理、智慧政府與資安四個面向，透過現況盤點、利害關係人訪談與成熟度評估，辨識優先改善議題並形成分階段推動藍圖。規劃著重治理機制、跨局處協作、資料應用與風險管理的協同，避免各項數位措施零散發展。",
      en: "This consultancy integrated digital services, data governance, smart government, and cybersecurity. Current-state discovery, stakeholder interviews, and maturity assessment identified priority improvements and shaped a phased roadmap, emphasizing coordinated governance, cross-department collaboration, data use, and risk management rather than isolated initiatives.",
    },
    caseNotes: {
      zh: {
        problem: "數位服務、資料應用與資安需求跨越多個局處，缺少一致的優先順序與治理藍圖。",
        approach: "進行現況與成熟度評估，整合治理、服務、資料與資安需求形成分階段路線。",
        impact: "提供地方政府可共同執行的數位發展框架，讓投資、治理與風險管理互相對齊。",
      },
      en: {
        problem: "Digital services, data use, and cybersecurity needs crossed departments without shared priorities or governance.",
        approach: "Combined current-state and maturity assessment across governance, services, data, and security into a phased roadmap.",
        impact: "Provided a shared local-government framework aligning investment, governance, and risk management.",
      },
    },
    highlights: {
      zh: ["數位與資安成熟度盤點", "資料治理及智慧政府規劃", "跨局處分階段轉型路線"],
      en: ["Digital and cybersecurity maturity assessment", "Data governance and smart-government planning", "Cross-department phased transformation roadmap"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2025–2026" }, { label: "角色", value: "Data & AI Lead" }, { label: "重點", value: "數位與資安" }],
      en: [{ label: "Period", value: "2025–2026" }, { label: "Role", value: "AI & Data Lead" }, { label: "Focus", value: "Digital & Cyber" }],
    },
  }),

  clientProject({
    group: "dataEngineering",
    alsoGroups: ["dataScience"],
    slug: "regional-ai-smart-mobility-data-center",
    featured: true,
    socialImage: "/media/selected-work/o2o-editorial.webp",
    technologies: ["Mobility Analytics", "Data Platform", "Data Governance", "Multimodal Data", "Decision Support"],
    industry: { zh: "智慧交通與公共運輸", en: "Smart Mobility & Public Transport" },
    industryContext: {
      zh: "區域交通包含公車、軌道、公路及其他移動服務，資料來源、頻率與空間粒度差異很大。要支援 AI 分析與決策，必須先建立可靠的整合、治理與營運機制，再把多運具資料轉化為需求、流動與異常洞察。",
      en: "Regional mobility combines bus, rail, road, and other services whose sources, frequencies, and spatial granularity differ substantially. AI and decision support require reliable integration, governance, and operations before multimodal data can become demand, movement, and anomaly insight.",
    },
    title: {
      zh: "區域 AI 智慧交通資料中心建置與營運",
      en: "Regional AI Smart Transportation Data Centre",
    },
    description: {
      zh: "負責 AI 智慧交通資料平台的建置、整合與營運，支援多運具移動分析、資料治理與資料驅動決策。",
      en: "Led development, integration, and operation of an AI-enabled transportation data platform supporting multimodal mobility analytics, governance, and decision-making.",
    },
    detailDescription: {
      zh: "本專案整合區域內跨運具交通資料，建立可持續營運的 AI 智慧交通資料中心。資料工程面涵蓋來源與介面盤點、批次與即時整合流程、品質檢核、主資料定義、權限與治理機制；資料科學面則規劃移動行為分析、需求洞察、異常辨識與決策支援應用。透過營運制度、資料目錄與分析服務設計，讓不同交通資料能被一致管理，並持續轉化為運輸規劃及營運決策所需的洞察。",
      en: "This project integrated regional multimodal transport data into an operational AI-enabled smart transportation data centre. The data-engineering work covered source and interface discovery, batch and real-time integration, quality controls, master-data definitions, permissions, and governance; the data-science work covered mobility behavior analysis, demand insight, anomaly identification, and decision-support applications. Operating processes, a data catalogue, and analytical services enabled diverse mobility data to be managed consistently and continuously converted into planning and operational insight.",
    },
    caseNotes: {
      zh: {
        problem: "跨運具資料分散於不同來源與格式，難以形成一致、可持續的區域交通視圖。",
        approach: "建置資料平台與治理流程，整合多運具資料並設計分析和營運機制。",
        impact: "建立區域級交通資料基礎，支援移動分析、營運監控與資料驅動決策。",
      },
      en: {
        problem: "Multimodal data was fragmented across sources and formats, preventing a consistent, sustainable regional view.",
        approach: "Built platform and governance workflows to integrate mobility data and operationalize analytics.",
        impact: "Created a regional transport data foundation for mobility analysis, monitoring, and evidence-based decisions.",
      },
    },
    highlights: {
      zh: ["多運具交通資料整合", "平台資料品質與治理機制", "營運分析及決策支援應用"],
      en: ["Multimodal transportation data integration", "Platform quality and governance controls", "Operational analytics and decision support"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2025–2026" }, { label: "角色", value: "Data & AI Lead" }, { label: "重點", value: "資料中心" }],
      en: [{ label: "Period", value: "2025–2026" }, { label: "Role", value: "AI & Data Lead" }, { label: "Focus", value: "Data Centre" }],
    },
  }),
  clientProject({
    group: "dataAnalytics",
    slug: "metropolitan-transit-origin-destination-analytics",
    technologies: ["Origin-Destination", "Demand Modelling", "Mobility Data", "Transport Analytics", "Decision Support"],
    industry: { zh: "智慧交通與都會公共運輸", en: "Smart Mobility & Metropolitan Transit" },
    industryContext: {
      zh: "都會運輸規劃需要理解旅次從哪裡出發、到哪裡結束、如何轉乘及何時發生，而不只是單站運量。OD 資料能揭示區域互動與服務缺口，但也需要一致的空間、時間與旅次定義才能支援政策。",
      en: "Metropolitan transport planning needs to understand where trips begin and end, how passengers transfer, and when movement occurs, not only station totals. OD data reveals regional interaction and service gaps, but requires consistent spatial, temporal, and trip definitions to support policy.",
    },
    title: {
      zh: "都會區公共運輸起迄需求系統強化與分析",
      en: "Metropolitan Public Transport OD Demand System",
    },
    description: {
      zh: "整合移動資料、分析公共運輸起迄需求與旅次型態，持續強化系統以支援都會區運輸規劃與管理。",
      en: "Integrated mobility data and analyzed origin-destination demand and travel patterns while enhancing the system for evidence-based transport planning.",
    },
    detailDescription: {
      zh: "本專案合併呈現跨年度的系統強化、維運與分析服務。透過整合公共運輸與移動資料，建立起迄需求、旅次型態、轉乘關係與區域流動的分析視圖，並持續改善資料處理、指標定義、查詢效能、分析功能與系統可用性。分析成果用於支援都會區運輸規劃、資源配置、服務調整與政策評估。",
      en: "This entry consolidates multi-year system enhancement, maintenance, and analytics services. Public transport and mobility data were integrated into views of origin-destination demand, travel patterns, transfer relationships, and regional flows, while data processing, metric definitions, query performance, analytical functions, and system usability were continually improved. The resulting insight supported metropolitan transport planning, resource allocation, service adjustments, and policy assessment.",
    },
    caseNotes: {
      zh: {
        problem: "運輸需求跨行政區與多種資料來源，傳統彙整難以持續反映旅次型態。",
        approach: "整合移動資料並建立 OD 需求模型、旅次分析與持續維運強化機制。",
        impact: "提供一致的區域需求視圖，支援公共運輸規劃、管理與政策評估。",
      },
      en: {
        problem: "Transport demand crossed jurisdictions and data sources, making travel patterns difficult to maintain and interpret consistently.",
        approach: "Integrated mobility data into OD demand modelling, travel-pattern analysis, and an ongoing enhancement process.",
        impact: "Delivered a consistent regional demand view for public transport planning, management, and policy evaluation.",
      },
    },
    highlights: {
      zh: ["2024–2026 跨年度系統強化與維運", "公共運輸 OD 需求及旅次型態分析", "跨區域運輸規劃決策支援"],
      en: ["2024–2026 multi-year system enhancement and maintenance", "Public transport OD demand and travel-pattern analysis", "Cross-regional transport planning support"],
    },
    metrics: {
      zh: [{ label: "期間", value: "跨年度" }, { label: "角色", value: "Data & AI Lead" }, { label: "區域", value: "都會區" }],
      en: [{ label: "Period", value: "Multi-year" }, { label: "Role", value: "AI & Data Lead" }, { label: "Region", value: "Metropolitan" }],
    },
  }),
  clientProject({
    group: "dataScience",
    slug: "airport-taxi-demand-optimization",
    technologies: ["Demand Forecasting", "Mobility Analytics", "Operational Optimisation", "Airport Taxi", "AI"],
    industry: { zh: "移動服務、叫車平台與機場運輸", en: "Mobility Platforms, Ride Services & Airport Transport" },
    industryContext: {
      zh: "機場運輸需求受到航班、時段、旅客行為與可用車輛共同影響，供需錯配會造成等待、空車與服務流失。平台需要把需求預測與營運配置連結，才能同時改善使用者體驗與車輛利用。",
      en: "Airport transport demand is shaped by flights, time, passenger behavior, and vehicle availability. Supply-demand mismatch creates waiting, idle capacity, and lost service, so platforms must connect forecasting with operational allocation to improve both experience and utilization.",
    },
    title: {
      zh: "機場計程車需求成長與營運優化",
      en: "Airport Taxi Demand Growth & Operations Pilot",
    },
    description: {
      zh: "以移動分析、需求預測與 AI 營運優化改善機場計程車使用率及運輸服務表現。",
      en: "Applied mobility analytics, demand forecasting, and AI-enabled operational optimization to improve airport taxi utilization and service performance.",
    },
    detailDescription: {
      zh: "本試辦聚焦機場計程車服務的需求與供給匹配。透過分析訂單、時段、區域與旅次特徵，建立需求預測及營運診斷框架，辨識成長機會與服務摩擦點，並將結果轉化為車輛配置、營運策略與成效追蹤建議。",
      en: "This pilot focused on matching airport taxi demand and supply. Order, time, location, and trip features were analyzed within a demand forecasting and operational diagnostic framework to identify growth opportunities and service friction, then translated into recommendations for fleet allocation, operating strategy, and performance tracking.",
    },
    caseNotes: {
      zh: {
        problem: "機場需求具有明顯時空波動，供需錯配會同時影響使用率與乘客體驗。",
        approach: "結合需求預測、旅次分析與營運診斷，找出關鍵時段、區域及轉換摩擦。",
        impact: "提供可執行的供需配置與成長建議，支援機場運輸服務優化。",
      },
      en: {
        problem: "Airport demand varied sharply by time and location, with supply mismatch affecting both utilization and passenger experience.",
        approach: "Combined demand forecasting, trip analysis, and operational diagnostics to identify key periods, locations, and conversion friction.",
        impact: "Produced actionable supply-allocation and growth recommendations for airport mobility operations.",
      },
    },
    highlights: {
      zh: ["機場旅次與需求特徵分析", "需求預測及供需匹配", "AI 營運優化與成長建議"],
      en: ["Airport trip and demand analysis", "Demand forecasting and supply matching", "AI-enabled operational and growth recommendations"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2024" }, { label: "角色", value: "專案經理" }, { label: "重點", value: "需求成長" }],
      en: [{ label: "Period", value: "2024" }, { label: "Role", value: "Project Manager" }, { label: "Focus", value: "Demand Growth" }],
    },
  }),

  clientProject({
    group: "dataScience",
    slug: "smart-maritime-safety-program",
    socialImage: "/media/selected-work/maritime-editorial.webp",
    technologies: ["Maritime Analytics", "AI Applications", "Operational Dashboard", "Decision Support", "Safety"],
    industry: { zh: "海運、港口營運與航行安全", en: "Maritime, Port Operations & Navigational Safety" },
    industryContext: {
      zh: "海運與港口作業具有即時、高風險及多來源資訊特性，氣象、船舶、航行與營運訊號需要被整合才能形成完整態勢。AI 的角色不是取代作業判斷，而是協助提前排序風險、聚焦監控與留下可追蹤的決策依據。",
      en: "Maritime and port operations are real-time, high-risk, and information intensive. Weather, vessel, navigation, and operational signals must be integrated into a coherent picture, with AI supporting—not replacing—human judgment through earlier risk prioritization, focused monitoring, and traceable decisions.",
    },
    title: {
      zh: "智慧海運安全計畫",
      en: "Smart Maritime Safety Programme",
    },
    description: {
      zh: "負責 AI 海運安全應用、分析平台、營運儀表板與決策支援系統的規劃、開發及導入。",
      en: "Led planning, development, and implementation of AI-enabled maritime safety applications, analytics platforms, operational dashboards, and decision-support systems.",
    },
    detailDescription: {
      zh: "本計畫支援海運主管單位提升航行安全與營運能力，整合海運資料、AI 應用、分析平台、營運儀表板與決策支援。工作涵蓋需求訪談、情境與風險盤點、資料及系統架構、分析應用設計、告警與視覺化邏輯、使用者驗證及導入規劃。透過把即時監控、歷史分析與業務規則放進一致的決策流程，使分散資訊能轉化為可採取行動的風險判斷。",
      en: "This programme supported a maritime authority in improving navigational safety and operations through integrated maritime data, AI applications, analytics platforms, operational dashboards, and decision support. It covered stakeholder interviews, scenario and risk discovery, data and system architecture, analytical application design, alert and visualization logic, user validation, and implementation planning. Combining real-time monitoring, historical analysis, and business rules within a consistent decision workflow converted fragmented signals into actionable risk assessments.",
    },
    caseNotes: {
      zh: {
        problem: "海運安全資料即時且分散，監控資訊難以整合成一致的風險判斷與營運決策。",
        approach: "整合資料、AI 分析、儀表板與決策支援流程，並以實際營運情境驗證。",
        impact: "建立由資料到行動的海運安全應用框架，提升風險辨識與營運決策能力。",
      },
      en: {
        problem: "Real-time maritime safety data was fragmented, making consistent risk assessment and operational decisions difficult.",
        approach: "Integrated data, AI analytics, dashboards, and decision-support workflows validated against operational use cases.",
        impact: "Established a data-to-action framework that improved maritime risk awareness and operational decision support.",
      },
    },
    highlights: {
      zh: ["AI 海運安全應用規劃與導入", "分析平台及營運儀表板", "航行安全決策支援流程"],
      en: ["AI maritime safety application delivery", "Analytics platform and operational dashboards", "Navigational safety decision-support workflows"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2024–2026" }, { label: "角色", value: "Data & AI Lead" }, { label: "重點", value: "航行安全" }],
      en: [{ label: "Period", value: "2024–2026" }, { label: "Role", value: "AI & Data Lead" }, { label: "Focus", value: "Maritime Safety" }],
    },
  }),
  clientProject({
    group: "dataScience",
    slug: "disaster-information-ai-assistant",
    technologies: ["AI Assistant", "LLM", "Multilingual", "Translation", "Public Service"],
    industry: { zh: "公共安全、災害資訊與政府服務", en: "Public Safety, Disaster Information & Government Services" },
    industryContext: {
      zh: "災害資訊具有時間敏感、錯誤成本高與服務對象多元的特性，內容必須快速、清楚、一致並能跨語言傳達。公共服務 AI 助理因此需要嚴格的知識來源、回答邊界、人工覆核與內容治理，而非只追求對話流暢。",
      en: "Disaster information is time-sensitive, high-cost when wrong, and consumed by diverse audiences. A public-service AI assistant therefore needs controlled knowledge sources, answer boundaries, human review, and content governance—not only fluent conversation—to provide fast, clear, consistent, multilingual guidance.",
    },
    title: {
      zh: "公部門災害資訊 AI 助理與多語服務",
      en: "Public-Sector Disaster Information AI Assistant & Multilingual Service",
    },
    description: {
      zh: "規劃並導入 AI 虛擬助理與多語翻譯能力，提升災害資訊公共服務的可及性與市民互動體驗。",
      en: "Planned and implemented an AI virtual assistant and multilingual translation capabilities to improve disaster-information accessibility and citizen engagement.",
    },
    detailDescription: {
      zh: "本專案為公部門災害資訊平台規劃 AI 助理及多語服務強化。工作涵蓋公共服務情境、對話與資訊需求盤點、知識來源及回答邊界設計、AI 助理流程、多語翻譯能力、內容治理、人工覆核與使用者體驗。系統設計特別考量災害資訊的即時性、一致性與錯誤風險，使不同語言使用者能更容易取得清楚、可理解且具來源依據的資訊。",
      en: "This project enhanced a public-sector disaster information platform with an AI assistant and multilingual services. It covered public-service scenarios, conversational and information needs, knowledge sources and answer boundaries, assistant workflows, translation capabilities, content governance, human review, and user experience. The design emphasized the timeliness, consistency, and error risk of emergency information so users across languages could access clear, understandable, and source-grounded guidance.",
    },
    caseNotes: {
      zh: {
        problem: "災害資訊具即時性與公共性，不同語言使用者需要快速取得一致且易懂的內容。",
        approach: "設計 AI 助理對話流程、多語翻譯、內容治理與服務整合方式。",
        impact: "提升災害資訊服務的可及性與互動效率，擴大對多語市民的支援。",
      },
      en: {
        problem: "Time-sensitive public disaster information needed to remain consistent and understandable across languages.",
        approach: "Designed assistant conversations, multilingual translation, content governance, and service integration.",
        impact: "Improved information accessibility and interaction efficiency for a more diverse public audience.",
      },
    },
    highlights: {
      zh: ["公共服務 AI 助理情境設計", "多語翻譯與內容治理", "災害資訊可及性及市民互動優化"],
      en: ["Public-service AI assistant design", "Multilingual translation and content governance", "Disaster-information accessibility and citizen experience"],
    },
    metrics: {
      zh: [{ label: "期間", value: "2026" }, { label: "角色", value: "解決方案顧問" }, { label: "重點", value: "多語 AI" }],
      en: [{ label: "Period", value: "2026" }, { label: "Role", value: "Solution Consultant" }, { label: "Focus", value: "Multilingual AI" }],
    },
  }),
];
