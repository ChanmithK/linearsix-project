import type { Book, BookInput } from "./types";

const BASE_URL = "http://localhost:3001";

// Helper function to make HTTP requests
async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// API client for books
export const booksApi = {
  list: () => http<Book[]>(`${BASE_URL}/books`),
  create: (payload: BookInput) =>
    http<Book>(`${BASE_URL}/books`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id: number, payload: BookInput) =>
    http<Book>(`${BASE_URL}/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  remove: (id: number) =>
    http<void>(`${BASE_URL}/books/${id}`, { method: "DELETE" }),
};
