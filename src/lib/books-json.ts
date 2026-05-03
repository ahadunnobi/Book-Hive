import booksData from "@/data/books.json";
import { Book, mapLegacyBook, RawLegacyBook } from "@/types/book";

/**
 * Server-only utility to fetch and normalize books from the local JSON file.
 * Supports server-side filtering for search and category.
 */
export function getBooksFromJson(query?: string, categoryFilter?: string): Book[] {
  const rawBooks = booksData as RawLegacyBook[];
  
  const q = query?.trim().toLowerCase();
  
  return rawBooks
    .filter((raw) => {
      // Category filter
      if (categoryFilter && categoryFilter !== "All" && raw.category !== categoryFilter) {
        return false;
      }
      
      // Search query filter
      if (q) {
        const titleMatch = raw.title?.toLowerCase().includes(q);
        const authorMatch = raw.author?.toLowerCase().includes(q);
        const tagMatch = raw.tags?.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !authorMatch && !tagMatch) {
          return false;
        }
      }
      
      return true;
    })
    .map((raw, index) => mapLegacyBook(raw, index));
}
