export type BookCategory = "Story" | "Tech" | "Science";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  category: BookCategory;
  available_quantity: number;
  image_url: string;
};
