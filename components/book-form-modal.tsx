"use client";

import { useEffect, useMemo, useState } from "react";
import type { Book, BookInput } from "@/lib/types";
import { bookSchema, type BookFormValues } from "@/lib/validators";

function toNumber(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export function BookFormModal({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  mode: "create" | "edit";
  initial?: Book | null;
  onClose: () => void;
  onSubmit: (payload: BookInput) => void;
  loading?: boolean;
}) {
  // Set default values based on mode and initial book
  const defaults = useMemo<BookFormValues>(() => {
    if (mode === "edit" && initial) {
      return {
        title: initial.title,
        author: initial.author,
        category: initial.category,
        coverUrl: initial.coverUrl,
        rating: initial.rating,
      };
    }
    return { title: "", author: "", category: "", coverUrl: "", rating: 4 };
  }, [mode, initial]);

  const [values, setValues] = useState<BookFormValues>(defaults);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update values when initial changes
  useEffect(() => {
    if (mode === "edit" && initial) {
      setValues({
        title: initial.title,
        author: initial.author,
        category: initial.category,
        coverUrl: initial.coverUrl,
        rating: initial.rating,
      });
    } else if (mode === "create") {
      setValues({
        title: "",
        author: "",
        category: "",
        coverUrl: "",
        rating: 4,
      });
    }
  }, [mode, initial]);

  if (!open) return null;

  // Handle form submission
  const submit = () => {
    const parsed = bookSchema.safeParse(values);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string | undefined;
        if (key && !map[key]) map[key] = issue.message;
      }
      setErrors(map);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  };

  // Update values state
  const set = <K extends keyof BookFormValues>(
    key: K,
    val: BookFormValues[K]
  ) => {
    setValues((p) => ({ ...p, [key]: val }));
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">
            {mode === "create" ? "Add New Book" : "Edit Book"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <Field
            label="Title"
            value={values.title}
            onChange={(v) => set("title", v)}
            error={errors.title}
            placeholder="Eg: The Pragmatic Programmer"
          />
          <Field
            label="Author"
            value={values.author}
            onChange={(v) => set("author", v)}
            error={errors.author}
            placeholder="Eg: Andrew Hunt"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field
              label="Category"
              value={values.category}
              onChange={(v) => set("category", v)}
              error={errors.category}
              placeholder="Eg: Fiction"
            />
            <Field
              label="Rating (0 - 5)"
              value={String(values.rating)}
              onChange={(v) => set("rating", toNumber(v) as any)}
              error={errors.rating}
              placeholder="4.5"
              inputMode="decimal"
            />
          </div>
          <Field
            label="Cover URL"
            value={values.coverUrl}
            onChange={(v) => set("coverUrl", v)}
            error={errors.coverUrl}
            placeholder="https://..."
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : mode === "create"
              ? "Add Book"
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={[
          "w-full rounded-xl border px-3 py-2 text-sm outline-none",
          error
            ? "border-red-300 focus:border-red-400"
            : "border-slate-200 focus:border-slate-400",
        ].join(" ")}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
