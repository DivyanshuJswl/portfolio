// components/sections/About.tsx
'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket, Award } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Backend Specialist',
    description: 'Expert in Go, building high-performance microservices with Apache Kafka for real-time event streaming',
  },
  {
    icon: Cpu,
    title: 'System Architect',
    description: 'Designing scalable distributed systems with Docker, Podman, and modern containerization practices',
  },
  {
    icon: Rocket,
    title: 'Full-Stack Builder',
    description: 'MERN stack enthusiast with production experience in building end-to-end applications',
  },
  {
    icon: Award,
    title: 'Problem Solver',
    description: 'Competitive programmer with strong foundation in C++ and algorithmic thinking',
  },
];

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-4 relative bg-transparent">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 text-center text-slate-900 dark:text-white"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 text-center mb-16 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          A passionate backend engineer currently crafting scalable microservices at Zopsmart. 
          I transform complex business logic into elegant, performant systems that power modern applications.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              // Updated to match Lab/Contact style: stronger glass, rounded-3xl, subtle border
              className="glass p-10 rounded-3xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group border border-white/20 dark:border-white/5"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-5">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors shadow-sm">
                  <item.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section - Added Glass background container for better readability */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 glass rounded-2xl p-8 border border-white/20 dark:border-white/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: 'Years Experience', value: '2+' },
            { label: 'Projects Delivered', value: '10+' },
            { label: 'Tech Stack', value: '15+' },
            { label: 'Code Commits', value: '1000+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}