// lib/store.ts
import { create } from 'zustand';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatStore {
  messages: ChatMessage[];
  isThinking: boolean;
  isChatOpen: boolean;
  addMessage: (message: ChatMessage) => void;
  setThinking: (value: boolean) => void;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isThinking: false,
  isChatOpen: false,
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  
  setThinking: (value) => set({ isThinking: value }),
  
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  
  sendMessage: async (content) => {
    const { addMessage, setThinking } = get();
    
    // Add user message
    addMessage({ role: 'user', content, timestamp: Date.now() });
    setThinking(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: get().messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      
      const data = await response.json();
      addMessage({
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, something went wrong. Try again?',
        timestamp: Date.now(),
      });
    } finally {
      setThinking(false);
    }
  },
}));
