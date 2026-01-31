// components/sections/Contact.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/divyanshujswl" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/divyanshujswl",
  },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/divyanshu" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-4 flex items-center bg-transparent relative"
    >
      <motion.div
        className="max-w-5xl mx-auto w-full glass rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 relative overflow-hidden border border-white/20 dark:border-white/5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Decorative Gradient inside card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
          {/* Left Side: Info */}
          <div>
            <motion.h2
              // FIX: Responsive text size (text-3xl on mobile)
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Let&apos;s build the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-cyan-400">
                Next Big Thing
              </span>
            </motion.h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              I&apos;m actively looking for opportunities to apply my skills in
              distributed systems and backend engineering.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:divyanshu.jaiswal@example.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-all border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/30 group w-full"
              >
                {/* Icon Container - flex-shrink-0 prevents it from being squashed */}
                <div className="flex-shrink-0 p-3 bg-white dark:bg-indigo-500/20 rounded-xl shadow-sm text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>

                {/* Text Container - min-w-0 is CRITICAL for flex children to wrap correctly */}
                <div className="min-w-0">
                  <div className="text-sm text-slate-500 font-medium">
                    Email Me
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white break-all sm:break-normal text-sm sm:text-base">
                    mail@divyanshujswl.in
                  </div>
                </div>
              </a>
            </div>

            {/* Social Links */}
            {/* FIX: Added flex-wrap to prevent overflow if more icons are added */}
            <div className="mt-8 md:mt-12 flex flex-wrap gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:text-indigo-500 hover:-translate-y-1 transition-all shadow-sm"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Your Name
              </label>
              <input
                type="text"
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400"
                placeholder="What do you think about AI space..?"
              />
            </div>
            <button className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
