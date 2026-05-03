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
