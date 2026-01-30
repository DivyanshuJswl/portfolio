// // app/page.tsx
// import Hero from '@/components/sections/Hero';
// import About from '@/components/sections/About';
// import Experience from '@/components/sections/Experience';
// import Lab from '@/components/sections/Lab';
// import Contact from '@/components/sections/Contact';
// import ChatInterface from '@/components/interactive/ChatInterface';

// export default function Home() {
//   return (
//     <main className="relative">
//       <Hero />
//       <About />
//       <Experience />
//       <Lab />
//       <Contact />
//       <ChatInterface />
//     </main>
//   );
// }

// app/page.tsx
import dynamic from 'next/dynamic';
import Loading from '@/components/ui/Loading';

import Hero from '@/components/sections/Hero';
// Lazy load sections below the fold
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <Loading />,
});
const Experience = dynamic(() => import('@/components/sections/Experience'), {
  loading: () => <Loading />,
});
const Lab = dynamic(() => import('@/components/sections/Lab'), {
  loading: () => <Loading />,
});
const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <Loading />,
});
const ChatInterface = dynamic(() => import('@/components/interactive/ChatInterface'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Lab />
        <Contact />
        <ChatInterface />
    </main>
  );
}
