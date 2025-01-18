import { Router } from "express";
import userRoutes from "./user";

const route = Router();

// Define feature-specific sub-routes
route.use("/user", userRoutes);

export default route;
