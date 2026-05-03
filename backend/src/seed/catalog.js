import mongoose from "mongoose";
import { BOOK_TRIPLES } from "./bookTriples.js";

/** Royalty-free Unsplash book-related photos (rotated across catalog). */
const UNSPLASH_IDS = [
  "1512820790803-83ca734da794",
  "1555066931-4365d14bab8c",
  "1532012197263-da84d129eaaa",
  "1543002588-bfa74002ed7e",
  "1504639725590-34d0984388bd",
  "1451187580459-43490279c0fa",
  "1476275466078-4007374efbbe",
  "1461749280684-dccba630e2f6",
  "1576086213369-97a306d36557",
  "1524578271613-d550eacf6090",
  "1558494949-ef010cbdcc31",
  "1439405326854-014607f0d800",
];

const PUBLISHERS = [
  "Penguin Press",
  "Random House",
  "HarperCollins",
  "Simon & Schuster",
  "Macmillan",
  "Hachette",
  "O'Reilly Media",
  "Addison-Wesley",
  "W. W. Norton",
  "Vintage Books",
];

const CATEGORY_TAGS = {
  Story: ["fiction", "literary", "narrative"],
  Tech: ["technology", "product", "innovation"],
  Science: ["science", "research", "discovery"],
  Business: ["business", "strategy", "leadership"],
  Biography: ["biography", "memoir", "life"],
  "Self Help": ["habits", "growth", "productivity"],
  History: ["history", "civilization", "culture"],
  Programming: ["programming", "software", "engineering"],
  Psychology: ["psychology", "behavior", "mind"],
  Fiction: ["fiction", "novel", "storytelling"],
};

function tagsFor(category) {
  return CATEGORY_TAGS[category] || ["books", "reading"];
}

function describe(title, category) {
  return `A celebrated ${category.toLowerCase()} read: “${title}” blends clarity, depth, and momentum for curious readers who want substance without fluff.`;
}

/** Deterministic 24-hex ObjectId string for stable seed + public JSON sync. */
export function bookObjectIdHex(index) {
  const n = BigInt(index + 1);
  const hex = n.toString(16).padStart(24, "0").slice(-24);
  return hex;
}

export function bookObjectId(index) {
  return new mongoose.Types.ObjectId(bookObjectIdHex(index));
}

export function buildBooks() {
  return BOOK_TRIPLES.map(([title, author, category], i) => {
    const photo = UNSPLASH_IDS[i % UNSPLASH_IDS.length];
    const year = 1985 + ((i * 17) % 38);
    const pages = 220 + ((i * 13) % 420);
    const rating = Math.round((3.6 + ((i * 0.07) % 1.3)) * 10) / 10;
    const qty = 1 + (i % 14);
    const price = 9.99 + ((i * 3) % 35);
    const featured = i % 4 === 0 || i % 7 === 0;
    const isbn13 = `978${String(1000000000 + i).padStart(10, "0").slice(0, 10)}`;

    return {
      title,
      author,
      description: describe(title, category),
      category,
      language: i % 17 === 0 ? "Spanish" : "English",
      publisher: PUBLISHERS[i % PUBLISHERS.length],
      published_year: year,
      pages,
      rating,
      available_quantity: qty,
      price: Math.round(price * 100) / 100,
      image_url: `https://images.unsplash.com/photo-${photo}?w=600&h=800&fit=crop`,
      isbn: isbn13,
      featured,
      tags: tagsFor(category),
    };
  });
}
