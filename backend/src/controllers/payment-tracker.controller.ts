import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import {
  deletePaymentTrackerById,
  getPaymentTrackersByUserId,
  getPaymentTrackersByWelfareProgramAndUserId,
} from "../helpers/payment-tracker.helper";

/**
 * Get payment trackers by user ID.
 */
export const trackPaymentsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const paymentTrackers = await getPaymentTrackersByUserId(userId);
    res.status(200).json({ paymentTrackers });
  } catch (error) {
    next(new AppError("Error fetching payment trackers by user ID", 500));
  }
};

/**
 * Get payment trackers by welfare program ID and user ID.
 */
export const trackPaymentsByWelfareProgramAndUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { welfareProgramId } = req.params;
  const { userId } = req.query; // Assume `userId` is passed as a query parameter

  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  try {
    const paymentTrackers = await getPaymentTrackersByWelfareProgramAndUserId(
      welfareProgramId,
      userId as string
    );
    res.status(200).json({ paymentTrackers });
  } catch (error) {
    next(new AppError("Error fetching payment trackers", 500));
  }
};

// Delete payment tracker
export const deletePaymentTracker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await deletePaymentTrackerById(id);
    res.status(200).json({ message: "Payment tracker deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting payment tracker", 500));
  }
};
