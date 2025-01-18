import { Router } from "express";
import {
  createPaymentTracker,
  getAllPaymentTrackers,
  getPaymentTrackerById,
  updatePaymentTracker,
  deletePaymentTracker,
} from "../../../controllers/payment-tracker.controller";
import { authenticateUser } from "../../../middleware/auth.middleware";

const paymentTrackerRoutes = Router();

paymentTrackerRoutes.post("/", authenticateUser, createPaymentTracker);
paymentTrackerRoutes.get("/", authenticateUser, getAllPaymentTrackers);
paymentTrackerRoutes.get("/:id", authenticateUser, getPaymentTrackerById);
paymentTrackerRoutes.patch("/:id", authenticateUser, updatePaymentTracker);
paymentTrackerRoutes.delete("/:id", authenticateUser, deletePaymentTracker);

export default paymentTrackerRoutes;
