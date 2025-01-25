import { Router } from "express";
import * as analytics from "../../../controllers/analytics.controller";
import { authenticateAdmin } from "../../../middleware/auth.middleware";

const analyticsRoutes = Router();

analyticsRoutes.get("/", authenticateAdmin, analytics.getAllAnalytics);

export default analyticsRoutes;
