// components/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MapPin, Phone } from 'lucide-react';
import MagneticButton from '@/components/interactive/MagneticButton';

const socials = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/divyanshu', color: 'hover:text-gray-400' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/divyanshu-jaiswal', color: 'hover:text-blue-400' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/divyanshu', color: 'hover:text-sky-400' },
  { icon: Mail, label: 'Email', url: 'mailto:divyanshu@example.com', color: 'hover:text-red-400' },
];

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center">
      {/* Background effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      <motion.div
        className="max-w-6xl mx-auto w-full relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Open to exciting opportunities starting mid-2026. Let's build something amazing together!
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 text-gray-300">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Mail className="w-5 h-5 text-purple-400" />
                <a href="mailto:divyanshu.jaiswal@example.com" className="hover:text-purple-400 transition-colors">
                  divyanshu.jaiswal@example.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Phone className="w-5 h-5 text-purple-400" />
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socials.map((social) => (
                <MagneticButton key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 glass rounded-full transition-all duration-300 ${social.color} hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                </MagneticButton>
              ))}
            </div>

            {/* Status Badge */}
            <motion.div
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 glass rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-gray-300">Available for opportunities</span>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <MagneticButton>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                >
                  Send Message
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
