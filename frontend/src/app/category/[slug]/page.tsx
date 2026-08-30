'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProductImage } from '@/components/ProductImage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LandingAnimations } from '@/components/LandingAnimations';
import { formatPrice, platformColor, platformLogo } from '@/lib/utils';
import { Product } from '@/lib/types';
import { Star, TrendingDown, ArrowLeft, ChevronRight } from 'lucide-react';

/* ─── Static category metadata ─── */
const CATEGORY_META: Record<string, {
  name: string;
  emoji: string;
  gradient: string;
  glow: string;
  sections: { name: string; emoji: string }[];
}> = {
  groceries_kitchen: {
    name: 'Groceries & Kitchen',
    emoji: '🥦',
    gradient: 'from-green-500 to-emerald-400',
    glow: 'rgba(34,197,94,0.3)',
    sections: [
      { name: 'Daily Fresh', emoji: '🌿' },
      { name: 'Kitchen Essentials', emoji: '🍳' },
      { name: 'Food & Groceries', emoji: '🛒' },
    ],
  },
  sports: {
    name: 'Sports & Fitness',
    emoji: '🏅',
    gradient: 'from-orange-500 to-amber-400',
    glow: 'rgba(249,115,22,0.3)',
    sections: [
      { name: 'Sports Shoes', emoji: '👟' },
      { name: 'Bats & Rackets', emoji: '🏏' },
      { name: 'Sports Nutrition', emoji: '💊' },
      { name: 'Workout Essentials', emoji: '🏋️' },
    ],
  },
  electronics: {
    name: 'Electronics & Devices',
    emoji: '⚡',
    gradient: 'from-blue-500 to-violet-500',
    glow: 'rgba(59,130,246,0.3)',
    sections: [
      { name: 'Smartphones', emoji: '📱' },
      { name: 'Laptops', emoji: '💻' },
      { name: 'Hearables', emoji: '🎧' },
    ],
  },
};

/* ─── Tilt card used in product grid ─── */
function TiltProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const initialRotation = (index % 5 - 2) * 1.5;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const bestPlatformStr = product.best_platform || product.platforms?.[0]?.platform || 'amazon';
  const bestListing = product.platforms?.find(p => p.platform === bestPlatformStr) || product.platforms?.[0];
  const bestPrice = product.best_price || bestListing?.price || 0;
  const originalPrice = bestListing?.original_price || bestPrice;
  const discountPct = bestListing?.discount_percent || 0;
  const rating = bestListing?.rating || 0;
  const reviewCount = bestListing?.total_reviews || 0;
  const pColor = platformColor(bestPlatformStr);

  return (
    <div className="perspective-1000 relative h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ rotateZ: initialRotation }}
        whileHover={{ rotateZ: 0, y: -20, scale: 1.05 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass rounded-2xl p-4 overflow-hidden relative group cursor-pointer border border-[#1a1a2e] hover:border-[#3b82f640] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col"
      >
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-20" aria-label={`View ${product.name}`} />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />

        {discountPct > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div className="absolute inset-0 bg-pink-500/30 rounded-full blur-md"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <div className="relative bg-pink-500/20 border border-pink-500/50 text-pink-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
              <TrendingDown className="w-3 h-3" />{discountPct}% OFF
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/50 border backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1.5" style={{ borderColor: pColor }}>
            <span style={{ color: pColor }}>{platformLogo(bestPlatformStr)}</span>
            <span className="text-[10px] uppercase font-bold text-gray-200 tracking-wider hidden sm:inline-block">
              {bestPlatformStr.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-transparent flex items-center justify-center pt-8">
          <motion.div className="w-full h-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
            <ProductImage productId={product.id} brand={product.brand} category={product.category}
              imageUrl={product.image_url} size="lg" className="w-full h-full object-contain drop-shadow-2xl" />
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col z-10 relative mt-4">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.brand}</div>
          <h3 className="text-gray-100 font-semibold line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">{product.name}</h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-amber-400 text-sm">
              <Star className="w-4 h-4 fill-amber-400 mr-1" />{rating.toFixed(1)}
            </div>
            <span className="text-gray-500 text-xs">({reviewCount.toLocaleString()})</span>
          </div>
          <div className="mt-auto pt-4 border-t border-white/[0.05]">
            <div className="relative overflow-hidden rounded-lg transition-colors group-hover:bg-blue-500/5">
              <div className="absolute inset-0 shimmer-holo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">{formatPrice(bestPrice)}</span>
                {originalPrice > bestPrice && (
                  <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Staggered masonry product grid (same style as home trending) ─── */
function ProductMasonryGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
      {products.map((product, i) => {
        const isFirst = i === 0;
        const colSpan = isFirst ? 'md:col-span-2' : 'col-span-1';
        const rowSpan = isFirst ? 'md:row-span-2' : 'row-span-1';
        const rotation = (i % 2 === 0 ? 1 : -1) * (i % 3);
        const marginTop = (i === 2 || i === 4) ? 'md:-mt-12' : '';

        return (
          <div
            key={product.id}
            className={`${colSpan} ${rowSpan} h-full w-full ${marginTop} transition-transform duration-500 hover:z-20`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <ScrollReveal delay={i * 0.08} className="h-full">
              <TiltProductCard product={product} index={i} />
            </ScrollReveal>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Section selector card ─── */
function SectionCard({
  section,
  gradient,
  isActive,
  onClick,
  index,
}: {
  section: { name: string; emoji: string };
  gradient: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', damping: 14 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={`relative group text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
        isActive
          ? 'border-white/20 shadow-lg'
          : 'border-white/[0.06] hover:border-white/15'
      } glass`}
    >
      {/* Active glow top strip */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />

      {/* Inner fill on active */}
      {isActive && (
        <motion.div
          layoutId="section-active-bg"
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
        />
      )}

      <div className="relative z-10 flex items-center justify-between px-6 py-5 gap-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{section.emoji}</span>
          <div>
            <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
              {section.name}
            </div>
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-white rotate-90' : 'text-gray-600 group-hover:text-gray-400'}`} />
      </div>
    </motion.button>
  );
}

/* ─── Main page ─── */
export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const meta = CATEGORY_META[slug];

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`http://localhost:8000/api/category/${slug}`)
      .then(res => res.json())
      .then(data => {
        const products = Array.isArray(data) ? data : data.products || [];
        setAllProducts(products);
        // Auto-select first section
        if (meta && meta.sections.length > 0) {
          setActiveSection(meta.sections[0].name);
        }
      })
      .catch(err => console.error('Failed to load category', err))
      .finally(() => setLoading(false));
  }, [slug, meta]);

  const sectionProducts = activeSection
    ? allProducts.filter(p => p.subcategory === activeSection)
    : [];

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white font-mono">
        Category not found.
      </div>
    );
  }

  return (
    <LandingAnimations>
      <main className="min-h-screen text-white pb-24">
        {/* ── Hero banner ── */}
        <section className={`relative w-full pt-28 pb-14 px-4 overflow-hidden`}>
          {/* Ambient gradient blob */}
          <div className={`absolute inset-0 bg-gradient-to-b ${meta.gradient.replace('from-', 'from-').replace('to-', 'to-')}/10 via-transparent to-transparent pointer-events-none`} />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: meta.glow, opacity: 0.25 }} />

          <div className="relative z-10 max-w-5xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 14 }}
              className="flex items-center gap-5 mb-4"
            >
              <motion.span
                className="text-7xl"
                animate={{ rotateY: [0, 15, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {meta.emoji}
              </motion.span>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Category</div>
                <h1 className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                  {meta.name}
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-base max-w-xl"
            >
              {allProducts.length > 0 ? `${allProducts.length} products compared across top platforms — best prices, reviews & deals.` : 'Loading products…'}
            </motion.p>
          </div>
        </section>

        {/* ── Sections + Products ── */}
        <section className="max-w-7xl mx-auto px-4 mt-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT — section selector */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="sticky top-20 space-y-3">
                <div className="text-xs text-gray-600 uppercase tracking-widest font-mono mb-4 px-1">
                  Choose a Section
                </div>
                {meta.sections.map((section, i) => (
                  <SectionCard
                    key={section.name}
                    section={section}
                    gradient={meta.gradient}
                    isActive={activeSection === section.name}
                    onClick={() => setActiveSection(section.name)}
                    index={i}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — product masonry */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {activeSection && (
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: 'spring', damping: 18 }}
                  >
                    {/* Section heading */}
                    <ScrollReveal>
                      <div className="flex items-center gap-4 mb-10">
                        <div>
                          <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                            {meta.sections.find(s => s.name === activeSection)?.emoji} {activeSection}
                          </h2>
                          <p className="text-gray-500 text-sm mt-1 font-mono">
                            {sectionProducts.length} products · click any card to compare prices
                          </p>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                      </div>
                    </ScrollReveal>

                    {loading ? (
                      <div className="flex justify-center items-center py-32 text-gray-500 font-mono">
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          Loading products…
                        </motion.div>
                      </div>
                    ) : sectionProducts.length > 0 ? (
                      <ProductMasonryGrid products={sectionProducts} />
                    ) : (
                      <div className="flex justify-center items-center py-32 text-gray-500 font-mono">
                        No products found in this section.
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </LandingAnimations>
  );
}
