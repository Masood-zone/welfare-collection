import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import {
  createPaymentHelper,
  deletePaymentHelper,
  getAllPaymentsHelper,
  getPaymentByIdHelper,
  updatePaymentHelper,
} from "../helpers/payments.helper";

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, welfareProgramId, amount, paymentMode } = req.body;

  try {
    const payment = await createPaymentHelper({
      userId,
      welfareProgramId,
      amount,
      paymentMode,
    });
    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    next(new AppError("Error creating payment", 500));
  }
};

export const getAllPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payments = await getAllPaymentsHelper();
    res.status(200).json({ payments });
  } catch (error) {
    next(new AppError("Error fetching payments", 500));
  }
};

export const getPaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const payment = await getPaymentByIdHelper(id);

    if (!payment) {
      return next(new AppError("Payment not found", 404));
    }

    res.status(200).json({ payment });
  } catch (error) {
    next(new AppError("Error fetching payment", 500));
  }
};

export const updatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { amount, paymentMode } = req.body;
  // Check if payment exists
  const payment = await getPaymentByIdHelper(id);
  // If payment does not exist, return an error
  if (!payment) {
    return next(new AppError("Payment not found", 404));
  }
  try {
    const updatedPayment = await updatePaymentHelper(id, {
      amount,
      paymentMode,
    });
    res.status(200).json({
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    next(new AppError("Error updating payment", 500));
  }
};

export const deletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // Check if payment exists
  const payment = await getPaymentByIdHelper(id);
  // If payment does not exist, return an error
  if (!payment) {
    return next(new AppError("Payment not found", 404));
  }

  try {
    await deletePaymentHelper(id);
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting payment", 500));
  }
};
