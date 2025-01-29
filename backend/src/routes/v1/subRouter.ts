import { Router } from "express";
import webRouter from "./web/webRouter";

const v1Router = Router();

v1Router.use("/web",webRouter)

export default v1Router;