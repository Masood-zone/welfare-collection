import prisma from "../config/db";

export const createWelfareProgramHelper = async (data: {
  name: string;
  description: string;
  amount: number;
  paymentCycle: "MONTHLY" | "DAILY" | "WEEKLY";
  createdBy: string;
}) => {
  const { amount, paymentCycle } = data;
  let dailyAmount = amount;

  if (paymentCycle === "MONTHLY") {
    dailyAmount = amount / 30; // Based on 30 days in a month
  } else if (paymentCycle === "WEEKLY") {
    dailyAmount = amount / 7;
  }

  return await prisma.welfareProgram.create({
    data: {
      name: data.name,
      description: data.description,
      amount: dailyAmount,
      paymentCycle: data.paymentCycle,
      createdBy: data.createdBy,
    },
  });
};

export const getAllWelfareProgramsHelper = async () => {
  return await prisma.welfareProgram.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      createdByUser: true,
    },
  });
};

export const getWelfareProgramByIdHelper = async (id: string) => {
  return await prisma.welfareProgram.findUnique({ where: { id } });
};

// Find a welfare program by id
export const findWelfareProgramByIdHelper = async (id: string) => {
  return await prisma.welfareProgram.findUnique({ where: { id } });
};

export const updateWelfareProgramHelper = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    amount?: number;
    paymentCycle?: "MONTHLY" | "DAILY" | "WEEKLY";
  }
) => {
  return await prisma.welfareProgram.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      amount: data.amount,
      paymentCycle: data.paymentCycle,
    },
  });
};

export const deleteWelfareProgramHelper = async (id: string) => {
  return await prisma.welfareProgram.delete({ where: { id } });
};

export const getWelfareProgramTotalsHelper = async (
  welfareProgramId: string
) => {
  const welfareProgram = await prisma.welfareProgram.findUnique({
    where: { id: welfareProgramId },
    include: {
      payments: true,
      expenses: true,
    },
  });

  if (!welfareProgram) {
    return null;
  }

  const totalPayments = welfareProgram.payments.reduce(
    (
      sum: number,
      payment: {
        amount: any;
      }
    ) => sum + payment.amount.toNumber(),
    0
  );
  const totalExpenses = welfareProgram.expenses.reduce(
    (
      sum: number,
      expense: {
        amount: any;
      }
    ) => sum + expense.amount.toNumber(),
    0
  );
  const balance = totalPayments - totalExpenses;

  return {
    id: welfareProgram.id,
    name: welfareProgram.name,
    totalPayments,
    totalExpenses,
    balance,
    enrollmentCount: await prisma.enrollment.count({
      where: { welfareProgramId: welfareProgramId },
    }),
  };
};
export const getWelfareProgramExpensesHelper = async (
  welfareProgramId: string
) => {
  return await prisma.expense.findMany({
    where: {
      welfareProgramId: welfareProgramId,
    },
    include: {
      welfareProgram: {
        select: {
          name: true,
        },
      },
    },
  });
};
