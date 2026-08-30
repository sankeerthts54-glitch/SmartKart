"use client";

import { useState, useEffect } from "react";
import { getBrandLogo, getCategoryGradient, getProductImage } from "@/lib/images";

// Category emoji for rich fallback display
const CATEGORY_EMOJI: Record<string, string> = {
  phones: "📱",
  laptops: "💻",
  audio: "🎧",
  grocery: "🛒",
  appliances: "🏠",
  fashion: "👟",
  bags: "🎒",
  music: "🎹",
};

interface Props {
  productId: string;
  brand?: string;
  category?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  imageUrl?: string;
}

export function ProductImage({ productId, brand = "", category, className = "", size = "md", imageUrl }: Props) {
  const [imgError, setImgError] = useState(false);

  // If productId changes (e.g. fast refresh), reset the error state so we try loading the new image
  useEffect(() => {
    setImgError(false);
  }, [productId]);

  // Use the curated map from lib/images.ts, fallback to API imageUrl if present
  const primaryUrl = getProductImage(productId) || imageUrl || null;
  const gradient = getCategoryGradient(category);
  const emoji = CATEGORY_EMOJI[category?.toLowerCase() || ""] || "📦";

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-28 h-28",
    lg: "w-full h-full",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center ${sizeClasses[size]} ${className}`}
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {primaryUrl && !imgError ? (
        <img
          src={primaryUrl}
          alt={`${brand} product`}
          className="object-contain w-[85%] h-[85%] drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
          onError={() => setImgError(true)}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Rich emoji + brand fallback */
        <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
          <span style={{ fontSize: size === "lg" ? "4rem" : size === "md" ? "2.5rem" : "1.5rem" }}>
            {emoji}
          </span>
          <span
            className="font-black text-white/40 uppercase tracking-widest text-center px-2"
            style={{ fontSize: size === "lg" ? "0.75rem" : "0.6rem" }}
          >
            {brand}
          </span>
        </div>
      )}
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
    </div>
  );
}
