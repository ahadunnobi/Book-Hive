import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { bookRouter } from "./routes/bookRoutes.js";
import { statsRouter } from "./routes/statsRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json({ limit: "64kb" }));

  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
  }

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api/", limiter);

  app.get("/health", (req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/books", bookRouter);
  app.use("/api/stats", statsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
