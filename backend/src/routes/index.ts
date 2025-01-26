import { Router } from "express";
import webRoute from "./v1/web";

const mainRouter = Router();

// Web routes under API v1
mainRouter.use("/web", webRoute);

export default mainRouter;
