import { bookCategories } from "@/lib/book-categories";

export type BookCategory =
  | "Anthology"
  | "Art"
  | "Biography"
  | "Business"
  | "Drama"
  | "Essays"
  | "Fiction"
  | "History"
  | "Mythology"
  | "Novels"
  | "Philosophy"
  | "Poetry"
  | "Programming"
  | "Psychology"
  | "Religion"
  | "Science"
  | "Self Help"
  | "Story"
  | "Tech"
  | "Uncategorized";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  category: BookCategory;
  available_quantity: number;
  image_url: string;
  language?: string;
  publisher?: string;
  published_year?: number;
  pages?: number;
  rating?: number;
  price?: number;
  isbn?: string;
  featured?: boolean;
  tags?: string[];
};

export interface RawLegacyBook {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  description: string;
  category: string;
  available_quantity: number;
  image_url: string;
  language?: string;
  publisher?: string;
  published_year?: number;
  pages?: number;
  rating?: number;
  price?: number;
  isbn?: string;
  featured?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export function mapLegacyBook(raw: RawLegacyBook, index: number): Book {
  const id = raw.id ?? raw._id ?? String(index);
  const category = bookCategories.includes(raw.category as BookCategory)
    ? (raw.category as BookCategory)
    : "Uncategorized";

  // Handle potential encoding issues in description (e.g., double question marks instead of quotes)
  const cleanDescription = (raw.description || "")
    .replace(/\?{2}/g, '"')
    .trim();

  return {
    id,
    title: raw.title?.trim() || "Untitled",
    author: raw.author?.trim() || "Unknown",
    description: cleanDescription,
    category,
    available_quantity: Math.max(0, raw.available_quantity ?? 0),
    image_url: raw.image_url || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=800&fit=crop",
    language: raw.language,
    publisher: raw.publisher,
    published_year: raw.published_year,
    pages: raw.pages,
    rating: raw.rating,
    price: raw.price,
    isbn: raw.isbn,
    featured: raw.featured ?? false,
    tags: raw.tags ?? [],
  };
}
