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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWelfareProgramExpensesHelper = exports.getWelfareProgramTotalsHelper = exports.deleteWelfareProgramHelper = exports.updateWelfareProgramHelper = exports.findWelfareProgramByIdHelper = exports.getWelfareProgramByIdHelper = exports.getAllWelfareProgramsHelper = exports.createWelfareProgramHelper = void 0;
const db_1 = __importDefault(require("../config/db"));
const createWelfareProgramHelper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.welfareProgram.create({
        data: {
            name: data.name,
            description: data.description,
            amount: data.amount,
            paymentCycle: data.paymentCycle,
            createdBy: data.createdBy,
        },
    });
});
exports.createWelfareProgramHelper = createWelfareProgramHelper;
const getAllWelfareProgramsHelper = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.welfareProgram.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            createdByUser: true,
        },
    });
});
exports.getAllWelfareProgramsHelper = getAllWelfareProgramsHelper;
const getWelfareProgramByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.welfareProgram.findUnique({ where: { id } });
});
exports.getWelfareProgramByIdHelper = getWelfareProgramByIdHelper;
// Find a welfare program by id
const findWelfareProgramByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.welfareProgram.findUnique({ where: { id } });
});
exports.findWelfareProgramByIdHelper = findWelfareProgramByIdHelper;
const updateWelfareProgramHelper = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.welfareProgram.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            amount: data.amount,
            paymentCycle: data.paymentCycle,
        },
    });
});
exports.updateWelfareProgramHelper = updateWelfareProgramHelper;
const deleteWelfareProgramHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.welfareProgram.delete({ where: { id } });
});
exports.deleteWelfareProgramHelper = deleteWelfareProgramHelper;
const getWelfareProgramTotalsHelper = (welfareProgramId) => __awaiter(void 0, void 0, void 0, function* () {
    const welfareProgram = yield db_1.default.welfareProgram.findUnique({
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
        enrollmentCount: yield db_1.default.enrollment.count({
            where: { welfareProgramId: welfareProgramId },
        }),
    };
});
exports.getWelfareProgramTotalsHelper = getWelfareProgramTotalsHelper;
const getWelfareProgramExpensesHelper = (welfareProgramId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.expense.findMany({
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
});
exports.getWelfareProgramExpensesHelper = getWelfareProgramExpensesHelper;
