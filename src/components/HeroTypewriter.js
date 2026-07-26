"use client";

import { useReducedMotion } from "framer-motion";
import TypewriterText from "./TypewriterText";

export default function HeroTypewriter({ texts = [] }) {
  const reducedMotion = useReducedMotion();
  const accessibleText = texts[0] || "";

  return (
    <p className="jre-about-hero__typewriter">
      <span className="sr-only">{accessibleText}</span>
      <span aria-hidden="true">
        <TypewriterText
          texts={texts}
          speed={58}
          pause={1800}
          disabled={Boolean(reducedMotion)}
        />
      </span>
    </p>
  );
}
