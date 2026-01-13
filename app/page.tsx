"use client";

import { useEffect, useMemo, useState } from "react";
import type { Book, BookInput } from "@/lib/types";
import { booksApi } from "@/lib/api";
import { HeaderBar } from "@/components/header-bar";
import { BookCard } from "@/components/book-card";
import { BookRow } from "@/components/book-row";
import { BookFormModal } from "@/components/book-form-modal";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { BookCardSkeleton } from "@/components/book-card-skeleton";
import { BookRowSkeleton } from "@/components/book-row-skeleton";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<Book | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Book | null>(null);

  // Load books from API
  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await booksApi.list();
      setBooks(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  // Fetch books on first render
  useEffect(() => {
    load();
  }, []);

  // Filter books only when books or query changes
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [books, query]);

  // Open create book form
  const openCreate = () => {
    setSelected(null);
    setFormMode("create");
    setFormOpen(true);
  };
  // Open edit book form
  const openEdit = (b: Book) => {
    setSelected(b);
    setFormMode("edit");
    setFormOpen(true);
  };
  // Open delete book confirm dialog
  const openDelete = (b: Book) => {
    setToDelete(b);
    setConfirmOpen(true);
  };
  // Handle form submission
  const submitForm = async (payload: BookInput) => {
    setMutating(true);
    setError(null);

    try {
      if (formMode === "create") {
        const created = await booksApi.create(payload);
        setBooks((prev) => [created, ...prev]);
      } else if (formMode === "edit" && selected) {
        const updated = await booksApi.update(selected.id, payload);
        setBooks((prev) =>
          prev.map((x) => (x.id === selected.id ? updated : x))
        );
      }
      setFormOpen(false);
    } catch (e: any) {
      setError(e?.message || "Save failed");
    } finally {
      setMutating(false);
    }
  };
  // Handle delete confirmation
  const confirmDelete = async () => {
    if (!toDelete) return;
    setMutating(true);
    setError(null);

    try {
      await booksApi.remove(toDelete.id);
      setBooks((prev) => prev.filter((x) => x.id !== toDelete.id));
      setConfirmOpen(false);
      setToDelete(null);
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    } finally {
      setMutating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderBar
        query={query}
        onQueryChange={setQuery}
        view={view}
        onToggleView={() => setView((v) => (v === "grid" ? "list" : "grid"))}
        onAdd={openCreate}
      />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
            <button
              onClick={load}
              className="ml-3 underline decoration-red-400 underline-offset-2"
            >
              Retry
            </button>
          </div>
        ) : null}

        {loading ? (
          view === "grid" ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <BookRowSkeleton key={i} />
              ))}
            </div>
          )
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No books found"
            subtitle="Try a different search, or add a new book."
          />
        ) : view === "grid" ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <BookCard
                key={b.id}
                book={b}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((b) => (
              <BookRow
                key={b.id}
                book={b}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>
        )}
      </main>

      <BookFormModal
        open={formOpen}
        mode={formMode}
        initial={selected}
        onClose={() => setFormOpen(false)}
        onSubmit={submitForm}
        loading={mutating}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete book?"
        message={`This will permanently remove "${
          toDelete?.title ?? ""
        }" from your library.`}
        confirmText="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        loading={mutating}
      />
    </div>
  );
}
