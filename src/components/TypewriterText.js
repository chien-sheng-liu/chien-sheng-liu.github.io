"use client";
import { useState, useEffect } from "react";

/**
 * Typewriter effect cycling through an array of strings.
 * Pure JS — no external packages.
 */
export default function TypewriterText({ texts = [], speed = 60, pause = 2000, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    const current = texts[textIdx] || "";

    const delay = (() => {
      if (!deleting) {
        if (charIdx < current.length) return speed;
        return pause; // pause at end
      }
      if (charIdx > 0) return speed / 2;
      return speed; // switch to next word
    })();

    const id = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((i) => i + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((i) => i - 1);
        } else {
          setDeleting(false);
          setTextIdx((i) => (i + 1) % texts.length);
        }
      }
    }, delay);

    return () => clearTimeout(id);
  }, [texts, textIdx, charIdx, deleting, speed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="inline-block w-[2px] h-[0.85em] bg-current ml-0.5 align-middle"
        style={{ animation: "blink-caret 0.8s step-end infinite" }}
      />
    </span>
  );
}
