// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Scene from '@/components/3d/Scene';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black dark:bg-black">
      <Scene section="hero" />
      
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            Divyanshu Jaiswal
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-200 dark:text-gray-200 mb-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Backend Engineer × System Architect
          </motion.p>
          
          <motion.p
            className="text-base md:text-lg text-gray-300 dark:text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Building scalable microservices with Go, Kafka & Docker at{' '}
            <span className="text-blue-400 dark:text-blue-400 font-semibold">Zopsmart</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <a
              href="#lab"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-white"
            >
              View My Work
            </a>
            <button 
              onClick={() => {
                const event = new CustomEvent('toggleChat');
                window.dispatchEvent(event);
              }}
              className="px-8 py-3 border-2 border-gray-500 dark:border-gray-500 rounded-full font-semibold hover:border-purple-500 hover:text-purple-400 dark:hover:text-purple-400 transition-all duration-300 text-white dark:text-white"
            >
              Chat with AI Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-8 h-8 text-gray-300 dark:text-gray-300" />
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black dark:from-black/40 dark:via-black/60 dark:to-black pointer-events-none z-10" />
    </section>
  );
}
