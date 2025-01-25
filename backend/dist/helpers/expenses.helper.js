"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpenseHelper = exports.updateExpenseHelper = exports.findExpenseByIdHelper = exports.getExpenseByIdHelper = exports.getAllExpensesHelper = exports.createExpenseHelper = void 0;
const db_1 = __importDefault(require("../config/db"));
const createExpenseHelper = async (data) => {
    return await db_1.default.expense.create({
        data: {
            description: data.description,
            amount: data.amount,
            welfareProgramId: data.welfareProgramId,
            recordedBy: data.recordedBy,
        },
    });
};
exports.createExpenseHelper = createExpenseHelper;
const getAllExpensesHelper = async () => {
    return await db_1.default.expense.findMany({
        include: { welfareProgram: true },
    });
};
exports.getAllExpensesHelper = getAllExpensesHelper;
const getExpenseByIdHelper = async (id) => {
    return await db_1.default.expense.findUnique({
        where: { id },
        include: { welfareProgram: true },
    });
};
exports.getExpenseByIdHelper = getExpenseByIdHelper;
const findExpenseByIdHelper = async (id) => {
    return await db_1.default.expense.findUnique({ where: { id } });
};
exports.findExpenseByIdHelper = findExpenseByIdHelper;
const updateExpenseHelper = async (id, data) => {
    return await db_1.default.expense.update({
        where: { id },
        data,
    });
};
exports.updateExpenseHelper = updateExpenseHelper;
const deleteExpenseHelper = async (id) => {
    return await db_1.default.expense.delete({ where: { id } });
};
exports.deleteExpenseHelper = deleteExpenseHelper;
//# sourceMappingURL=expenses.helper.js.map