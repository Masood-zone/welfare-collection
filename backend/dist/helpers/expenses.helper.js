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
exports.deleteExpenseHelper = exports.updateExpenseHelper = exports.findExpenseByIdHelper = exports.getExpenseByIdHelper = exports.getAllExpensesHelper = exports.createExpenseHelper = void 0;
const db_1 = __importDefault(require("../config/db"));
const createExpenseHelper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.expense.create({
        data: {
            description: data.description,
            amount: data.amount,
            welfareProgramId: data.welfareProgramId,
            recordedBy: data.recordedBy,
        },
    });
});
exports.createExpenseHelper = createExpenseHelper;
const getAllExpensesHelper = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.expense.findMany({
        include: { welfareProgram: true },
    });
});
exports.getAllExpensesHelper = getAllExpensesHelper;
const getExpenseByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.expense.findUnique({
        where: { id },
        include: { welfareProgram: true },
    });
});
exports.getExpenseByIdHelper = getExpenseByIdHelper;
const findExpenseByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.expense.findUnique({ where: { id } });
});
exports.findExpenseByIdHelper = findExpenseByIdHelper;
const updateExpenseHelper = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.expense.update({
        where: { id },
        data,
    });
});
exports.updateExpenseHelper = updateExpenseHelper;
const deleteExpenseHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.expense.delete({ where: { id } });
});
exports.deleteExpenseHelper = deleteExpenseHelper;
