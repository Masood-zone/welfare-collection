import { Router } from "express";
import webRoutes from "./v1/web";

const mainRouter = Router();

// Web routes under API v1
mainRouter.use("/web", webRoutes);

export default mainRouter;
