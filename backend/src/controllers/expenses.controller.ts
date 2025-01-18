import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import prisma from "../config/db";

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description, amount, welfareProgramId, recordedBy } = req.body;

  try {
    const expense = await prisma.expense.create({
      data: {
        description,
        amount,
        welfareProgramId,
        recordedBy,
      },
    });
    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error) {
    next(new AppError("Error creating expense", 500));
  }
};

export const getAllExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: { welfareProgram: true },
    });
    res.status(200).json({ expenses });
  } catch (error) {
    next(new AppError("Error fetching expenses", 500));
  }
};

export const getExpenseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const expense = await prisma.expense.findUnique({
      where: { id },
      include: { welfareProgram: true },
    });

    if (!expense) {
      return next(new AppError("Expense not found", 404));
    }

    res.status(200).json({ expense });
  } catch (error) {
    next(new AppError("Error fetching expense", 500));
  }
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { description, amount, welfareProgramId } = req.body;

  try {
    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: {
        description,
        amount,
        welfareProgramId,
      },
    });
    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    next(new AppError("Error updating expense", 500));
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await prisma.expense.delete({
      where: { id },
    });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting expense", 500));
  }
};
