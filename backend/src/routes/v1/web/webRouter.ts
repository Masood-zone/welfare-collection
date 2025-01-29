import { Router } from "express";
import userRoute from "./userRoute";
const webRouter = Router();

webRouter.use("/users", userRoute)


export default webRouter