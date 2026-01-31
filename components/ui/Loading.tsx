// components/ui/Loading.tsx
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Pulse */}
        <motion.div
          className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="mt-6 font-mono text-sm font-medium text-slate-500 dark:text-slate-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        INITIALIZING SYSTEM...
      </motion.div>
    </div>
  );
}
