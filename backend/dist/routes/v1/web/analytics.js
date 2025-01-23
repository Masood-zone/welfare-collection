"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../../../controllers/analytics.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const analyticsRoutes = (0, express_1.Router)();
analyticsRoutes.get("/", auth_middleware_1.authenticateAdmin, analytics_controller_1.getAllAnalytics);
exports.default = analyticsRoutes;
