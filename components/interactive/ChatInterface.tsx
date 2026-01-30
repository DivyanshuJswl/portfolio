// components/interactive/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { useChatStore } from '@/lib/store';

export default function ChatInterface() {
  const { messages, isThinking, isChatOpen, toggleChat, sendMessage } = useChatStore();
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isChatOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    await sendMessage(input);
    setInput('');
  };

  const quickQuestions = [
    'Tell me about your work at Zopsmart',
    'What is Uni Event Hub?',
    'What technologies do you use?',
    'Are you available for opportunities?',
  ];

  return (
    <>
      {/* Chat Toggle Button with notification badge */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        {isChatOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {messages.length === 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            )}
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '60px' : '600px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-96 glass rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-purple-900/50 to-blue-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">DJ</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                </div>
                <div>
                  <h3 className="font-semibold">Divyanshu's AI Clone</h3>
                  <p className="text-xs text-gray-400">Powered by Llama 3.3</p>
                </div>
              </div>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-400 mt-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                      >
                        <p className="mb-4">👋 Hi! I'm Divyanshu's digital twin.</p>
                        <p className="text-sm mb-4">Ask me anything about:</p>
                      </motion.div>
                      <div className="flex flex-wrap gap-2 justify-center mt-3">
                        {quickQuestions.map((question, idx) => (
                          <motion.button
                            key={question}
                            onClick={() => setInput(question)}
                            className="px-3 py-2 bg-purple-600/20 text-purple-300 rounded-full text-xs hover:bg-purple-600/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                            : 'bg-gray-800 text-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <span className="text-xs opacity-50 mt-1 block">
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {isThinking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-800 px-4 py-3 rounded-2xl flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                        <span className="text-sm text-gray-400">Thinking...</span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full focus:outline-none focus:border-purple-500 transition-colors text-sm"
                      disabled={isThinking}
                      maxLength={500}
                    />
                    <motion.button
                      type="submit"
                      disabled={!input.trim() || isThinking}
                      className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {input.length}/500 characters
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
