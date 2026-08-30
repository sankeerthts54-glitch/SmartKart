"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";
import { ProductImage } from "@/components/ProductImage";
import { ScrollReveal } from "@/components/ScrollReveal";
import { formatPrice, platformColor, platformLogo, getBuyRecommendationColor } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Shield, Truck, Star, ExternalLink, ChevronLeft, Tag, Sparkles, TrendingDown } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [p, setP] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${API}/api/product/${id}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { setP(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        <div className="h-8 skeleton rounded-xl w-32" />
        <div className="flex gap-8">
          <div className="w-96 h-96 skeleton rounded-2xl" />
          <div className="flex-1 space-y-4">
            <div className="h-10 skeleton rounded-xl w-3/4" />
            <div className="h-4 skeleton rounded w-1/2" />
            <div className="h-32 skeleton rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div className="text-7xl mb-6" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          😕
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <Link href="/" className="text-accent-blue hover:underline">← Back to home</Link>
      </div>
    );
  }

  const bestListing = p.platforms?.find((pl) => pl.platform === p.best_platform) || p.platforms?.[0];
  const sortedPlatforms = [...(p.platforms || [])].sort((a, b) => a.price - b.price);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back link */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6 transition group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to search
        </Link>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10 mb-10">
        {/* ═══ LEFT: Image + Specs ═══ */}
        <div className="w-full lg:w-2/5 space-y-6">
          <ScrollReveal direction="left">
            <motion.div 
              className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center p-8 glass rounded-3xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <ProductImage productId={p.id} brand={p.brand} category={p.category} imageUrl={p.image_url} size="lg" className="w-full aspect-square max-w-xs" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
            </motion.div>
          </ScrollReveal>

          {/* Specs */}
          {p.specs && p.specs.length > 0 && (
            <ScrollReveal direction="left" delay={0.1}>
              <div className="glass rounded-xl p-5">
                <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-4">Specifications</h3>
                <div className="space-y-0">
                  {p.specs.map((spec, i) => (
                    <ScrollReveal key={i} direction="left" delay={i * 0.03}>
                      <div className="flex justify-between gap-4 text-sm py-2.5 border-b border-border-subtle/30 last:border-0 hover:bg-white/[0.02] px-2 -mx-2 rounded transition-colors">
                        <span className="text-gray-400 shrink-0">{spec.key}</span>
                        <span className="text-white text-right font-medium">{spec.value}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* ═══ RIGHT: Info + Platforms ═══ */}
        <div className="w-full lg:w-3/5 space-y-6">
          {/* Header */}
          <ScrollReveal direction="right">
            <div>
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{p.brand} · {p.category}</div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{p.name}</h1>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="flex items-center text-yellow-400 text-sm gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  {bestListing?.rating?.toFixed(1)} ({bestListing?.total_reviews?.toLocaleString("en-IN")} reviews)
                </span>
                {p.buy_recommendation && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="px-3 py-1 rounded-full text-xs font-bold glass"
                    style={{
                      color: getBuyRecommendationColor(p.buy_recommendation),
                      borderColor: getBuyRecommendationColor(p.buy_recommendation) + "40",
                      border: `1px solid ${getBuyRecommendationColor(p.buy_recommendation)}40`,
                    }}
                  >
                    {p.buy_recommendation === "buy_now" ? "✓ Buy Now" :
                     p.buy_recommendation === "good_deal" ? "★ Good Deal" : "⏳ Consider Waiting"}
                  </motion.span>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* AI Verdict */}
          {p.ai_verdict && (
            <ScrollReveal direction="right" delay={0.1}>
              <div className="p-4 rounded-xl glass border border-accent-blue/20 text-sm text-gray-200">
                <span className="text-accent-blue font-bold">🤖 AI Verdict: </span>{p.ai_verdict}
              </div>
            </ScrollReveal>
          )}

          {/* Lowest ever */}
          {p.lowest_ever_price && p.lowest_ever_date && (
            <ScrollReveal direction="right" delay={0.15}>
              <div className="text-xs text-gray-400 glass-light rounded-lg px-4 py-2 inline-flex items-center gap-2">
                <TrendingDown className="w-3 h-3 text-accent-green" />
                Historical lowest: <span className="text-accent-green font-semibold">{formatPrice(p.lowest_ever_price)}</span>
                on {new Date(p.lowest_ever_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                {p.best_price && p.best_price <= p.lowest_ever_price * 1.05 && (
                  <span className="text-accent-green font-bold animate-pulse">🔥 Near all-time low!</span>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Platform listings */}
          <div>
            <ScrollReveal direction="right" delay={0.2}>
              <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                Available on {sortedPlatforms.length} platforms
                <div className="flex-1 neon-line" />
              </h3>
            </ScrollReveal>

            <div className="space-y-3">
              {sortedPlatforms.map((plat, idx) => {
                const pColor = platformColor(plat.platform);
                const isBest = idx === 0;
                return (
                  <ScrollReveal key={`${plat.platform}-${idx}`} direction={idx % 2 === 0 ? "left" : "right"} delay={0.25 + idx * 0.05}>
                    <motion.div
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        isBest ? "glass border border-accent-green/30 shadow-[0_0_25px_rgba(16,185,129,0.08)]" : "glass-light border border-transparent hover:border-border-subtle"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {isBest && (
                            <span className="text-[10px] bg-accent-green text-white px-2 py-0.5 rounded font-bold shadow-md neon-pulse">
                              #1 Best Price
                            </span>
                          )}
                          <span className="font-bold text-sm" style={{ color: pColor }}>
                            {platformLogo(plat.platform)} {plat.platform_display}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-extrabold">{formatPrice(plat.price)}</div>
                          {plat.discount_percent > 0 && (
                            <div className="flex items-center gap-2 justify-end text-xs">
                              <span className="line-through text-gray-500">{formatPrice(plat.original_price)}</span>
                              <span className="text-accent-green font-bold">{plat.discount_percent}% off</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> {plat.delivery}</span>
                        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {plat.warranty}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {plat.rating} ({plat.total_reviews?.toLocaleString("en-IN")})
                        </span>
                      </div>

                      {plat.offers && plat.offers.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {plat.offers.slice(0, 2).map((offer, oi) => (
                            <span key={oi} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded glass-light text-accent-amber">
                              <Tag className="w-3 h-3" /> {offer.title}
                            </span>
                          ))}
                          {plat.offers.length > 2 && (
                            <span className="text-[10px] text-gray-500">+{plat.offers.length - 2} more</span>
                          )}
                        </div>
                      )}

                      <motion.a
                        href={plat.url} target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                          isBest
                            ? "bg-accent-green hover:bg-emerald-500 text-white shadow-lg shadow-accent-green/20"
                            : "glass border border-accent-blue/30 text-accent-blue hover:bg-accent-blue hover:text-white"
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" /> Buy on {plat.platform_display}
                      </motion.a>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PRICE HISTORY ═══ */}
      {p.price_history && p.price_history.length > 0 && (
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mb-10 glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              📈 Price History
              <div className="flex-1 neon-line" />
            </h2>
            <PriceHistoryChart priceHistory={p.price_history} currentPrice={p.best_price || 0} />
          </div>
        </ScrollReveal>
      )}

      {/* ═══ REVIEWS — SCATTERED COLLAGE ═══ */}
      {bestListing?.reviews && bestListing.reviews.length > 0 && (
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              ⭐ Top Reviews
              <div className="flex-1 neon-line" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bestListing.reviews.slice(0, 4).map((review, i) => {
                const rotation = ((i % 3) - 1) * 1.5;
                return (
                  <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
                    <motion.div
                      style={{ rotate: rotation }}
                      whileHover={{ rotate: 0, scale: 1.03, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="glass rounded-xl p-4 hover:border-accent-blue/30 border border-transparent transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">{review.user}</span>
                        <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
                          {"★".repeat(Math.round(review.rating))}{"☆".repeat(5 - Math.round(review.rating))}
                        </div>
                      </div>
                      <p className="font-medium text-sm text-white mb-1">{review.title}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{review.body}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                        {review.verified && <span className="text-accent-green">✓ Verified</span>}
                        <span>{review.platform}</span>
                        <span>{new Date(review.date).toLocaleDateString("en-IN")}</span>
                        <span>{review.helpful_votes} helpful</span>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
