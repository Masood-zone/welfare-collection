import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import {
  approveEnrollmentHelper,
  createEnrollmentHelper,
  deleteEnrollmentHelper,
  getAllEnrollmentsHelper,
  getEnrollmentByIdHelper,
  getEnrollmentsByUserIdHelper,
  rejectEnrollmentHelper,
  resubmitEnrollmentHelper,
  updateEnrollmentHelper,
} from "../helpers/enrollments.helper";

export const createEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, welfareProgramId } = req.body;

  try {
    const enrollment = await createEnrollmentHelper({
      userId,
      welfareProgramId,
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
    const enrollments = await getAllEnrollmentsHelper();
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
    const enrollment = await getEnrollmentByIdHelper(id);

    if (!enrollment) {
      return next(new AppError("Enrollment not found", 404));
    }

    res.status(200).json({ enrollment });
  } catch (error) {
    next(new AppError("Error fetching enrollment", 500));
  }
};

export const getEnrollmentByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const enrollments = await getEnrollmentsByUserIdHelper({ userId: id });
    res.status(200).json({ enrollments });
  } catch (error) {
    next(new AppError("Error fetching enrollments", 500));
  }
};

export const updateEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { welfareProgramId, userId } = req.body;

  // Check if enrollment exists
  const enrollment = await getEnrollmentByIdHelper(id);

  if (!enrollment) {
    return next(new AppError("Enrollment not found", 404));
  }

  try {
    const updatedEnrollment = await updateEnrollmentHelper(id, {
      userId,
      welfareProgramId,
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
  // Check if enrollment exists
  const enrollment = await getEnrollmentByIdHelper(id);

  if (!enrollment) {
    return next(new AppError("Enrollment not found", 404));
  }
  try {
    await deleteEnrollmentHelper(id);
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
    const updatedEnrollment = await approveEnrollmentHelper(id);
    res.status(200).json({
      message: "Enrollment approved successfully",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    next(new AppError("Error approving enrollment", 500));
  }
};

export const resubmitEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { userId, welfareProgramId } = req.body;

  try {
    const updatedEnrollment = await resubmitEnrollmentHelper(id, {
      userId,
      welfareProgramId,
    });
    res.status(200).json({
      message: "Enrollment resubmitted successfully",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    next(new AppError("Error resubmitting enrollment", 500));
  }
};

export const rejectEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const updatedEnrollment = await rejectEnrollmentHelper(id);
    res.status(200).json({
      message: "Enrollment rejected successfully",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    next(new AppError("Error rejecting enrollment", 500));
  }
};
