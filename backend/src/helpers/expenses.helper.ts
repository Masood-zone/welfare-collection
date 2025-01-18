import prisma from "../config/db";

export const createExpenseHelper = async (data: {
  description: string;
  amount: number;
  welfareProgramId: string;
  recordedBy: string;
}) => {
  return await prisma.expense.create({
    data: {
      description: data.description,
      amount: data.amount,
      welfareProgramId: data.welfareProgramId,
      recordedBy: data.recordedBy,
    },
  });
};

export const getAllExpensesHelper = async () => {
  return await prisma.expense.findMany({
    include: { welfareProgram: true },
  });
};

export const getExpenseByIdHelper = async (id: string) => {
  return await prisma.expense.findUnique({
    where: { id },
    include: { welfareProgram: true },
  });
};

export const findExpenseByIdHelper = async (id: string) => {
  return await prisma.expense.findUnique({ where: { id } });
};

export const updateExpenseHelper = async (
  id: string,
  data: {
    description?: string;
    amount?: number;
    welfareProgramId?: string;
    recordedBy?: string;
  }
) => {
  return await prisma.expense.update({
    where: { id },
    data,
  });
};

export const deleteExpenseHelper = async (id: string) => {
  return await prisma.expense.delete({ where: { id } });
};
