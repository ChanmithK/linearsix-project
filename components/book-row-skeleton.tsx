"use client";

export function BookRowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex w-full items-center gap-4 animate-pulse">
        {/* Cover */}
        <div className="h-16 w-12 shrink-0 rounded-md bg-slate-200" />

        {/* Text */}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="h-3 w-1/3 rounded bg-slate-200" />
          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 w-3 rounded bg-slate-200" />
            ))}
            <div className="ml-2 h-3 w-10 rounded bg-slate-200" />
          </div>
        </div>

        {/* Actions */}
        <div className="hidden sm:flex gap-2">
          <div className="h-8 w-16 rounded-lg bg-slate-200" />
          <div className="h-8 w-16 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
