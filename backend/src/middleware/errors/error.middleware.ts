import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/app-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log all errors for diagnostics
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    ...(err instanceof AppError && { errors: err.errors }),
  });

  // Prevent double response
  if (res.headersSent) {
    return next(err);
  }

  // Handle custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err.errors && { errors: err.errors }), // Include additional details if available
    });
  }

  // Fallback for unexpected errors
  res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};
