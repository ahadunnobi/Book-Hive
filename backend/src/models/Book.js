import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true, default: "English" },
    publisher: { type: String, required: true, trim: true },
    published_year: { type: Number, required: true, min: 1000, max: 2100 },
    pages: { type: Number, required: true, min: 1 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    available_quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    image_url: { type: String, required: true },
    isbn: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

bookSchema.index({ title: "text", author: "text", tags: "text" });
bookSchema.index({ category: 1, featured: 1, language: 1 });

export const Book = mongoose.model("Book", bookSchema);
