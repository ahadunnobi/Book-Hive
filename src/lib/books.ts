import booksData from "@/data/books.json";
import type { Book } from "@/types/book";

const books = booksData as Book[];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

export function getFeaturedBooks(count = 4): Book[] {
  return [...books]
    .sort((a, b) => b.available_quantity - a.available_quantity)
    .slice(0, count);
}

export const bookCategories: Book["category"][] = ["Story", "Tech", "Science"];
