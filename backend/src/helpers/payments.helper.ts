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
  paymentMode: "CASH" | "CARD" | "MOMO";
  reference: string;
  status: "UNPAID" | "PAID" | "PREPAID";
  access_code: string;
}) => {
  // Generate a unique receipt number
  const receiptNumber = await generateUniqueReceiptNumber();

  // Fetch welfare program details to determine payment cycle
  const welfareProgram = await prisma.welfareProgram.findUnique({
    where: { id: data.welfareProgramId },
    select: { paymentCycle: true, amount: true },
  });

  if (!welfareProgram) {
    throw new Error("Welfare program not found");
  }

  // Determine cycleStart and cycleEnd based on the payment cycle
  const now = new Date();
  let cycleStart = now;
  let cycleEnd = new Date();
  let expectedAmount: number = welfareProgram.amount.toNumber();
  let remainingAmount = 0;
  let prepaidAmount = 0;

  switch (welfareProgram.paymentCycle) {
    case "DAILY":
      cycleEnd.setDate(cycleEnd.getDate() + 1);
      break;
    case "WEEKLY":
      cycleEnd.setDate(cycleEnd.getDate() + 7);
      break;
    case "MONTHLY":
      cycleEnd.setMonth(cycleEnd.getMonth() + 1);
      // expectedAmount *= 30;
      break;
  }

  // Extend or decrease cycleEnd based on the amount paid
  if (data.amount < expectedAmount) {
    remainingAmount = expectedAmount - data.amount;
    cycleEnd = new Date(
      cycleStart.getTime() +
        (data.amount / expectedAmount) *
          (cycleEnd.getTime() - cycleStart.getTime())
    );
  } else if (data.amount > expectedAmount) {
    prepaidAmount = data.amount - expectedAmount;
    const extraDays = prepaidAmount / welfareProgram.amount.toNumber();
    cycleEnd.setDate(cycleEnd.getDate() + Math.floor(extraDays));
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
      remainingAmount,
      prepaidAmount,
    },
  });

  return { payment, cycleStart, cycleEnd, remainingAmount, prepaidAmount };
};

export const getAllPaymentsHelper = async () => {
  return await prisma.payment.findMany({
    include: { user: true, welfareProgram: true },
  });
};

export const getWelfarePaymentsHelper = async (welfareProgramId: string) => {
  const payments = await prisma.payment.findMany({
    where: { welfareProgramId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { paymentDate: "desc" },
  });

  return payments.map(
    (payment: {
      id: string;
      userId: string;
      user: {
        name: string;
      };
      amount: string;
      paymentDate: Date;
      paymentMode: string;
      status: string;
    }) => ({
      id: payment.id,
      userId: payment.userId,
      userName: payment.user.name,
      amount: payment.amount.toString(),
      paymentDate: payment.paymentDate.toISOString(),
      paymentMode: payment.paymentMode,
      status: payment.status,
    })
  );
};

export const getPaymentsByUserIdHelper = async (userId: string) => {
  return await prisma.payment.findMany({
    where: { userId },
    include: {
      user: true,
      welfareProgram: true,
      paymentTrackers: {
        orderBy: { cycleEnd: "desc" },
        take: 1,
      },
    },
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
    paymentMode: "CASH" | "CARD" | "MOMO";
  }
) => {
  return await prisma.payment.update({
    where: { id },
    data,
  });
};

export const updatePaymentRemainingAmountHelper = async (
  id: string,
  amount: number
) => {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      welfareProgram: true,
      paymentTrackers: {
        orderBy: { cycleEnd: "desc" },
        take: 1,
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  const latestPaymentTracker = payment?.paymentTrackers?.[0];

  if (!latestPaymentTracker) {
    throw new Error("Payment tracker not found");
  }

  const expectedAmount = Number(payment.welfareProgram.amount);
  const currentPaidAmount = Number(payment.amount);
  const newTotalAmount = currentPaidAmount + amount;
  const remainingAmount = Math.max(expectedAmount - newTotalAmount, 0);

  if (amount > latestPaymentTracker.remainingAmount.toNumber()) {
    throw new Error("Amount exceeds remaining amount");
  }

  let cycleEnd = latestPaymentTracker.cycleEnd;
  if (newTotalAmount < expectedAmount) {
    const paidDays =
      (newTotalAmount / expectedAmount) *
      (cycleEnd.getTime() - latestPaymentTracker.cycleStart.getTime());
    cycleEnd = new Date(latestPaymentTracker.cycleStart.getTime() + paidDays);
  }

  const updatedPayment = await prisma.payment.update({
    where: { id },
    data: { amount: newTotalAmount },
  });

  const updatedPaymentTracker = await prisma.paymentTracker.update({
    where: { id: latestPaymentTracker.id },
    data: {
      cycleEnd,
      remainingAmount,
      paymentStatus: remainingAmount === 0 ? "PAID" : "UNPAID",
    },
  });

  return { updatedPayment, updatedPaymentTracker };
};

export const deletePaymentHelper = async (id: string) => {
  return await prisma.payment.delete({ where: { id } });
};

export const updatePaymentByReferenceHelper = async (
  id: string,
  reference: string,
  status: "UNPAID" | "PAID" | "PREPAID"
) => {
  const payment = await prisma.payment.findUnique({
    where: { id, paystackreference: reference },
    include: {
      welfareProgram: true,
      paymentTrackers: {
        orderBy: { cycleEnd: "desc" },
        take: 1,
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  const latestPaymentTracker = payment.paymentTrackers[0];

  if (!latestPaymentTracker) {
    throw new Error("Payment tracker not found");
  }

  const cycleStart = latestPaymentTracker.cycleStart;
  let cycleEnd = latestPaymentTracker.cycleEnd;
  let remainingAmount = latestPaymentTracker.remainingAmount.toNumber();
  let prepaidAmount = latestPaymentTracker.prepaidAmount.toNumber();

  const expectedAmount = Number(payment.welfareProgram.amount);
  const paidAmount = Number(payment.amount);

  if (status === "PAID") {
    if (paidAmount < expectedAmount) {
      remainingAmount = expectedAmount - paidAmount;
      const paidDays =
        (paidAmount / expectedAmount) *
        (cycleEnd.getTime() - cycleStart.getTime());
      cycleEnd = new Date(cycleStart.getTime() + paidDays);
    } else if (paidAmount > expectedAmount) {
      prepaidAmount = paidAmount - expectedAmount;
      const extraDays = prepaidAmount / expectedAmount;
      cycleEnd = new Date(cycleEnd.getTime() + extraDays * 24 * 60 * 60 * 1000);
      remainingAmount = 0;
    } else {
      remainingAmount = 0;
      prepaidAmount = 0;
    }
  } else if (status === "UNPAID") {
    remainingAmount = expectedAmount;
    cycleEnd = cycleStart;
    prepaidAmount = 0;
  }

  const updatedPayment = await prisma.payment.update({
    where: { id, paystackreference: reference },
    data: { status },
  });

  const updatedPaymentTracker = await prisma.paymentTracker.update({
    where: { id: latestPaymentTracker.id },
    data: {
      paymentStatus: status,
      cycleEnd,
      remainingAmount,
      prepaidAmount,
    },
  });

  return { updatedPayment, updatedPaymentTracker };
};
