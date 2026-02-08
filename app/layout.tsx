// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Navigation from "@/components/ui/Navigation";
import { Suspense } from "react";
import Loading from "@/components/ui/Loading";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Divyanshu Jaiswal | Backend Engineer & System Architect",
  description:
    "SDE Intern at Zopsmart specializing in Go, Kafka, Docker, and microservices architecture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Suspense fallback={<Loading />}>
            <Navigation />
            <div className="relative min-h-screen">{children}</div>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
