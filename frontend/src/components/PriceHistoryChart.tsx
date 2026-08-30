"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend, Dot
} from "recharts";
import { PricePoint } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface Props {
  priceHistory: PricePoint[];
  currentPrice: number;
}

const PLATFORM_COLORS: Record<string, string> = {
  amazon: "#f59e0b",
  flipkart: "#3b82f6",
  croma: "#a855f7",
  reliance_digital: "#10b981",
  bigbasket: "#22c55e",
  zepto: "#f97316",
  blinkit: "#facc15",
  decathlon: "#0078c8",
  swiggy: "#fc8019",
  jiomart: "#1a73e8",
  ajio: "#e91e63",
  cult: "#ff4b00",
  nykaa: "#ff3f6c",
  healthkart: "#00a86b",
  myntra: "#ec4899",
  meesho: "#8b5cf6",
  vijay_sales: "#ef4444",
  tatacliq: "#6366f1",
  swiggy_instamart: "#fc8019",
};

function getPlatformColor(platform: string): string {
  return PLATFORM_COLORS[platform.toLowerCase()] || "#94a3b8";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-3 shadow-2xl min-w-[160px]">
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 text-xs">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-bold text-white">{formatPrice(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function PriceHistoryChart({ priceHistory, currentPrice }: Props) {
  if (!priceHistory || priceHistory.length === 0) return null;

  // Group by date, pivot platforms into columns
  const dateMap = new Map<string, Record<string, number>>();
  for (const pt of priceHistory) {
    if (!dateMap.has(pt.date)) dateMap.set(pt.date, {});
    dateMap.get(pt.date)![pt.platform] = pt.price;
  }

  const platforms = [...new Set(priceHistory.map((p) => p.platform))];
  const chartData = Array.from(dateMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, prices]) => ({
      date: new Date(date).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
      rawDate: date,
      ...prices,
    }));

  const allPrices = priceHistory.map((p) => p.price);
  const minPrice = Math.min(...allPrices);
  const minDate = priceHistory.find((p) => p.price === minPrice);
  const minDateLabel = minDate
    ? new Date(minDate.date).toLocaleDateString("en-IN", { month: "short", year: "2-digit" })
    : "";

  const yMin = Math.floor((minPrice * 0.92) / 1000) * 1000;
  const yMax = Math.ceil((Math.max(...allPrices) * 1.05) / 1000) * 1000;

  return (
    <div className="bg-card border border-border-subtle rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-white text-lg">Price History (24 months)</h3>
        {minDate && (
          <div className="text-xs text-gray-400">
            Lowest ever:{" "}
            <span className="text-accent-green font-bold">{formatPrice(minPrice)}</span>
            {" "}({new Date(minDate.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })})
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-6">Dips mark festival sales (Diwali, Republic Day, Independence Day)</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#64748b", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#1e1e2e" }}
            interval={Math.floor(chartData.length / 6)}
          />
          <YAxis
            domain={[yMin, yMax]}
            tick={{ fill: "#64748b", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: getPlatformColor(value), fontSize: 12, textTransform: "capitalize" }}>
                {value}
              </span>
            )}
          />
          {/* Current price reference line */}
          <ReferenceLine
            y={currentPrice}
            stroke="#3b82f6"
            strokeDasharray="6 3"
            label={{ value: "Current", fill: "#3b82f6", fontSize: 10, position: "insideTopRight" }}
          />
          {/* Lowest price reference line */}
          {minDate && (
            <ReferenceLine
              x={minDateLabel}
              stroke="#10b981"
              strokeDasharray="4 4"
              label={{ value: "Lowest", fill: "#10b981", fontSize: 10, position: "insideTopLeft" }}
            />
          )}
          {platforms.map((platform) => (
            <Line
              key={platform}
              type="monotone"
              dataKey={platform}
              stroke={getPlatformColor(platform)}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
              connectNulls
              name={platform}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
