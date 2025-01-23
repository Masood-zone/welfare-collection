"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_tracker_controller_1 = require("../../../controllers/payment-tracker.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const paymentTrackerRoutes = (0, express_1.Router)();
// Routes for payment tracker
// Track payments by user ID
paymentTrackerRoutes.get("/user/:userId", auth_middleware_1.authenticateUser, payment_tracker_controller_1.trackPaymentsByUserId);
// Track payment details
paymentTrackerRoutes.get("/:id", auth_middleware_1.authenticateUser, payment_tracker_controller_1.trackPaymentsDetails);
// Track payments by welfare program ID and user ID
paymentTrackerRoutes.get("/welfare-program/:welfareProgramId", auth_middleware_1.authenticateUser, payment_tracker_controller_1.trackPaymentsByWelfareProgramAndUser);
paymentTrackerRoutes.delete("/:id", auth_middleware_1.authenticateUser, payment_tracker_controller_1.deletePaymentTracker);
exports.default = paymentTrackerRoutes;
