import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import prisma from "../config/db";

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, welfareProgramId, amount, paymentMode, receiptNumber } =
    req.body;

  try {
    const payment = await prisma.payment.create({
      data: {
        userId,
        welfareProgramId,
        amount,
        paymentMode,
        receiptNumber,
      },
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
    const payments = await prisma.payment.findMany({
      include: { user: true, welfareProgram: true },
    });
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
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { user: true, welfareProgram: true },
    });

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
  const { amount, paymentMode, receiptNumber } = req.body;

  try {
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: {
        amount,
        paymentMode,
        receiptNumber,
      },
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

  try {
    await prisma.payment.delete({
      where: { id },
    });
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting payment", 500));
  }
};
