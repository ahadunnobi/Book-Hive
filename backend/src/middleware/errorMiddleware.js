export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export function notFoundHandler(req, res, next) {
  next(new AppError(`Not found: ${req.method} ${req.originalUrl}`, 404));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors || {})
      .map((e) => e.message)
      .join(" ");
    return res.status(400).json({ success: false, message: message || "Validation failed" });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid id or value" });
  }

  const status = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const message =
    status === 500 && process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error";

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message,
  });
}
