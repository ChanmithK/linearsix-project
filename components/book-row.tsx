"use client";

import type { Book } from "@/lib/types";
import { RatingStars } from "./rating-stars";

export function BookRow({
  book,
  onEdit,
  onDelete,
}: {
  book: Book;
  onEdit: (b: Book) => void;
  onDelete: (b: Book) => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3">
      <div className="h-16 w-12 overflow-hidden rounded-md bg-slate-100">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://via.placeholder.com/120x160?text=No+Cover";
          }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">
              {book.title}
            </p>
            <p className="truncate text-sm text-slate-600">{book.author}</p>
          </div>
          <span className="hidden mt-6 sm:inline rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
            {book.category}
          </span>
        </div>
        <div className="mt-1">
          <RatingStars value={book.rating} />
        </div>
      </div>

      <div className="flex gap-2">
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
  );
}
