"use client";
import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlane, FaTimes } from "react-icons/fa";
import FlightArc from "./FlightArc";
import Card3D from "./Card3D";
import WorldMapBackground from "./WorldMapBackground";

/* ── DATA ── */
const events = [
  {
    year: "2026", title: "Lead, BI", org: "Lalamove", flag: "🇭🇰", type: "work",
    detail: [
      "跨市場建置 KPI、供需監控與漏斗儀表板，讓決策即時化",
      "與 DE/DA 共建 dbt・LookML 治理與資料規格，加速交付",
      "規劃數據產品 Roadmap，導入自助分析與 AI 自動化",
      "連結營運/商務與資料團隊，確保儀表板貢獻可量化",
    ],
  },
  {
    year: "2024", title: "Manager · Data & AI", org: "Datarget 創代科技", flag: "🇹🇼", type: "work",
    detail: [
      "Built & led 8 人 AI/Data 團隊，包辦需求、KPI 設計到上線",
      "交付 15+ analytics/AI 專案，為各產業創造 NT$8,000 萬",
      "以 Python/SQL 打造 forecasting、segmentation、Text-to-SQL LLM",
      "建 Tableau/Power BI/Metabase funnel dashboard 與 SQL・dbt 管線",
      "自動化 CRM 數據與報表，提升資料準確度與交付效率",
    ],
  },
  {
    year: "2023", title: "ML Engineer", org: "OneAD AdTech", flag: "🇹🇼", type: "work",
    detail: [
      "設計/部署多格式 ML・DL targeting 模型，CTR +20%、停留 +30%",
      "重構 cross-device 系統，推論 +40%、GCP 成本 -30%",
      "打造 LLM+RAG 受眾平台並整合 Meta/Google Ads API",
      "營運 1 億+ 日誌資料處理鏈，導入 Spark/Hadoop/Airflow/MLflow",
    ],
  },
  {
    year: "2023", title: "資料科學講師", org: "DeepCoding", flag: "🇹🇼", type: "work",
    detail: [
      "Delivered custom data/AI workshops，累積 100+ 學員",
      "與大學/企業合辦 LLM、資料分析課程，聚焦實作",
      "提供 1 對 1 coaching，協助學員轉職或升遷",
      "維持教材更新，涵蓋 Python、視覺化與商業案例",
    ],
  },
  {
    year: "2022", title: "Marketing DA", org: "HelloFresh SE", flag: "🇩🇪", type: "work",
    detail: [
      "為 18 市場部署 conversion/CTR/Revenue 預測，準確度約 85%",
      "打造 CTR/CVR funnel 與 penetration dashboard 支援行銷決策",
      "自動化 ETL 匯入 BigQuery 與 CRM，優化高流量 log 處理",
      "整合 Google/Meta/DV360/YouTube 多渠道資料並執行 A/B 測試",
    ],
  },
  {
    year: "2021", title: "Research Assistant", org: "ZEW 經濟研究中心", flag: "🇩🇪", type: "work",
    detail: [
      "建立 OCR + text-mining pipeline 處理中文社會信用資料",
      "設計自動化爬蟲，日更經濟/財政/政策資訊",
      "清理並結構化資料，提供研究模型即時引用",
    ],
  },
  {
    year: "2020", title: "MSc 經濟資訊學", org: "曼海姆大學", flag: "🇩🇪", type: "education",
    detail: [
      "Business Informatics (Data Science Track) 連結資訊與商業",
      "Thesis：Handling Covid-disrupted forecasting in MarTech",
      "研究：以 AI/NN 解決 Newsvendor 需求預測",
      "養成跨國協作、研究與資料驅動解題能力",
    ],
  },
  {
    year: "2019", title: "交換生", org: "拜羅伊特大學", flag: "🇩🇪", type: "education",
    detail: [
      "Business Engineering 交換，修習供應鏈/製造/管理課程",
      "以英文與德文完成專題與簡報，提升溝通力",
      "拓展跨文化合作與歐洲產業視野",
    ],
  },
  {
    year: "2017", title: "Software Eng. Intern", org: "Getec · Mitac", flag: "🇨🇳", type: "work",
    detail: [
      "開發 C#/.NET 後端並整合 WeChat API 的會議安排系統",
      "設計 workflow 讓差旅報銷效率提升 25%",
      "訪談 10+ 使用者，將需求轉成系統設計/測試",
    ],
  },
  {
    year: "2015", title: "學士 · 資訊管理", org: "中原大學", flag: "🇹🇼", type: "education",
    detail: [
      "資管主修、企管輔系，奠定資訊 × 管理基礎",
      "系學會會長，策畫跨院活動與專案",
      "2019 Taiwan InnoService、資管競賽獲獎並取得交換資格",
    ],
  },
];

/* ── Type-based styling ── */
const typeStyle = {
  work: {
    strip: "from-cyan-400 to-sky-500",
    bg: "bg-gradient-to-br from-white/80 to-cyan-50/40",
    border: "border border-white/40",
    text: "text-cyan-600",
    glow: "shadow-sm hover:shadow-lg hover:shadow-cyan-100/40 hover:ring-1 hover:ring-cyan-200/50",
    badge: "bg-cyan-50 text-cyan-600",
    dot: "bg-cyan-400",
    hex: "#06b6d4",
  },
  education: {
    strip: "from-purple-400 to-indigo-500",
    bg: "bg-gradient-to-br from-white/80 to-purple-50/40",
    border: "border border-white/40",
    text: "text-purple-600",
    glow: "shadow-sm hover:shadow-lg hover:shadow-purple-100/40 hover:ring-1 hover:ring-purple-200/50",
    badge: "bg-purple-50 text-purple-600",
    dot: "bg-purple-400",
    hex: "#a855f7",
  },
};

/* ── SVG GEOMETRY ── */
const VB_W = 1100;
const VB_H = 680;

const nodes = [
  { x: 960,  y: 20  },
  { x: 140,  y: 93  },
  { x: 930,  y: 166 },
  { x: 170,  y: 239 },
  { x: 960,  y: 312 },
  { x: 140,  y: 385 },
  { x: 930,  y: 458 },
  { x: 170,  y: 531 },
  { x: 960,  y: 604 },
  { x: 140,  y: 665 },
];

/* ── COMPONENT ── */
export default function FlightTimeline() {
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const openModal = useCallback((ev) => setSelected(ev), []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      {/* Radial spotlight for depth */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(14,165,233,0.06) 0%, rgba(99,102,241,0.03) 40%, transparent 70%)" }} />

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[10px] uppercase tracking-[0.5em] text-slate-400 mb-3">
            <FaPlane className="inline-block mr-2 -mt-0.5" />
            Flight Log
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            人生航線
          </motion.h2>
          <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.5 }} className="mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-4" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-sm text-slate-500">
            台灣 <span className="text-cyan-400">→</span> 中國 <span className="text-cyan-400">→</span> 德國 <span className="text-cyan-400">→</span> 香港
          </motion.p>
        </div>

        {/* ═══ DESKTOP ═══ */}
        <div className="hidden md:block relative" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
          <WorldMapBackground />
          <FlightArc nodes={nodes} vbW={VB_W} vbH={VB_H} />

          {/* Node dots — circles for work, diamonds for education */}
          <svg className="absolute inset-0 w-full h-full z-[8]" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {nodes.map((n, i) => {
              const s = typeStyle[events[i].type];
              const isEdu = events[i].type === "education";
              return (
                <g key={i}>
                  {isEdu ? (
                    <>
                      <rect x={n.x - 10} y={n.y - 10} width="20" height="20" rx="3" fill={s.hex} opacity="0.08" transform={`rotate(45 ${n.x} ${n.y})`} />
                      <rect x={n.x - 4} y={n.y - 4} width="8" height="8" rx="1" fill={s.hex} opacity="0.9" transform={`rotate(45 ${n.x} ${n.y})`} />
                      <rect x={n.x - 4} y={n.y - 4} width="8" height="8" rx="1" fill={s.hex} opacity="0.3" transform={`rotate(45 ${n.x} ${n.y})`}>
                        <animate attributeName="width" values="8;20;8" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="height" values="8;20;8" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="x" values={`${n.x - 4};${n.x - 10};${n.x - 4}`} dur="3s" repeatCount="indefinite" />
                        <animate attributeName="y" values={`${n.y - 4};${n.y - 10};${n.y - 4}`} dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                      </rect>
                    </>
                  ) : (
                    <>
                      <circle cx={n.x} cy={n.y} r="14" fill={s.hex} opacity="0.08" />
                      <circle cx={n.x} cy={n.y} r="5"  fill={s.hex} opacity="0.9" />
                      <circle cx={n.x} cy={n.y} r="5"  fill={s.hex} opacity="0.3">
                        <animate attributeName="r" values="5;14;5" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Cards */}
          {events.map((ev, idx) => {
            const n = nodes[idx];
            const toRight = n.x < VB_W / 2;
            const s = typeStyle[ev.type];
            return (
              <div
                key={idx}
                className="absolute z-[15]"
                style={{
                  left: `${(n.x / VB_W) * 100}%`,
                  top: `${(n.y / VB_H) * 100}%`,
                  transform: `translate(${toRight ? "20px" : "calc(-100% - 20px)"}, -50%)`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card3D intensity={5}>
                    <FlightCard ev={ev} s={s} align={toRight ? "left" : "right"} onClick={() => openModal(ev)} />
                  </Card3D>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ═══ MOBILE ═══ */}
        <div className="md:hidden relative">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <WorldMapBackground />
          </div>

          <div className="space-y-3 relative z-10">
            {events.map((ev, idx) => {
              const s = typeStyle[ev.type];
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${isEven ? "justify-start" : "justify-end"}`}
                >
                  <MobileFlightCard ev={ev} s={s} isEven={isEven} onClick={() => openModal(ev)} />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ═══ MODAL ═══ */}
      <AnimatePresence>
        {selected && <DetailModal ev={selected} s={typeStyle[selected.type]} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}

/* ── Desktop card: frosted glass with gradient top strip ── */
function FlightCard({ ev, s, align, onClick }) {
  const alignRight = align === "right";
  const textAlignClass = alignRight ? "text-right" : "text-left";
  const badgeRowClass = alignRight ? "justify-start" : "justify-end";
  const flagPosClass = alignRight ? "right-4" : "left-4";

  return (
    <div className="relative w-[280px] group">
      <span className="absolute -top-5 right-0 rounded-full border border-slate-200/60 bg-white/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-slate-500 shadow-sm z-10">
        {ev.year}
      </span>
      <button
        type="button"
        onClick={onClick}
        className={`relative w-full h-[96px] rounded-2xl overflow-hidden ${s.border} ${s.bg} backdrop-blur-[12px] px-4 pt-6 pb-4 ${s.glow} transition-all duration-300 cursor-pointer ${textAlignClass}`}
      >
        {/* Gradient top strip */}
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${s.strip}`} />

        <span className={`absolute top-2.5 ${flagPosClass} text-lg leading-none`}>
          {ev.flag}
        </span>
        <div className={`flex ${badgeRowClass} mb-2`}>
          <div className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider ${s.badge}`}>
            {ev.type === "work" ? "Work" : "Education"}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[#1d1d1f] leading-tight truncate">{ev.title}</h3>
          <p className={`mt-1 text-sm font-medium ${s.text} leading-tight truncate`}>{ev.org}</p>
        </div>

        {/* Click hint */}
        <span className="absolute bottom-2 right-3 text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          details →
        </span>
      </button>
    </div>
  );
}


/* ── Mobile card: frosted glass with gradient top strip ── */
function MobileFlightCard({ ev, s, isEven, onClick }) {
  return (
    <div className="relative w-[85%]">
      <span className="absolute -top-4 right-0 rounded-full border border-slate-200/60 bg-white/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-slate-500 shadow-sm z-10">
        {ev.year}
      </span>
      <button
        type="button"
        onClick={onClick}
        className={`relative w-full h-[86px] rounded-2xl overflow-hidden ${s.border} ${s.bg} backdrop-blur-[12px] px-4 pt-6 pb-4 ${s.glow} text-left cursor-pointer transition-all duration-300`}
      >
        {/* Gradient top strip */}
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${s.strip}`} />

        <div className={`absolute top-4 ${isEven ? "-right-2" : "-left-2"} w-3.5 h-3.5 rounded-full ${s.dot} ring-2 ring-white`} />
        <span className="absolute top-2.5 left-4 text-lg leading-none">{ev.flag}</span>

        <div className="mb-2">
          <div className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider ${s.badge}`}>
            {ev.type === "work" ? "Work" : "Education"}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[#1d1d1f] leading-tight truncate">{ev.title}</h3>
          <p className={`mt-1 text-sm font-medium ${s.text} leading-tight truncate`}>{ev.org}</p>
        </div>
      </button>
    </div>
  );
}

/* ── Detail Modal: frosted glass with gradient strip + staggered list ── */
const listStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const listItem = { hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.25 } } };

function DetailModal({ ev, s, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full max-w-md rounded-2xl overflow-hidden ${s.border} ${s.bg} backdrop-blur-xl shadow-2xl text-[#1d1d1f]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient top strip */}
        <div className={`h-[4px] bg-gradient-to-r ${s.strip}`} />

        <div className="p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <FaTimes className="text-sm" />
          </button>

          <div className={`inline-block rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider mb-4 ${s.badge}`}>
            {ev.type === "work" ? "Work" : "Education"}
          </div>

          <div className="flex items-start gap-3 mb-5">
            <span className="text-2xl leading-none shrink-0 mt-0.5">{ev.flag}</span>
            <div>
              <h3 className="text-xl font-bold text-[#1d1d1f] leading-snug">{ev.title}</h3>
              <p className={`text-sm ${s.text}`}>{ev.org}</p>
              <p className="text-xs text-slate-400 font-mono mt-1">{ev.year}</p>
            </div>
          </div>

          <div className="h-px mb-4 bg-slate-200/60" />

          <motion.ul className="space-y-2.5" variants={listStagger} initial="hidden" animate="visible">
            {ev.detail.map((item, i) => (
              <motion.li key={i} variants={listItem} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${ev.type === "work" ? "bg-cyan-400" : "bg-purple-400"}`} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
