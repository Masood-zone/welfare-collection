import { Router } from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getUserPayments,
  updatePaymentByReference,
  initializePaystackPayment,
} from "../../../controllers/payments.controller";
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
  createPayment
);
// Initialize Paystack payment
paymentRoutes.post(
  "/initialize-paystack",
  authenticateUser,
  validateRequest(createPaymentSchema),
  initializePaystackPayment
);
// Update a created payment based on reference
paymentRoutes.patch(
  "/:id/:reference",
  authenticateUser,
  updatePaymentByReference
);
paymentRoutes.get("/", authenticateAdmin, getAllPayments);
paymentRoutes.get("/:id", authenticateUser, getPaymentById);
// Get User payments
paymentRoutes.get("/user/:id", authenticateUser, getUserPayments);
paymentRoutes.patch(
  "/:id",
  authenticateAdmin,
  validateRequest(updatePaymentSchema),
  updatePayment
);
paymentRoutes.delete("/:id", authenticateAdmin, deletePayment);

export default paymentRoutes;
