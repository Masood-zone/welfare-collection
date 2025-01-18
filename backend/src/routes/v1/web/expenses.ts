import { Router } from "express";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../../../controllers/expenses.controller";
import { authenticateAdmin } from "../../../middleware/auth.middleware";

const expenseRoutes = Router();

expenseRoutes.post("/", authenticateAdmin, createExpense);
expenseRoutes.get("/", authenticateAdmin, getAllExpenses);
expenseRoutes.get("/:id", authenticateAdmin, getExpenseById);
expenseRoutes.patch("/:id", authenticateAdmin, updateExpense);
expenseRoutes.delete("/:id", authenticateAdmin, deleteExpense);

export default expenseRoutes;
