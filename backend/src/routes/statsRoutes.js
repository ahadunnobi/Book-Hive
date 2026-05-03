import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getStats } from "../controllers/statsController.js";

export const statsRouter = Router();

statsRouter.get("/", asyncHandler(getStats));
