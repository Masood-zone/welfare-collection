"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_controller_1 = require("../../../controllers/payments.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const validations_middleware_1 = require("../../../middleware/validations/validations.middleware");
const payments_validations_1 = require("../../../middleware/validations/payments.validations");
const paymentRoutes = (0, express_1.Router)();
// Make a cash payment
paymentRoutes.post("/", auth_middleware_1.authenticateUser, (0, validations_middleware_1.validateRequest)(payments_validations_1.createPaymentSchema), payments_controller_1.createPayment);
// Initialize Paystack payment
paymentRoutes.post("/initialize-paystack", auth_middleware_1.authenticateUser, (0, validations_middleware_1.validateRequest)(payments_validations_1.createPaymentSchema), payments_controller_1.initializePaystackPayment);
// Update a created payment based on reference
paymentRoutes.patch("/:id/:reference", auth_middleware_1.authenticateUser, payments_controller_1.updatePaymentByReference);
paymentRoutes.get("/", auth_middleware_1.authenticateAdmin, payments_controller_1.getAllPayments);
paymentRoutes.get("/:id", auth_middleware_1.authenticateUser, payments_controller_1.getPaymentById);
// Get User payments
paymentRoutes.get("/user/:id", auth_middleware_1.authenticateUser, payments_controller_1.getUserPayments);
paymentRoutes.patch("/:id", auth_middleware_1.authenticateAdmin, (0, validations_middleware_1.validateRequest)(payments_validations_1.updatePaymentSchema), payments_controller_1.updatePayment);
paymentRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, payments_controller_1.deletePayment);
exports.default = paymentRoutes;
