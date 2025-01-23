import { PaymentMode, PaymentStatus } from "@prisma/client";
import prisma from "../config/db";
import generateUniqueReceiptNumber from "../utils/generateRecieptNumber";
import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

interface InitializeTransactionParams {
  amount: number;
  email: string;
  metadata: {
    userId: string;
    welfareProgramId: string;
    paymentMode: string;
  };
}

interface VerifyTransactionParams {
  reference: string;
}

/**
 * Initialize a payment transaction.
 * @param data - Transaction details.
 */
export const initializePaystackTransaction = async (
  params: InitializeTransactionParams
) => {
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      params,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Paystack initialization error:", error);
    throw new Error("Failed to initialize Paystack transaction");
  }
};

/**
 * Verify a payment transaction.
 * @param data - Transaction details.
 */
export const verifyPaystackTransaction = async (
  reference: VerifyTransactionParams
) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Paystack verification error:", error);
    throw new Error("Failed to verify Paystack transaction");
  }
};

/**
 * Create a payment and its corresponding payment tracker.
 * @param data - Payment details.
 */
export const createPaymentHelper = async (data: {
  userId: string;
  welfareProgramId: string;
  amount: number;
  paymentMode: PaymentMode;
  reference: string;
  status: PaymentStatus;
  access_code: string;
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
      paystackreference: data.reference,
      access_code: data.access_code,
      status: data.status,
    },
  });

  // Create payment tracker
  await prisma.paymentTracker.create({
    data: {
      userId: data.userId,
      welfareProgramId: data.welfareProgramId,
      cycleStart,
      cycleEnd,
      paymentStatus: data.status,
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

export const getPaymentsByUserIdHelper = async (userId: string) => {
  return await prisma.payment.findMany({
    where: { userId },
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

export const updatePaymentByReferenceHelper = async (
  id: string,
  reference: string,
  status: PaymentStatus
) => {
  return await prisma.payment.update({
    where: { id, paystackreference: reference },
    data: { status },
  });
};
