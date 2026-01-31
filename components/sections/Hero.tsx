// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Scene from '@/components/3d/Scene';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black">
      
      {/* Background Orbs - Kept strictly in the background for atmosphere */}
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

      {/* MAIN LAYOUT GRID */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT COLUMN: ROBOT (First Half) */}
        {/* On mobile: h-[50vh]. On Desktop: h-auto (full height) */}
        <div className="relative w-full h-[50vh] lg:h-full order-1 lg:order-1 min-h-[400px]">
           {/* The Scene now lives inside this container */}
           <Scene section="hero" />
        </div>

        {/* RIGHT COLUMN: TEXT (Second Half) */}
        <div className="relative w-full h-[50vh] lg:h-full order-2 lg:order-2 flex flex-col justify-center items-center lg:items-start px-6 lg:px-12 xl:px-20 text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <motion.h2 
              className="text-sm md:text-base text-cyan-400 font-mono mb-4 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              System Architect & Developer
            </motion.h2>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
              style={{
                textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Divyanshu <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Jaiswal
              </span>
            </motion.h1>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Building scalable microservices and robust backends. 
              Currently optimizing data streams at <span className="font-semibold text-white">Zopsmart</span> with <span className="text-cyan-300">Go</span>, <span className="text-purple-300">Kafka</span>, and <span className="text-blue-300">Docker</span>.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="#lab"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25 min-w-[160px]"
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

      {/* Scroll Indicator - Absolute to the bottom of the whole screen */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-6 h-6 text-gray-500" />
      </motion.div>
    </section>
  );
}