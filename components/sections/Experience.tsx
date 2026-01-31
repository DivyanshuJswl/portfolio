// components/sections/Experience.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, Server, Terminal, Cpu } from 'lucide-react';

const timeline = [
  {
    type: 'work',
    icon: Briefcase,
    title: 'SDE 1 Intern',
    company: 'Zopsmart Technology Pvt Ltd',
    period: '2025 - Present',
    location: 'Bengaluru, India',
    tech: ['Go', 'Kafka', 'Docker', 'Podman', 'PostgreSQL'],
    description: 'Architecting high-throughput microservices for enterprise e-commerce systems.',
    achievements: [
      'Optimized event streaming pipelines handling 10k+ events/sec using Apache Kafka',
      'Reduced microservice latency by 40% via Go concurrency patterns',
      'Implemented distributed tracing with OpenTelemetry & Prometheus',
      'Containerized legacy services using Docker & Podman'
    ]
  },
  {
    type: 'project',
    icon: Terminal,
    title: 'Full Stack Developer',
    company: 'Uni Event Hub',
    period: '2024 - 2025',
    location: 'Remote',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS'],
    description: 'Built a real-time campus event aggregation platform serving 5000+ students.',
    achievements: [
      'Designed a RESTful API supporting 1000+ concurrent users',
      'Implemented real-time notification engine using WebSockets',
      'Optimized MongoDB aggregation pipelines for complex data queries',
      'Deployed automated CI/CD pipelines via GitHub Actions'
    ]
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'B.E. Computer Science',
    company: 'Chandigarh University',
    period: '2022 - 2026',
    location: 'Punjab, India',
    tech: ['C++', 'Data Structures', 'Operating Systems', 'Networks'],
    description: 'Specializing in Distributed Systems and Advanced Algorithms.',
    achievements: [
      'CGPA: 8.5/10 (Current)',
      'Core focus on System Design & Scalability',
      'Lead Technical Member at Coding Club',
      'Published research paper on "Microservices vs Monoliths"'
    ]
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="experience" className="min-h-screen py-24 px-4 relative bg-transparent overflow-hidden">
      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-4 rounded-full bg-indigo-500/10 mb-6 border border-indigo-500/20"
          >
            <Cpu className="w-8 h-8 text-indigo-500" />
          </motion.div>
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Career <span className="text-gradient">Timeline</span>
          </motion.h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A chronological view of my technical evolution and milestones.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Line (Background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
          
          {/* Central Line (Progress - Animated) */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-1 md:-ml-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-teal-500 rounded-full origin-top"
            style={{ scaleY: scrollYProgress, bottom: 0 }}
          />

          <div className="space-y-12 md:space-y-24">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Node (Center Dot) */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 md:top-8 z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-slate-50 dark:bg-[#030014] border-4 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center"
                  >
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-indigo-500" />
                  </motion.div>
                </div>

                {/* Empty Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content Card */}
                <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <motion.div 
                    className="glass p-8 rounded-[2rem] border border-white/20 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-300 group relative overflow-hidden"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Decorative gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <div className="relative z-10">
                      {/* Card Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                              {item.title}
                            </h3>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                              {item.company}
                            </p>
                          </div>
                        </div>
                        <span className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-sm font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>

                      {/* Description & List */}
                      <div className="mb-6">
                        <p className="text-slate-700 dark:text-slate-300 text-lg mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        <ul className="space-y-3">
                          {item.achievements.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm md:text-base">
                              <span className="text-teal-500 mt-1.5 font-bold">▹</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200/50 dark:border-white/5">
                        {item.tech.map((t) => (
                          <span key={t} className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}