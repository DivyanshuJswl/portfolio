// app/page.tsx
"use client";

import dynamic from "next/dynamic";

// Components
import Hero from "@/components/sections/Hero";
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <div className="h-screen" />,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  loading: () => <div className="h-screen" />,
});
const Lab = dynamic(() => import("@/components/sections/Lab"), {
  loading: () => <div className="h-screen" />,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="h-screen" />,
});
const Achievements = dynamic(
  () => import("@/components/sections/Achievements"),
  {
    loading: () => <div className="h-screen" />,
  },
);
const ChatInterface = dynamic(
  () => import("@/components/interactive/ChatInterface"),
  { ssr: false },
);

function FixedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none transform-gpu">
      {/* 1. Deep Space Base */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#030014] transition-colors duration-500" />

      {/* 2. OPTIMIZED: Fewer blobs, reduced blur radius for performance */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 dark:opacity-30">
        {/* Blob 1: Primary (Top Left) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob will-change-transform" />

        {/* Blob 2: Secondary (Bottom Right) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-400 dark:bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />

        {/* Removed 3rd and 4th blobs to reduce paint operations */}
      </div>

      {/* 3. Noise Overlay */}
      <div className="bg-noise" />

      {/* 4. Radial Vignette */}
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
        <Lab />
        <Experience />
        <Achievements />
        <Contact />
      </div>

      <ChatInterface />
    </main>
  );
}
