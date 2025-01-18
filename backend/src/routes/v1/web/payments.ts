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

const paymentRoutes = Router();

paymentRoutes.post("/", authenticateUser, createPayment);
paymentRoutes.get("/", authenticateAdmin, getAllPayments);
paymentRoutes.get("/:id", authenticateUser, getPaymentById);
paymentRoutes.patch("/:id", authenticateAdmin, updatePayment);
paymentRoutes.delete("/:id", authenticateAdmin, deletePayment);

export default paymentRoutes;
