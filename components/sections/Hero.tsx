// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Terminal, Server } from 'lucide-react';
import Scene from '@/components/3d/Scene';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-transparent">
      
      {/* Layout */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2">
        {/* Left: Robot */}
        <div className="relative w-full h-[450px] lg:h-full order-1 lg:order-1 flex items-center justify-center">
           <div className="w-full h-full relative">
              <Scene section="hero" />
           </div>
        </div>

        {/* Right: Text */}
        <div className="relative z-20 w-full h-auto lg:h-full order-2 lg:order-2 flex flex-col justify-center items-center lg:items-start px-6 py-12 lg:py-0 lg:px-12 xl:px-20 text-center lg:text-left">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-2xl"
          >
            {/* Status Badge - Glass Style */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border backdrop-blur-md bg-white/30 border-white/20 dark:bg-slate-800/30 dark:border-white/10 shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs md:text-sm font-mono tracking-wider font-semibold text-slate-700 dark:text-slate-200">
                AVAILABLE FOR HIRE
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white"
            >
              Divyanshu <br className="hidden lg:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-cyan-400">
                Jaiswal
              </span>
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl mb-8 font-light flex flex-wrap justify-center lg:justify-start gap-3 items-center text-slate-700 dark:text-slate-300"
            >
              <Server className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span className="font-medium">Backend Engineer</span>
              <span className="text-slate-400 hidden sm:inline">|</span>
              <span>System Architect</span>
            </motion.div>
            
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 text-slate-600 dark:text-slate-400"
            >
              Building scalable microservices and high-throughput systems. 
              Currently optimizing data streams at <span className="font-semibold text-slate-900 dark:text-white">Zopsmart</span> with <span className="text-indigo-600 dark:text-cyan-300">Go</span>, <span className="text-indigo-600 dark:text-indigo-300">Kafka</span>, and <span className="text-indigo-600 dark:text-blue-300">Docker</span>.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <a
                href="#lab"
                className="px-8 py-4 rounded-xl font-bold shadow-xl transition-all duration-300 min-w-[160px] transform hover:-translate-y-1 bg-slate-900 text-white hover:bg-slate-800 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-blue-600 dark:hover:shadow-indigo-500/25"
              >
                View Projects
              </a>
              <button 
                onClick={() => {
                  const event = new CustomEvent('toggleChat');
                  window.dispatchEvent(event);
                }}
                className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-md min-w-[160px] border bg-white/40 border-white/40 text-slate-800 hover:bg-white hover:border-white dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Chat with AI
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-slate-400 dark:text-slate-600" />
      </motion.div>
    </section>
  );
}