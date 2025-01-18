import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import prisma from "../config/db";

export const createPaymentTracker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, welfareProgramId, cycleStart, cycleEnd, paymentStatus } =
    req.body;

  try {
    const paymentTracker = await prisma.paymentTracker.create({
      data: {
        userId,
        welfareProgramId,
        cycleStart,
        cycleEnd,
        paymentStatus,
      },
    });
    res.status(201).json({
      message: "Payment tracker created successfully",
      paymentTracker,
    });
  } catch (error) {
    next(new AppError("Error creating payment tracker", 500));
  }
};

export const getAllPaymentTrackers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentTrackers = await prisma.paymentTracker.findMany({
      include: { user: true, welfareProgram: true },
    });
    res.status(200).json({ paymentTrackers });
  } catch (error) {
    next(new AppError("Error fetching payment trackers", 500));
  }
};

export const getPaymentTrackerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const paymentTracker = await prisma.paymentTracker.findUnique({
      where: { id },
      include: { user: true, welfareProgram: true },
    });

    if (!paymentTracker) {
      return next(new AppError("Payment tracker not found", 404));
    }

    res.status(200).json({ paymentTracker });
  } catch (error) {
    next(new AppError("Error fetching payment tracker", 500));
  }
};

export const updatePaymentTracker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { cycleStart, cycleEnd, paymentStatus } = req.body;

  try {
    const updatedPaymentTracker = await prisma.paymentTracker.update({
      where: { id },
      data: {
        cycleStart,
        cycleEnd,
        paymentStatus,
      },
    });
    res.status(200).json({
      message: "Payment tracker updated successfully",
      paymentTracker: updatedPaymentTracker,
    });
  } catch (error) {
    next(new AppError("Error updating payment tracker", 500));
  }
};

export const deletePaymentTracker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await prisma.paymentTracker.delete({
      where: { id },
    });
    res.status(200).json({ message: "Payment tracker deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting payment tracker", 500));
  }
};
