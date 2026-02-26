// components/interactive/ChatInterface.tsx
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
  User,
} from "lucide-react";
import { useChatStore } from "@/lib/store";

// ─── Markdown renderer ────────────────────────────────────────────────────────

function parseInline(text: string): React.ReactNode {
  const segments: React.ReactNode[] = [];
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      segments.push(
        <strong key={key++} className="font-semibold text-slate-900 dark:text-slate-100">
          {match[2]}
        </strong>,
      );
    } else if (match[3]) {
      segments.push(
        <em key={key++} className="italic opacity-90">
          {match[3]}
        </em>,
      );
    } else if (match[4]) {
      segments.push(
        <code
          key={key++}
          className="bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-teal-300 rounded px-1.5 py-0.5 text-[11px] font-mono border border-slate-200 dark:border-slate-700"
        >
          {match[4]}
        </code>,
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) segments.push(text.slice(lastIndex));
  return segments.length === 1 ? segments[0] : <>{segments}</>;
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={key++} className="my-2 rounded-xl overflow-hidden border border-slate-700">
          {lang && (
            <div className="bg-slate-800 px-3 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-700">
              {lang}
            </div>
          )}
          <pre className="bg-slate-900 text-teal-300 p-3 text-xs font-mono overflow-x-auto leading-relaxed">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>,
      );
      i++;
      continue;
    }

    // Bullet list
    if (/^[-*•]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*•]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="space-y-1 my-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-teal-400 mt-0.5 text-xs shrink-0">▸</span>
              <span className="leading-snug">{parseInline(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="space-y-1 my-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-teal-600 dark:text-indigo-300 font-mono text-[11px] mt-0.5 min-w-[1.4rem] shrink-0">
                {idx + 1}.
              </span>
              <span className="leading-snug">{parseInline(item)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,3})\s(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const cls =
        level === 1
          ? "font-bold text-[13px] mt-2 mb-1 text-slate-900 dark:text-slate-100"
          : level === 2
            ? "font-semibold text-[12px] mt-2 mb-1 text-slate-800 dark:text-slate-200"
            : "font-semibold text-[11px] mt-1 mb-0.5 text-indigo-600 dark:text-teal-400 uppercase tracking-wide";
      elements.push(
        <p key={key++} className={cls}>
          {parseInline(text)}
        </p>,
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="leading-relaxed">
        {parseInline(line)}
      </p>,
    );
    i++;
  }

  return <div className="space-y-1 text-sm">{elements}</div>;
}

// ─── Main component ───────────────────────────────────────────────────────────

const quickQuestions = [
  "Tell me about your experience",
  "What is your tech stack?",
  "Show me your best project",
  "How can I contact you?",
];

export default function ChatInterface() {
  const { messages, isThinking, isChatOpen, toggleChat, sendMessage } =
    useChatStore();
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <>
      {/* ── Launcher Button ── */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-[100] group outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Chat"
      >
        <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-600 to-teal-500 text-white shadow-2xl shadow-indigo-500/40 overflow-hidden border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {!isChatOpen && messages.length === 0 && (
            <span className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-50" />
          )}
          <div className="relative z-10">
            {isChatOpen ? (
              <X className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
            )}
          </div>
          {!isChatOpen && messages.length === 0 && (
            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-indigo-600 animate-pulse" />
          )}
        </div>
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "min(660px, 82vh)",
            }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 md:right-6 z-[100] w-[calc(100vw-2rem)] md:w-[420px] flex flex-col overflow-hidden
              rounded-[28px] shadow-2xl shadow-slate-900/40
              border border-slate-200 dark:border-slate-700/60
              bg-white dark:bg-slate-900
              ring-1 ring-black/5 dark:ring-white/5"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3.5 shrink-0 relative overflow-hidden
              border-b border-slate-200 dark:border-slate-700/60
              bg-slate-50 dark:bg-slate-800/80">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-teal-500/5" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
                    <Cpu className="text-white" style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3
                    bg-white dark:bg-slate-800
                    rounded-full flex items-center justify-center
                    ring-1 ring-slate-200 dark:ring-slate-700">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${isThinking ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-[13px] tracking-wide leading-none">
                    Divyanshu&apos;s AI
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    {isThinking ? (
                      <>
                        <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                        <p className="text-[10px] font-medium text-amber-500 dark:text-amber-400 uppercase tracking-wider">
                          Thinking...
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />
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
                className="p-1.5 rounded-full transition-colors relative z-10
                  text-slate-400 dark:text-slate-500
                  hover:bg-slate-200 dark:hover:bg-slate-700
                  hover:text-slate-600 dark:hover:text-slate-300"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? (
                  <Maximize2 className="w-3.5 h-3.5" />
                ) : (
                  <Minimize2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* ── Body ── */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0
                  bg-slate-50/50 dark:bg-slate-900
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600
                  [&::-webkit-scrollbar-thumb]:rounded-full">

                  {/* Empty state */}
                  {messages.length === 0 && (
                    <div className="mt-4 space-y-5">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", delay: 0.1 }}
                          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3
                            bg-indigo-50 dark:bg-indigo-500/10
                            ring-1 ring-indigo-200 dark:ring-indigo-500/20"
                        >
                          <Sparkles className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                        </motion.div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-1.5 text-base">
                          Ask me anything
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 px-4 leading-relaxed">
                          I&apos;m Divyanshu&apos;s AI — wired into his portfolio.
                          Projects, stack, experience — ask away.
                        </p>
                      </div>

                      <div className="grid gap-2">
                        {quickQuestions.map((question, idx) => (
                          <motion.button
                            key={question}
                            onClick={() => { if (!isThinking) sendMessage(question); }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: idx * 0.04 }}
                            className="text-left px-4 py-3 rounded-xl transition-all duration-200 group flex items-center justify-between
                              text-xs font-medium
                              text-slate-600 dark:text-slate-300
                              bg-white dark:bg-slate-800
                              border border-slate-200 dark:border-slate-700
                              hover:bg-indigo-50 dark:hover:bg-indigo-900/40
                              hover:border-indigo-300 dark:hover:border-indigo-500/50
                              hover:text-indigo-700 dark:hover:text-indigo-300"
                          >
                            <span className="flex items-center gap-2.5">
                              <Zap className="w-3 h-3 text-indigo-400 dark:text-indigo-400 shrink-0" />
                              {question}
                            </span>
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-indigo-500 -translate-x-1 group-hover:translate-x-0 duration-200 shrink-0" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message list */}
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.timestamp}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {/* AI avatar */}
                      {message.role === "assistant" && (
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shrink-0 shadow-sm mb-4">
                          <Cpu className="text-white" style={{ width: 13, height: 13 }} />
                        </div>
                      )}

                      <div className="flex flex-col gap-1 max-w-[82%]">
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-sm border ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-indigo-600 to-teal-500 text-white rounded-br-sm border-transparent shadow-indigo-500/20"
                              : "rounded-bl-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <MarkdownContent content={message.content} />
                          ) : (
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          )}
                        </div>
                        <span
                          className={`text-[10px] opacity-50 px-1 ${
                            message.role === "user"
                              ? "text-right text-slate-500 dark:text-slate-400"
                              : "text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* User avatar */}
                      {message.role === "user" && (
                        <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mb-4
                          bg-slate-200 dark:bg-slate-700">
                          <User className="text-slate-500 dark:text-slate-300" style={{ width: 13, height: 13 }} />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isThinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-end gap-2 justify-start"
                    >
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shrink-0 shadow-sm">
                        <Cpu className="text-white" style={{ width: 13, height: 13 }} />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border
                        bg-white dark:bg-slate-800
                        border-slate-200 dark:border-slate-700">
                        <div className="flex gap-1.5 items-center">
                          <motion.span
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0 }}
                            className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                          />
                          <motion.span
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.18 }}
                            className="w-1.5 h-1.5 bg-teal-500 rounded-full"
                          />
                          <motion.span
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.36 }}
                            className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* ── Input ── */}
                <div className="p-3.5 shrink-0
                  border-t border-slate-200 dark:border-slate-700/60
                  bg-white dark:bg-slate-800/80">
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      id="chat-input"
                      name="chat-input"
                      type="text"
                      autoComplete="off"
                      aria-label="Chat message"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about projects, stack, experience..."
                      className="flex-1 pl-4 pr-3 py-3 rounded-2xl text-sm transition-all
                        bg-slate-100 dark:bg-slate-900
                        border border-slate-200 dark:border-slate-700
                        text-slate-900 dark:text-white
                        placeholder-slate-400 dark:placeholder-slate-500
                        focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500
                        focus:ring-2 focus:ring-indigo-500/20"
                      disabled={isThinking}
                      maxLength={500}
                    />
                    <motion.button
                      type="submit"
                      disabled={!input.trim() || isThinking}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-teal-500 text-white shadow-lg shadow-indigo-500/25
                               disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed
                               transition-opacity flex items-center justify-center shrink-0"
                      aria-label="Send Message"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                  {input.length > 400 && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 text-right mt-1.5 pr-1">
                      {input.length}/500
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
