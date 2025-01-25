import { Router } from "express";
import * as tracker from "../../../controllers/payment-tracker.controller";
import { authenticateUser } from "../../../middleware/auth.middleware";

const paymentTrackerRoutes = Router();

// Routes for payment tracker
// Track payments by user ID
paymentTrackerRoutes.get(
  "/user/:userId",
  authenticateUser,
  tracker.trackPaymentsByUserId
);
// Track payment details
paymentTrackerRoutes.get(
  "/:id",
  authenticateUser,
  tracker.trackPaymentsDetails
);
// Track payments by welfare program ID and user ID
paymentTrackerRoutes.get(
  "/welfare-program/:welfareProgramId",
  authenticateUser,
  tracker.trackPaymentsByWelfareProgramAndUser
);
paymentTrackerRoutes.delete(
  "/:id",
  authenticateUser,
  tracker.deletePaymentTracker
);

export default paymentTrackerRoutes;
