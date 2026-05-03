import { Book } from "../models/Book.js";

export async function getStats(req, res) {
  const [totalBooks, categoriesAgg, qtyAgg] = await Promise.all([
    Book.countDocuments(),
    Book.distinct("category"),
    Book.aggregate([
      {
        $group: {
          _id: null,
          availableBooks: { $sum: "$available_quantity" },
        },
      },
    ]),
  ]);

  const availableBooks = qtyAgg[0]?.availableBooks ?? 0;

  res.json({
    success: true,
    totalBooks,
    totalCategories: categoriesAgg.length,
    availableBooks,
  });
}
