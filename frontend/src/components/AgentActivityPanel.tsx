"use client";

import { motion } from "framer-motion";
import { AgentEvent } from "@/lib/types";
import { Search, DollarSign, MessageSquare, Tag, TrendingUp, Sparkles, CheckCircle2, Globe } from "lucide-react";

const agentConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  search:      { icon: <Search className="w-4 h-4" />,      label: "Search Agent",    color: "#3b82f6" },
  live_search: { icon: <Globe className="w-4 h-4" />,       label: "Live Web Search", color: "#06b6d4" },
  price:       { icon: <DollarSign className="w-4 h-4" />,  label: "Price Analyzer",  color: "#10b981" },
  reviews:     { icon: <MessageSquare className="w-4 h-4" />,label: "Review Scanner", color: "#f59e0b" },
  deals:       { icon: <Tag className="w-4 h-4" />,         label: "Deals Finder",    color: "#a855f7" },
  price_history:{ icon: <TrendingUp className="w-4 h-4" />, label: "History Tracker", color: "#ec4899" },
  ai_ranker:   { icon: <Sparkles className="w-4 h-4" />,    label: "AI Ranker",       color: "#f97316" },
};

interface Props {
  events: AgentEvent[];
  isComplete: boolean;
}

export function AgentActivityPanel({ events, isComplete }: Props) {
  if (events.length === 0 && !isComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 mb-8 relative overflow-hidden"
    >
      {/* Shimmer overlay while loading */}
      {!isComplete && (
        <div className="absolute inset-0 shimmer-holo pointer-events-none" />
      )}

      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <Sparkles className="w-5 h-5 text-accent-blue" />
          {!isComplete && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          )}
        </div>
        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300">
          {isComplete ? "AI Analysis Complete" : "AI Agents Working..."}
        </h3>
        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
          >
            <CheckCircle2 className="w-5 h-5 text-accent-green" />
          </motion.div>
        )}
      </div>

      {/* Agent orbital grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {Object.entries(agentConfig).map(([key, config], idx) => {
          const event = events.find((e) => e.agent === key);
          const progress = event?.progress || 0;
          const isActive = event && event.status === "processing";
          const isDone = event && event.status === "done";

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", delay: idx * 0.08, stiffness: 300 }}
              className="relative"
            >
              <div
                className={`glass-light rounded-xl p-3 text-center transition-all duration-500 relative overflow-hidden ${
                  isDone ? "border border-accent-green/30" : isActive ? "border border-accent-blue/30" : "border border-transparent"
                }`}
              >
                {/* Neon progress bar at bottom */}
                <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-700 ease-out" style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${config.color}, ${config.color}88)`,
                  boxShadow: isActive ? `0 0 8px ${config.color}60, 0 0 16px ${config.color}30` : "none",
                }} />

                {/* Icon */}
                <motion.div
                  className="mx-auto mb-2 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: isDone ? `${config.color}20` : isActive ? `${config.color}15` : "rgba(255,255,255,0.03)",
                    color: isDone || isActive ? config.color : "#4a5568",
                  }}
                  animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : config.icon}
                </motion.div>

                <div className="text-xs font-medium text-gray-400 truncate">{config.label}</div>

                {/* Status text */}
                {event?.message && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-gray-500 mt-1 truncate"
                  >
                    {event.message}
                  </motion.div>
                )}
              </div>

              {/* Active glow ring */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ boxShadow: `0 0 20px ${config.color}15, inset 0 0 20px ${config.color}05` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Completion burst */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-3 border-t border-border-subtle/50"
        >
          <div className="neon-line mb-3" />
          <p className="text-xs text-gray-400 text-center">
            ✨ All 7 AI agents completed analysis across <span className="text-white font-semibold">10+ platforms</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
