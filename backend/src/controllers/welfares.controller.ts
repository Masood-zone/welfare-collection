import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import {
  createWelfareProgramHelper,
  deleteWelfareProgramHelper,
  findWelfareProgramByIdHelper,
  getAllWelfareProgramsHelper,
  getWelfareProgramByIdHelper,
  updateWelfareProgramHelper,
} from "../helpers/welfares.helper";

export const createWelfareProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, amount, paymentCycle, createdBy } = req.body;

  try {
    const welfareProgram = await createWelfareProgramHelper({
      name,
      description,
      amount: parseFloat(amount),
      paymentCycle,
      createdBy,
    });

    res.status(201).json({
      message: "Welfare program created successfully",
      welfareProgram,
    });
  } catch (error) {
    next(new AppError("Error creating welfare program", 500));
  }
};

export const getAllWelfarePrograms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const welfarePrograms = await getAllWelfareProgramsHelper();
    res.status(200).json({ welfarePrograms });
  } catch (error) {
    next(new AppError("Error fetching welfare programs", 500));
  }
};

export const getWelfareProgramById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const welfareProgram = await getWelfareProgramByIdHelper(id);

    if (!welfareProgram) {
      return next(new AppError("Welfare program not found", 404));
    }

    res.status(200).json({ welfareProgram });
  } catch (error) {
    next(new AppError("Error fetching welfare program", 500));
  }
};

export const updateWelfareProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, description, amount, paymentCycle } = req.body;

  // Find if welfare program exists using findWelfareProgramByIdHelper function
  const welfareProgram = await findWelfareProgramByIdHelper(id);

  // If welfare program does not exist, return an error
  if (!welfareProgram) {
    return next(new AppError("Welfare program not found", 404));
  }

  try {
    const updatedWelfareProgram = await updateWelfareProgramHelper(id, {
      name,
      description,
      amount,
      paymentCycle,
    });

    res.status(200).json({
      message: "Welfare program updated successfully",
      welfareProgram: updatedWelfareProgram,
    });
  } catch (error) {
    next(new AppError("Error updating welfare program", 500));
  }
};

export const deleteWelfareProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // Find if welfare program exists using findWelfareProgramByIdHelper function
  const welfareProgram = await findWelfareProgramByIdHelper(id);

  // If welfare program does not exist, return an error
  if (!welfareProgram) {
    return next(new AppError("Welfare program not found", 404));
  }

  try {
    await deleteWelfareProgramHelper(id);
    res.status(200).json({ message: "Welfare program deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting welfare program", 500));
  }
};
