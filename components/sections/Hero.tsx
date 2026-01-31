// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Terminal, Globe, Cpu, Server } from 'lucide-react';
import Scene from '@/components/3d/Scene';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function Hero() {
  return (
    // FIX: Explicitly defined backgrounds for both Light and Dark modes.
    // Light: Slate-50 to White gradient (Clean, minimal)
    // Dark: Slate-950 to Black gradient (Deep, professional)
    <section className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-300
      bg-gradient-to-b from-slate-50 via-white to-slate-100 
      dark:from-slate-950 dark:via-[#0B1120] dark:to-black">
      
      {/* ATMOSPHERE: Updated to Indigo/Teal for a "Tech" feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]
            bg-indigo-500/10 dark:bg-indigo-500/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]
            bg-teal-500/10 dark:bg-teal-500/10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2">
        
        {/* LEFT COLUMN: ROBOT */}
        <div className="relative w-full h-[450px] lg:h-full order-1 lg:order-1 flex items-center justify-center">
           <div className="w-full h-full relative">
              <Scene section="hero" />
           </div>
        </div>

        {/* RIGHT COLUMN: TEXT */}
        <div className="relative z-20 w-full h-auto lg:h-full order-2 lg:order-2 flex flex-col justify-center items-center lg:items-start px-6 py-12 lg:py-0 lg:px-12 xl:px-20 text-center lg:text-left">
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-2xl"
          >
            {/* "Open to Work" Badge - Professional Style */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border backdrop-blur-sm
                bg-white/50 border-slate-200 text-slate-600
                dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs md:text-sm font-mono tracking-wider font-medium">
                AVAILABLE FOR HIRE
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white"
            >
              Divyanshu <br className="hidden lg:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r 
                from-indigo-600 to-teal-500
                dark:from-indigo-400 dark:to-cyan-400">
                Jaiswal
              </span>
            </motion.h1>
            
            {/* Roles */}
            <motion.div
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl mb-6 font-light flex flex-wrap justify-center lg:justify-start gap-3 items-center
                text-slate-600 dark:text-slate-300"
            >
              <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-medium">Backend Engineer</span>
              <span className="text-slate-400 hidden sm:inline">|</span>
              <span>System Architect</span>
            </motion.div>
            
            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0
                text-slate-600 dark:text-slate-400"
            >
              Building scalable microservices and high-throughput systems. 
              Currently optimizing data streams at <span className="font-semibold text-slate-900 dark:text-white">Zopsmart</span> with <span className="text-indigo-600 dark:text-cyan-300">Go</span>, <span className="text-indigo-600 dark:text-indigo-300">Kafka</span>, and <span className="text-indigo-600 dark:text-blue-300">Docker</span>.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <a
                href="#lab"
                className="px-8 py-3.5 rounded-lg font-semibold shadow-lg transition-all duration-300 min-w-[160px] transform hover:-translate-y-0.5
                  bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20
                  dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-500 dark:shadow-indigo-500/25"
              >
                View Projects
              </a>
              <button 
                onClick={() => {
                  const event = new CustomEvent('toggleChat');
                  window.dispatchEvent(event);
                }}
                className="px-8 py-3.5 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm min-w-[160px] border
                  bg-white/50 border-slate-200 text-slate-700 hover:bg-white hover:border-indigo-300
                  dark:bg-white/5 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:border-indigo-400"
              >
                Chat with AI
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
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