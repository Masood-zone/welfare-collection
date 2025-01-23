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
exports.deletePayment = exports.updatePayment = exports.updatePaymentByReference = exports.getUserPayments = exports.getPaymentById = exports.getAllPayments = exports.initializePaystackPayment = exports.createPayment = void 0;
const app_error_1 = require("../utils/app-error");
const payments_helper_1 = require("../helpers/payments.helper");
const createPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, welfareProgramId, amount, paymentMode } = req.body;
    try {
        // Create a cash payment
        const payment = yield (0, payments_helper_1.createPaymentHelper)({
            userId,
            welfareProgramId,
            amount,
            paymentMode,
            reference: "", // No Paystack reference for cash payments
            access_code: "", // No access code for cash payments
            status: "PAID", // Cash payments are considered paid immediately
        });
        res
            .status(201)
            .json({ message: "Cash payment created successfully", payment });
    }
    catch (error) {
        next(new app_error_1.AppError("Error creating cash payment", 500));
    }
});
exports.createPayment = createPayment;
const initializePaystackPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, email, welfareProgramId, amount, paymentMode } = req.body;
    try {
        // Initialize paystack transaction
        const paystackResponse = yield (0, payments_helper_1.initializePaystackTransaction)({
            amount: amount * 100,
            email: email,
            metadata: {
                userId,
                welfareProgramId,
                paymentMode,
            },
        });
        // Create a pending payment
        const payment = yield (0, payments_helper_1.createPaymentHelper)({
            userId,
            welfareProgramId,
            amount,
            paymentMode,
            reference: paystackResponse.reference,
            access_code: paystackResponse.access_code,
            status: "UNPAID",
        });
        res
            .status(201)
            .json({ message: "Paystack payment initialized successfully", payment });
    }
    catch (error) {
        next(new app_error_1.AppError("Error initializing Paystack payment", 500));
    }
});
exports.initializePaystackPayment = initializePaystackPayment;
const getAllPayments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield (0, payments_helper_1.getAllPaymentsHelper)();
        res.status(200).json({ payments });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payments", 500));
    }
});
exports.getAllPayments = getAllPayments;
const getPaymentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const payment = yield (0, payments_helper_1.getPaymentByIdHelper)(id);
        if (!payment) {
            return next(new app_error_1.AppError("Payment not found", 404));
        }
        res.status(200).json({ payment });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payment", 500));
    }
});
exports.getPaymentById = getPaymentById;
const getUserPayments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const payments = yield (0, payments_helper_1.getPaymentsByUserIdHelper)(id);
        if (!payments) {
            return next(new app_error_1.AppError("Payments not found", 404));
        }
        res.status(200).json({ payments });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payments", 500));
    }
});
exports.getUserPayments = getUserPayments;
const updatePaymentByReference = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, reference } = req.params;
    const { status } = req.body;
    try {
        const updatedPayment = yield (0, payments_helper_1.updatePaymentByReferenceHelper)(id, reference, status);
        if (!updatedPayment) {
            return next(new app_error_1.AppError("Payment not found", 404));
        }
        res.status(200).json({
            message: "Payment updated successfully",
            payment: updatedPayment,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error updating payment", 500));
    }
});
exports.updatePaymentByReference = updatePaymentByReference;
const updatePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { amount, paymentMode } = req.body;
    // Check if payment exists
    const payment = yield (0, payments_helper_1.getPaymentByIdHelper)(id);
    // If payment does not exist, return an error
    if (!payment) {
        return next(new app_error_1.AppError("Payment not found", 404));
    }
    try {
        const updatedPayment = yield (0, payments_helper_1.updatePaymentHelper)(id, {
            amount,
            paymentMode,
        });
        res.status(200).json({
            message: "Payment updated successfully",
            payment: updatedPayment,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error updating payment", 500));
    }
});
exports.updatePayment = updatePayment;
const deletePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check if payment exists
    const payment = yield (0, payments_helper_1.getPaymentByIdHelper)(id);
    // If payment does not exist, return an error
    if (!payment) {
        return next(new app_error_1.AppError("Payment not found", 404));
    }
    try {
        yield (0, payments_helper_1.deletePaymentHelper)(id);
        res.status(200).json({ message: "Payment deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError(`Error deleting payment ${error}`, 500));
    }
});
exports.deletePayment = deletePayment;
