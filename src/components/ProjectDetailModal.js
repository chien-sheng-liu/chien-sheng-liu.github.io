"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub } from "react-icons/fa";

const i18n = {
  zh: {
    close: "關閉",
    overview: "PROJECT OVERVIEW",
    problem: "Business Problem",
    built: "What I Built",
    impact: "Business Impact",
    highlights: "專案亮點",
    stack: "Stack",
    metrics: "Key Metrics",
    viewCode: "查看程式碼",
    private: "Private project",
  },
  en: {
    close: "Close",
    overview: "PROJECT OVERVIEW",
    problem: "Business Problem",
    built: "What I Built",
    impact: "Business Impact",
    highlights: "Highlights",
    stack: "Stack",
    metrics: "Key Metrics",
    viewCode: "View Code",
    private: "Private project",
  },
};

export default function ProjectDetailModal({ project, locale = "zh", onClose }) {
  const t = i18n[locale] || i18n.zh;
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const sections = [
    [t.problem, project.caseNotes?.problem],
    [t.built, project.caseNotes?.approach],
    [t.impact, project.caseNotes?.impact],
  ].filter(([, text]) => text);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="jre-project-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.article
        className="jre-project-modal__panel"
        data-project-modal
        initial={{ opacity: 0, y: 50, scale: .97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: .98 }}
        transition={{ duration: .45, ease: [0.16, 1, 0.3, 1] }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="jre-project-modal__scroll">
          <header className="jre-project-modal__header">
            <div className="jre-project-modal__category">
              <span>{project.categoryIcon}</span>
              <p>{project.category}</p>
            </div>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t.close}>
              <span>{t.close}</span><i aria-hidden="true">×</i>
            </button>
            <p>{t.overview}</p>
            <h2 id="project-modal-title">{project.title}</h2>
            <p className="jre-project-modal__description">
              {project.detailDescription || project.description}
            </p>
          </header>

          <section className="jre-project-modal__metrics" aria-label={t.metrics}>
            {project.metrics.map((metric) => (
              <div key={`${metric.label}-${metric.value}`}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </section>

          <div className="jre-project-modal__body">
            <div className="jre-project-modal__case">
              {sections.map(([label, text], index) => (
                <article key={label}>
                  <span>0{index + 1}</span>
                  <p>{label}</p>
                  <h3>{text}</h3>
                </article>
              ))}
            </div>

            <aside className="jre-project-modal__aside">
              {project.highlights?.length > 0 && (
                <section>
                  <p>{t.highlights}</p>
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <p>{t.stack}</p>
                <ul className="jre-project-modal__stack">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </div>

        <footer className="jre-project-modal__footer">
          {project.link && project.link !== "#" ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <FaGithub />{t.viewCode}<FaArrowRight />
            </a>
          ) : (
            <span>{t.private}</span>
          )}
          <button type="button" onClick={onClose}>{t.close}<span>×</span></button>
        </footer>
      </motion.article>
    </motion.div>,
    document.body,
  );
}
