"use client";

export function RatingStars({ value }: { value: number }) {
  const stars = Math.round(value);

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating ${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const isActive = i < stars;

        return (
          <span
            key={i}
            className={[
              "text-sm",
              isActive ? "text-yellow-500" : "text-slate-300",
            ].join(" ")}
          >
            ★
          </span>
        );
      })}

      <span className="ml-1 text-xs text-slate-500">{value.toFixed(1)}</span>
    </div>
  );
}
