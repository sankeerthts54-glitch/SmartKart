"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AgentActivityPanel } from "@/components/AgentActivityPanel";
import { ResultsGrid } from "@/components/ResultsGrid";
import { Product, AgentEvent } from "@/lib/types";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Search, AlertCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor">&nbsp;</span>}
    </span>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!query) return;
    setEvents([]);
    setProducts([]);
    setIsComplete(false);
    setError(null);

    const es = new EventSource(`${API}/api/search?q=${encodeURIComponent(query)}`);
    esRef.current = es;

    es.onmessage = (e) => {
      try {
        const data: AgentEvent = JSON.parse(e.data);
        if (data.agent === "complete") {
          try {
            const parsed: Product[] = JSON.parse(data.message);
            setProducts(parsed);
          } catch {
            setProducts([]);
          }
          setIsComplete(true);
          es.close();
        } else {
          setEvents((prev) => {
            const idx = prev.findIndex((ev) => ev.agent === data.agent);
            if (idx >= 0) {
              const next = [...prev];
              next[idx] = data;
              return next;
            }
            return [...prev, data];
          });
        }
      } catch { /* ignore */ }
    };

    es.onerror = () => {
      es.close();
      if (!isComplete) setError("Could not connect to backend. Is it running on port 8000?");
    };

    return () => { es.close(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Search title with typewriter */}
      {query && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Search className="w-6 h-6 text-accent-blue" />
            </motion.div>
            <h1 className="text-3xl font-extrabold">
              Results for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                <TypewriterText text={`"${query}"`} />
              </span>
            </h1>
          </div>
          <div className="neon-line w-32 mt-3" />
        </motion.div>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-6 p-4 rounded-xl glass border border-red-500/30 text-red-400 text-sm flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agent panel */}
      <AgentActivityPanel events={events} isComplete={isComplete} />

      {/* Results */}
      <AnimatePresence>
        {isComplete && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
            className="mt-8"
          >
            <ScrollReveal direction="up">
              <div className="mb-4 flex items-center gap-3 text-sm text-gray-400">
                <span>Found</span>
                <motion.span
                  className="text-white font-bold text-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {products.length}
                </motion.span>
                <span>results across platforms</span>
                <div className="flex-1 neon-line" />
              </div>
            </ScrollReveal>
            <ResultsGrid products={products} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* No query state */}
      {!query && (
        <ScrollReveal direction="scale">
          <div className="mt-16 text-center">
            <motion.div
              className="text-7xl mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ⌨️
            </motion.div>
            <p className="text-xl font-bold text-white mb-3">What are you looking for?</p>
            <p className="text-sm text-gray-400">
              Type a product name in the search bar above to compare prices across the web.
            </p>
          </div>
        </ScrollReveal>
      )}

      {/* No results */}
      {isComplete && products.length === 0 && !error && query && (
        <ScrollReveal direction="scale">
          <div className="mt-16 text-center">
            <motion.div
              className="text-7xl mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🔍
            </motion.div>
            <p className="text-xl font-bold text-white mb-3">No results found</p>
            <p className="text-sm text-gray-400">
              Try searching for: <span className="text-accent-blue">iPhone 15</span>,{" "}
              <span className="text-accent-purple">Sony WH-1000XM5</span>,{" "}
              <span className="text-accent-green">MacBook Air</span>
            </p>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="space-y-4">
            <div className="h-10 skeleton rounded-xl w-72" />
            <div className="h-48 skeleton rounded-2xl" />
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
