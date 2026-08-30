'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

const initialMessages: Message[] = [
  { id: '1', role: 'ai', content: 'Hello! I am SmartKart AI. How can I help you find the perfect product today?' }
];

export function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'That sounds great! I can certainly help you with that. Let me look up some options for you.'
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulsing ring */}
          {!isOpen && (
            <motion.div
              className="absolute -inset-2 rounded-full border-2 border-blue-500/50"
              animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full text-white shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow z-10 burst"
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[30rem] glass-heavy rounded-2xl border border-[#1a1a2e] shadow-2xl overflow-hidden flex flex-col z-50 perspective-1000"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#1a1a2e] bg-[#0c0c14]/50 backdrop-blur-md flex items-center space-x-3">
              <span className="text-2xl animate-float-slow">🤖</span>
              <h3 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                SmartKart AI
              </h3>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-thin scrollbar-thumb-[#1a1a2e]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className={`max-w-[80%] rounded-xl p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/30 text-blue-100 self-end'
                      : 'glass border border-[#1a1a2e] text-gray-200 self-start'
                  }`}
                >
                  {msg.content}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  className="glass border border-[#1a1a2e] rounded-xl p-4 self-start flex items-center"
                >
                  <div className="flex space-x-1.5">
                    <span className="wave-dot w-2 h-2 rounded-full bg-blue-400 block" style={{ animationDelay: '0ms' }} />
                    <span className="wave-dot w-2 h-2 rounded-full bg-blue-400 block" style={{ animationDelay: '150ms' }} />
                    <span className="wave-dot w-2 h-2 rounded-full bg-blue-400 block" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-[#1a1a2e] bg-[#0c0c14]/80">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full glass bg-black/40 border border-[#1a1a2e] rounded-full py-2 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all glow-blue"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-1.5 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
