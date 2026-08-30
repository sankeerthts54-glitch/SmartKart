export function SkeletonCard() {
  return (
    <div className="bg-card border border-border-subtle rounded-xl p-4">
      <div className="aspect-square mb-4 rounded-lg animate-shimmer bg-gray-800" />
      <div className="space-y-3">
        <div className="h-3 w-1/4 rounded bg-gray-800 animate-shimmer" />
        <div className="h-4 w-full rounded bg-gray-800 animate-shimmer" />
        <div className="h-4 w-2/3 rounded bg-gray-800 animate-shimmer" />
        <div className="pt-2 flex justify-between border-t border-border-subtle/50">
          <div className="h-6 w-1/3 rounded bg-gray-800 animate-shimmer" />
          <div className="h-6 w-1/4 rounded bg-gray-800 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border-subtle">
      <div className="w-16 h-16 rounded bg-gray-800 animate-shimmer shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-gray-800 animate-shimmer" />
        <div className="h-3 w-1/4 rounded bg-gray-800 animate-shimmer" />
      </div>
      <div className="w-24 h-8 rounded bg-gray-800 animate-shimmer" />
    </div>
  );
}
