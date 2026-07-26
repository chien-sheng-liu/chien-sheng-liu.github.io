"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function CtaSection({ title, description, buttonLabel, buttonHref }) {
  const reduced = useReducedMotion();

  return (
    <section className="jre-cta">
      <motion.div
        className="jre-cta__ring"
        aria-hidden="true"
        initial={reduced ? false : { rotate: -35, scale: 0.8, opacity: 0 }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="jre-cta__content"
        initial={reduced ? false : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>{description}</p>
        <h2>{title}</h2>
        <Link href={buttonHref} className="jre-pill-button">
          {buttonLabel}<span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </section>
  );
}
