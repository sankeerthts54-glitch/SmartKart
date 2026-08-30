'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Groceries & Kitchen', path: '/category/groceries_kitchen' },
  { name: 'Sports & Fitness', path: '/category/sports' },
  { name: 'Electronics', path: '/category/electronics' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full glass-heavy ${
        scrolled ? 'h-11 backdrop-blur-xl' : 'h-14 backdrop-blur-md'
      }`}
    >
      {/* Animated gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse glow-border" />
      
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <ShoppingCart className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
          </motion.div>
          <span className="font-bold text-lg tracking-wider shimmer-holo">
            SMARTKART
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors py-1"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.name}
              <AnimatePresence>
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 neon-line"
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`pl-9 pr-4 py-1.5 rounded-full bg-black/40 border border-[#1a1a2e] text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 ${
              isSearchFocused ? 'w-72 border-blue-500 glow-blue' : 'w-48'
            }`}
          />
        </div>
      </div>
    </header>
  );
}
