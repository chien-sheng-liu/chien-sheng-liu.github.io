"use client";
import { useEffect, useRef } from "react";

/*
  Animated flight arcs with traveling light dots.
  Renders SVG arcs between node positions with a cyan→purple gradient
  and small glowing dots that travel along each arc.
*/
export default function FlightArc({ nodes, vbW, vbH }) {
  const dotsRef = useRef([]);

  /*
    Hand-tuned cubic Bezier arcs — each one unique, like real flight
    routes that bend differently depending on wind, geography, etc.
    Control points are specified per-segment for maximum variety.
  */
  const arcConfigs = [
    // 0: 2026 HK → 2024 TW — gentle swoop upward, slight S
    { s1: 0.3, s2: 0.7, lift1: 90, lift2: 50, hShift1: 60, hShift2: -40 },
    // 1: 2024 TW → 2023 ML — steep rise then flatten
    { s1: 0.2, s2: 0.8, lift1: 110, lift2: 35, hShift1: -50, hShift2: 70 },
    // 2: 2023 ML → 2023 講師 — low wide arc
    { s1: 0.35, s2: 0.65, lift1: 55, lift2: 60, hShift1: 80, hShift2: -30 },
    // 3: 2023 講師 → 2022 DE — dramatic high arc (long flight!)
    { s1: 0.25, s2: 0.75, lift1: 130, lift2: 80, hShift1: -70, hShift2: 50 },
    // 4: 2022 DE → 2021 DE — tight short curve
    { s1: 0.3, s2: 0.7, lift1: 45, lift2: 40, hShift1: 50, hShift2: -60 },
    // 5: 2021 DE → 2020 MSc — asymmetric S-bend
    { s1: 0.2, s2: 0.85, lift1: 95, lift2: 25, hShift1: -90, hShift2: 40 },
    // 6: 2020 MSc → 2019 交換 — gentle dip then rise
    { s1: 0.4, s2: 0.6, lift1: 35, lift2: 70, hShift1: 60, hShift2: -80 },
    // 7: 2019 交換 → 2017 CN — wide dramatic swoop
    { s1: 0.2, s2: 0.75, lift1: 120, lift2: 60, hShift1: -55, hShift2: 85 },
    // 8: 2017 CN → 2015 TW — final arc, medium height
    { s1: 0.35, s2: 0.7, lift1: 70, lift2: 55, hShift1: 45, hShift2: -50 },
  ];

  const arcs = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const cfg = arcConfigs[i] || arcConfigs[0];

    const c1x = a.x + dx * cfg.s1 + cfg.hShift1;
    const c1y = a.y + dy * cfg.s1 - cfg.lift1;
    const c2x = a.x + dx * cfg.s2 + cfg.hShift2;
    const c2y = a.y + dy * cfg.s2 - cfg.lift2;

    arcs.push({
      id: i,
      d: `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`,
    });
  }

  /* Animate dots along paths */
  useEffect(() => {
    let rafId;
    const speed = 0.0004; // controls dot travel speed

    const animate = (time) => {
      dotsRef.current.forEach((dot, i) => {
        if (!dot?.path) return;
        const len = dot.path.getTotalLength();
        const t = ((time * speed + i * 0.12) % 1);
        const pt = dot.path.getPointAtLength(t * len);
        if (dot.el) {
          dot.el.setAttribute("cx", pt.x);
          dot.el.setAttribute("cy", pt.y);
        }
        if (dot.glowEl) {
          dot.glowEl.setAttribute("cx", pt.x);
          dot.glowEl.setAttribute("cy", pt.y);
        }
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full z-[5]"
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="arcGradGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.12" />
        </linearGradient>
        {/* White glow behind arcs for separation from map */}
        <linearGradient id="arcWhiteGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
        </linearGradient>
        <filter id="dotGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
      </defs>

      {/* Arc paths */}
      {arcs.map((arc) => (
        <g key={arc.id}>
          {/* White glow for separation */}
          <path
            d={arc.d}
            stroke="url(#arcWhiteGlow)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Color glow layer */}
          <path
            d={arc.d}
            stroke="url(#arcGradGlow)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          {/* Main arc */}
          <path
            d={arc.d}
            stroke="url(#arcGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="8 6"
            className="animate-[dash-march_1.5s_linear_infinite]"
          />
        </g>
      ))}

      {/* Traveling light dots */}
      {arcs.map((arc) => (
        <g key={`dot-${arc.id}`}>
          {/* Hidden path for getPointAtLength */}
          <path
            d={arc.d}
            fill="none"
            stroke="none"
            ref={(el) => {
              if (!dotsRef.current[arc.id]) dotsRef.current[arc.id] = {};
              dotsRef.current[arc.id].path = el;
            }}
          />
          {/* Glow circle */}
          <circle
            r="10"
            fill="#0ea5e9"
            opacity="0.25"
            filter="url(#dotGlow)"
            ref={(el) => {
              if (!dotsRef.current[arc.id]) dotsRef.current[arc.id] = {};
              dotsRef.current[arc.id].glowEl = el;
            }}
          />
          {/* Bright dot */}
          <circle
            r="3"
            fill="#0ea5e9"
            opacity="0.9"
            ref={(el) => {
              if (!dotsRef.current[arc.id]) dotsRef.current[arc.id] = {};
              dotsRef.current[arc.id].el = el;
            }}
          />
        </g>
      ))}
    </svg>
  );
}
