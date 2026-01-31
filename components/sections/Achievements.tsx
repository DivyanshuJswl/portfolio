// components/sections/Achievements.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Code, Cpu, Globe, Award, Star, Zap, X } from "lucide-react";
import Image from "next/image";

// --- DATA: Replace with your real stats & images ---
const achievements = [
  {
    id: "leetcode",
    title: "LeetCode Knight",
    metric: "Max Rating: 1815",
    description:
      "Top 7% globally. Solved 550+ problems with consistent daily streaks.",
    icon: Code,
    color: "from-orange-400 to-amber-600",
    image:
      "https://res.cloudinary.com/dh5cebjwj/image/upload/v1769899707/Screenshot_2026-02-01_at_4.17.34_AM_lqzunt.png",
  },
  {
    id: "hackathon",
    title: "Hackathon Winner",
    metric: "1st Place @ Hack With Tricity 2025",
    description:
      "Built 'EcoSync', an AI-powered waste management system in 8 hours.",
    icon: Trophy,
    color: "from-indigo-500 to-purple-600",
    image:
      "https://res.cloudinary.com/dh5cebjwj/image/upload/v1769899950/1747112488761_dhxb4m.jpg",
  },
  {
    id: "codechef",
    title: "Position on Coding Contest",
    metric: "2nd Place @ Code Sprint 1.0",
    description:
      "Ranked 2nd among peers in a coding competition demonstrating problem solving.",
    icon: Star,
    color: "from-emerald-400 to-teal-600",
    image:
      "https://res.cloudinary.com/dh5cebjwj/image/upload/v1769900175/Screenshot_2026-02-01_at_4.26.03_AM_gzaai8.png",
  },
];

export default function Achievements() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="achievements"
      className="py-24 px-4 relative bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-4 rounded-full bg-amber-500/10 mb-6 border border-amber-500/20"
          >
            <Trophy className="w-8 h-8 text-amber-500" />
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Hall of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-cyan-400">
              Fame
            </span>
          </motion.h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Competitive programming milestones and technical arsenal.
          </p>
        </div>

        {/* 1. Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

              <div className="relative h-full glass rounded-[2rem] p-8 border border-white/20 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden">
                {/* Background Image (Subtle) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p
                    className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color} mb-4`}
                  >
                    {item.metric}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Click to view proof</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Expanded Modal (Photo Proof) */}
        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />

              <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full max-w-4xl bg-white dark:bg-[#0B1120] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="grid md:grid-cols-2 h-[60vh] md:h-[500px]">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-full w-full bg-slate-800">
                    <Image
                      src={
                        achievements.find((a) => a.id === selectedId)?.image ||
                        ""
                      }
                      alt="Achievement Proof"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    {achievements.map(
                      (item) =>
                        item.id === selectedId && (
                          <div key={item.id}>
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.color} mb-6`}
                            >
                              <Award className="w-3 h-3" />
                              VERIFIED ACHIEVEMENT
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                              {item.title}
                            </h3>
                            <p className="text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-6">
                              {item.metric}
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                              {item.description}
                            </p>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
