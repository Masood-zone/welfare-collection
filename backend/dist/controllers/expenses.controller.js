"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpenseById = exports.getAllExpenses = exports.createExpense = void 0;
const app_error_1 = require("../utils/app-error");
const expenses_helper_1 = require("../helpers/expenses.helper");
const createExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, amount, welfareProgramId, recordedBy } = req.body;
    try {
        const expense = yield (0, expenses_helper_1.createExpenseHelper)({
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
});
exports.createExpense = createExpense;
const getAllExpenses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield (0, expenses_helper_1.getAllExpensesHelper)();
        res.status(200).json({ expenses });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching expenses", 500));
    }
});
exports.getAllExpenses = getAllExpenses;
const getExpenseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const expense = yield (0, expenses_helper_1.getExpenseByIdHelper)(id);
        if (!expense) {
            return next(new app_error_1.AppError("Expense not found", 404));
        }
        res.status(200).json({ expense });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching expense", 500));
    }
});
exports.getExpenseById = getExpenseById;
const updateExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, amount, welfareProgramId } = req.body;
    // Check if expense exists
    const expense = yield (0, expenses_helper_1.getExpenseByIdHelper)(id);
    // If expense does not exist, return an error
    if (!expense) {
        return next(new app_error_1.AppError("Expense not found", 404));
    }
    try {
        const updatedExpense = yield (0, expenses_helper_1.updateExpenseHelper)(id, {
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
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check if expense exists
    const expense = yield (0, expenses_helper_1.getExpenseByIdHelper)(id);
    // If expense does not exist, return an error
    if (!expense) {
        return next(new app_error_1.AppError("Expense not found", 404));
    }
    try {
        yield (0, expenses_helper_1.deleteExpenseHelper)(id);
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError("Error deleting expense", 500));
    }
});
exports.deleteExpense = deleteExpense;
