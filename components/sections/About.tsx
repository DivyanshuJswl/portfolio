// components/sections/About.tsx
"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Rocket, Award, Terminal, Zap, Coffee } from "lucide-react";
import Image from "next/image";

const highlights = [
  {
    icon: Code2,
    title: "Backend Specialist",
    description:
      "Expert in Go, building high-performance microservices with Apache Kafka for real-time event streaming",
  },
  {
    icon: Cpu,
    title: "System Architect",
    description:
      "Designing scalable distributed systems with Docker, Podman, and modern containerization practices",
  },
  {
    icon: Rocket,
    title: "Full-Stack Builder",
    description:
      "MERN stack enthusiast with production experience in building end-to-end applications",
  },
  {
    icon: Award,
    title: "Problem Solver",
    description:
      "Competitive programmer with strong foundation in C++ and algorithmic thinking",
  },
];

const stats = [
  { label: "Years Exp", value: "1+" },
  { label: "Projects", value: "10+" },
  { label: "Stack", value: "15+" },
  { label: "Commits", value: "1K+" },
];

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen py-24 px-4 relative bg-transparent flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* 1. Split Layout: Bio vs Mosaic */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left Column: Punchy Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white leading-tight">
              About <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-cyan-400">
                The Tinkerer
              </span>
            </h2>

            {/* One-Liners / Identity Tags */}
            <div className="space-y-5 mb-12">
              <div className="flex items-center gap-4 text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <span>
                  Backend engineer at{" "}
                  <strong className="text-slate-900 dark:text-white">
                    Zopsmart
                  </strong>
                  .
                </span>
              </div>

              <div className="flex items-center gap-4 text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium">
                <div className="p-2 bg-teal-100 dark:bg-teal-500/20 rounded-lg text-teal-600 dark:text-teal-400">
                  <Zap className="w-5 h-5" />
                </div>
                <span>Obsessed with concurrency & speed.</span>
              </div>

              <div className="flex items-center gap-4 text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium">
                <div className="p-2 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400">
                  <Coffee className="w-5 h-5" />
                </div>
                <span>Turning caffeine into clean Go code.</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: LARGE Image Mosaic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[700px] w-full hidden lg:block"
          >
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 to-teal-500/10 rounded-full blur-[100px] -z-10" />

            {/* Image 1: Main Portrait (Large & Vertical) */}
            <div className="absolute top-0 right-0 w-80 h-[500px] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-[#0B1120] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 z-10 hover:z-30">
              <Image
                src="https://res.cloudinary.com/dh5cebjwj/image/upload/v1769902633/IMG_20260105_123558_bvm3cc.jpg"
                alt="Divyanshu Profile"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 2: Work Mode (Wide & Bottom) */}
            <div className="absolute bottom-10 left-0 w-96 h-64 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-[#0B1120] shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-700 z-20 hover:z-30">
              <Image
                src="https://res.cloudinary.com/dh5cebjwj/image/upload/v1769901905/1745077103832_hd0jhb.jpg"
                alt="Coding Setup"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 3: Detail Shot (Floating) */}
            <div className="absolute top-32 left-10 w-60 h-48 rounded-[2rem] overflow-hidden border-4 border-white dark:border-[#0B1120] shadow-xl -rotate-12 hover:rotate-0 transition-transform duration-700 z-0 hover:z-30">
              <Image
                src="https://res.cloudinary.com/dh5cebjwj/image/upload/v1769901830/1747112493150_d0dyep.jpg"
                alt="Code Details"
                fill
                className="object-cover opacity-90"
              />
            </div>
          </motion.div>
        </div>

        {/* 2. Technical Highlights (Compact Grid) */}
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
      </div>
    </section>
  );
}
