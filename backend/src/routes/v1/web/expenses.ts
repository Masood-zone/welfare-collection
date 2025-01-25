import { Router } from "express";
import * as expenses from "../../../controllers/expenses.controller";
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
  expenses.createExpense
);
expenseRoutes.get("/", authenticateAdmin, expenses.getAllExpenses);
expenseRoutes.get("/:id", authenticateAdmin, expenses.getExpenseById);
expenseRoutes.patch(
  "/:id",
  authenticateAdmin,
  validateRequest(updateExpenseSchema),
  expenses.updateExpense
);
expenseRoutes.delete("/:id", authenticateAdmin, expenses.deleteExpense);

export default expenseRoutes;
