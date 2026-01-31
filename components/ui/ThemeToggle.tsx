// components/ui/ThemeToggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch by rendering nothing initially

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const toggleTheme = () => setTheme(currentTheme === 'dark' ? 'light' : 'dark');

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-24 right-6 md:top-6 md:right-6 z-40 p-3 rounded-full 
                 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md 
                 border border-slate-200 dark:border-slate-800 
                 text-slate-600 dark:text-slate-300
                 hover:border-indigo-500 dark:hover:border-indigo-400 
                 hover:text-indigo-600 dark:hover:text-indigo-400
                 shadow-sm transition-all duration-300"
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: currentTheme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {currentTheme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}