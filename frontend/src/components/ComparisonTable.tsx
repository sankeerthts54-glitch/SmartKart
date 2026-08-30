"use client";

import { Product } from "@/lib/types";
import { formatPrice, platformColor, platformLogo } from "@/lib/utils";
import { ExternalLink, Star } from "lucide-react";

interface Props { products: Product[]; }

export function ComparisonTable({ products }: Props) {
  if (!products || products.length === 0) return null;

  // Collect all unique spec keys across all products
  const specKeys = Array.from(
    new Set(products.flatMap((p) => p.specs?.map((s) => s.key) || []))
  );

  const getSpec = (p: Product, key: string) =>
    p.specs?.find((s) => s.key === key)?.value || "—";

  const getBestPlatform = (p: Product) =>
    [...(p.platforms || [])].sort((a, b) => a.price - b.price)[0];

  const lowestPrice = Math.min(...products.map((p) => p.best_price || Infinity));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border-subtle">
            <th className="text-left p-4 text-gray-400 font-medium w-40 sticky left-0 bg-card z-10">Feature</th>
            {products.map((p) => (
              <th key={p.id} className="p-4 text-center min-w-[200px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-2xl font-bold text-gray-500 border border-border-subtle">
                    {p.brand?.charAt(0)}
                  </div>
                  <div className="font-bold text-white text-sm leading-tight text-center">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.brand}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Best Price Row */}
          <tr className="border-b border-border-subtle bg-accent-blue/5">
            <td className="p-4 text-gray-400 font-semibold sticky left-0 bg-[#0d0d18] z-10">Best Price</td>
            {products.map((p) => {
              const best = getBestPlatform(p);
              const isLowest = (p.best_price || 0) === lowestPrice;
              return (
                <td key={p.id} className={`p-4 text-center ${isLowest ? "bg-accent-green/10" : ""}`}>
                  <div className={`text-xl font-extrabold ${isLowest ? "text-accent-green" : "text-white"}`}>
                    {formatPrice(p.best_price || 0)}
                  </div>
                  {isLowest && <div className="text-xs text-accent-green font-bold mt-0.5">🏆 Cheapest</div>}
                  {best && (
                    <div className="text-xs mt-1 font-medium" style={{ color: platformColor(best.platform) }}>
                      {platformLogo(best.platform)} {best.platform_display}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>

          {/* Rating Row */}
          <tr className="border-b border-border-subtle">
            <td className="p-4 text-gray-400 sticky left-0 bg-card z-10">Rating</td>
            {products.map((p) => {
              const best = getBestPlatform(p);
              const allRatings = p.platforms?.map(pl => pl.rating) || [];
              const avgRating = allRatings.length > 0 ? allRatings.reduce((a, b) => a + b, 0) / allRatings.length : 0;
              const topRating = Math.max(...products.map(pr => {
                const r = pr.platforms?.map(pl => pl.rating) || [];
                return r.length > 0 ? r.reduce((a,b)=>a+b,0)/r.length : 0;
              }));
              const isTop = Math.abs(avgRating - topRating) < 0.05;
              return (
                <td key={p.id} className={`p-4 text-center ${isTop ? "bg-accent-green/5" : ""}`}>
                  <div className={`font-bold text-lg ${isTop ? "text-accent-green" : "text-white"}`}>
                    {avgRating.toFixed(1)}
                  </div>
                  <div className="text-yellow-400 text-sm">{"★".repeat(Math.round(avgRating))}{"☆".repeat(5-Math.round(avgRating))}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {p.platforms?.reduce((sum, pl) => sum + pl.total_reviews, 0).toLocaleString("en-IN")} reviews
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Discount Row */}
          <tr className="border-b border-border-subtle">
            <td className="p-4 text-gray-400 sticky left-0 bg-card z-10">Max Discount</td>
            {products.map((p) => {
              const maxDisc = Math.max(...(p.platforms?.map(pl => pl.discount_percent) || [0]));
              const topDisc = Math.max(...products.map(pr => Math.max(...(pr.platforms?.map(pl=>pl.discount_percent)||[0]))));
              const isTop = maxDisc === topDisc;
              return (
                <td key={p.id} className={`p-4 text-center ${isTop ? "bg-accent-green/5" : ""}`}>
                  <div className={`font-bold text-lg ${isTop ? "text-accent-green" : "text-white"}`}>{maxDisc}%</div>
                  {isTop && <div className="text-xs text-accent-green">Best Deal</div>}
                </td>
              );
            })}
          </tr>

          {/* Platforms available */}
          <tr className="border-b border-border-subtle">
            <td className="p-4 text-gray-400 sticky left-0 bg-card z-10">Platforms</td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-center">
                <div className="flex flex-wrap justify-center gap-1">
                  {[...new Set(p.platforms?.map(pl => pl.platform_display) || [])].slice(0,4).map((pd, i) => (
                    <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-border-subtle text-gray-300">{pd}</span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* Spec rows */}
          {specKeys.map((key, ki) => {
            const values = products.map((p) => getSpec(p, key));
            // Try to detect numeric winner
            const nums = values.map((v) => parseFloat(v.replace(/[^\d.]/g, "")));
            const allNumeric = nums.every((n) => !isNaN(n) && n > 0);
            const maxNum = allNumeric ? Math.max(...nums) : 0;

            return (
              <tr key={ki} className={`border-b border-border-subtle ${ki % 2 === 0 ? "bg-background/30" : ""}`}>
                <td className="p-4 text-gray-400 sticky left-0 bg-card z-10 font-medium">{key}</td>
                {products.map((p, pi) => {
                  const val = getSpec(p, key);
                  const num = nums[pi];
                  const isWinner = allNumeric && num === maxNum && maxNum > 0;
                  return (
                    <td key={p.id} className={`p-4 text-center ${isWinner ? "bg-accent-green/5" : ""}`}>
                      <span className={`text-sm ${isWinner ? "text-accent-green font-semibold" : "text-gray-200"}`}>
                        {val}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* Buy buttons */}
          <tr>
            <td className="p-4 sticky left-0 bg-card z-10" />
            {products.map((p) => {
              const best = getBestPlatform(p);
              return (
                <td key={p.id} className="p-4 text-center">
                  <a
                    href={best?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent-blue hover:bg-blue-600 text-white rounded-full font-semibold text-sm transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Buy {formatPrice(p.best_price || 0)}
                  </a>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
