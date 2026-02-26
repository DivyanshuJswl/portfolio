import { lazy, Suspense, memo } from 'react';
import ThemeProvider from '@/components/providers/ThemeProvider';
import Navigation from '@/components/ui/Navigation';
import Hero from '@/components/sections/Hero';

const About = lazy(() => import('@/components/sections/About'));
const Lab = lazy(() => import('@/components/sections/Lab'));
const Experience = lazy(() => import('@/components/sections/Experience'));
const Achievements = lazy(() => import('@/components/sections/Achievements'));
const Contact = lazy(() => import('@/components/sections/Contact'));
const ChatInterface = lazy(() => import('@/components/interactive/ChatInterface'));

function SectionLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-7 h-7 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
    </div>
  );
}

const FixedBackground = memo(function FixedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none transform-gpu">
      {/* 1. Deep Space Base */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#030014] transition-colors duration-500" />

      {/* 2. Blobs — GPU-accelerated via translate3d keyframes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 dark:opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob will-change-transform" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-400 dark:bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      </div>

      {/* 3. Noise Overlay */}
      <div className="bg-noise" />

      {/* 4. Radial Vignette — light mode */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(248,250,252,0.85) 100%)" }}
      />
      {/* 4. Radial Vignette — dark mode */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(3,0,20,0.92) 100%)" }}
      />
    </div>
  );
})

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
      <div className="relative min-h-screen">
        <main className="relative w-full">
          <FixedBackground />

          {/* All sections are transparent so the nebula shows through */}
          <div className="relative z-10">
            <Hero />
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Lab />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Achievements />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </div>

          <Suspense fallback={null}>
            <ChatInterface />
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  );
}
