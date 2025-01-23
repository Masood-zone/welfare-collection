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
exports.updatePaymentByReferenceHelper = exports.deletePaymentHelper = exports.updatePaymentHelper = exports.findPaymentByIdHelper = exports.getPaymentByIdHelper = exports.getPaymentsByUserIdHelper = exports.getAllPaymentsHelper = exports.createPaymentHelper = exports.verifyPaystackTransaction = exports.initializePaystackTransaction = void 0;
const db_1 = __importDefault(require("../config/db"));
const generateRecieptNumber_1 = __importDefault(require("../utils/generateRecieptNumber"));
const axios_1 = __importDefault(require("axios"));
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
/**
 * Initialize a payment transaction.
 * @param data - Transaction details.
 */
const initializePaystackTransaction = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://api.paystack.co/transaction/initialize", params, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    }
    catch (error) {
        console.error("Paystack initialization error:", error);
        throw new Error("Failed to initialize Paystack transaction");
    }
});
exports.initializePaystackTransaction = initializePaystackTransaction;
/**
 * Verify a payment transaction.
 * @param data - Transaction details.
 */
const verifyPaystackTransaction = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });
        return response.data.data;
    }
    catch (error) {
        console.error("Paystack verification error:", error);
        throw new Error("Failed to verify Paystack transaction");
    }
});
exports.verifyPaystackTransaction = verifyPaystackTransaction;
/**
 * Create a payment and its corresponding payment tracker.
 * @param data - Payment details.
 */
const createPaymentHelper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Generate a unique receipt number
    const receiptNumber = yield (0, generateRecieptNumber_1.default)();
    // Fetch welfare program details to determine payment cycle
    const welfareProgram = yield db_1.default.welfareProgram.findUnique({
        where: { id: data.welfareProgramId },
        select: { paymentCycle: true },
    });
    if (!welfareProgram) {
        throw new Error("Welfare program not found");
    }
    // Determine cycleStart and cycleEnd based on the payment cycle
    const now = new Date();
    let cycleStart = now;
    let cycleEnd = new Date();
    switch (welfareProgram.paymentCycle) {
        case "DAILY":
            cycleEnd.setDate(cycleEnd.getDate() + 1);
            break;
        case "WEEKLY":
            cycleEnd.setDate(cycleEnd.getDate() + 7);
            break;
        case "MONTHLY":
            cycleEnd.setMonth(cycleEnd.getMonth() + 1);
            break;
    }
    // Create payment
    const payment = yield db_1.default.payment.create({
        data: {
            userId: data.userId,
            welfareProgramId: data.welfareProgramId,
            amount: data.amount,
            paymentMode: data.paymentMode,
            receiptNumber,
            paystackreference: data.reference,
            access_code: data.access_code,
            status: data.status,
        },
    });
    // Create payment tracker
    yield db_1.default.paymentTracker.create({
        data: {
            userId: data.userId,
            welfareProgramId: data.welfareProgramId,
            cycleStart,
            cycleEnd,
            paymentStatus: data.status,
            paymentId: payment.id,
        },
    });
    return payment;
});
exports.createPaymentHelper = createPaymentHelper;
const getAllPaymentsHelper = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.findMany({
        include: { user: true, welfareProgram: true },
    });
});
exports.getAllPaymentsHelper = getAllPaymentsHelper;
const getPaymentsByUserIdHelper = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.findMany({
        where: { userId },
        include: { user: true, welfareProgram: true },
    });
});
exports.getPaymentsByUserIdHelper = getPaymentsByUserIdHelper;
const getPaymentByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.findUnique({
        where: { id },
        include: { user: true, welfareProgram: true },
    });
});
exports.getPaymentByIdHelper = getPaymentByIdHelper;
const findPaymentByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.findUnique({ where: { id } });
});
exports.findPaymentByIdHelper = findPaymentByIdHelper;
const updatePaymentHelper = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.update({
        where: { id },
        data,
    });
});
exports.updatePaymentHelper = updatePaymentHelper;
const deletePaymentHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.delete({ where: { id } });
});
exports.deletePaymentHelper = deletePaymentHelper;
const updatePaymentByReferenceHelper = (id, reference, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.update({
        where: { id, paystackreference: reference },
        data: { status },
    });
});
exports.updatePaymentByReferenceHelper = updatePaymentByReferenceHelper;
