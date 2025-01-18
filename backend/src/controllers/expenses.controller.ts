import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import {
  createExpenseHelper,
  deleteExpenseHelper,
  getAllExpensesHelper,
  getExpenseByIdHelper,
  updateExpenseHelper,
} from "../helpers/expenses.helper";

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description, amount, welfareProgramId, recordedBy } = req.body;

  try {
    const expense = await createExpenseHelper({
      description,
      amount,
      welfareProgramId,
      recordedBy,
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
    const expenses = await getAllExpensesHelper();
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
    const expense = await getExpenseByIdHelper(id);

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

  // Check if expense exists
  const expense = await getExpenseByIdHelper(id);
  // If expense does not exist, return an error
  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }

  try {
    const updatedExpense = await updateExpenseHelper(id, {
      description,
      amount,
      welfareProgramId,
    });
    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    next(new AppError(`Error updating expense ${error}`, 500));
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // Check if expense exists
  const expense = await getExpenseByIdHelper(id);
  // If expense does not exist, return an error
  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }

  try {
    await deleteExpenseHelper(id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting expense", 500));
  }
};
