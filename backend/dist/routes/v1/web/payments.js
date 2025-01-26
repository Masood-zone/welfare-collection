"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments = __importStar(require("../../../controllers/payments.controller"));
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const validations_middleware_1 = require("../../../middleware/validations/validations.middleware");
const payments_validations_1 = require("../../../middleware/validations/payments.validations");
const paymentRoutes = (0, express_1.Router)();
paymentRoutes.post("/", auth_middleware_1.authenticateUser, (0, validations_middleware_1.validateRequest)(payments_validations_1.createPaymentSchema), payments.createPayment);
paymentRoutes.post("/initialize-paystack", auth_middleware_1.authenticateUser, (0, validations_middleware_1.validateRequest)(payments_validations_1.createPaymentSchema), payments.initializePaystackPayment);
paymentRoutes.patch("/:id/:reference", auth_middleware_1.authenticateUser, payments.updatePaymentByReference);
paymentRoutes.get("/", auth_middleware_1.authenticateAdmin, payments.getAllPayments);
paymentRoutes.get("/:id", auth_middleware_1.authenticateUser, payments.getPaymentById);
paymentRoutes.get("/welfare/:welfareId", auth_middleware_1.authenticateAdmin, payments.getWelfarePayments);
paymentRoutes.get("/user/:id", auth_middleware_1.authenticateUser, payments.getUserPayments);
paymentRoutes.patch("/:id", auth_middleware_1.authenticateAdmin, (0, validations_middleware_1.validateRequest)(payments_validations_1.updatePaymentSchema), payments.updatePayment);
paymentRoutes.patch("/user/:paymentId/pay-remaining", auth_middleware_1.authenticateUser, payments.updatePaymentAmount);
paymentRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, payments.deletePayment);
exports.default = paymentRoutes;
//# sourceMappingURL=payments.js.map