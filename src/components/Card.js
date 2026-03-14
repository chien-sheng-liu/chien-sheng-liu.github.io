"use client";

import { motion } from "framer-motion";
import { Code, Eye } from "lucide-react";

export function Card({ title, description, codeLink, previewLink }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex justify-end space-x-4">
          {codeLink && (
            <a href={codeLink} target="_blank" rel="noopener noreferrer">
              <Code className="h-6 w-6 text-gray-500 hover:text-cyan-500 transition-colors" />
            </a>
          )}
          {previewLink && (
            <a href={previewLink} target="_blank" rel="noopener noreferrer">
              <Eye className="h-6 w-6 text-gray-500 hover:text-cyan-500 transition-colors" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
