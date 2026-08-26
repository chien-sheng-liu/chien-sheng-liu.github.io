"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getProjectData } from "@/data/projectData";
import ProjectDetailModal from "./ProjectDetailModal";
import HeroTypewriter from "./HeroTypewriter";

const heroImages = [
  "/media/selected-work/logistics-editorial.webp",
  "/media/selected-work/finance-editorial.webp",
  "/media/selected-work/fmcg-editorial.webp",
];

const content = {
  zh: {
    label: "WORK / 00",
    role: "案例作品集",
    location: "GitHub ↗",
    title: ["案例", "作品"],
    heroLines: ["從業務問題出發", "用資料與 AI 驗證", "把成果真正交付"],
    marquee: "LLM · DEEP LEARNING · ALGORITHM · DATA ENGINEERING · ",
    gridEn: "Selected Cases",
    gridZh: "精選案例",
    featuredEn: "Featured Cases",
    featuredZh: "優先閱讀",
    all: "全部",
    viewDetail: "了解更多",
    fullCase: "閱讀完整案例",
    ctaKicker: "OPEN SOURCE",
    ctaTitle: "想看更多程式碼，或聊聊某個案例？",
    ctaButton: "查看 GitHub",
  },
  en: {
    label: "WORK / 00",
    role: "Case Work Archive",
    location: "GitHub ↗",
    title: ["Case", "Work"],
    heroLines: ["Start with the business problem", "Validate with data and AI", "Deliver outcomes that last"],
    marquee: "LLM · DEEP LEARNING · ALGORITHM · DATA ENGINEERING · ",
    gridEn: "Selected Cases",
    gridZh: "Case by case",
    featuredEn: "Featured Cases",
    featuredZh: "Start here",
    all: "All",
    viewDetail: "Learn more",
    fullCase: "View full case",
    ctaKicker: "OPEN SOURCE",
    ctaTitle: "Want to see more code, or talk through a case?",
    ctaButton: "View GitHub",
  },
};

export default function ProjectsPage({ locale = "zh" }) {
  const t = content[locale] || content.zh;
  const { projects, stats } = getProjectData(locale);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const prefix = locale === "en" ? "/en" : "";

  const categories = useMemo(
    () => [...new Set(projects.flatMap((p) => p.categories))],
    [projects],
  );

  const filteredProjects = useMemo(
    () => (activeFilter ? projects.filter((p) => p.categories.includes(activeFilter)) : projects),
    [projects, activeFilter],
  );

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [projects],
  );

  return (
    <main className="jre-about-page">
      <section className="jre-about-hero">
        <div className="jre-about-hero__meta jre-reveal">
          <span>{t.label}</span>
          <span>{t.role}</span>
          <span>{t.location}</span>
        </div>

        <div className="jre-about-hero__title jre-reveal">
          <h1>
            <span>{t.title[0]}</span>
            <span>{t.title[1]}</span>
          </h1>
          <HeroTypewriter texts={stats.map((stat) => `${stat.value} ${stat.label}`)} />
          <div className="jre-about-hero__visuals" aria-hidden="true">
            <figure className="jre-about-hero__visual jre-about-hero__visual--main">
              <Image src={heroImages[0]} alt="" fill priority sizes="(min-width: 900px) 34vw, 82vw" />
            </figure>
            <figure className="jre-about-hero__visual jre-about-hero__visual--finance">
              <Image src={heroImages[1]} alt="" fill sizes="(min-width: 900px) 16vw, 42vw" />
            </figure>
            <figure className="jre-about-hero__visual jre-about-hero__visual--maritime">
              <Image src={heroImages[2]} alt="" fill sizes="(min-width: 900px) 15vw, 38vw" />
            </figure>
            <i className="jre-about-hero__shape jre-about-hero__shape--circle" />
            <i className="jre-about-hero__shape jre-about-hero__shape--pill" />
          </div>
        </div>

      </section>

      <div className="jre-about-marquee" aria-hidden="true">
        <div>
          <span>{t.marquee}</span>
          <span>{t.marquee}</span>
        </div>
      </div>

      <section className="jre-featured-cases">
        <header className={`jre-section-title jre-section-title--light jre-reveal ${locale === "zh" ? "jre-section-title--zh" : ""}`}>
          <h2>{t.featuredEn}</h2>
          <p>{t.featuredZh}</p>
        </header>
        <div className="jre-featured-cases__grid">
          {featuredProjects.map((project, index) => (
            <Link className="jre-featured-case jre-reveal" href={`${prefix}/projects/${project.slug}`} key={project.slug}>
              <figure>
                <Image src={project.socialImage} alt="" fill sizes="(min-width: 900px) 33vw, 100vw" />
              </figure>
              <div>
                <span>0{index + 1}</span>
                <small>{project.industry}</small>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <i>{t.fullCase} ↗</i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="jre-about-craft">
        <header className={`jre-section-title jre-reveal ${locale === "zh" ? "jre-section-title--zh" : ""}`}>
          <h2><span>Selected</span>{" "}<span>Cases</span></h2>
          <p>{t.gridZh}</p>
        </header>

        <div className="jre-filter-pills jre-reveal">
          <button
            type="button"
            className={activeFilter === null ? "is-active" : ""}
            onClick={() => setActiveFilter(null)}
          >
            {t.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={activeFilter === cat ? "is-active" : ""}
              onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="jre-about-craft__grid">
          {filteredProjects.map((project, index) => (
            <article
              className="jre-reveal jre-craft-card jre-clickable-card"
              key={project.title}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") setSelectedProject(project);
              }}
            >
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>
                  <b>{project.category}</b>
                  <em>{project.industry}</em>
                </small>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>
                {project.technologies.slice(0, 4).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Link
                className="jre-craft-card__case-link"
                href={`${prefix}/projects/${project.slug}`}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                {t.fullCase}<span>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="jre-about-cta">
        <p className="jre-reveal">{t.ctaKicker}</p>
        <h2 className="jre-reveal">{t.ctaTitle}</h2>
        <a
          className="jre-pill-button jre-pill-button--blue jre-reveal"
          href="https://github.com/chien-sheng-liu"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.ctaButton}<span>↗</span>
        </a>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            locale={locale}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
