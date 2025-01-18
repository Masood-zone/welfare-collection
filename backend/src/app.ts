import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRoute from "./routes";
import { AppError } from "./utils/app-error";
import { errorHandler } from "./middleware/errors/error.middleware";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", indexRoute);

// Handle unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Route not found", 404));
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export default app;
