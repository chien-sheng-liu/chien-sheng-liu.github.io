"use client";
import { useRef, useCallback } from "react";

/**
 * Adds 3D tilt hover effect to children.
 * Uses CSS perspective + mousemove for rotateX/rotateY calculation.
 * No external packages.
 */
export default function Card3D({ children, className = "", intensity = 8 }) {
  const cardRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (el) el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
