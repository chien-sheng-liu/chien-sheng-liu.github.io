"use client";

/**
 * Stripe-style animated gradient background.
 * Uses CSS animation only — no JS runtime cost.
 */
const variants = {
  hero: "from-violet-400/20 via-sky-400/20 via-cyan-300/15 to-emerald-300/10",
  mid: "from-sky-400/10 via-cyan-300/10 to-teal-300/10",
  bottom: "from-cyan-300/10 via-emerald-300/10 to-green-200/10",
};

export default function AnimatedGradientBg({ variant = "hero", className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`absolute -inset-[50%] bg-gradient-to-br ${variants[variant] || variants.hero} animate-[gradient-flow_12s_ease_infinite]`}
        style={{ backgroundSize: "200% 200%" }}
      />
    </div>
  );
}
