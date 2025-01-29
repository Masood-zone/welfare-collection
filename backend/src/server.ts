import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { ErrorHandler } from "./middlewares/errorHandler";
import appRouter from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4500;
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api", appRouter);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
