"use client";

export function HeaderBar({
  query,
  onQueryChange,
  view,
  onToggleView,
  onAdd,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  view: "grid" | "list";
  onToggleView: () => void;
  onAdd: () => void;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold text-slate-900">Book Library</h1>
          <p className="text-sm text-slate-500">Manage your collection</p>
        </div>

        <div className="hidden md:block">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by title or author..."
            className="w-72 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <button
          onClick={onToggleView}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
        >
          {view === "grid" ? "List" : "Grid"}
        </button>

        <button
          onClick={onAdd}
          className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
        >
          Add New Book
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-4 md:hidden">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
        />
      </div>
    </header>
  );
}
