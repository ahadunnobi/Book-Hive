"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Book, BookCategory } from "@/types/book";
import { bookCategories } from "@/lib/book-categories";
import { CatalogBookCard } from "./CatalogBookCard";
import { BlindWrapper } from "./BlindWrapper";

const FILTERS: Array<"All" | BookCategory> = ["All", ...bookCategories];

type Props = {
  books: Book[];
  initialQuery: string;
};

export function BooksCatalog({ books, initialQuery }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  const category: (typeof FILTERS)[number] = (() => {
    const raw = searchParams.get("category");
    if (raw && bookCategories.includes(raw as BookCategory)) {
      return raw as BookCategory;
    }
    return "All";
  })();

  // Debounced URL update for search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      
      // Keep category if it exists
      const currentCategory = searchParams.get("category");
      if (currentCategory) {
        params.set("category", currentCategory);
      }

      router.push(`/books?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query, router, searchParams]);

  const setCategory = (next: (typeof FILTERS)[number]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") {
      params.delete("category");
    } else {
      params.set("category", next);
    }
    
    router.push(`/books?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          The <span className="text-primary italic">Hive</span> Collection
        </h1>
        <p className="mt-4 text-base-content/60">
          Explore our curated legacy archives. Showing {books.length} result{books.length !== 1 ? "s" : ""}.
        </p>
      </div>

      <label className="form-control mx-auto mb-10 w-full max-w-2xl">
        <span className="label-text mb-2 font-bold uppercase tracking-widest text-primary/70">Search Archive</span>
        <input
          type="search"
          placeholder="Search by title, author, or keywords..."
          className="input input-bordered input-primary input-lg w-full rounded-2xl shadow-xl transition-all focus:scale-[1.02]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </label>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="sticky top-24 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl">
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-primary">
              Categories
            </h2>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {FILTERS.map((f) => (
                <li key={f}>
                  <button
                    type="button"
                    className={`btn btn-sm w-full justify-start rounded-xl border-none font-medium transition-all ${
                      category === f 
                        ? "btn-primary shadow-lg shadow-primary/20" 
                        : "btn-ghost text-base-content/60 hover:bg-primary/10 hover:text-primary"
                    }`}
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
          {books.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-base-300 bg-base-200/20 py-24 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <p className="text-xl font-bold">No results found</p>
              <p className="mt-2 text-sm text-base-content/50">
                Try a different search or category
              </p>
            </div>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-1 xl:grid-cols-2">
              {books.map((book, i) => (
                <li key={`${book.id}-${i}`}>
                  <BlindWrapper index={i}>
                    <CatalogBookCard book={book} />
                  </BlindWrapper>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
