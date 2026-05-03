import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as bookController from "../controllers/bookController.js";

export const bookRouter = Router();

bookRouter.get("/featured/list", asyncHandler(bookController.getFeaturedBooks));
bookRouter.get("/categories/list", asyncHandler(bookController.getCategories));

bookRouter.get("/", asyncHandler(bookController.getBooks));
bookRouter.get("/:id", asyncHandler(bookController.getBookById));

bookRouter.post("/", asyncHandler(bookController.createBook));
bookRouter.put("/:id", asyncHandler(bookController.updateBook));
bookRouter.delete("/:id", asyncHandler(bookController.deleteBook));
bookRouter.patch("/:id/borrow", asyncHandler(bookController.borrowBook));
bookRouter.patch("/:id/return", asyncHandler(bookController.returnBook));
