import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRoute from "./routes";
import { globalErrorHandler } from "./middleware/errors/error.middleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", indexRoute);

// Global error handler
app.use(globalErrorHandler);

export default app;
