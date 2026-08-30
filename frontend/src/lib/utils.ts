import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format number as Indian rupee string: ₹62,999 */
export function formatPrice(n: number): string {
  if (!n && n !== 0) return "—";
  return "₹" + n.toLocaleString("en-IN");
}

/** Format large numbers with Indian comma system */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

/** Per-platform brand color */
export function platformColor(platform: string): string {
  const map: Record<string, string> = {
    amazon: "#f59e0b",
    flipkart: "#3b82f6",
    croma: "#a855f7",
    reliance_digital: "#10b981",
    vijay_sales: "#ef4444",
    tatacliq: "#6366f1",
    samsung_shop: "#1d4ed8",
    oneplus_shop: "#dc2626",
    bigbasket: "#22c55e",
    zepto: "#f97316",
    blinkit: "#facc15",
    myntra: "#ec4899",
    meesho: "#8b5cf6",
    decathlon: "#0078c8",
    swiggy: "#fc8019",
    jiomart: "#1a73e8",
    ajio: "#e91e63",
    snapdeal: "#e40000",
    cult: "#ff4b00",
    nykaa: "#ff3f6c",
    healthkart: "#00a86b",
    amazon_fresh: "#00a650",
    swiggy_instamart: "#fc8019",
  };
  return map[platform?.toLowerCase()] || "#94a3b8";
}

/** Short emoji/label for each platform */
export function platformLogo(platform: string): string {
  const map: Record<string, string> = {
    amazon: "📦",
    flipkart: "🛒",
    croma: "🔵",
    reliance_digital: "🟢",
    vijay_sales: "🔴",
    tatacliq: "⭕",
    samsung_shop: "🔷",
    oneplus_shop: "🔺",
    bigbasket: "🧺",
    zepto: "⚡",
    blinkit: "💛",
    myntra: "👗",
    meesho: "💜",
    decathlon: "🏅",
    swiggy: "🟠",
    jiomart: "🔹",
    ajio: "👟",
    snapdeal: "🟥",
    cult: "🏋️",
    nykaa: "💄",
    healthkart: "💊",
    amazon_fresh: "🌿",
    swiggy_instamart: "🟠",
  };
  return map[platform?.toLowerCase()] || "🏪";
}

/** Color for buy recommendation badge */
export function getBuyRecommendationColor(rec?: string): string {
  if (!rec) return "#94a3b8";
  if (rec === "buy_now") return "#10b981";
  if (rec === "good_deal") return "#3b82f6";
  if (rec === "consider_waiting") return "#f59e0b";
  return "#94a3b8";
}
