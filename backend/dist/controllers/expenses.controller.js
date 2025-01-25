"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpenseById = exports.getAllExpenses = exports.createExpense = void 0;
const app_error_1 = require("../utils/app-error");
const expenses_helper_1 = require("../helpers/expenses.helper");
const createExpense = async (req, res, next) => {
    const { description, amount, welfareProgramId, recordedBy } = req.body;
    try {
        const expense = await (0, expenses_helper_1.createExpenseHelper)({
            description,
            amount,
            welfareProgramId,
            recordedBy,
        });
        res.status(201).json({ message: "Expense created successfully", expense });
    }
    catch (error) {
        next(new app_error_1.AppError("Error creating expense", 500));
    }
};
exports.createExpense = createExpense;
const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await (0, expenses_helper_1.getAllExpensesHelper)();
        res.status(200).json({ expenses });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching expenses", 500));
    }
};
exports.getAllExpenses = getAllExpenses;
const getExpenseById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const expense = await (0, expenses_helper_1.getExpenseByIdHelper)(id);
        if (!expense) {
            return next(new app_error_1.AppError("Expense not found", 404));
        }
        res.status(200).json({ expense });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching expense", 500));
    }
};
exports.getExpenseById = getExpenseById;
const updateExpense = async (req, res, next) => {
    const { id } = req.params;
    const { description, amount, welfareProgramId } = req.body;
    const expense = await (0, expenses_helper_1.getExpenseByIdHelper)(id);
    if (!expense) {
        return next(new app_error_1.AppError("Expense not found", 404));
    }
    try {
        const updatedExpense = await (0, expenses_helper_1.updateExpenseHelper)(id, {
            description,
            amount,
            welfareProgramId,
        });
        res.status(200).json({
            message: "Expense updated successfully",
            expense: updatedExpense,
        });
    }
    catch (error) {
        next(new app_error_1.AppError(`Error updating expense ${error}`, 500));
    }
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res, next) => {
    const { id } = req.params;
    const expense = await (0, expenses_helper_1.getExpenseByIdHelper)(id);
    if (!expense) {
        return next(new app_error_1.AppError("Expense not found", 404));
    }
    try {
        await (0, expenses_helper_1.deleteExpenseHelper)(id);
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError("Error deleting expense", 500));
    }
};
exports.deleteExpense = deleteExpense;
//# sourceMappingURL=expenses.controller.js.map