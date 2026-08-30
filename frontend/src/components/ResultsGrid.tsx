"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice, platformColor, platformLogo } from "@/lib/utils";
import { ProductImage } from "@/components/ProductImage";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Star, Truck, Shield, Tag, ExternalLink,
  ChevronDown, TrendingDown, Sparkles, ArrowRight, CheckCircle2,
} from "lucide-react";

interface Props { products: Product[]; }

export function ResultsGrid({ products }: Props) {
  const [expandedOffers, setExpandedOffers] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  if (!products || products.length === 0) return null;

  const primary = products[0];
  const otherProducts = products.slice(1, 5);
  const sortedPlatforms = [...(primary.platforms || [])].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPlatforms[0]?.price || 0;
  const highestPrice = sortedPlatforms[sortedPlatforms.length - 1]?.price || 0;
  const savings = highestPrice - lowestPrice;

  return (
    <div className="w-full space-y-10 pb-24">
      {/* ═══ PRIMARY PRODUCT HEADER ═══ */}
      <ScrollReveal direction="up">
        <motion.div
          className="relative overflow-hidden glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start group border-trace"
          whileHover={{ borderColor: "rgba(59,130,246,0.4)" }}
        >
          {/* Parallax glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle,rgba(168,85,247,0.06),transparent_60%)]" />

          {/* Product image with float */}
          <motion.div
            className="shrink-0"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.08, rotate: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <ProductImage productId={primary.id} brand={primary.brand} category={primary.category} imageUrl={primary.image_url} size="lg" className="w-44 h-44 md:w-52 md:h-52" />
            </motion.div>
          </motion.div>

          <div className="flex-1 relative z-10">
            <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{primary.brand} · {primary.category}</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{primary.name}</h2>
            <p className="text-sm text-gray-400 mb-4 max-w-2xl leading-relaxed">{primary.description}</p>

            <div className="flex flex-wrap gap-3">
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="px-4 py-1.5 rounded-full glass border border-accent-green/30 text-accent-green font-bold text-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Best: {formatPrice(lowestPrice)}
              </motion.span>
              {savings > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.35 }}
                  className="px-4 py-1.5 rounded-full glass border border-accent-amber/30 text-accent-amber font-semibold text-sm flex items-center gap-1.5"
                >
                  <TrendingDown className="w-3.5 h-3.5" /> Save {formatPrice(savings)}
                </motion.span>
              )}
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="px-4 py-1.5 rounded-full glass-light text-gray-300 text-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3" /> {sortedPlatforms.length} platforms
              </motion.span>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.08, x: 4 }} whileTap={{ scale: 0.95 }} className="shrink-0 self-center">
            <Link
              href={`/product/${primary.id}`}
              className="px-6 py-3 glass border border-accent-blue/40 text-accent-blue hover:bg-accent-blue hover:text-white rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 glow-border"
            >
              Full Details <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </ScrollReveal>

      {/* ═══ PLATFORM COMPARISON ═══ */}
      <div>
        <ScrollReveal direction="left">
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            📊 Price Comparison
            <span className="text-sm text-gray-500 font-normal">— cheapest first</span>
            <div className="flex-1 neon-line" />
          </h3>
        </ScrollReveal>

        <div className="space-y-3">
          {sortedPlatforms.map((plat, idx) => {
            const pColor = platformColor(plat.platform);
            const isBest = idx === 0;
            const isExpanded = expandedOffers === `${plat.platform}-${idx}`;
            const isHovered = hoveredRow === idx;
            const direction = idx % 2 === 0 ? "left" : "right";

            return (
              <ScrollReveal key={`${plat.platform}-${idx}`} direction={direction as "left" | "right"} delay={idx * 0.06}>
                <motion.div
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  whileHover={{ scale: 1.01, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    isBest
                      ? "glass border border-accent-green/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                      : "glass-light border border-transparent hover:border-border-subtle"
                  }`}
                  style={{
                    boxShadow: isHovered && !isBest
                      ? `0 10px 40px rgba(0,0,0,0.3), 0 0 20px ${pColor}10`
                      : undefined,
                  }}
                >
                  {/* Glow backdrop */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: `radial-gradient(ellipse at 15% 50%, ${pColor}08, transparent 60%)` }}
                  />

                  {/* Rank badge */}
                  {idx < 3 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: idx * 0.05 }}
                      className={`absolute -left-2 -top-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black z-10 shadow-lg ${
                        idx === 0 ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/40" :
                        idx === 1 ? "bg-gray-300/10 text-gray-300 border border-gray-300/30" :
                        "bg-amber-600/10 text-amber-600 border border-amber-600/30"
                      }`}
                    >
                      #{idx + 1}
                    </motion.div>
                  )}

                  {isBest && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute -top-2.5 left-8 px-2.5 py-0.5 bg-accent-green text-white text-[10px] font-bold rounded-full shadow-lg neon-pulse"
                    >
                      🏆 Best Price
                    </motion.div>
                  )}

                  <div className="relative z-10 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {/* Platform */}
                    <div className="w-36 shrink-0">
                      <div className="font-bold text-base flex items-center gap-1.5" style={{ color: pColor }}>
                        <motion.span animate={isHovered ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                          {platformLogo(plat.platform)}
                        </motion.span>
                        {plat.platform_display}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5 truncate">{plat.seller}</div>
                    </div>

                    {/* Price */}
                    <div className="w-36 shrink-0">
                      <motion.div
                        className="text-2xl font-extrabold"
                        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {formatPrice(plat.price)}
                      </motion.div>
                      {plat.discount_percent > 0 && (
                        <div className="flex items-center gap-1.5 text-xs mt-0.5">
                          <span className="line-through text-gray-500">{formatPrice(plat.original_price)}</span>
                          <span className="text-accent-green font-bold">{plat.discount_percent}% off</span>
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{plat.rating}</span>
                        ({plat.total_reviews?.toLocaleString("en-IN")})
                      </span>
                      <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> {plat.delivery}</span>
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {plat.warranty}</span>
                      {plat.in_stock
                        ? <span className="text-accent-green font-semibold">● In Stock</span>
                        : <span className="text-red-400 font-semibold">○ Out of Stock</span>}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {plat.offers && plat.offers.length > 0 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => setExpandedOffers(isExpanded ? null : `${plat.platform}-${idx}`)}
                          className="flex items-center gap-1 text-xs text-accent-amber glass-light border border-accent-amber/20 px-2.5 py-1.5 rounded-lg hover:border-accent-amber/40 transition"
                        >
                          <Tag className="w-3 h-3" /> {plat.offers.length} offers
                          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown className="w-3 h-3" />
                          </motion.span>
                        </motion.button>
                      )}
                      <motion.a
                        href={plat.url} target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                          isBest
                            ? "bg-accent-green hover:bg-emerald-500 text-white shadow-lg shadow-accent-green/20"
                            : "glass border border-accent-blue/30 text-accent-blue hover:bg-accent-blue hover:text-white"
                        }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Buy
                      </motion.a>
                    </div>
                  </div>

                  {/* Expanded offers */}
                  <AnimatePresence>
                    {isExpanded && plat.offers && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-border-subtle/30 pt-3">
                          <motion.div
                            className="flex flex-wrap gap-2"
                            initial="hidden" animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                          >
                            {plat.offers.map((offer, oi) => (
                              <motion.div
                                key={oi}
                                variants={{ hidden: { opacity: 0, y: 10, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                                className="flex items-start gap-2 text-xs glass-light rounded-lg px-3 py-2"
                              >
                                <Tag className="w-3 h-3 text-accent-amber mt-0.5 shrink-0" />
                                <div>
                                  <div className="text-white font-medium">{offer.title}</div>
                                  {offer.code && <div className="text-accent-amber font-mono mt-0.5">Code: {offer.code}</div>}
                                  {offer.expires && <div className="text-gray-500 mt-0.5">Expires: {offer.expires}</div>}
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* ═══ ALSO FOUND — WATERFALL ═══ */}
      {otherProducts.length > 0 && (
        <div>
          <ScrollReveal direction="right">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
              🔍 Also Found
              <div className="flex-1 neon-line" />
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {otherProducts.map((p, i) => {
              const pColor = platformColor(p.best_platform || "");
              const rotation = ((i % 3) - 1) * 2;
              return (
                <ScrollReveal key={p.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                  <motion.div
                    style={{ rotate: rotation }}
                    whileHover={{ rotate: 0, scale: 1.06, y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link href={`/product/${p.id}`} className="group block">
                      <div className="absolute top-2 right-2 flex items-center justify-center bg-black/60 rounded-full w-6 h-6 border border-white/10 z-10">
                        {i + 1}
                      </div>
                      <div className="glass rounded-xl p-4 hover:border-accent-blue/40 border border-transparent transition-all duration-300 h-full flex flex-col">
                        <ProductImage productId={p.id} brand={p.brand} category={p.category} imageUrl={p.image_url} size="md" className="w-full h-36 mb-3" />
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{p.brand}</div>
                        <div className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors line-clamp-2 mb-2 flex-1">{p.name}</div>
                        <div className="flex items-center justify-between pt-2 border-t border-border-subtle/30">
                          <div className="text-lg font-extrabold">{formatPrice(p.best_price || 0)}</div>
                          <div className="text-[10px] px-2 py-0.5 rounded-md glass-light" style={{ color: pColor }}>
                            {platformLogo(p.best_platform || "")} {p.best_platform}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
