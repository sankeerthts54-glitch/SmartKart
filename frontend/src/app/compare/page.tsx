"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Product } from "@/lib/types";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",").filter(Boolean) || [];
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) { setLoading(false); return; }
    fetch(`${API}/api/compare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_ids: ids }),
    })
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load comparison data.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  if (ids.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">⚖️</div>
        <p className="text-xl font-semibold text-white mb-2">No products selected</p>
        <p className="text-gray-400 mb-6">Go to search results and select 2–3 products to compare.</p>
        <Link href="/" className="px-6 py-3 bg-accent-blue text-white rounded-full font-semibold hover:bg-blue-600 transition">
          Back to Search
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-card rounded w-64" />
          <div className="h-96 bg-card rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-red-400">{error}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link href="javascript:history.back()" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6 transition">
        <ChevronLeft className="w-4 h-4" /> Back to results
      </Link>
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
        ⚖️ Product Comparison
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        Comparing {products.length} products side-by-side — green highlights the winner per row.
      </p>

      <div className="bg-card border border-border-subtle rounded-2xl shadow-2xl overflow-hidden">
        <ComparisonTable products={products} />
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse h-96 bg-card rounded-xl" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
