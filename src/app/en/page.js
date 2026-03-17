"use client";
import Link from "next/link";
import Image from "next/image";
import ParticlesBackground from "@/components/ParticlesBackground";
import { motion } from "framer-motion";
import { FaArrowRight, FaRobot, FaShieldAlt, FaFeather } from "react-icons/fa";
import { highlights, experiences, education, languages, pageText } from "@/app/en/about/aboutData";
import { projects } from "@/app/en/projects/projectData";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const heroTags = ["Frontend Engineer", "Process Designer", "AI / Data"];
// Removed business arrays (services/stats) to keep homepage personal

const Pill = ({ children, tone = "default" }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-tight ${
      tone === "primary"
        ? "border-[var(--color-electric-blue)]/50 bg-[var(--color-electric-blue)]/10 text-[var(--color-electric-blue)]"
        : "border-white/10 bg-white/5 text-[var(--color-gray-300)]"
    }`}
  >
    {children}
  </span>
);

export default function HomeEn() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-[var(--color-white)]">
      <ParticlesBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(0,191,255,0.15),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(138,43,226,0.1),transparent_50%)]" />

      <main className="relative z-10 space-y-16 pb-16">
        {/* HERO */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16">
          <div className="mx-auto max-w-6xl">
            {/* Left: Textual hero */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="rounded-[40px] border border-white/10 bg-gradient-to-br from-[#1a2a48] via-[#0f1b33] to-[#0a1326] p-9 shadow-[0_60px_160px_-60px_rgba(0,191,255,0.55)]"
            >
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div className="space-y-5">
                <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-gray-300)]">Hi, I’m Morris</motion.p>
                <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-semibold leading-tight text-white">I turn AI into work and stories</motion.h1>
                <motion.p variants={fadeUp} className="text-sm md:text-base text-[var(--color-gray-200)] max-w-xl">{pageText?.subtitle}</motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {heroTags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </motion.div>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
                  <Link href="/en/contact" className="group inline-flex items-center rounded-full border border-[var(--color-electric-blue)]/60 bg-[var(--color-electric-blue)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-electric-blue)]">Say hello<FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /></Link>
                </motion.div>
                <motion.p variants={fadeUp} className="mt-6 text-sm md:text-base text-[var(--color-gray-200)] max-w-2xl border-t border-white/10 pt-6">{pageText?.subtitle}</motion.p>
              </div>
              <motion.div variants={fadeUp} className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.35),transparent_60%)] blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/15 shadow-[0_30px_100px_-60px_rgba(0,191,255,0.6)]">
                  <Image src="/profile.png" alt="Morris portrait" fill sizes="256px" className="object-cover" />
                </div>
              </motion.div>
              </div>
            </motion.div>

            
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section id="about" className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4"><h2 className="text-sm uppercase tracking-[0.35em] text-[var(--color-gray-400)]">Highlights</h2></div>
            <div className="grid gap-5 md:grid-cols-3">
              {highlights.slice(0,3).map((h, idx) => (
                <motion.div key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="rounded-2xl border border-white/10 bg-[#111c2f] p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-electric-blue)]/14 text-[var(--color-electric-blue)]">{h.icon}</div>
                    <h3 className="text-base font-semibold text-white">{h.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-gray-300)]">{h.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SELECTED WORK removed for personal CV-style */}
        <section className="hidden">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-white">Selected Work</h2>
              <Link href="/en/projects" className="text-sm text-[var(--color-gray-300)] hover:text-white">All work</Link>
            </div>
            {projects.length > 0 && (
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1a2a48] via-[#0f1b33] to-[#0a1326] p-7 shadow-[0_60px_160px_-60px_rgba(0,191,255,0.45)] hover:shadow-[0_60px_160px_-50px_rgba(0,191,255,0.6)] hover-lift">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(0,191,255,0.35),transparent_55%)]" />
                  <div className="relative space-y-3">
                    <h3 className="text-xl font-semibold text-white">{projects[0].title}</h3>
                    <p className="text-sm text-[var(--color-gray-200)]">{projects[0].description}</p>
                    <div className="flex flex-wrap gap-2">{(projects[0].technologies||[]).slice(0,4).map((t) => (<Pill key={t} tone="primary">{t}</Pill>))}</div>
                    <Link href={projects[0].link || '/en/projects'} className="group inline-flex items-center text-sm font-semibold text-[var(--color-electric-blue)]">View details<FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /></Link>
                  </div>
                </motion.div>
                <div className="grid gap-6">
                  {projects.slice(1,3).map((p, idx) => (
                    <motion.div key={p.slug || p.title || idx} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="rounded-[22px] border border-white/10 bg-[#0b1220] p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white">{p.title}</h3>
                        <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-gray-500)]">Work</span>
                      </div>
                      <p className="mt-1.5 text-sm text-[var(--color-gray-300)]">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">{(p.technologies||[]).slice(0,3).map((t)=> (<Pill key={t}>{t}</Pill>))}</div>
                      <Link href={p.link || '/en/projects'} className="mt-4 inline-flex items-center text-sm text-[var(--color-gray-200)] hover:text-white">Learn more<FaArrowRight className="ml-2 text-xs" /></Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4"><h2 className="text-sm uppercase tracking-[0.35em] text-[var(--color-gray-400)]">Experience</h2></div>
            <div className="space-y-4">
              {experiences.slice(0,5).map((exp, idx) => (
                <motion.div key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="rounded-2xl border border-white/10 bg-[#111c2f] p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">{exp.title}</h3>
                    <span className="text-xs text-[var(--color-gray-500)]">{exp.date}</span>
                  </div>
                  <div className="text-sm text-[var(--color-gray-300)]">{exp.company}</div>
                  <ul className="mt-2 space-y-1">
                    {(exp.bullets||[]).slice(0,3).map((b,i)=>(<li key={i} className="text-sm text-[var(--color-gray-300)]">• {b}</li>))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION / LANGUAGES */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4"><h2 className="text-sm uppercase tracking-[0.35em] text-[var(--color-gray-400)]">Education / Languages</h2></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {education.slice(0,3).map((ed, idx)=>(
                  <div key={idx} className="rounded-2xl border border-white/10 bg-[#111c2f] p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-white">{ed.title}</h3>
                      <span className="text-xs text-[var(--color-gray-500)]">{ed.date}</span>
                    </div>
                    <p className="text-sm text-[var(--color-gray-300)]">{ed.company}</p>
                    {ed.description && <p className="text-xs text-[var(--color-gray-500)] mt-1">{ed.description}</p>}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {languages.map((l,idx)=>(
                  <div key={idx} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111c2f] px-5 py-4">
                    <span className="text-sm text-white">{l.title}</span>
                    <span className="text-xs text-[var(--color-electric-blue)]">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-[20px] border border-white/5 bg-[#0b1220] px-6 py-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45 }}>
              <h3 className="text-2xl font-semibold text-white">Want to create better work together?</h3>
              <p className="mt-2 text-sm text-[var(--color-gray-400)]">Drop me a line or grab a time to chat.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/en/contact" className="group inline-flex items-center rounded-full border border-[var(--color-electric-blue)]/60 bg-[var(--color-electric-blue)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-electric-blue)]">
                  Say hello
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
