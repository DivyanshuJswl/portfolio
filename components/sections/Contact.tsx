
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/DivyanshuJswl" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/divyanshujswl" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/divyanshu" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(resetTimerRef.current), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const object = {
      ...formData,
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      subject: "New Portfolio Message from " + formData.name,
    };

    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      if (!res.ok) throw new Error('HTTP ' + res.status);
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Reset success message after 5 seconds
        resetTimerRef.current = setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-4 flex items-center bg-transparent relative"
    >
      <motion.div
        className="max-w-5xl mx-auto w-full glass rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 relative overflow-hidden border border-white/20 dark:border-white/5 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {/* Decorative Gradient inside card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
          {/* Left Side: Info */}
          <div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
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
                href="mailto:mail@divyanshujswl.in"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-all border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/30 group w-full"
              >
                <div className="flex-shrink-0 p-3 bg-white dark:bg-indigo-500/20 rounded-xl shadow-sm text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>

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

            <div className="mt-8 md:mt-12 flex flex-wrap gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:text-indigo-500 hover:-translate-y-1 transition-all shadow-sm text-slate-600 dark:text-slate-400"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot for spam protection */}
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                name="message"
                autoComplete="off"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
                placeholder="What do you think about AI space..?"
              />
            </div>

            <button
              disabled={status === "submitting"}
              className={`w-full py-4 mt-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                status === "success"
                  ? "bg-emerald-500 text-white cursor-default"
                  : status === "error"
                  ? "bg-red-500 text-white"
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02]"
              }`}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Message Sent!
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle className="w-5 h-5" /> Try Again
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}