import { Suspense } from "react";
import { getBooksFromJson } from "@/lib/books-json";
import { BooksCatalog } from "@/components/books/BooksCatalog";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;

  // Synchronous server-side data loading with filters applied
  const books = getBooksFromJson(q, category);

  return (
    <Suspense key={`${q}-${category}`}>
      <BooksCatalog books={books} initialQuery={q || ""} />
    </Suspense>
  );
}
