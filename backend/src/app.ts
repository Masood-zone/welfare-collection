import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRoute from "./routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", indexRoute);

export default app;
