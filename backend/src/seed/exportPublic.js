/**
 * Writes public/books.json from catalog without touching MongoDB.
 * Use when you only need static JSON for the Next.js app.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { buildBooks, bookObjectIdHex } from "./catalog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const now = new Date().toISOString();
  const base = buildBooks();
  const payload = base.map((b, i) => {
    const id = bookObjectIdHex(i);
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(`Invalid deterministic id at index ${i}`);
    }
    return {
      _id: id,
      id,
      ...b,
      createdAt: now,
      updatedAt: now,
    };
  });

  const repoRoot = path.resolve(__dirname, "../../..");
  const out = path.join(repoRoot, "public", "books.json");
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Wrote ${payload.length} books to public/books.json`);
}

await main();
