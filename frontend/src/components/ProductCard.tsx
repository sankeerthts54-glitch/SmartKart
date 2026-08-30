"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice, platformColor, platformLogo } from "@/lib/utils";
import { ProductImage } from "@/components/ProductImage";
import { Star, TrendingDown } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Random initial rotation between -3 and 3 degrees
  const initialRotation = React.useMemo(() => {
    return (index % 5 - 2) * 1.5;
  }, [index]);

  // Magnetic cursor tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bestPlatformStr = product.best_platform || (product.platforms && product.platforms[0]?.platform) || "amazon";
  const bestListing = product.platforms?.find(p => p.platform === bestPlatformStr) || product.platforms?.[0];
  const bestPrice = product.best_price || bestListing?.price || 0;
  const originalPrice = bestListing?.original_price || bestPrice;
  const discountPercentage = bestListing?.discount_percent || 0;
  const rating = bestListing?.rating || 0;
  const reviewCount = bestListing?.total_reviews || 0;
  
  const hasDiscount = discountPercentage > 0;
  const pColor = platformColor(bestPlatformStr);

  return (
    <div className="perspective-1000 relative h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ rotateZ: initialRotation }}
        whileHover={{
          rotateZ: 0,
          y: -20,
          scale: 1.05,
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass rounded-2xl p-4 overflow-hidden relative group cursor-pointer border border-[#1a1a2e] hover:border-[#3b82f640] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 h-full flex flex-col"
      >
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-20" aria-label={`View ${product.name}`} />

        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)" }}
        />

        {/* Live Search Badge */}
        {product.is_live && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              className="absolute inset-0 bg-cyan-500/30 rounded-full blur-md"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
              🌐 Live
            </div>
          </div>
        )}

        {/* Discount Badge with pulsing glow — only if not live (live prices show no MRP) */}
        {hasDiscount && !product.is_live && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              className="absolute inset-0 bg-pink-500/30 rounded-full blur-md"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative bg-pink-500/20 border border-pink-500/50 text-pink-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
              <TrendingDown className="w-3 h-3" />
              {discountPercentage}% OFF
            </div>
          </div>
        )}

        {/* Platform Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div
            className={`bg-black/50 border backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1.5`}
            style={{ borderColor: pColor }}
          >
            <span style={{ color: pColor }}>{platformLogo(bestPlatformStr)}</span>
            <span className="text-[10px] uppercase font-bold text-gray-200 tracking-wider hidden sm:inline-block">
              {bestPlatformStr.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-transparent flex items-center justify-center pt-8">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <ProductImage
              productId={product.id}
              brand={product.brand}
              category={product.category}
              imageUrl={product.image_url}
              size="lg"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col z-10 relative mt-4">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.brand}</div>
          <h3 className="text-gray-100 font-semibold line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-amber-400 text-sm">
              <Star className="w-4 h-4 fill-amber-400 mr-1" />
              {rating.toFixed(1)}
            </div>
            <span className="text-gray-500 text-xs">({reviewCount.toLocaleString()})</span>
          </div>

          <div className="mt-auto pt-4 border-t border-white/[0.05]">
            {/* Price section with shimmer on hover */}
            <div className="relative overflow-hidden rounded-lg transition-colors group-hover:bg-blue-500/5">
              <div className="absolute inset-0 shimmer-holo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {formatPrice(bestPrice)}
                </span>
                {originalPrice > bestPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
