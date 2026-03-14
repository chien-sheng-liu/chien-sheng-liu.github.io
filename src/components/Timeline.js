"use client";

import { motion } from 'framer-motion';

export function Timeline({ events }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="relative pl-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-full"></div>
      {events.map((event, index) => (
        <motion.div key={index} className="mb-10 relative" variants={itemVariants}>
          <div className="absolute -left-4 top-1 w-8 h-8 bg-gray-900 rounded-full border-4 border-cyan-500 flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-400 mb-1">{event.title}</h3>
            <p className="text-gray-400 mb-2">{event.company} | {event.date}</p>
            <p className="text-gray-300">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}