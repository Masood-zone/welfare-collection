"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenses_controller_1 = require("../../../controllers/expenses.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const validations_middleware_1 = require("../../../middleware/validations/validations.middleware");
const expenses_validations_1 = require("../../../middleware/validations/expenses.validations");
const expenseRoutes = (0, express_1.Router)();
expenseRoutes.post("/", auth_middleware_1.authenticateAdmin, (0, validations_middleware_1.validateRequest)(expenses_validations_1.createExpenseSchema), expenses_controller_1.createExpense);
expenseRoutes.get("/", auth_middleware_1.authenticateAdmin, expenses_controller_1.getAllExpenses);
expenseRoutes.get("/:id", auth_middleware_1.authenticateAdmin, expenses_controller_1.getExpenseById);
expenseRoutes.patch("/:id", auth_middleware_1.authenticateAdmin, (0, validations_middleware_1.validateRequest)(expenses_validations_1.updateExpenseSchema), expenses_controller_1.updateExpense);
expenseRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, expenses_controller_1.deleteExpense);
exports.default = expenseRoutes;
//# sourceMappingURL=expenses.js.map