"use client";

import type { Book } from "@/lib/types";
import { RatingStars } from "./rating-stars";

export function BookCard({
  book,
  onEdit,
  onDelete,
}: {
  book: Book;
  onEdit: (b: Book) => void;
  onDelete: (b: Book) => void;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex gap-4">
        <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/160x240?text=No+Cover";
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900 max-w-50 sm:max-w-none">
                {book.title}
              </h3>
              <p className="truncate text-sm text-slate-600">{book.author}</p>
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
              {book.category}
            </span>
          </div>

          <div className="mt-2">
            <RatingStars value={book.rating} />
          </div>

          <div className="mt-3 flex gap-2 opacity-100">
            <button
              onClick={() => onEdit(book)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book)}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
