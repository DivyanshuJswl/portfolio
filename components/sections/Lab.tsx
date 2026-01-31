// components/sections/Lab.tsx
'use client';

import { motion } from 'framer-motion';
import { Database, Server, Zap, Globe, GitBranch, Cpu } from 'lucide-react';

const architecture = [
  {
    title: 'Uni Event Hub',
    stack: 'MERN Stack',
    description: 'Full-stack event aggregation platform with real-time features',
    github: 'https://github.com/divyanshujswl/uni-event-hub-frontend',
    live: 'https://uni-event.shop',
    features: [
      { 
        icon: Server, 
        label: 'Node.js + Express', 
        desc: 'RESTful API design with JWT authentication',
        color: 'text-green-500 dark:text-green-400'
      },
      { 
        icon: Database, 
        label: 'MongoDB Atlas', 
        desc: 'Event data aggregation with complex queries',
        color: 'text-green-600 dark:text-green-500'
      },
      { 
        icon: Globe, 
        label: 'React Frontend', 
        desc: 'Real-time updates with state management',
        color: 'text-blue-500 dark:text-blue-400'
      },
      { 
        icon: Zap, 
        label: 'WebSocket', 
        desc: 'Live notifications for 1000+ users',
        color: 'text-amber-500 dark:text-yellow-400'
      },
    ],
    metrics: [
      { label: 'Active Users', value: '5,000+' },
      { label: 'Events Listed', value: '10,000+' },
      { label: 'API Uptime', value: '99.9%' },
    ],
  },
  {
    title: 'Zopsmart Microservices',
    stack: 'Go + Kafka',
    description: 'Enterprise-grade microservices architecture for e-commerce',
    github: null,
    live: null,
    features: [
      { 
        icon: Server, 
        label: 'Golang Services', 
        desc: 'High-performance APIs with goroutines',
        color: 'text-cyan-500 dark:text-cyan-400'
      },
      { 
        icon: Zap, 
        label: 'Apache Kafka', 
        desc: 'Event streaming at 10K+ events/sec',
        color: 'text-indigo-500 dark:text-indigo-400'
      },
      { 
        icon: Database, 
        label: 'Distributed DB', 
        desc: 'PostgreSQL with replication',
        color: 'text-blue-600 dark:text-blue-500'
      },
      { 
        icon: Cpu, 
        label: 'Docker + K8s', 
        desc: 'Container orchestration & auto-scaling',
        color: 'text-blue-500 dark:text-blue-400'
      },
    ],
    metrics: [
      { label: 'Response Time', value: '<50ms' },
      { label: 'Events/sec', value: '10,000+' },
      { label: 'Services', value: '15+' },
    ],
  },
];

export default function Lab() {
  return (
    <section id="lab" className="min-h-screen py-20 px-4 transition-colors duration-300 bg-slate-50 dark:bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10" />

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6 text-center text-slate-900 dark:text-white"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          The <span className="text-gradient">Lab</span>
        </motion.h2>

        <motion.p
          className="text-xl text-slate-600 dark:text-slate-400 text-center mb-16 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Architecting scalable systems from concept to production
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {architecture.map((project, idx) => (
            <motion.div
              key={project.title}
              className="glass rounded-2xl overflow-hidden hover:glow transition-all duration-300 group bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/20 dark:to-blue-900/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {project.description}
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-semibold whitespace-nowrap">
                    {project.stack}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-2xl font-bold text-gradient">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  {project.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 dark:text-gray-200 mb-1">
                          {feature.label}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-gray-400">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center font-semibold flex items-center justify-center gap-2"
                    >
                      <GitBranch className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 text-center font-semibold flex items-center justify-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {!project.github && !project.live && (
                    <div className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 rounded-lg text-center font-semibold">
                      Private Repository
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects Teaser */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Want to see more projects?
          </p>
          <a
            href="https://github.com/divyanshujswl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-full font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-300"
          >
            <GitBranch className="w-5 h-5" />
            View GitHub Profile
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}