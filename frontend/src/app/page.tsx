'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { LandingAnimations } from '@/components/LandingAnimations';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Product } from '@/lib/types';

// Stats count-up component
function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col items-center glass p-4 rounded-xl border-trace">
      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
}

export default function Home() {
  const [trending, setTrending] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/trending')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTrending(data);
        }
      })
      .catch(err => console.error("Failed to fetch trending deals", err));
  }, []);

  const headlineWords = "Shop Smarter with".split(" ");
  const categories = [
    { name: 'Groceries & Kitchen', slug: 'groceries_kitchen', emoji: '🥦', gradient: 'from-green-500 to-emerald-400', glow: 'rgba(34,197,94,0.2)' },
    { name: 'Sports & Fitness', slug: 'sports', emoji: '🏅', gradient: 'from-orange-500 to-amber-400', glow: 'rgba(249,115,22,0.2)' },
    { name: 'Electronics & Devices', slug: 'electronics', emoji: '⚡', gradient: 'from-blue-500 to-violet-500', glow: 'rgba(59,130,246,0.2)' },
  ];

  return (
    <>
    <LandingAnimations>
      <main className="min-h-screen flex flex-col items-center overflow-hidden text-white">
        {/* HERO SECTION */}
        <section className="relative w-full max-w-6xl mx-auto px-4 pt-32 pb-20 flex flex-col items-center text-center z-10">
          <motion.div 
            className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            <div className="flex flex-wrap justify-center gap-x-4 mb-2">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12 } }
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="bg-gradient-to-r from-blue-500 via-purple-400 via-pink-500 to-green-500 animate-gradient bg-clip-text text-transparent bg-[length:300%_auto] pb-2"
            >
              AI Agents
            </motion.div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12"
          >
            Maximalist tech meets ultimate savings. Our autonomous agents scour the web so you don&apos;t have to.
          </motion.p>

          <div className="w-full max-w-3xl mb-16 z-20">
            <SearchBar />
          </div>

          <div className="flex gap-4 md:gap-8 justify-center mb-16 flex-wrap">
            <StatCounter end={50} suffix="+" label="Platforms" />
            <StatCounter end={50000} suffix="+" label="Products Tracked" />
            <StatCounter end={24} suffix="mo" label="Price History" />
          </div>

          {/* CATEGORY CARDS — replaces the old pill buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-stretch w-full max-w-3xl">
            {categories.map((cat, i) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.12, type: 'spring', damping: 14 }}
                  whileHover={{ y: -8, scale: 1.04 }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.07] glass h-full"
                  style={{ boxShadow: `0 0 0 0 ${cat.glow}`, transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px 4px ${cat.glow}`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${cat.glow}`)}
                >
                  {/* Gradient top strip */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient}`} />
                  {/* Inner glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${cat.gradient} opacity-[0.04]`} />

                  <div className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 py-8">
                    <motion.span
                      className="text-5xl"
                      animate={{ rotateY: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    >
                      {cat.emoji}
                    </motion.span>
                    <span className={`font-bold text-base text-center bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent`}>
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-gray-500 font-mono tracking-widest uppercase">Explore →</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* HOT DEALS TICKER */}
        <div className="w-full glass-light border-y border-[#1a1a2e] py-4 overflow-hidden relative flex shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex whitespace-nowrap animate-marquee items-center w-max">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center px-6">
                <span className="flex items-center gap-2 font-mono text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full"><Zap size={16} /> 🔥 iPhone 15 — ₹62,999</span>
                <span className="flex items-center gap-2 font-mono text-sm text-pink-400 bg-pink-400/10 px-3 py-1 rounded-full"><TrendingUp size={16} /> ⚡ 48% off Safari Bag</span>
                <span className="flex items-center gap-2 font-mono text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full"><Sparkles size={16} /> ✨ Sony WH-1000XM5 — ₹24,990</span>
                <span className="flex items-center gap-2 font-mono text-sm text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full"><Zap size={16} /> 🚀 30% off Amul Butter</span>
              </div>
            ))}
          </div>
        </div>

        {/* TRENDING SECTION */}
        <section className="w-full max-w-7xl mx-auto px-4 py-24 z-10">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                🔥 Trending Deals
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-[#1a1a2e] to-transparent" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {trending.length > 0 ? (
              trending.slice(0, 6).map((product, i) => {
                const isFirst = i === 0;
                const colSpan = isFirst ? 'md:col-span-2' : 'col-span-1';
                const rowSpan = isFirst ? 'md:row-span-2' : 'row-span-1';
                const rotation = (i % 2 === 0 ? 1 : -1) * (i % 3);
                const marginTop = (i === 2 || i === 4) ? 'md:-mt-12' : '';
                
                return (
                  <div 
                    key={product.id || i}
                    className={`${colSpan} ${rowSpan} h-full w-full ${marginTop} transition-transform duration-500 hover:z-20`}
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <ScrollReveal delay={i * 0.1} className="h-full">
                      <ProductCard product={product} index={i} />
                    </ScrollReveal>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 flex justify-center items-center py-20 text-gray-500 font-mono">
                Loading trending deals...
              </div>
            )}
          </div>
        </section>

        {/* FOOTER SEPARATOR */}
        <div className="w-full flex flex-col items-center pb-12 mt-12">
          <div className="w-1/2 h-[1px] neon-line mb-8" />
          <p className="font-mono text-gray-500 text-sm typewriter-cursor">
            Welcome to the future of shopping.
          </p>
        </div>
      </main>
    </LandingAnimations>
    </>
  );
}
