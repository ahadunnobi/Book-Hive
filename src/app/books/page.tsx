import { Suspense } from "react";
import { getAllBooks } from "@/lib/books";
import { BooksCatalog } from "@/components/books/BooksCatalog";

function CatalogFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-base-content/60">Loading catalog…</p>
      </div>
    </div>
  );
}

export default function BooksPage() {
  const books = getAllBooks();

  return (
    <Suspense fallback={<CatalogFallback />}>
      <BooksCatalog books={books} />
    </Suspense>
  );
}
