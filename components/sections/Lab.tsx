// components/sections/Lab.tsx
"use client";

import { motion } from "framer-motion";
import {
  Server,
  Zap,
  Globe,
  GitBranch,
  ArrowUpRight,
  Activity,
  Layers,
} from "lucide-react";
import Image from "next/image";

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
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
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
    image:
      "https://res.cloudinary.com/dh5cebjwj/image/upload/v1769904970/Screenshot_2026-02-01_at_5.45.48_AM_yfk7k5.png",
  },
  {
    title: "VisionCare",
    category: "Healthcare Platform",
    description:
      "Transforming lives through exceptional eye care with cutting-edge technology.",
    challenge:
      "Securely managing sensitive patient records and appointment scheduling.",
    solution:
      "Implemented role-based access control (RBAC) and encrypted data storage.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    stats: [
      { label: "Patients", value: "200+" },
      { label: "Service", value: "24/7" },
    ],
    links: {
      github: "https://github.com/divyanshujswl/eyecare",
      live: "https://visioncare.divyanshujswl.in",
    },
    featured: false,
    icon: Activity,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Property AI",
    category: "Tech AI",
    description:
      "Get instant, AI-powered property valuations with detailed market insights.",
    challenge:
      "Providing accurate real-time valuation based on sparse data points.",
    solution:
      "Integrated predictive ML models with location-based market analysis.",
    stack: ["React", "Node.js", "MongoDB", "AI"],
    stats: [
      { label: "Accuracy", value: "95%" },
      { label: "Listings", value: "500+" },
    ],
    links: {
      github: "https://github.com/DivyanshuJswl/real-estate-frontend",
      live: "https://propertyai.divyanshujswl.in/",
    },
    featured: false,
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
  },
  {
    title: "Wanderlust AI",
    category: "AI Travel Agent",
    description:
      "Your personal trip planner creating custom itineraries tailored to your interests.",
    challenge: "Generating coherent, multi-day itineraries instantly.",
    solution:
      "Leveraged GenAI with structured prompting for logistic optimization.",
    stack: ["React", "OAuth", "Node.js", "OpenAI"],
    stats: [
      { label: "Plans", value: "1K+" },
      { label: "Speed", value: "<5s" },
    ],
    links: {
      github: "https://github.com/DivyanshuJswl/AI-travel",
      live: "https://travelai.divyanshujswl.in/",
    },
    featured: false,
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
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
              className={`group glass rounded-[2rem] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-white/20 dark:border-white/5 flex flex-col overflow-hidden ${
                project.featured
                  ? "lg:col-span-3 min-h-[500px]"
                  : "lg:col-span-2 min-h-[450px]"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* 1. Project Image Area */}
              <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B1120] to-transparent opacity-80" />

                {/* Floating Icon */}
                <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10 text-indigo-600 dark:text-indigo-400 shadow-lg">
                  <project.icon className="w-5 h-5" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 pt-2 flex-1 flex flex-col h-full relative">
                {/* Header with Links */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mt-1">
                    {project.category}
                  </span>

                  {/* 2. Link Buttons with Text Tooltips */}
                  <div className="flex gap-3">
                    {project.links.github && (
                      <div className="flex flex-col items-center group/btn relative">
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-100 dark:bg-white/10 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        >
                          <GitBranch className="w-4 h-4" />
                        </a>
                        <span className="absolute top-full mt-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                          Source
                        </span>
                      </div>
                    )}
                    {project.links.live && (
                      <div className="flex flex-col items-center group/btn relative">
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-100 dark:bg-white/10 rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <span className="absolute top-full mt-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                          Live
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Challenge/Solution - Hover Reveal */}
                <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs">
                  <div className="mb-2">
                    <span className="font-bold text-red-400 uppercase">
                      Challenge:{" "}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {project.challenge}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-green-400 uppercase">
                      Solution:{" "}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
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
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats Footer */}
                  <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-base font-bold text-slate-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                    {project.featured && (
                      <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                        <Activity className="w-3 h-3" />
                        <span>DEPLOYED</span>
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
