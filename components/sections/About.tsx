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
    <section id="about" className="min-h-screen py-20 px-4 relative overflow-hidden bg-black dark:bg-black light:bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 dark:bg-purple-600/20 light:bg-purple-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/20 light:bg-blue-200/40 rounded-full blur-3xl -z-10" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-white dark:text-white light:text-gray-900"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 text-center mb-16 max-w-3xl mx-auto"
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
              className="glass p-8 rounded-2xl hover:glow transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600/20 dark:bg-purple-600/20 light:bg-purple-100 rounded-lg group-hover:bg-purple-600/30 dark:group-hover:bg-purple-600/30 light:group-hover:bg-purple-200 transition-colors">
                  <item.icon className="w-8 h-8 text-purple-400 dark:text-purple-400 light:text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-400 dark:group-hover:text-purple-400 light:group-hover:text-purple-600 transition-colors text-white dark:text-white light:text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
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
              <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
