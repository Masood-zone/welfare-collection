"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWelfareProgramExpenses = exports.getWelfareProgramTotals = exports.deleteWelfareProgram = exports.updateWelfareProgram = exports.getWelfareProgramById = exports.getAllWelfarePrograms = exports.createWelfareProgram = void 0;
const app_error_1 = require("../utils/app-error");
const welfares_helper_1 = require("../helpers/welfares.helper");
const createWelfareProgram = async (req, res, next) => {
    const { name, description, amount, paymentCycle, createdBy } = req.body;
    try {
        const welfareProgram = await (0, welfares_helper_1.createWelfareProgramHelper)({
            name,
            description,
            amount: Number.parseFloat(amount),
            paymentCycle,
            createdBy,
        });
        res.status(201).json({
            message: "Welfare program created successfully",
            welfareProgram,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error creating welfare program", 500));
    }
};
exports.createWelfareProgram = createWelfareProgram;
const getAllWelfarePrograms = async (req, res, next) => {
    try {
        const welfarePrograms = await (0, welfares_helper_1.getAllWelfareProgramsHelper)();
        res.status(200).json({ welfarePrograms });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare programs", 500));
    }
};
exports.getAllWelfarePrograms = getAllWelfarePrograms;
const getWelfareProgramById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const welfareProgram = await (0, welfares_helper_1.getWelfareProgramByIdHelper)(id);
        if (!welfareProgram) {
            return next(new app_error_1.AppError("Welfare program not found", 404));
        }
        res.status(200).json({ welfareProgram });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare program", 500));
    }
};
exports.getWelfareProgramById = getWelfareProgramById;
const updateWelfareProgram = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, amount, paymentCycle } = req.body;
    const welfareProgram = await (0, welfares_helper_1.findWelfareProgramByIdHelper)(id);
    if (!welfareProgram) {
        return next(new app_error_1.AppError("Welfare program not found", 404));
    }
    try {
        const updatedWelfareProgram = await (0, welfares_helper_1.updateWelfareProgramHelper)(id, {
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
};
exports.updateWelfareProgram = updateWelfareProgram;
const deleteWelfareProgram = async (req, res, next) => {
    const { id } = req.params;
    const welfareProgram = await (0, welfares_helper_1.findWelfareProgramByIdHelper)(id);
    if (!welfareProgram) {
        return next(new app_error_1.AppError("Welfare program not found", 404));
    }
    try {
        await (0, welfares_helper_1.deleteWelfareProgramHelper)(id);
        res.status(200).json({ message: "Welfare program deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError(`Error deleting welfare program ${error}`, 500));
    }
};
exports.deleteWelfareProgram = deleteWelfareProgram;
const getWelfareProgramTotals = async (req, res, next) => {
    const { id } = req.params;
    try {
        const totals = await (0, welfares_helper_1.getWelfareProgramTotalsHelper)(id);
        if (!totals) {
            return next(new app_error_1.AppError("Welfare program not found", 404));
        }
        res.status(200).json({ totals });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare program totals", 500));
    }
};
exports.getWelfareProgramTotals = getWelfareProgramTotals;
const getWelfareProgramExpenses = async (req, res, next) => {
    const { id } = req.params;
    try {
        const expenses = await (0, welfares_helper_1.getWelfareProgramExpensesHelper)(id);
        res.status(200).json({ expenses });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare program expenses", 500));
    }
};
exports.getWelfareProgramExpenses = getWelfareProgramExpenses;
//# sourceMappingURL=welfares.controller.js.map