"use client";

export function BookCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4 animate-pulse">
        {/* Cover */}
        <div className="h-24 w-16 shrink-0 rounded-lg bg-slate-200" />

        <div className="min-w-0 flex-1">
          {/* Title + Category */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200" />
            </div>

            <div className="h-6 w-16 rounded-full bg-slate-200" />
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 w-3 rounded bg-slate-200" />
            ))}
            <div className="ml-2 h-3 w-10 rounded bg-slate-200" />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            <div className="h-8 w-16 rounded-lg bg-slate-200" />
            <div className="h-8 w-16 rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
