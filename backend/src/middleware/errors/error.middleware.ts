import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/app-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    // Send structured error response
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err.errors && { errors: err.errors }), // Include errors array if available
    });
  }

  // Handle unhandled errors
  console.error("Unhandled Error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};
