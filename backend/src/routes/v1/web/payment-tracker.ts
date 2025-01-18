import { Router } from "express";
import {
  deletePaymentTracker,
  trackPaymentsByUserId,
  trackPaymentsByWelfareProgramAndUser,
  trackPaymentsDetails,
} from "../../../controllers/payment-tracker.controller";
import { authenticateUser } from "../../../middleware/auth.middleware";

const paymentTrackerRoutes = Router();

// Routes for payment tracker
// Track payments by user ID
paymentTrackerRoutes.get(
  "/user/:userId",
  authenticateUser,
  trackPaymentsByUserId
);
// Track payment details
paymentTrackerRoutes.get("/:id", authenticateUser, trackPaymentsDetails);
// Track payments by welfare program ID and user ID
paymentTrackerRoutes.get(
  "/welfare-program/:welfareProgramId",
  authenticateUser,
  trackPaymentsByWelfareProgramAndUser
);
paymentTrackerRoutes.delete("/:id", authenticateUser, deletePaymentTracker);

export default paymentTrackerRoutes;
