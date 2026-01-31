// components/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MapPin, Phone, Send, Download } from 'lucide-react';
import MagneticButton from '@/components/interactive/MagneticButton';
import { useState } from 'react';

const socials = [
  { 
    icon: Github, 
    label: 'GitHub', 
    url: 'https://github.com/divyanshujswl', 
    color: 'hover:text-slate-600 dark:hover:text-slate-400',
    username: '@divyanshujswl'
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    url: 'https://linkedin.com/in/divyanshujswl', 
    color: 'hover:text-blue-500 dark:hover:text-blue-400',
    username: 'divyanshujswl'
  },
  { 
    icon: Twitter, 
    label: 'Twitter', 
    url: 'https://twitter.com/divyanshu', 
    color: 'hover:text-sky-500 dark:hover:text-sky-400',
    username: '@divyanshu'
  },
  { 
    icon: Mail, 
    label: 'Email', 
    url: 'mailto:mail@divyanshujswl.in', 
    color: 'hover:text-indigo-500 dark:hover:text-indigo-400',
    username: 'mail@divyanshujswl.in'
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center transition-colors duration-300 bg-gradient-to-b from-slate-50 to-white dark:bg-black dark:from-black dark:to-black">
      {/* Background effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl -z-10" />

      <motion.div
        className="max-w-6xl mx-auto w-full relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Open to exciting opportunities starting mid-2026. Let's build something amazing together!
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <motion.div 
                className="flex items-center gap-4 text-slate-700 dark:text-slate-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 transition-colors">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Location</p>
                  <p className="font-semibold">Bengaluru, Karnataka, India</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 text-slate-700 dark:text-slate-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 transition-colors">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Email</p>
                  <a 
                    href="mailto:divyanshu.jaiswal@example.com" 
                    className="font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    divyanshu.jaiswal@example.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 text-slate-700 dark:text-slate-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 transition-colors">
                  <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Phone</p>
                  <p className="font-semibold">+91 XXXXX XXXXX</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-4 font-semibold">
                Connect on Social
              </p>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social) => (
                  <MagneticButton key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 glass rounded-xl transition-all duration-300 ${social.color} hover:scale-105 group bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800`}
                      aria-label={social.label}
                    >
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg">
                        <social.icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {social.label}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {social.username}
                        </p>
                      </div>
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Status Badge */}
            <motion.div
              className="mt-8 inline-flex items-center gap-3 px-5 py-3 glass rounded-full bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300 font-semibold">
                Available for opportunities
              </span>
            </motion.div>

            {/* Download Resume */}
            <motion.a
              href="/resume.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-full font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900 dark:text-white">
              Send a Message
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              I'll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                  placeholder="Job Opportunity / Collaboration"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors resize-none text-slate-900 dark:text-white placeholder-slate-400"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/50 rounded-lg text-emerald-700 dark:text-emerald-400 text-sm"
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © 2026 Divyanshu Jaiswal. Built with Next.js, Three.js & Framer Motion.
          </p>
          <p className="text-slate-400 dark:text-slate-600 text-xs mt-2">
            Designed with attention to detail and a passion for great user experiences.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}