import { Router } from "express";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../../../controllers/expenses.controller";
import { authenticateAdmin } from "../../../middleware/auth.middleware";
import { validateRequest } from "../../../middleware/validations/validations.middleware";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../../../middleware/validations/expenses.validations";

const expenseRoutes = Router();

expenseRoutes.post(
  "/",
  authenticateAdmin,
  validateRequest(createExpenseSchema),
  createExpense
);
expenseRoutes.get("/", authenticateAdmin, getAllExpenses);
expenseRoutes.get("/:id", authenticateAdmin, getExpenseById);
expenseRoutes.patch(
  "/:id",
  authenticateAdmin,
  validateRequest(updateExpenseSchema),
  updateExpense
);
expenseRoutes.delete("/:id", authenticateAdmin, deleteExpense);

export default expenseRoutes;
