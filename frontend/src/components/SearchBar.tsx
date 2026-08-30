'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLACEHOLDERS = [
  'Search for iPhone 15...',
  'Compare MacBook Air prices...',
  'Find the best headphone deals...',
  'Track price history of groceries...',
];

const SUGGESTIONS = [
  'iPhone 15',
  'Sony WH-1000XM5',
  'MacBook Air',
  'Nike Air Force 1',
];

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isFocused && !query) {
      interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isFocused, query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      inputRef.current?.blur();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative z-50">
      <motion.form
        onSubmit={handleSubmit}
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative glass-heavy rounded-2xl transition-all duration-300 border ${
          isFocused ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'border-[#1a1a2e]'
        }`}
      >
        {/* Inner glow when focused */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative flex items-center px-6 py-4">
          <motion.div
            animate={isFocused ? { scale: 1.1, color: '#3b82f6' } : { scale: 1, color: '#6b7280' }}
            className="mr-4"
          >
            <Search className="w-6 h-6" />
          </motion.div>

          <div className="relative flex-1 h-8 flex items-center">
            {/* Animated Placeholder */}
            <AnimatePresence mode="wait">
              {!query && !isFocused && (
                <motion.div
                  key={placeholderIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center text-gray-500 pointer-events-none text-lg"
                >
                  {PLACEHOLDERS[placeholderIndex]}
                </motion.div>
              )}
            </AnimatePresence>
            
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-full bg-transparent border-none outline-none text-white text-lg placeholder:text-gray-500 z-10"
              placeholder={isFocused ? 'Type to search...' : ''}
            />
          </div>

          <AnimatePresence>
            {!isFocused && !query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-4 px-2.5 py-1 rounded bg-[#0c0c14] border border-[#1a1a2e] text-gray-400 text-xs font-mono flex items-center gap-1"
              >
                ⌘K
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.form>

      {/* Suggestion Chips */}
      <AnimatePresence>
        {isFocused && !query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-4 flex flex-wrap gap-2 px-2"
          >
            <div className="w-full flex items-center gap-2 text-xs text-blue-400 font-semibold mb-1 px-2 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Quick Suggestions
            </div>
            {SUGGESTIONS.map((suggestion, idx) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, type: 'spring' }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59,130,246,0.1)' }}
                whileTap={{ scale: 0.95 }}
                onMouseDown={(e) => {
                  // Prevent blur before click fires
                  e.preventDefault();
                }}
                onClick={() => {
                  setQuery(suggestion);
                  router.push(`/search?q=${encodeURIComponent(suggestion)}`);
                  inputRef.current?.blur();
                  setIsFocused(false);
                }}
                className="glass-light px-4 py-2 rounded-full text-sm text-gray-300 border border-[#1a1a2e] hover:border-blue-500/50 hover:text-white transition-colors"
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
