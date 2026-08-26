import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaGithub } from "react-icons/fa";
import CtaSection from "@/components/sections/CtaSection";

const copy = {
  zh: {
    back: "返回所有案例",
    overview: "CASE STUDY",
    metrics: "Key Metrics",
    details: "Delivery Details",
    industryContext: "Industry Context",
    problem: "Business Problem",
    built: "What I Built",
    impact: "Business Impact",
    highlights: "Project Highlights",
    stack: "Tech Stack",
    code: "查看程式碼",
    related: "Related Cases",
    relatedZh: "相關案例",
    ctaTitle: "想進一步討論這類問題？",
    ctaBody: "無論是職涯交流、顧問合作或 Data & AI 專案，都歡迎直接聯絡我。",
    ctaButton: "聯絡我",
  },
  en: {
    back: "Back to all cases",
    overview: "CASE STUDY",
    metrics: "Key Metrics",
    details: "Delivery Details",
    industryContext: "Industry Context",
    problem: "Business Problem",
    built: "What I Built",
    impact: "Business Impact",
    highlights: "Project Highlights",
    stack: "Tech Stack",
    code: "View Code",
    related: "Related Cases",
    relatedZh: "Continue exploring",
    ctaTitle: "Want to discuss a similar problem?",
    ctaBody: "For career conversations, advisory work, or a concrete Data & AI project, feel free to get in touch.",
    ctaButton: "Contact me",
  },
};

export default function ProjectCasePage({ project, relatedProjects = [], locale = "zh" }) {
  const t = copy[locale] || copy.zh;
  const prefix = locale === "en" ? "/en" : "";
  const sections = [
    [t.industryContext, project.industryContext],
    [t.problem, project.caseNotes?.problem],
    [t.built, project.caseNotes?.approach],
    [t.impact, project.caseNotes?.impact],
  ].filter(([, text]) => text);

  return (
    <main className="jre-case-page">
      <header className="jre-case-hero">
        <div className="jre-case-hero__copy jre-reveal">
          <Link className="jre-case-back" href={`${prefix}/projects`}>
            <FaArrowLeft />{t.back}
          </Link>
          <p className="jre-case-eyebrow">{t.overview} / {project.category}</p>
          <h1>{project.title}</h1>
          <strong>{project.industry}</strong>
          <p className="jre-case-hero__summary">{project.description}</p>
        </div>
        <figure className="jre-case-hero__media jre-reveal">
          <Image
            src={project.socialImage}
            alt={`${project.title} editorial illustration`}
            fill
            priority
            sizes="(min-width: 900px) 40vw, 100vw"
          />
        </figure>
      </header>

      <section className="jre-case-metrics" aria-label={t.metrics}>
        {project.metrics.map((metric) => (
          <article className="jre-reveal" key={`${metric.label}-${metric.value}`}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <div className="jre-case-content">
        <section className="jre-case-delivery jre-reveal">
          <p className="jre-case-eyebrow">{t.details}</p>
          <p>{project.detailDescription || project.description}</p>
        </section>

        <section className="jre-case-sections">
          {sections.map(([label, text], index) => (
            <article className="jre-reveal" key={label}>
              <span>0{index + 1}</span>
              <div>
                <h2>{label}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </section>

        <aside className="jre-case-aside">
          {project.highlights?.length > 0 && (
            <section className="jre-reveal">
              <h2>{t.highlights}</h2>
              <ul>
                {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </section>
          )}
          <section className="jre-reveal">
            <h2>{t.stack}</h2>
            <ul className="jre-case-stack">
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </section>
          {project.link && project.link !== "#" && (
            <a className="jre-case-code jre-reveal" href={project.link} target="_blank" rel="noopener noreferrer">
              <FaGithub />{t.code}<FaArrowRight />
            </a>
          )}
        </aside>
      </div>

      {relatedProjects.length > 0 && (
        <section className="jre-case-related">
          <header className="jre-section-title jre-reveal">
            <h2>{t.related}</h2><p>{t.relatedZh}</p>
          </header>
          <div>
            {relatedProjects.map((related, index) => (
              <Link className="jre-case-related__card jre-reveal" href={`${prefix}/projects/${related.slug}`} key={related.slug}>
                <span>0{index + 1}</span>
                <small>{related.industry}</small>
                <h3>{related.title}</h3>
                <p>{related.description}</p>
                <i>{locale === "en" ? "VIEW CASE" : "閱讀案例"} <FaArrowRight /></i>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaSection
        title={t.ctaTitle}
        description={t.ctaBody}
        buttonLabel={t.ctaButton}
        buttonHref={`${prefix}/contact`}
      />
    </main>
  );
}
