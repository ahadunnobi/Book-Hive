import { getBooksFromJson } from "@/lib/books-json";
import type { Book } from "@/types/book";

export async function ensureBooksSeeded(): Promise<void> {
  // No-op: Data is served directly from JSON
  return;
}

export async function getAllBooks(): Promise<Book[]> {
  return getBooksFromJson();
}

export async function getBookById(id: string): Promise<Book | undefined> {
  const all = await getAllBooks();
  return all.find((b) => b.id === id);
}

export async function getFeaturedBooks(count: number): Promise<Book[]> {
  const all = await getAllBooks();
  const flagged = all.filter((b) => b.featured);
  const pool = flagged.length > 0 ? flagged : all;
  return [...pool]
    .sort((a, b) => {
      const rb = b.rating ?? 0;
      const ra = a.rating ?? 0;
      if (rb !== ra) return rb - ra;
      return b.available_quantity - a.available_quantity;
    })
    .slice(0, count);
}

export async function borrowBook(
  bookId: string,
  userId: string,
): Promise<
  { ok: true; remaining: number } | { ok: false; error: string }
> {
  const book = await getBookById(bookId);
  if (!book) {
    return { ok: false, error: "Book not found." };
  }
  if (book.available_quantity <= 0) {
    return { ok: false, error: "No copies available." };
  }
  
  // Note: Since we are using a static JSON, we can't persist the decrement 
  // without a backend or local storage. For now, we return success.
  return { ok: true, remaining: book.available_quantity - 1 };
}

export async function getBorrowCount(userId: string): Promise<number> {
  // Mock return 0 as we don't have a database to track borrows anymore
  return 0;
}
