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
exports.getWelfareProgramExpenses = exports.getWelfareProgramTotals = exports.deleteWelfareProgram = exports.updateWelfareProgram = exports.getWelfareProgramById = exports.getAllWelfarePrograms = exports.createWelfareProgram = void 0;
const app_error_1 = require("../utils/app-error");
const welfares_helper_1 = require("../helpers/welfares.helper");
const createWelfareProgram = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, amount, paymentCycle, createdBy } = req.body;
    try {
        const welfareProgram = yield (0, welfares_helper_1.createWelfareProgramHelper)({
            name,
            description,
            amount: Number.parseFloat(amount),
            paymentCycle,
            createdBy,
        });
        res.status(201).json({
            message: "Welfare program created successfully",
            welfareProgram,
            // dailyAmount: welfareProgram.amount,
            // originalAmount: amount,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error creating welfare program", 500));
    }
});
exports.createWelfareProgram = createWelfareProgram;
const getAllWelfarePrograms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const welfarePrograms = yield (0, welfares_helper_1.getAllWelfareProgramsHelper)();
        res.status(200).json({ welfarePrograms });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare programs", 500));
    }
});
exports.getAllWelfarePrograms = getAllWelfarePrograms;
const getWelfareProgramById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const welfareProgram = yield (0, welfares_helper_1.getWelfareProgramByIdHelper)(id);
        if (!welfareProgram) {
            return next(new app_error_1.AppError("Welfare program not found", 404));
        }
        res.status(200).json({ welfareProgram });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare program", 500));
    }
});
exports.getWelfareProgramById = getWelfareProgramById;
const updateWelfareProgram = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, amount, paymentCycle } = req.body;
    // Find if welfare program exists using findWelfareProgramByIdHelper function
    const welfareProgram = yield (0, welfares_helper_1.findWelfareProgramByIdHelper)(id);
    // If welfare program does not exist, return an error
    if (!welfareProgram) {
        return next(new app_error_1.AppError("Welfare program not found", 404));
    }
    try {
        const updatedWelfareProgram = yield (0, welfares_helper_1.updateWelfareProgramHelper)(id, {
            name,
            description,
            amount,
            paymentCycle,
        });
        res.status(200).json({
            message: "Welfare program updated successfully",
            welfareProgram: updatedWelfareProgram,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error updating welfare program", 500));
    }
});
exports.updateWelfareProgram = updateWelfareProgram;
const deleteWelfareProgram = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Find if welfare program exists using findWelfareProgramByIdHelper function
    const welfareProgram = yield (0, welfares_helper_1.findWelfareProgramByIdHelper)(id);
    // If welfare program does not exist, return an error
    if (!welfareProgram) {
        return next(new app_error_1.AppError("Welfare program not found", 404));
    }
    try {
        yield (0, welfares_helper_1.deleteWelfareProgramHelper)(id);
        res.status(200).json({ message: "Welfare program deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError(`Error deleting welfare program ${error}`, 500));
    }
});
exports.deleteWelfareProgram = deleteWelfareProgram;
// Totals & Expenses
const getWelfareProgramTotals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const totals = yield (0, welfares_helper_1.getWelfareProgramTotalsHelper)(id);
        if (!totals) {
            return next(new app_error_1.AppError("Welfare program not found", 404));
        }
        res.status(200).json({ totals });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare program totals", 500));
    }
});
exports.getWelfareProgramTotals = getWelfareProgramTotals;
const getWelfareProgramExpenses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const expenses = yield (0, welfares_helper_1.getWelfareProgramExpensesHelper)(id);
        res.status(200).json({ expenses });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare program expenses", 500));
    }
});
exports.getWelfareProgramExpenses = getWelfareProgramExpenses;
