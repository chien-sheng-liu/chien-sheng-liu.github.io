"use client";
import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    /* Disable on touch devices */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId;
    const onMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
        rafId = null;
      });
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(600px circle at var(--cursor-x, -999px) var(--cursor-y, -999px), rgba(99,102,241,0.06), rgba(14,165,233,0.03) 40%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
