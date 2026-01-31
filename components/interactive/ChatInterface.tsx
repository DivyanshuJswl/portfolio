// components/interactive/ChatInterface.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Cpu,
  Minimize2,
  Maximize2,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useChatStore } from "@/lib/store";

export default function ChatInterface() {
  const { messages, isThinking, isChatOpen, toggleChat, sendMessage } =
    useChatStore();
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    await sendMessage(input);
    setInput("");
  };

  const quickQuestions = [
    "Tell me about your experience",
    "What is your tech stack?",
    "Show me your best project",
    "How can I contact you?",
  ];

  return (
    <>
      {/* Launcher Button */}
      <motion.button
        onClick={toggleChat}
        // CSS FIX: Increased z-index to 100 to stay above everything
        className="fixed bottom-6 right-6 z-[100] group outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Chat"
      >
        {/* CSS FIX: Changed background to Brand Gradient (Indigo->Teal) for consistency */}
        <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-600 to-teal-500 text-white shadow-2xl shadow-indigo-500/40 overflow-hidden border border-white/20">
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Attention ring */}
          {!isChatOpen && messages.length === 0 && (
            <span className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-50" />
          )}

          {/* Icon Switch */}
          <div className="relative z-10">
            {isChatOpen ? (
              <X className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
            )}
          </div>

          {/* Notification Dot */}
          {!isChatOpen && messages.length === 0 && (
            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-indigo-600 animate-pulse" />
          )}
        </div>
      </motion.button>

      {/* Main Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              height: isMinimized ? "auto" : "min(650px, 80vh)",
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            // CSS FIX: Z-index 100, backdrop-blur-3xl for premium glass feel
            className="fixed bottom-24 right-4 md:right-6 z-[100] w-[calc(100vw-2rem)] md:w-[400px] flex flex-col overflow-hidden
              rounded-[28px] border border-white/20 dark:border-white/10 shadow-2xl
              bg-white/80 dark:bg-[#0B1120]/90 backdrop-blur-3xl ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-md relative overflow-hidden">
              {/* Shimmer Animation Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />

              <div className="flex items-center gap-3.5 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white dark:bg-[#0B1120] rounded-full flex items-center justify-center">
                    <div
                      className={`w-2 h-2 rounded-full ${isThinking ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide">
                    System Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {isThinking ? (
                      <>
                        <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                        <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Processing...
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Online
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500 dark:text-slate-400 relative z-10"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* CSS FIX: Replaced 'scrollbar-thin' with standard css-in-tailwind to work without plugins */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {/* Empty State */}
                  {messages.length === 0 && (
                    <div className="mt-6 space-y-8">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", delay: 0.1 }}
                          className="inline-block p-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 mb-4 ring-1 ring-indigo-500/20"
                        >
                          <Sparkles className="w-6 h-6 text-indigo-500" />
                        </motion.div>
                        <h4 className="text-slate-900 dark:text-white font-bold mb-2 text-lg">
                          How can I assist?
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 px-6 leading-relaxed">
                          I&apos;m connected to Divyanshu&apos;s portfolio data.
                          Ask about projects, skills, or experience.
                        </p>
                      </div>

                      <div className="grid gap-2.5">
                        {quickQuestions.map((question, idx) => (
                          <motion.button
                            key={question}
                            onClick={() => setInput(question)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            className="text-left px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 
                                     text-xs font-medium text-slate-600 dark:text-slate-300 
                                     hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 
                                     transition-all duration-200 group flex items-center justify-between shadow-sm hover:shadow-md"
                          >
                            <span className="flex items-center gap-2.5">
                              <Zap className="w-3.5 h-3.5 text-indigo-400" />
                              {question}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 -translate-x-2 group-hover:translate-x-0 duration-300" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 px-4 shadow-sm relative overflow-hidden group border ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-indigo-600 to-teal-500 text-white rounded-br-sm border-transparent"
                            : "bg-white dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap relative z-10">
                          {message.content}
                        </p>
                        <span
                          className={`text-[10px] block mt-1.5 opacity-60 text-right ${
                            message.role === "user"
                              ? "text-white/80"
                              : "text-slate-400"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Thinking Animation */}
                  {isThinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2 shadow-sm">
                        <div className="flex gap-1">
                          <motion.span
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "easeInOut",
                              delay: 0,
                            }}
                            className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                          />
                          <motion.span
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "easeInOut",
                              delay: 0.2,
                            }}
                            className="w-1.5 h-1.5 bg-teal-500 rounded-full"
                          />
                          <motion.span
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "easeInOut",
                              delay: 0.4,
                            }}
                            className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                          />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">
                          Analyzing...
                        </span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/50 dark:bg-white/5 border-t border-slate-200/50 dark:border-white/5 backdrop-blur-md">
                  <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a command..."
                      className="w-full pl-5 pr-12 py-3.5 rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 
                               focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
                               text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-all shadow-inner"
                      disabled={isThinking}
                      maxLength={500}
                    />
                    <div className="absolute right-2">
                      <motion.button
                        type="submit"
                        disabled={!input.trim() || isThinking}
                        className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 
                                 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed
                                 hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                        aria-label="Send Message"
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
