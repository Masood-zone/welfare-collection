import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import prisma from "../config/db";

export const createEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, welfareProgramId } = req.body;

  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        welfareProgramId,
      },
    });
    res
      .status(201)
      .json({ message: "Enrollment created successfully", enrollment });
  } catch (error) {
    next(new AppError("Error creating enrollment", 500));
  }
};

export const getAllEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
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
    res.status(200).json({ enrollments });
  } catch (error) {
    next(new AppError("Error fetching enrollments", 500));
  }
};

export const getEnrollmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const enrollment = await prisma.enrollment.findUnique({
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

    if (!enrollment) {
      return next(new AppError("Enrollment not found", 404));
    }

    res.status(200).json({ enrollment });
  } catch (error) {
    next(new AppError("Error fetching enrollment", 500));
  }
};

export const updateEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { welfareProgramId } = req.body;

  try {
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        welfareProgramId,
      },
    });
    res.status(200).json({
      message: "Enrollment updated successfully",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    next(new AppError("Error updating enrollment", 500));
  }
};

export const deleteEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await prisma.enrollment.delete({
      where: { id },
    });
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting enrollment", 500));
  }
};

export const approveEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        status: "APPROVED",
      },
    });
    res.status(200).json({
      message: "Enrollment approved successfully",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    next(new AppError("Error approving enrollment", 500));
  }
};
