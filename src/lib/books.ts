import type { Book } from "@/types/book";

export const bookCategories: Book["category"][] = ["Story", "Tech", "Science"];

export {
  borrowBook,
  ensureBooksSeeded,
  getAllBooks,
  getBookById,
  getBorrowCount,
  getFeaturedBooks,
} from "@/lib/book-repository";
