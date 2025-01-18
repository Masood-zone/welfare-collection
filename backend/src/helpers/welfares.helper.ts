import prisma from "../config/db";

export const createWelfareProgramHelper = async (data: {
  name: string;
  description: string;
  amount: number;
  paymentCycle: "MONTHLY" | "DAILY" | "WEEKLY";
  createdBy: string;
}) => {
  return await prisma.welfareProgram.create({
    data: {
      name: data.name,
      description: data.description,
      amount: data.amount,
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

export const getEnrolledWelfareProgramsByUserIdHelper = async (id: string) => {
  return await prisma.paymentTracker.findMany({
    where: { userId: id },
    include: {
      welfareProgram: true,
      payment: true,
    },
  });
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
