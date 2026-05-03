"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Book, BookCategory } from "@/types/book";
import { bookCategories } from "@/lib/books";
import { CatalogBookCard } from "./CatalogBookCard";

const FILTERS: Array<"All" | BookCategory> = [
  "All",
  ...bookCategories,
];

type Props = {
  books: Book[];
};

export function BooksCatalog({ books }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof FILTERS)[number]>("All");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (
      cat === "Story" ||
      cat === "Tech" ||
      cat === "Science"
    ) {
      setCategory(cat);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const matchCat = category === "All" || b.category === category;
      const matchQ =
        q === "" || b.title.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [books, category, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          All Books
        </h1>
        <p className="mt-2 text-base-content/70">
          Search live by title and narrow by category.
        </p>
      </div>

      <label className="form-control mx-auto mb-10 w-full max-w-2xl">
        <span className="label-text mb-2 font-medium">Search</span>
        <input
          type="search"
          placeholder="Type a book title..."
          className="input input-bordered input-primary input-lg w-full shadow-sm transition focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </label>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/60">
              Category
            </h2>
            <ul className="menu rounded-box bg-base-100 p-2 shadow-inner">
              {FILTERS.map((f) => (
                <li key={f}>
                  <button
                    type="button"
                    className={category === f ? "active font-semibold" : ""}
                    onClick={() => setCategory(f)}
                  >
                    {f}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/30 p-12 text-center">
              <p className="text-lg font-medium">No books match your filters.</p>
              <p className="mt-2 text-sm text-base-content/60">
                Try another title or pick a different category.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
              {filtered.map((book) => (
                <li key={book.id}>
                  <CatalogBookCard book={book} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
