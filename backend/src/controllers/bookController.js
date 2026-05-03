import mongoose from "mongoose";
import { Book } from "../models/Book.js";
import { AppError } from "../middleware/errorMiddleware.js";

function serializeBook(doc) {
  const o = doc.toObject ? doc.toObject() : { ...doc };
  const id = o._id?.toString?.() ?? String(o._id);
  // eslint-disable-next-line no-unused-vars
  const { _id, __v, ...rest } = o;
  return {
    _id: id,
    id,
    ...rest,
    createdAt: o.createdAt?.toISOString?.() ?? o.createdAt,
    updatedAt: o.updatedAt?.toISOString?.() ?? o.updatedAt,
  };
}

function parseBool(v) {
  if (v === undefined || v === null || v === "") return null;
  if (v === true || v === false) return v;
  const s = String(v).toLowerCase();
  if (s === "true") return true;
  if (s === "false") return false;
  return null;
}

export async function getBooks(req, res) {
  const page = Math.max(1, parseInt(String(req.query.page || "1"), 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit || "12"), 10) || 12));
  const search = String(req.query.search || "").trim();
  const category = String(req.query.category || "").trim();
  const language = String(req.query.language || "").trim();
  const featured = parseBool(req.query.featured);
  const sort = String(req.query.sort || "rating_desc");

  const filter = {};
  if (category) filter.category = category;
  if (language) filter.language = language;
  if (featured === true || featured === false) filter.featured = featured;

  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ title: rx }, { author: rx }, { tags: rx }];
  }

  let sortObj = { rating: -1, title: 1 };
  switch (sort) {
    case "year_desc":
      sortObj = { published_year: -1, title: 1 };
      break;
    case "title_asc":
      sortObj = { title: 1 };
      break;
    case "rating_desc":
    default:
      sortObj = { rating: -1, title: 1 };
      break;
  }

  const skip = (page - 1) * limit;

  const [total, rows] = await Promise.all([
    Book.countDocuments(filter),
    Book.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
  ]);

  res.json({
    success: true,
    total,
    page,
    limit,
    books: rows.map(serializeBook),
  });
}

export async function getBookById(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid book id", 400);
  }
  const book = await Book.findById(id).lean();
  if (!book) throw new AppError("Book not found", 404);
  res.json({ success: true, book: serializeBook(book) });
}

export async function getFeaturedBooks(req, res) {
  const raw = parseInt(String(req.query.limit || "8"), 10);
  const limit = Math.min(12, Math.max(4, Number.isFinite(raw) ? raw : 8));

  const books = await Book.find({ featured: true })
    .sort({ rating: -1, title: 1 })
    .limit(limit)
    .lean();

  res.json({
    success: true,
    limit,
    books: books.map(serializeBook),
  });
}

export async function getCategories(req, res) {
  const categories = await Book.distinct("category");
  categories.sort((a, b) => a.localeCompare(b));
  res.json({ success: true, categories });
}

export async function createBook(req, res) {
  const book = await Book.create(req.body);
  res.status(201).json({ success: true, book: serializeBook(book) });
}

export async function updateBook(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid book id", 400);
  }
  const book = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!book) throw new AppError("Book not found", 404);
  res.json({ success: true, book: serializeBook(book) });
}

export async function deleteBook(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid book id", 400);
  }
  const book = await Book.findByIdAndDelete(id).lean();
  if (!book) throw new AppError("Book not found", 404);
  res.json({ success: true, message: "Book deleted" });
}

export async function borrowBook(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid book id", 400);
  }
  const book = await Book.findById(id);
  if (!book) throw new AppError("Book not found", 404);
  if (book.available_quantity <= 0) {
    throw new AppError("No copies available to borrow", 409);
  }
  book.available_quantity -= 1;
  await book.save();
  res.json({ success: true, book: serializeBook(book) });
}

export async function returnBook(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid book id", 400);
  }
  const book = await Book.findById(id);
  if (!book) throw new AppError("Book not found", 404);
  book.available_quantity += 1;
  await book.save();
  res.json({ success: true, book: serializeBook(book) });
}
