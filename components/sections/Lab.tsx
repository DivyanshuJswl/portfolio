// components/sections/Lab.tsx
"use client";

import { motion } from "framer-motion";
import {
  Database,
  Server,
  Zap,
  Globe,
  GitBranch,
  ArrowUpRight,
  Lock,
  Activity,
  Layers,
  Terminal,
} from "lucide-react";

const projects = [
  {
    title: "Zopsmart Microservices",
    category: "Enterprise Architecture",
    description:
      "High-throughput e-commerce backend handling millions of events daily.",
    challenge: "Handling burst traffic during flash sales without data loss.",
    solution:
      "Implemented Kafka buffering and optimistic locking for inventory.",
    stack: ["Go", "Kafka", "Docker", "K8s"],
    stats: [
      { label: "Events/sec", value: "10K+" },
      { label: "Latency", value: "<50ms" },
    ],
    links: { github: null, live: null },
    featured: true,
    icon: Server,
  },
  {
    title: "Uni Event Hub",
    category: "Full Stack Platform",
    description:
      "Real-time event aggregation platform connecting 500+ students.",
    challenge: "Real-time updates for thousands of concurrent users.",
    solution: "Built a custom WebSocket engine with room-based partitioning.",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    stats: [
      { label: "Users", value: "500+" },
      { label: "Uptime", value: "99.8%" },
    ],
    links: {
      github: "https://github.com/divyanshujswl/uni-event-hub-frontend",
      live: "https://uni-event.shop",
    },
    featured: true,
    icon: Globe,
  },
  {
    title: 'VisionCare',
    category: 'Healthcare Platform',
    description: 'Transforming lives through exceptional eye care with cutting-edge technology and compassionate service.',
    challenge: 'Securely managing sensitive patient records and appointment scheduling.',
    solution: 'Implemented role-based access control (RBAC) and encrypted data storage.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    stats: [
      { label: 'Patients', value: '200+' },
      { label: 'Service', value: '24/7' },
    ],
    links: { github: 'https://github.com/divyanshujswl/eyecare', live: 'https://visioncare.divyanshujswl.in' },
    featured: false,
    icon: Activity
  },
  {
    title: 'Property AI',
    category: 'Tech AI',
    description: 'Get instant, AI-powered property valuations with detailed market insights.',
    challenge: 'Providing accurate real-time valuation based on sparse data points.',
    solution: 'Integrated predictive ML models with location-based market analysis.',
    stack: ['React', 'Node.js', 'MongoDB', 'AI'],
    stats: [
      { label: 'Accuracy', value: '95%' },
      { label: 'Listings', value: '500+' },
    ],
    links: { github: 'https://github.com/DivyanshuJswl/real-estate-frontend', live: 'https://propertyai.divyanshujswl.in/' },
    featured: false,
    icon: Layers
  },
  {
    title: 'Wanderlust AI',
    category: 'AI Travel Agent',
    description: 'Your personal trip planner creating custom itineraries tailored to your interests.',
    challenge: 'Generating coherent, multi-day itineraries instantly.',
    solution: 'Leveraged GenAI with structured prompting for logistic optimization.',
    stack: ['React', 'OAuth', 'Node.js', 'OpenAI'],
    stats: [
      { label: 'Plans', value: '1K+' },
      { label: 'Speed', value: '<5s' },
    ],
    links: { github: 'https://github.com/DivyanshuJswl/AI-travel', live: 'https://travelai.divyanshujswl.in/' },
    featured: false,
    icon: Zap
  },
];

export default function Lab() {
  return (
    <section
      id="lab"
      className="min-h-screen py-24 px-4 bg-transparent relative"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-4 rounded-full bg-teal-500/10 mb-6 border border-teal-500/20"
          >
            <Layers className="w-8 h-8 text-teal-500" />
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            The{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-cyan-400">
              Lab
            </span>
          </motion.h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Deep dives into distributed systems, high-performance tooling, and
            full-stack architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className={`group glass rounded-[2rem] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-white/20 dark:border-white/5 flex flex-col ${
                project.featured
                  ? "lg:col-span-3 min-h-[400px]"
                  : "lg:col-span-2 min-h-[350px]"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="p-8 flex-1 flex flex-col h-full">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl ${project.featured ? "bg-indigo-500/10 text-indigo-500" : "bg-slate-100 dark:bg-white/5 text-slate-500"}`}
                    >
                      <project.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-100 dark:bg-white/10 rounded-full hover:bg-indigo-500 hover:text-white transition-colors"
                      >
                        <GitBranch className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-100 dark:bg-white/10 rounded-full hover:bg-indigo-500 hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Challenge/Solution - Only on hover or featured */}
                <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-red-400 uppercase">
                      Challenge:{" "}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {project.challenge}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-green-400 uppercase">
                      Solution:{" "}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {project.solution}
                    </span>
                  </div>
                </div>

                <div className="mt-auto">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats Footer */}
                  <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                    {project.featured && (
                      <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded-full">
                        <Activity className="w-3 h-3" /> Live
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
