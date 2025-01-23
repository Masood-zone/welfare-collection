import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import {
  createPaymentHelper,
  deletePaymentHelper,
  getAllPaymentsHelper,
  getPaymentByIdHelper,
  getPaymentsByUserIdHelper,
  initializePaystackTransaction,
  updatePaymentByReferenceHelper,
  updatePaymentHelper,
} from "../helpers/payments.helper";
import { PaymentStatus } from "../interfaces/all.interfaces";

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, welfareProgramId, amount, paymentMode } = req.body;

  try {
    // Create a cash payment
    const payment = await createPaymentHelper({
      userId,
      welfareProgramId,
      amount,
      paymentMode,
      reference: "", // No Paystack reference for cash payments
      access_code: "", // No access code for cash payments
      status: "PAID" as unknown as PaymentStatus, // Cash payments are considered paid immediately
    });
    res
      .status(201)
      .json({ message: "Cash payment created successfully", payment });
  } catch (error) {
    next(new AppError("Error creating cash payment", 500));
  }
};

export const initializePaystackPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, email, welfareProgramId, amount, paymentMode } = req.body;

  try {
    // Initialize paystack transaction
    const paystackResponse = await initializePaystackTransaction({
      amount: amount * 100,
      email: email,
      metadata: {
        userId,
        welfareProgramId,
        paymentMode,
      },
    });
    // Create a pending payment
    const payment = await createPaymentHelper({
      userId,
      welfareProgramId,
      amount,
      paymentMode,
      reference: paystackResponse.reference,
      access_code: paystackResponse.access_code,
      status: "UNPAID" as unknown as PaymentStatus,
    });
    res
      .status(201)
      .json({ message: "Paystack payment initialized successfully", payment });
  } catch (error) {
    next(new AppError("Error initializing Paystack payment", 500));
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

export const getUserPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const payments = await getPaymentsByUserIdHelper(id);

    if (!payments) {
      return next(new AppError("Payments not found", 404));
    }

    res.status(200).json({ payments });
  } catch (error) {
    next(new AppError("Error fetching payments", 500));
  }
};

export const updatePaymentByReference = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, reference } = req.params;
  const { status } = req.body;

  try {
    const updatedPayment = await updatePaymentByReferenceHelper(
      id,
      reference,
      status
    );

    if (!updatedPayment) {
      return next(new AppError("Payment not found", 404));
    }

    res.status(200).json({
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    next(new AppError("Error updating payment", 500));
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
    next(new AppError(`Error deleting payment ${error}`, 500));
  }
};
