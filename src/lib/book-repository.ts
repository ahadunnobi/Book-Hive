import booksSeed from "@/data/books.json";
import { getDb } from "@/lib/mongo";
import type { Book } from "@/types/book";

const BOOKS = "books";
const BORROWS = "borrows";

export async function ensureBooksSeeded(): Promise<void> {
  const db = getDb();
  const col = db.collection(BOOKS);
  const n = await col.countDocuments();
  if (n === 0) {
    await col.insertMany(booksSeed as Book[]);
  }
}

function toBook(doc: unknown): Book {
  const o = doc as Book & { _id?: unknown };
  const id = o.id ?? (o._id != null ? String(o._id) : "");
  return {
    id,
    title: o.title,
    author: o.author,
    description: o.description,
    category: o.category,
    available_quantity: o.available_quantity,
    image_url: o.image_url,
    language: o.language,
    publisher: o.publisher,
    published_year: o.published_year,
    pages: o.pages,
    rating: o.rating,
    price: o.price,
    isbn: o.isbn,
    featured: o.featured,
    tags: o.tags,
  };
}

export async function getAllBooks(): Promise<Book[]> {
  await ensureBooksSeeded();
  const db = getDb();
  const docs = await db.collection(BOOKS).find({}).toArray();
  return docs.map(toBook);
}

export async function getBookById(id: string): Promise<Book | undefined> {
  await ensureBooksSeeded();
  const db = getDb();
  const doc = await db.collection(BOOKS).findOne({ id });
  return doc ? toBook(doc) : undefined;
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
  await ensureBooksSeeded();
  const db = getDb();
  const col = db.collection(BOOKS);
  const updated = await col.findOneAndUpdate(
    { id: bookId, available_quantity: { $gt: 0 } },
    { $inc: { available_quantity: -1 } },
    { returnDocument: "after" },
  );
  if (!updated) {
    return { ok: false, error: "No copies available or book not found." };
  }
  const book = toBook(updated);
  await db.collection(BORROWS).insertOne({
    userId,
    bookId,
    createdAt: new Date(),
  });
  return { ok: true, remaining: book.available_quantity };
}

export async function getBorrowCount(userId: string): Promise<number> {
  const db = getDb();
  return db.collection(BORROWS).countDocuments({ userId });
}
