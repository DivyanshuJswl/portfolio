// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Terminal, Globe, Cpu } from 'lucide-react';
import Scene from '@/components/3d/Scene';

// Define animations outside component to prevent re-creation on render
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
    <section className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2">
        
        {/* LEFT COLUMN: ROBOT */}
        <div className="relative w-full h-[450px] lg:h-full order-1 lg:order-1 flex items-center justify-center">
           <div className="w-full h-full relative">
              <Scene section="hero" />
           </div>
        </div>

        {/* RIGHT COLUMN: TEXT */}
        {/* Added z-20 to ensure text layer stays above any canvas glitches */}
        <div className="relative z-20 w-full h-auto lg:h-full order-2 lg:order-2 flex flex-col justify-center items-center lg:items-start px-6 py-12 lg:py-0 lg:px-12 xl:px-20 text-center lg:text-left">
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible" // FIX: Triggers animation reliably on load
            viewport={{ once: true, amount: 0.1 }} // Ensures it runs once and stays
            className="max-w-2xl"
          >
            {/* "Open to Work" Badge */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs md:text-sm text-gray-300 font-mono tracking-wider">
                OPEN TO WORK
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
              style={{
                textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
              }}
            >
              Divyanshu <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Jaiswal
              </span>
            </motion.h1>
            
            {/* Roles */}
            <motion.div
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 font-light flex flex-wrap justify-center lg:justify-start gap-3 items-center"
            >
              <Terminal className="w-5 h-5 text-purple-400" />
              <span>Backend Engineer</span>
              <span className="text-gray-600 hidden sm:inline">×</span>
              <span>System Architect</span>
            </motion.div>
            
            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Building scalable microservices and robust backends. 
              Currently optimizing data streams at <span className="font-semibold text-white">Zopsmart</span> with <span className="text-cyan-300">Go</span>, <span className="text-purple-300">Kafka</span>, and <span className="text-blue-300">Docker</span>.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <a
                href="#lab"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-purple-500/30 transition-all duration-300 min-w-[160px]"
              >
                View Projects
              </a>
              <button 
                onClick={() => {
                  const event = new CustomEvent('toggleChat');
                  window.dispatchEvent(event);
                }}
                className="px-8 py-3 border border-gray-600 hover:border-purple-400 text-gray-300 hover:text-white rounded-lg font-medium transition-all duration-300 backdrop-blur-sm min-w-[160px]"
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
        <ArrowDown className="w-6 h-6 text-gray-500" />
      </motion.div>
    </section>
  );
}