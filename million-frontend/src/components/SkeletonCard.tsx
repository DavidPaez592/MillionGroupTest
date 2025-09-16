export default function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
      <div className="h-56 bg-zinc-200 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-5 w-2/3 bg-zinc-200 animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-zinc-200 animate-pulse rounded" />
        <div className="h-5 w-24 bg-zinc-200 animate-pulse rounded mt-2" />
      </div>
    </div>
  );
}
