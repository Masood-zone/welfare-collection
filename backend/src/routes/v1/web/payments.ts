import { Router } from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
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

paymentRoutes.post(
  "/",
  authenticateUser,
  validateRequest(createPaymentSchema),
  createPayment
);
paymentRoutes.get("/", authenticateAdmin, getAllPayments);
paymentRoutes.get("/:id", authenticateUser, getPaymentById);
paymentRoutes.patch(
  "/:id",
  authenticateAdmin,
  validateRequest(updatePaymentSchema),
  updatePayment
);
paymentRoutes.delete("/:id", authenticateAdmin, deletePayment);

export default paymentRoutes;
