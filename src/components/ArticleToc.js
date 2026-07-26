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
      .filter((h) => h.level === 2)
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

  const filteredToc = toc.filter((h) => h.level === 2);

  if (!filteredToc.length) return null;

  const title = tocStrings[locale] || tocStrings.zh;

  return (
    <div className="jre-article-toc">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="jre-article-toc__toggle"
      >
        <span>{title}</span>
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
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

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
            <nav className="jre-article-toc__nav">
              <div className="jre-article-toc__line" />
              {filteredToc.map((h) => {
                const isActive = activeId === h.id;
                return (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    onClick={(e) => handleClick(e, h.id)}
                    className={`jre-article-toc__link ${isActive ? "is-active" : ""}`}
                  >
                    <span className="jre-article-toc__dot" />
                    <span>{h.text}</span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
