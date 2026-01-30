// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/providers/ThemeProvider';
import Navigation from '@/components/ui/Navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import CursorFollower from '@/components/interactive/CursorFollower';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Divyanshu Jaiswal | Backend Engineer & System Architect',
  description: 'SDE Intern at Zopsmart specializing in Go, Kafka, Docker, and microservices architecture. Building scalable backend systems.',
  keywords: ['Divyanshu Jaiswal', 'Backend Engineer', 'Go Developer', 'Kafka', 'Docker', 'Microservices'],
  authors: [{ name: 'Divyanshu Jaiswal' }],
  openGraph: {
    title: 'Divyanshu Jaiswal | Backend Engineer',
    description: 'Building scalable microservices with Go, Kafka & Docker',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-black text-white`}>
        <ThemeProvider>
          <CursorFollower />
          <Navigation />
          <ThemeToggle />
          <div className="relative">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
