"use client";

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function CreativeTimeline({ events }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleY = useTransform(smoothYProgress, [0, 0.8], [0, 1]);

  const formatDescription = (description) => {
    const points = description
      .split(/•\s|(?<=\d\s?年\d?\d?個?月)\n|\n-/)
      .filter(point => point.trim() !== "");
    if (points.length <= 1) return <p>{description.trim()}</p>;
    return (
      <ul className="list-disc pl-5 space-y-2">
        {points.map((point, index) => <li key={index}>{point.trim()}</li>)}
      </ul>
    );
  };

  return (
    <div ref={ref} className="relative w-full max-w-5xl mx-auto py-8">
      <motion.div
        style={{ scaleY }}
        className="absolute left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--color-electric-blue)] to-transparent origin-top"
      >
        <motion.div
          className="absolute inset-0 w-full h-full bg-[var(--color-electric-blue)] blur-md"
          style={{ opacity: useTransform(smoothYProgress, [0, 0.1, 0.9, 1], [0, 0.5, 0.5, 0]) }}
        />
      </motion.div>

      {/* Timeline Events */}
      <div className="space-y-16">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          const itemVariants = {
            hidden: { opacity: 0, x: isLeft ? -150 : 150, scale: 0.8 },
            visible: {
              opacity: 1,
              x: 0,
              scale: 1,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
            },
          };

          return (
            <motion.div
              key={index}
              className="relative flex items-center"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {/* Date Circle */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div
                  className="absolute w-full h-full bg-[var(--color-deep-space)] border-2 border-[var(--color-electric-blue)]/20 rounded-full animate-pulse"
                  style={{ animationDuration: "3s" }}
                />
                <div
                  className="absolute w-3/4 h-3/4 bg-[var(--color-deep-space)] border-2 border-[var(--color-electric-blue)]/30 rounded-full animate-pulse"
                  style={{ animationDuration: "3s", animationDelay: "0.5s" }}
                />
                {/* 這裡改用 grid + text-center + leading-tight */}
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-[var(--color-gray-800)] to-[var(--color-deep-space)] border-2 border-[var(--color-electric-blue)]/70 rounded-full grid place-items-center font-bold text-white shadow-lg shadow-[var(--color-electric-blue)]/20 text-sm leading-tight text-center px-1">
                  <span className="whitespace-pre-line break-words">{event.date}</span>
                </div>
              </motion.div>


              {/* Event Card */}
              <div className={`w-[calc(50%-5rem)] ${isLeft ? 'mr-auto' : 'ml-auto order-last'}`}>
                <motion.div
                  className="bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-2xl shadow-black/20"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)",
                    borderColor: "rgba(0, 191, 255, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-[var(--color-gray-400)] mb-3 font-medium">{event.company}</p>
                  <div className="text-[var(--color-gray-300)] leading-relaxed text-sm">
                    {formatDescription(event.description)}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}