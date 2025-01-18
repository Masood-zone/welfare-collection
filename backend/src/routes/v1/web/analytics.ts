import { Router } from "express";
import { getAllAnalytics } from "../../../controllers/analytics.controller";
import { authenticateAdmin } from "../../../middleware/auth.middleware";

const analyticsRoutes = Router();

analyticsRoutes.get("/", authenticateAdmin, getAllAnalytics);

export default analyticsRoutes;
