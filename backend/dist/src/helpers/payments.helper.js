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
exports.updatePaymentByReferenceHelper = exports.deletePaymentHelper = exports.updatePaymentRemainingAmountHelper = exports.updatePaymentHelper = exports.findPaymentByIdHelper = exports.getPaymentByIdHelper = exports.getPaymentsByUserIdHelper = exports.getWelfarePaymentsHelper = exports.getAllPaymentsHelper = exports.createPaymentHelper = exports.verifyPaystackTransaction = exports.initializePaystackTransaction = void 0;
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
        select: { paymentCycle: true, amount: true },
    });
    if (!welfareProgram) {
        throw new Error("Welfare program not found");
    }
    // Determine cycleStart and cycleEnd based on the payment cycle
    const now = new Date();
    let cycleStart = now;
    let cycleEnd = new Date();
    let expectedAmount = welfareProgram.amount.toNumber();
    let remainingAmount = 0;
    let prepaidAmount = 0;
    switch (welfareProgram.paymentCycle) {
        case "DAILY":
            cycleEnd.setDate(cycleEnd.getDate() + 1);
            break;
        case "WEEKLY":
            cycleEnd.setDate(cycleEnd.getDate() + 7);
            break;
        case "MONTHLY":
            cycleEnd.setMonth(cycleEnd.getMonth() + 1);
            // expectedAmount *= 30;
            break;
    }
    // Extend or decrease cycleEnd based on the amount paid
    if (data.amount < expectedAmount) {
        remainingAmount = expectedAmount - data.amount;
        cycleEnd = new Date(cycleStart.getTime() +
            (data.amount / expectedAmount) *
                (cycleEnd.getTime() - cycleStart.getTime()));
    }
    else if (data.amount > expectedAmount) {
        prepaidAmount = data.amount - expectedAmount;
        const extraDays = prepaidAmount / welfareProgram.amount.toNumber();
        cycleEnd.setDate(cycleEnd.getDate() + Math.floor(extraDays));
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
            remainingAmount,
            prepaidAmount,
        },
    });
    return { payment, cycleStart, cycleEnd, remainingAmount, prepaidAmount };
});
exports.createPaymentHelper = createPaymentHelper;
const getAllPaymentsHelper = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.findMany({
        include: { user: true, welfareProgram: true },
    });
});
exports.getAllPaymentsHelper = getAllPaymentsHelper;
const getWelfarePaymentsHelper = (welfareProgramId) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield db_1.default.payment.findMany({
        where: { welfareProgramId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: { paymentDate: "desc" },
    });
    return payments.map((payment) => ({
        id: payment.id,
        userId: payment.userId,
        userName: payment.user.name,
        amount: payment.amount.toString(),
        paymentDate: payment.paymentDate.toISOString(),
        paymentMode: payment.paymentMode,
        status: payment.status,
    }));
});
exports.getWelfarePaymentsHelper = getWelfarePaymentsHelper;
const getPaymentsByUserIdHelper = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.findMany({
        where: { userId },
        include: {
            user: true,
            welfareProgram: true,
            paymentTrackers: {
                orderBy: { cycleEnd: "desc" },
                take: 1,
            },
        },
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
const updatePaymentRemainingAmountHelper = (id, amount) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payment = yield db_1.default.payment.findUnique({
        where: { id },
        include: {
            welfareProgram: true,
            paymentTrackers: {
                orderBy: { cycleEnd: "desc" },
                take: 1,
            },
        },
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    const latestPaymentTracker = (_a = payment === null || payment === void 0 ? void 0 : payment.paymentTrackers) === null || _a === void 0 ? void 0 : _a[0];
    if (!latestPaymentTracker) {
        throw new Error("Payment tracker not found");
    }
    const expectedAmount = Number(payment.welfareProgram.amount);
    const currentPaidAmount = Number(payment.amount);
    const newTotalAmount = currentPaidAmount + amount;
    const remainingAmount = Math.max(expectedAmount - newTotalAmount, 0);
    if (amount > latestPaymentTracker.remainingAmount.toNumber()) {
        throw new Error("Amount exceeds remaining amount");
    }
    let cycleEnd = latestPaymentTracker.cycleEnd;
    if (newTotalAmount < expectedAmount) {
        const paidDays = (newTotalAmount / expectedAmount) *
            (cycleEnd.getTime() - latestPaymentTracker.cycleStart.getTime());
        cycleEnd = new Date(latestPaymentTracker.cycleStart.getTime() + paidDays);
    }
    const updatedPayment = yield db_1.default.payment.update({
        where: { id },
        data: { amount: newTotalAmount },
    });
    const updatedPaymentTracker = yield db_1.default.paymentTracker.update({
        where: { id: latestPaymentTracker.id },
        data: {
            cycleEnd,
            remainingAmount,
            paymentStatus: remainingAmount === 0 ? "PAID" : "UNPAID",
        },
    });
    return { updatedPayment, updatedPaymentTracker };
});
exports.updatePaymentRemainingAmountHelper = updatePaymentRemainingAmountHelper;
const deletePaymentHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.payment.delete({ where: { id } });
});
exports.deletePaymentHelper = deletePaymentHelper;
const updatePaymentByReferenceHelper = (id, reference, status) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield db_1.default.payment.findUnique({
        where: { id, paystackreference: reference },
        include: {
            welfareProgram: true,
            paymentTrackers: {
                orderBy: { cycleEnd: "desc" },
                take: 1,
            },
        },
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    const latestPaymentTracker = payment.paymentTrackers[0];
    if (!latestPaymentTracker) {
        throw new Error("Payment tracker not found");
    }
    const cycleStart = latestPaymentTracker.cycleStart;
    let cycleEnd = latestPaymentTracker.cycleEnd;
    let remainingAmount = latestPaymentTracker.remainingAmount.toNumber();
    let prepaidAmount = latestPaymentTracker.prepaidAmount.toNumber();
    const expectedAmount = Number(payment.welfareProgram.amount);
    const paidAmount = Number(payment.amount);
    if (status === "PAID") {
        if (paidAmount < expectedAmount) {
            remainingAmount = expectedAmount - paidAmount;
            const paidDays = (paidAmount / expectedAmount) *
                (cycleEnd.getTime() - cycleStart.getTime());
            cycleEnd = new Date(cycleStart.getTime() + paidDays);
        }
        else if (paidAmount > expectedAmount) {
            prepaidAmount = paidAmount - expectedAmount;
            const extraDays = prepaidAmount / expectedAmount;
            cycleEnd = new Date(cycleEnd.getTime() + extraDays * 24 * 60 * 60 * 1000);
            remainingAmount = 0;
        }
        else {
            remainingAmount = 0;
            prepaidAmount = 0;
        }
    }
    else if (status === "UNPAID") {
        remainingAmount = expectedAmount;
        cycleEnd = cycleStart;
        prepaidAmount = 0;
    }
    const updatedPayment = yield db_1.default.payment.update({
        where: { id, paystackreference: reference },
        data: { status },
    });
    const updatedPaymentTracker = yield db_1.default.paymentTracker.update({
        where: { id: latestPaymentTracker.id },
        data: {
            paymentStatus: status,
            cycleEnd,
            remainingAmount,
            prepaidAmount,
        },
    });
    return { updatedPayment, updatedPaymentTracker };
});
exports.updatePaymentByReferenceHelper = updatePaymentByReferenceHelper;
