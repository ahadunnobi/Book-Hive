import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Book } from "../models/Book.js";
import { connectDb, disconnectDb } from "../config/db.js";
import { buildBooks, bookObjectId } from "./catalog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function writePublicBooks(docs) {
  const repoRoot = path.resolve(__dirname, "../../..");
  const out = path.join(repoRoot, "public", "books.json");
  const payload = docs.map((d) => {
    const o = typeof d.toObject === "function" ? d.toObject() : d;
    const id = o._id.toString();
    return {
      _id: id,
      id,
      title: o.title,
      author: o.author,
      description: o.description,
      category: o.category,
      language: o.language,
      publisher: o.publisher,
      published_year: o.published_year,
      pages: o.pages,
      rating: o.rating,
      available_quantity: o.available_quantity,
      price: o.price,
      image_url: o.image_url,
      isbn: o.isbn,
      featured: o.featured,
      tags: o.tags,
      createdAt: o.createdAt?.toISOString?.() ?? o.createdAt,
      updatedAt: o.updatedAt?.toISOString?.() ?? o.updatedAt,
    };
  });
  await fs.writeFile(out, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Wrote ${payload.length} books to public/books.json`);
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI");
    process.exit(1);
  }

  await connectDb(uri);

  const base = buildBooks();
  const docs = base.map((b, i) => ({ ...b, _id: bookObjectId(i) }));

  await Book.deleteMany({});
  await Book.insertMany(docs);

  const fresh = await Book.find().sort({ title: 1 }).lean();
  await writePublicBooks(fresh);

  await disconnectDb();
  console.log("Seed complete.");
}

await main();
