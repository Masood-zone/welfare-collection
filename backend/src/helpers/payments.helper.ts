import { PaymentMode } from "@prisma/client";
import prisma from "../config/db";
import generateUniqueReceiptNumber from "../utils/generateRecieptNumber";

/**
 * Create a payment and its corresponding payment tracker.
 * @param data - Payment details.
 */
export const createPaymentHelper = async (data: {
  userId: string;
  welfareProgramId: string;
  amount: number;
  paymentMode: PaymentMode;
}) => {
  // Generate a unique receipt number
  const receiptNumber = await generateUniqueReceiptNumber();

  // Fetch welfare program details to determine payment cycle
  const welfareProgram = await prisma.welfareProgram.findUnique({
    where: { id: data.welfareProgramId },
    select: { paymentCycle: true },
  });

  if (!welfareProgram) {
    throw new Error("Welfare program not found");
  }

  // Determine cycleStart and cycleEnd based on the payment cycle
  const now = new Date();
  let cycleStart = now;
  let cycleEnd = new Date();

  switch (welfareProgram.paymentCycle) {
    case "DAILY":
      cycleEnd.setDate(cycleEnd.getDate() + 1);
      break;
    case "WEEKLY":
      cycleEnd.setDate(cycleEnd.getDate() + 7);
      break;
    case "MONTHLY":
      cycleEnd.setMonth(cycleEnd.getMonth() + 1);
      break;
  }

  // Create payment
  const payment = await prisma.payment.create({
    data: {
      userId: data.userId,
      welfareProgramId: data.welfareProgramId,
      amount: data.amount,
      paymentMode: data.paymentMode,
      receiptNumber,
    },
  });

  // Create payment tracker
  await prisma.paymentTracker.create({
    data: {
      userId: data.userId,
      welfareProgramId: data.welfareProgramId,
      cycleStart,
      cycleEnd,
      paymentStatus: "PAID", // Default to PAID if payment is successfully created
      paymentId: payment.id,
    },
  });

  return payment;
};

export const getAllPaymentsHelper = async () => {
  return await prisma.payment.findMany({
    include: { user: true, welfareProgram: true },
  });
};

export const getPaymentByIdHelper = async (id: string) => {
  return await prisma.payment.findUnique({
    where: { id },
    include: { user: true, welfareProgram: true },
  });
};

export const findPaymentByIdHelper = async (id: string) => {
  return await prisma.payment.findUnique({ where: { id } });
};

export const updatePaymentHelper = async (
  id: string,
  data: {
    userId?: string;
    welfareProgramId?: string;
    amount?: number;
    paymentMode?: PaymentMode;
  }
) => {
  return await prisma.payment.update({
    where: { id },
    data,
  });
};

export const deletePaymentHelper = async (id: string) => {
  return await prisma.payment.delete({ where: { id } });
};
