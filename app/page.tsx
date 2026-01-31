// app/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Components
import Hero from '@/components/sections/Hero';
const About = dynamic(() => import('@/components/sections/About'), { loading: () => <div className="h-screen" /> });
const Experience = dynamic(() => import('@/components/sections/Experience'), { loading: () => <div className="h-screen" /> });
const Lab = dynamic(() => import('@/components/sections/Lab'), { loading: () => <div className="h-screen" /> });
const Contact = dynamic(() => import('@/components/sections/Contact'), { loading: () => <div className="h-screen" /> });
const ChatInterface = dynamic(() => import('@/components/interactive/ChatInterface'), { ssr: false });

function FixedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* 1. Deep Space Base */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#030014] transition-colors duration-500" />

      {/* 2. Moving Fluid Blobs - The "Lava Lamp" Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden filter blur-[100px] opacity-60 dark:opacity-40">
        {/* Blob 1: Purple/Indigo (Top Left) */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        
        {/* Blob 2: Cyan/Teal (Top Right) */}
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-400 dark:bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        
        {/* Blob 3: Pink/Blue (Bottom Left) */}
        <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] bg-pink-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        
        {/* Blob 4: Interactive Accent (Bottom Right) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-blue-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      </div>

      {/* 3. Noise Overlay - Adds Texture/Grain */}
      <div className="bg-noise" />

      {/* 4. Radial Vignette - Focuses attention to center */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-50/80 dark:to-[#030014]/90" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative w-full">
        <FixedBackground />
        
        {/* All sections are transparent so the nebula shows through */}
        <div className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Lab />
          <Contact />
        </div>
        
        <ChatInterface />
    </main>
  );
}