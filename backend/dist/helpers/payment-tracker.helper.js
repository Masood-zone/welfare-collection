"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentTrackerById = exports.getPaymentTrackerById = exports.getPaymentTrackersByWelfareProgramAndUserId = exports.getPaymentTrackersByUserId = void 0;
const db_1 = __importDefault(require("../config/db"));
const getPaymentTrackersByUserId = async (userId) => {
    return await db_1.default.paymentTracker.findMany({
        where: { userId },
        include: {
            welfareProgram: true,
            payment: true,
        },
        orderBy: { cycleStart: "desc" },
    });
};
exports.getPaymentTrackersByUserId = getPaymentTrackersByUserId;
const getPaymentTrackersByWelfareProgramAndUserId = async (welfareProgramId, userId) => {
    return await db_1.default.paymentTracker.findMany({
        where: {
            welfareProgramId,
            userId,
        },
        include: {
            welfareProgram: true,
            user: true,
            payment: true,
        },
        orderBy: { cycleStart: "desc" },
    });
};
exports.getPaymentTrackersByWelfareProgramAndUserId = getPaymentTrackersByWelfareProgramAndUserId;
const getPaymentTrackerById = async (id) => {
    return await db_1.default.paymentTracker.findUnique({
        where: { id },
        include: {
            welfareProgram: true,
            user: true,
            payment: true,
        },
    });
};
exports.getPaymentTrackerById = getPaymentTrackerById;
const deletePaymentTrackerById = async (id) => {
    return await db_1.default.paymentTracker.delete({
        where: { id },
    });
};
exports.deletePaymentTrackerById = deletePaymentTrackerById;
//# sourceMappingURL=payment-tracker.helper.js.map