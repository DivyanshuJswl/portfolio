// components/sections/Experience.tsx
'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code } from 'lucide-react';

const timeline = [
  {
    type: 'work',
    icon: Briefcase,
    title: 'SDE 1 Intern',
    company: 'Zopsmart Technology Pvt Ltd',
    period: '2025 - Present',
    location: 'Bengaluru, India',
    description: 'Building high-performance backend microservices using Go, Apache Kafka, and Docker',
    achievements: [
      'Architected event-driven systems processing 10K+ events/sec with Kafka',
      'Reduced API response time by 40% through optimized Go concurrency patterns',
      'Implemented distributed tracing and monitoring with Prometheus',
      'Containerized services using Docker and Podman for seamless deployment',
    ],
    tech: ['Go', 'Kafka', 'Docker', 'Podman', 'PostgreSQL', 'Redis'],
  },
  {
    type: 'project',
    icon: Code,
    title: 'Full Stack Developer',
    company: 'Uni Event Hub',
    period: '2024 - 2025',
    location: 'Personal Project',
    description: 'Event aggregation platform connecting students with campus activities',
    achievements: [
      'Built RESTful APIs with Node.js/Express serving 5000+ active users',
      'Implemented real-time notifications using Socket.io',
      'Designed responsive UI with React and Material-UI',
      'Integrated MongoDB for efficient event data management',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'B.E. Computer Science & Engineering',
    company: 'Chandigarh University',
    period: '2022 - 2026',
    location: 'Punjab, India',
    description: 'Specializing in distributed systems, algorithms, and backend development',
    achievements: [
      'CGPA: 8.5/10',
      'Core: Data Structures, Algorithms, DBMS, Operating Systems',
      'Published research on microservices optimization',
      'Led technical workshops on Docker and Kubernetes',
    ],
    tech: ['C++', 'Python', 'System Design', 'Algorithms'],
  },
];
export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 px-4 relative transition-colors duration-300 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-black dark:via-[#0B1120] dark:to-slate-950 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>
            <motion.div
        className="max-w-5xl mx-auto"
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
          My <span className="text-gradient">Journey</span>
        </motion.h2>

        <motion.p
          className="text-xl text-slate-600 dark:text-slate-400 text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          From classroom to production systems
        </motion.p>

        <div className="relative">
          {/* Timeline line - Indigo to Teal Gradient */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-blue-500 to-teal-500" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Icon */}
                <div className="absolute left-4 top-0 p-2 bg-indigo-600 dark:bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/30">
                  <item.icon className="w-6 h-6 text-white" />
                </div>

                <motion.div
                  className="glass p-6 rounded-xl hover:glow transition-all duration-300 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        {item.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {item.period}
                      </p>
                      <p className="text-slate-500 dark:text-slate-500 text-sm">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {item.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {item.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"
                      >
                        <span className="text-indigo-500 dark:text-indigo-400 mt-1">
                          ▹
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/30 rounded-full text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}