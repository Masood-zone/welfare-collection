import prisma from "../config/db";
import { AppError } from "../utils/app-error";

export const createEnrollmentHelper = async (data: {
  userId: string;
  welfareProgramId: string;
}) => {
  return await prisma.enrollment.create({
    data: {
      userId: data.userId,
      welfareProgramId: data.welfareProgramId,
      status: "PENDING",
    },
  });
};

export const getAllEnrollmentsHelper = async () => {
  return await prisma.enrollment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      welfareProgram: true,
    },
  });
};

export const getEnrollmentByIdHelper = async (id: string) => {
  return await prisma.enrollment.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      welfareProgram: true,
    },
  });
};

export const getEnrollmentsByUserIdHelper = async (data: {
  userId: string;
}) => {
  return await prisma.enrollment.findMany({
    where: { userId: data.userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      welfareProgram: true,
    },
  });
};

export const findEnrollmentByIdHelper = async (id: string) => {
  return await prisma.enrollment.findUnique({ where: { id } });
};

export const updateEnrollmentHelper = async (
  id: string,
  data: {
    userId?: string;
    welfareProgramId?: string;
  }
) => {
  return await prisma.enrollment.update({
    where: { id },
    data: {
      userId: data.userId,
      welfareProgramId: data.welfareProgramId,
    },
  });
};

export const deleteEnrollmentHelper = async (id: string) => {
  return await prisma.enrollment.delete({ where: { id } });
};

export const approveEnrollmentHelper = async (id: string) => {
  const enrollment = await prisma.enrollment.findUnique({ where: { id } });
  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }

  const result = await prisma.enrollment.update({
    where: { id },
    data: {
      status: "APPROVED",
    },
  });
  return result;
};
