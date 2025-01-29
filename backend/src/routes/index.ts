import {Router} from "express";
import v1Router from "./v1/subRouter";

const appRouter = Router();

appRouter.get("/", (req, res) => {
  res.send("Hello from App");
});

appRouter.use("/v1", v1Router);
// Import routes


export default appRouter;