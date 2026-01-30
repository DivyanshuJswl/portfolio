// components/sections/Lab.tsx
'use client';

import { motion } from 'framer-motion';
import { Database, Server, Zap, Globe } from 'lucide-react';

const architecture = [
  {
    title: 'Uni Event Hub',
    stack: 'MERN Stack',
    features: [
      { icon: Server, label: 'Node.js + Express', desc: 'RESTful API design' },
      { icon: Database, label: 'MongoDB Atlas', desc: 'Event data aggregation' },
      { icon: Globe, label: 'React Frontend', desc: 'Real-time updates' },
      { icon: Zap, label: 'WebSocket', desc: 'Live notifications' },
    ],
  },
  {
    title: 'Zopsmart Microservices',
    stack: 'Go + Kafka',
    features: [
      { icon: Server, label: 'Golang Services', desc: 'High-performance APIs' },
      { icon: Zap, label: 'Apache Kafka', desc: 'Event streaming' },
      { icon: Database, label: 'Distributed DB', desc: 'Data consistency' },
    ],
  },
];

export default function Lab() {
  return (
    <section className="min-h-screen py-20 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl font-bold mb-16 text-center">
          The <span className="text-purple-400">Lab</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {architecture.map((project, idx) => (
            <motion.div
              key={project.title}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <span className="px-4 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                  {project.stack}
                </span>
              </div>

              <div className="space-y-4">
                {project.features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <feature.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">{feature.label}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
