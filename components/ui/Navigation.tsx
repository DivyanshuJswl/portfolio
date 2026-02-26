
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, User, Briefcase, Mail, Cpu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#", icon: Code2 },
  { name: "About", href: "#about", icon: User },
  { name: "Lab", href: "#lab", icon: Cpu },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    // Persists across scroll events without causing re-renders
    let lastActive = "Home";

    const handleScroll = () => {
      // 1. Determine Scrolled State
      setScrolled(window.scrollY > 20);

      // 2. Short-circuit at the very top
      if (window.scrollY < 100) {
        lastActive = "Home";
        setActiveSection("Home");
        return;
      }

      // 3. Determine Active Section from nav items only
      const sections = navItems
        .map((item) => item.href.substring(1))
        .filter((id) => id.length > 0);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            lastActive =
              navItems.find((item) => item.href === `#${section}`)?.name || lastActive;
            break;
          }
        }
      }

      // If no section matched (e.g. while scrolling through Achievements),
      // keep lastActive so the nav doesn't jump back to Home.
      setActiveSection(lastActive);
    };

    // Run immediately on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        // Fix: Use generic initial/animate to prevent layout thrashing
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* 1. Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" onClick={() => setActiveSection("Home")} className="relative group z-50">
              <span className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-cyan-400">
                DivyanshuJ
                <span className="text-slate-900 dark:text-white">.</span>
              </span>
            </a>
          </div>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md shadow-sm">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    // Smooth scroll handling
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      const element = document.getElementById(item.href.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      } else if (item.href === "#") {
                         window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setActiveSection(item.name);
                    }
                  }}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.name
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {activeSection === item.name && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* 3. Right Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile Toggle */}
            <button
              className="md:hidden relative z-50 p-2 text-slate-900 dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  className={`flex items-center gap-4 text-2xl font-medium ${
                    activeSection === item.name 
                    ? "text-indigo-600 dark:text-indigo-400" 
                    : "text-slate-900 dark:text-white"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}