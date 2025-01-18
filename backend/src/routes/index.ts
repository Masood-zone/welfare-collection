import { Router } from "express";
import v1Routes from "./v1";

const indexRoute = Router();

// Version 1 API
indexRoute.use("/v1", v1Routes);

export default indexRoute;
