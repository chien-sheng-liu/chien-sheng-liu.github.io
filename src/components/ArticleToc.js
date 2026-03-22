"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tocStrings = {
  zh: "目錄",
  en: "On this page",
};

export default function ArticleToc({ toc, locale = "zh" }) {
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(true);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    if (!toc.length) return;

    const headings = toc
      .filter((h) => h.level === 1)
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }, []);

  const filteredToc = toc.filter((h) => h.level === 1);

  if (!filteredToc.length) return null;

  const title = tocStrings[locale] || tocStrings.zh;

  return (
    <div className="mb-8 border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.03]">
      {/* Header toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="text-xs uppercase tracking-widest text-white/30 font-semibold">
          {title}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/25 shrink-0"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="toc-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <nav className="relative px-5 pb-4 pt-1">
              {/* Vertical guide line */}
              <div className="absolute left-[21px] top-2 bottom-4 w-px bg-white/[0.10]" />

              <div className="space-y-0.5">
                {filteredToc.map((h) => {
                  const isActive = activeId === h.id;
                  const isChild = false;
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={(e) => handleClick(e, h.id)}
                      className={`relative flex items-start gap-2.5 py-1.5 transition-all duration-200 ${
                        isChild ? "pl-5" : "pl-0"
                      }`}
                    >
                      {/* Dot indicator */}
                      <span
                        className={`relative z-10 shrink-0 rounded-full transition-all duration-200 ${
                          isActive
                            ? "w-[9px] h-[9px] bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.5)] mt-[5px]"
                            : isChild
                              ? "w-[5px] h-[5px] bg-white/20 mt-[7px]"
                              : "w-[7px] h-[7px] bg-white/20 mt-[6px]"
                        }`}
                        style={{ marginLeft: isChild ? "-1px" : "-2px" }}
                      />
                      <span
                        className={`leading-snug transition-colors duration-200 ${
                          isActive
                            ? "text-sky-400 font-semibold"
                            : "text-white/40 hover:text-white/80"
                        } ${isChild ? "text-[11.5px] text-white/30" : "text-[13px] font-medium"}`}
                      >
                        {h.text}
                      </span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
