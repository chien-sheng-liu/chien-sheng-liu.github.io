"use client";
import { highlights, experiences, education, languages, pageText } from "@/app/yue/about/aboutData";
import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import ScrollReveal from "@/components/ScrollReveal";
import Card3D from "@/components/Card3D";
import HeroSection from "@/components/sections/HeroSection";
import CtaSection from "@/components/sections/CtaSection";

export default function HomeYue() {
  return (
    <div className="relative min-h-screen overflow-hidden text-[#1d1d1f]">
      <main className="relative z-10 space-y-20 pb-16">

        {/* ═══ HERO (shared) ═══ */}
        <HeroSection
          greeting="Hello，我係 Morris"
          titlePrefix="將 AI"
          typewriterTexts={["變成清楚嘅敘事", "落地做商業價值", "串聯成完整故事"]}
          subtitle={pageText?.subtitle}
          tags={["前端工程師", "流程設計師", "AI / Data"]}
          ctaLabel="打個招呼"
          ctaHref="/yue/contact"
        />

        {/* ═══ 重點 ═══ */}
        <section id="about" className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">重點</h2>
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

        {/* ═══ 經歷 ═══ */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <AnimatedGradientBg variant="mid" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">經歷</h2>
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

        {/* ═══ 教育 / 語言 ═══ */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">教育 / 語言</h2>
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
          title="想一齊打造更好嘅作品？"
          description="畀我個訊息，或者直接約時間傾吓。"
          buttonLabel="打個招呼"
          buttonHref="/yue/contact"
        />
      </main>
    </div>
  );
}
