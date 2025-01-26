"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWelfareProgramExpensesHelper = exports.getWelfareProgramTotalsHelper = exports.deleteWelfareProgramHelper = exports.updateWelfareProgramHelper = exports.findWelfareProgramByIdHelper = exports.getWelfareProgramByIdHelper = exports.getAllWelfareProgramsHelper = exports.createWelfareProgramHelper = void 0;
const db_1 = __importDefault(require("../config/db"));
const createWelfareProgramHelper = async (data) => {
    const { amount, paymentCycle } = data;
    let dailyAmount = amount;
    if (paymentCycle === "MONTHLY") {
        dailyAmount = amount / 30;
    }
    else if (paymentCycle === "WEEKLY") {
        dailyAmount = amount / 7;
    }
    return await db_1.default.welfareProgram.create({
        data: {
            name: data.name,
            description: data.description,
            expectedAmount: dailyAmount,
            amount: data.amount,
            paymentCycle: data.paymentCycle,
            createdBy: data.createdBy,
        },
    });
};
exports.createWelfareProgramHelper = createWelfareProgramHelper;
const getAllWelfareProgramsHelper = async () => {
    return await db_1.default.welfareProgram.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            createdByUser: true,
        },
    });
};
exports.getAllWelfareProgramsHelper = getAllWelfareProgramsHelper;
const getWelfareProgramByIdHelper = async (id) => {
    return await db_1.default.welfareProgram.findUnique({ where: { id } });
};
exports.getWelfareProgramByIdHelper = getWelfareProgramByIdHelper;
const findWelfareProgramByIdHelper = async (id) => {
    return await db_1.default.welfareProgram.findUnique({ where: { id } });
};
exports.findWelfareProgramByIdHelper = findWelfareProgramByIdHelper;
const updateWelfareProgramHelper = async (id, data) => {
    return await db_1.default.welfareProgram.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            amount: data.amount,
            paymentCycle: data.paymentCycle,
        },
    });
};
exports.updateWelfareProgramHelper = updateWelfareProgramHelper;
const deleteWelfareProgramHelper = async (id) => {
    return await db_1.default.welfareProgram.delete({ where: { id } });
};
exports.deleteWelfareProgramHelper = deleteWelfareProgramHelper;
const getWelfareProgramTotalsHelper = async (welfareProgramId) => {
    const welfareProgram = await db_1.default.welfareProgram.findUnique({
        where: { id: welfareProgramId },
        include: {
            payments: true,
            expenses: true,
        },
    });
    if (!welfareProgram) {
        return null;
    }
    const totalPayments = welfareProgram.payments.reduce((sum, payment) => sum + payment.amount.toNumber(), 0);
    const totalExpenses = welfareProgram.expenses.reduce((sum, expense) => sum + expense.amount.toNumber(), 0);
    const balance = totalPayments - totalExpenses;
    return {
        id: welfareProgram.id,
        name: welfareProgram.name,
        totalPayments,
        totalExpenses,
        balance,
        enrollmentCount: await db_1.default.enrollment.count({
            where: { welfareProgramId: welfareProgramId },
        }),
    };
};
exports.getWelfareProgramTotalsHelper = getWelfareProgramTotalsHelper;
const getWelfareProgramExpensesHelper = async (welfareProgramId) => {
    return await db_1.default.expense.findMany({
        where: {
            welfareProgramId: welfareProgramId,
        },
        include: {
            welfareProgram: {
                select: {
                    name: true,
                },
            },
        },
    });
};
exports.getWelfareProgramExpensesHelper = getWelfareProgramExpensesHelper;
//# sourceMappingURL=welfares.helper.js.map