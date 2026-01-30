// Alternative Hero.tsx - Simpler version with solid colors
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Scene from '@/components/3d/Scene';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.5, 0.25],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-5">
        <Scene section="hero" />
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
      
      {/* Content */}
      <div className="relative text-center px-4 max-w-6xl mx-auto z-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Simple solid white name with gradient text-shadow */}
          <motion.h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6"
            style={{
              color: 'white',
              textShadow: '0 0 40px rgba(168, 85, 247, 0.8), 0 0 80px rgba(59, 130, 246, 0.6), 0 4px 20px rgba(0,0,0,0.8)'
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            Divyanshu Jaiswal
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-4 font-semibold"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Backend Engineer × System Architect
          </motion.p>
          
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.7)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Building scalable microservices with{' '}
            <span className="text-cyan-300 font-semibold">Go</span>,{' '}
            <span className="text-purple-300 font-semibold">Kafka</span> &{' '}
            <span className="text-blue-300 font-semibold">Docker</span> at{' '}
            <span className="text-blue-200 font-bold">Zopsmart</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <a
              href="#lab"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-white shadow-xl"
            >
              View My Work
            </a>
            <button 
              onClick={() => {
                const event = new CustomEvent('toggleChat');
                window.dispatchEvent(event);
              }}
              className="px-8 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 hover:border-purple-400 transition-all duration-300 text-white shadow-xl"
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
          <ArrowDown className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </section>
  );
}
