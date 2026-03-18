"use client";
import { highlights, experiences, education, languages, pageText } from "@/app/en/about/aboutData";
import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import ScrollReveal from "@/components/ScrollReveal";
import Card3D from "@/components/Card3D";
import HeroSection from "@/components/sections/HeroSection";
import CtaSection from "@/components/sections/CtaSection";

export default function HomeEn() {
  return (
    <div className="relative min-h-screen overflow-hidden text-[#1d1d1f]">
      <main className="relative z-10 space-y-20 pb-16">

        {/* ═══ HERO (shared) ═══ */}
        <HeroSection
          greeting="Hi, I&apos;m Morris"
          titlePrefix="I turn AI"
          typewriterTexts={["into clear narratives", "into business value", "into compelling stories"]}
          subtitle={pageText?.subtitle}
          tags={["Frontend Engineer", "Process Designer", "AI / Data"]}
          ctaLabel="Say hello"
          ctaHref="/en/contact"
        />

        {/* ═══ HIGHLIGHTS ═══ */}
        <section id="about" className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <h2 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">Highlights</h2>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-3">
              {highlights.slice(0,3).map((h, idx) => (
                <ScrollReveal key={idx} delay={idx * 100}>
                  <Card3D intensity={5}>
                    <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-500">{h.icon}</div>
                        <h3 className="text-base font-semibold text-[#1d1d1f]">{h.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{h.description}</p>
                    </div>
                  </Card3D>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <AnimatedGradientBg variant="mid" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <ScrollReveal>
              <h2 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">Experience</h2>
            </ScrollReveal>
            <div className="space-y-4">
              {experiences.slice(0,5).map((exp, idx) => (
                <ScrollReveal key={idx} delay={idx * 80}>
                  <Card3D intensity={4}>
                    <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold text-[#1d1d1f]">{exp.title}</h3>
                        <span className="text-xs text-slate-400">{exp.date}</span>
                      </div>
                      <div className="text-sm text-slate-500">{exp.company}</div>
                      <ul className="mt-2 space-y-1">
                        {(exp.bullets||[]).slice(0,3).map((b,i)=>(<li key={i} className="text-sm text-slate-500">• {b}</li>))}
                      </ul>
                    </div>
                  </Card3D>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ EDUCATION / LANGUAGES ═══ */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <h2 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">Education / Languages</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {education.slice(0,3).map((ed, idx)=>(
                  <ScrollReveal key={idx} delay={idx * 100}>
                    <Card3D intensity={4}>
                      <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base font-semibold text-[#1d1d1f]">{ed.title}</h3>
                          <span className="text-xs text-slate-400">{ed.date}</span>
                        </div>
                        <p className="text-sm text-slate-500">{ed.company}</p>
                        {ed.description && <p className="text-xs text-slate-400 mt-1">{ed.description}</p>}
                      </div>
                    </Card3D>
                  </ScrollReveal>
                ))}
              </div>
              <div className="space-y-3">
                {languages.map((l,idx)=>(
                  <ScrollReveal key={idx} delay={idx * 80}>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm px-5 py-4 shadow-sm">
                      <span className="text-sm text-[#1d1d1f]">{l.title}</span>
                      <span className="text-xs text-sky-500 font-medium">{l.level}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA (shared) ═══ */}
        <CtaSection
          title="Want to create better work together?"
          description="Drop me a line or grab a time to chat."
          buttonLabel="Say hello"
          buttonHref="/en/contact"
        />
      </main>
    </div>
  );
}
