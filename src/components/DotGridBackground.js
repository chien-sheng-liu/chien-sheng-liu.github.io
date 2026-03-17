"use client";
import { useRef, useEffect } from "react";

/**
 * Subtle dot-grid overlay with mouse parallax displacement.
 * Pure CSS dots + vanilla JS mousemove. No external packages.
 */
export default function DotGridBackground({ className = "" }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId;
    const onMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (!gridRef.current) { rafId = null; return; }
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        gridRef.current.style.transform = `translate(${x}px, ${y}px)`;
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
      ref={gridRef}
      className={`absolute -inset-4 transition-transform duration-[800ms] ease-out ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
      aria-hidden="true"
    />
  );
}
