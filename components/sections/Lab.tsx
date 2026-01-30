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
        color: 'text-green-400'
      },
      { 
        icon: Database, 
        label: 'MongoDB Atlas', 
        desc: 'Event data aggregation with complex queries',
        color: 'text-green-500'
      },
      { 
        icon: Globe, 
        label: 'React Frontend', 
        desc: 'Real-time updates with state management',
        color: 'text-blue-400'
      },
      { 
        icon: Zap, 
        label: 'WebSocket', 
        desc: 'Live notifications for 1000+ users',
        color: 'text-yellow-400'
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
        color: 'text-cyan-400'
      },
      { 
        icon: Zap, 
        label: 'Apache Kafka', 
        desc: 'Event streaming at 10K+ events/sec',
        color: 'text-purple-400'
      },
      { 
        icon: Database, 
        label: 'Distributed DB', 
        desc: 'PostgreSQL with replication',
        color: 'text-blue-500'
      },
      { 
        icon: Cpu, 
        label: 'Docker + K8s', 
        desc: 'Container orchestration & auto-scaling',
        color: 'text-blue-400'
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
    <section id="lab" className="min-h-screen py-20 px-4 bg-black dark:bg-black light:bg-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/20 light:bg-blue-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-600/20 dark:bg-purple-600/20 light:bg-purple-200/30 rounded-full blur-3xl -z-10" />

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6 text-center text-white dark:text-white light:text-gray-900"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          The <span className="text-gradient">Lab</span>
        </motion.h2>

        <motion.p
          className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 text-center mb-16 max-w-3xl mx-auto"
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
              className="glass rounded-2xl overflow-hidden hover:glow transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-800 dark:border-gray-800 light:border-gray-200 bg-gradient-to-r from-purple-900/20 to-blue-900/20 dark:from-purple-900/20 dark:to-blue-900/20 light:from-purple-100/50 light:to-blue-100/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
                      {project.description}
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-purple-600/20 dark:bg-purple-600/20 light:bg-purple-100 text-purple-400 dark:text-purple-400 light:text-purple-700 rounded-full text-sm font-semibold whitespace-nowrap">
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
                      <div className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600">
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
                      className="flex items-start gap-4 p-4 bg-gray-900/30 dark:bg-gray-900/30 light:bg-gray-100 rounded-lg hover:bg-gray-800/50 dark:hover:bg-gray-800/50 light:hover:bg-gray-200 transition-colors"
                    >
                      <div className="p-2 bg-purple-600/20 dark:bg-purple-600/20 light:bg-purple-100 rounded-lg">
                        <feature.icon className={`w-6 h-6 ${feature.color} dark:${feature.color} light:text-purple-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-200 dark:text-gray-200 light:text-gray-900 mb-1">
                          {feature.label}
                        </h4>
                        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
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
                      className="flex-1 px-4 py-3 bg-gray-800 dark:bg-gray-800 light:bg-gray-200 text-white dark:text-white light:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-300 transition-colors text-center font-semibold flex items-center justify-center gap-2"
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
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-center font-semibold flex items-center justify-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {!project.github && !project.live && (
                    <div className="flex-1 px-4 py-3 bg-gray-800/50 dark:bg-gray-800/50 light:bg-gray-200 text-gray-500 dark:text-gray-500 light:text-gray-600 rounded-lg text-center font-semibold">
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
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
            Want to see more projects?
          </p>
          <a
            href="https://github.com/divyanshujswl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-600 dark:border-purple-600 light:border-purple-500 text-purple-400 dark:text-purple-400 light:text-purple-600 rounded-full font-semibold hover:bg-purple-600/10 dark:hover:bg-purple-600/10 light:hover:bg-purple-50 transition-all duration-300"
          >
            <GitBranch className="w-5 h-5" />
            View GitHub Profile
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
