import { Router } from "express";
import * as payments from "../../../controllers/payments.controller";
import {
  authenticateUser,
  authenticateAdmin,
} from "../../../middleware/auth.middleware";
import { validateRequest } from "../../../middleware/validations/validations.middleware";
import {
  createPaymentSchema,
  updatePaymentSchema,
} from "../../../middleware/validations/payments.validations";

const paymentRoutes = Router();
// Make a cash payment
paymentRoutes.post(
  "/",
  authenticateUser,
  validateRequest(createPaymentSchema),
  payments.createPayment
);
// Initialize Paystack payment
paymentRoutes.post(
  "/initialize-paystack",
  authenticateUser,
  validateRequest(createPaymentSchema),
  payments.initializePaystackPayment
);
// Update a created payment based on reference
paymentRoutes.patch(
  "/:id/:reference",
  authenticateUser,
  payments.updatePaymentByReference
);
paymentRoutes.get("/", authenticateAdmin, payments.getAllPayments);
paymentRoutes.get("/:id", authenticateUser, payments.getPaymentById);
paymentRoutes.get(
  "/welfare/:welfareId",
  authenticateAdmin,
  payments.getWelfarePayments
);
// Get User payments
paymentRoutes.get("/user/:id", authenticateUser, payments.getUserPayments);
paymentRoutes.patch(
  "/:id",
  authenticateAdmin,
  validateRequest(updatePaymentSchema),
  payments.updatePayment
);
paymentRoutes.patch(
  "/user/:paymentId/pay-remaining",
  authenticateUser,
  payments.updatePaymentAmount
);
paymentRoutes.delete("/:id", authenticateAdmin, payments.deletePayment);

export default paymentRoutes;
