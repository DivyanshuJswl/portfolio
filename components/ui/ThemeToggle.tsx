// components/ui/ThemeToggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={`w-[46px] h-[46px] ${className}`} />;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const toggleTheme = () =>
    setTheme(currentTheme === "dark" ? "light" : "dark");

  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2.5 rounded-full 
                 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md 
                 border border-slate-200 dark:border-slate-800 
                 text-slate-600 dark:text-slate-300
                 hover:border-indigo-500 dark:hover:border-indigo-400 
                 hover:text-indigo-600 dark:hover:text-indigo-400
                 shadow-sm transition-all duration-300 flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.05, rotate: 15 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: currentTheme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {currentTheme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}
