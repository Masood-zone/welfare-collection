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
exports.deletePaymentTrackerById = exports.getPaymentTrackerById = exports.getPaymentTrackersByWelfareProgramAndUserId = exports.getPaymentTrackersByUserId = void 0;
const db_1 = __importDefault(require("../config/db"));
/**
 * Get payment trackers by user ID.
 * @param userId - The ID of the user.
 */
const getPaymentTrackersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.paymentTracker.findMany({
        where: { userId },
        include: {
            welfareProgram: true, // Include welfare program details
            payment: true, // Include associated payments
        },
        orderBy: { cycleStart: "desc" },
    });
});
exports.getPaymentTrackersByUserId = getPaymentTrackersByUserId;
/**
 * Get payment trackers by welfare program ID and user ID.
 * @param welfareProgramId - The ID of the welfare program.
 * @param userId - The ID of the user.
 */
const getPaymentTrackersByWelfareProgramAndUserId = (welfareProgramId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.paymentTracker.findMany({
        where: {
            welfareProgramId,
            userId,
        },
        include: {
            welfareProgram: true, // Include welfare program details
            user: true, // Include user details
            payment: true, // Include associated payments
        },
        orderBy: { cycleStart: "desc" },
    });
});
exports.getPaymentTrackersByWelfareProgramAndUserId = getPaymentTrackersByWelfareProgramAndUserId;
/**
 * Details of payment being tracked.
 * @param data - The data for tracking payment.
 */
const getPaymentTrackerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.paymentTracker.findUnique({
        where: { id },
        include: {
            welfareProgram: true, // Include welfare program details
            user: true, // Include user details
            payment: true, // Include associated payments
        },
    });
});
exports.getPaymentTrackerById = getPaymentTrackerById;
/**
 * Delete payment tracker by ID.
 * @param id - The ID of the payment tracker.
 */
const deletePaymentTrackerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.paymentTracker.delete({
        where: { id },
    });
});
exports.deletePaymentTrackerById = deletePaymentTrackerById;
