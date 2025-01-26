"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePaymentAmount = exports.updatePayment = exports.updatePaymentByReference = exports.getUserPayments = exports.getWelfarePayments = exports.getPaymentById = exports.getAllPayments = exports.initializePaystackPayment = exports.createPayment = void 0;
const app_error_1 = require("../utils/app-error");
const payments_helper_1 = require("../helpers/payments.helper");
const createPayment = async (req, res, next) => {
    const { userId, welfareProgramId, amount, paymentMode } = req.body;
    try {
        const payment = await (0, payments_helper_1.createPaymentHelper)({
            userId,
            welfareProgramId,
            amount,
            paymentMode,
            reference: "",
            access_code: "",
            status: "PAID",
        });
        res.status(201).json({
            message: "Cash payment created successfully",
            payment,
            cycleStart: payment.cycleStart,
            cycleEnd: payment.cycleEnd,
            remainingAmount: payment.remainingAmount,
            prepaidAmount: payment.prepaidAmount,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error creating cash payment", 500));
    }
};
exports.createPayment = createPayment;
const initializePaystackPayment = async (req, res, next) => {
    const { userId, email, welfareProgramId, amount, paymentMode } = req.body;
    try {
        const paystackResponse = await (0, payments_helper_1.initializePaystackTransaction)({
            amount: amount * 100,
            email: email,
            metadata: {
                userId,
                welfareProgramId,
                paymentMode,
            },
        });
        const payment = await (0, payments_helper_1.createPaymentHelper)({
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
};
exports.initializePaystackPayment = initializePaystackPayment;
const getAllPayments = async (req, res, next) => {
    try {
        const payments = await (0, payments_helper_1.getAllPaymentsHelper)();
        res.status(200).json({ payments });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payments", 500));
    }
};
exports.getAllPayments = getAllPayments;
const getPaymentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const payment = await (0, payments_helper_1.getPaymentByIdHelper)(id);
        if (!payment) {
            return next(new app_error_1.AppError("Payment not found", 404));
        }
        res.status(200).json({ payment });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payment", 500));
    }
};
exports.getPaymentById = getPaymentById;
const getWelfarePayments = async (req, res, next) => {
    const { welfareId } = req.params;
    try {
        const payments = await (0, payments_helper_1.getWelfarePaymentsHelper)(welfareId);
        res.status(200).json(payments);
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching welfare payments", 500));
    }
};
exports.getWelfarePayments = getWelfarePayments;
const getUserPayments = async (req, res, next) => {
    const { id } = req.params;
    try {
        const payments = await (0, payments_helper_1.getPaymentsByUserIdHelper)(id);
        if (!payments) {
            return next(new app_error_1.AppError("Payments not found", 404));
        }
        res.status(200).json({ payments });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payments", 500));
    }
};
exports.getUserPayments = getUserPayments;
const updatePaymentByReference = async (req, res, next) => {
    const { id, reference } = req.params;
    const { status } = req.body;
    try {
        const updatedPayment = await (0, payments_helper_1.updatePaymentByReferenceHelper)(id, reference, status);
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
};
exports.updatePaymentByReference = updatePaymentByReference;
const updatePayment = async (req, res, next) => {
    const { id } = req.params;
    const { amount, paymentMode } = req.body;
    const payment = await (0, payments_helper_1.getPaymentByIdHelper)(id);
    if (!payment) {
        return next(new app_error_1.AppError("Payment not found", 404));
    }
    try {
        const updatedPayment = await (0, payments_helper_1.updatePaymentHelper)(id, {
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
};
exports.updatePayment = updatePayment;
const updatePaymentAmount = async (req, res, next) => {
    const { paymentId } = req.params;
    const { amount } = req.body;
    const payment = await (0, payments_helper_1.findPaymentByIdHelper)(paymentId);
    if (!payment) {
        return next(new app_error_1.AppError("Payment not found", 404));
    }
    try {
        const { updatedPayment, updatedPaymentTracker } = await (0, payments_helper_1.updatePaymentRemainingAmountHelper)(paymentId, amount);
        res.status(200).json({
            message: "Payment amount updated successfully",
            payment: updatedPayment,
            paymentTracker: updatedPaymentTracker,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error updating payment amount", 500));
    }
};
exports.updatePaymentAmount = updatePaymentAmount;
const deletePayment = async (req, res, next) => {
    const { id } = req.params;
    const payment = await (0, payments_helper_1.getPaymentByIdHelper)(id);
    if (!payment) {
        return next(new app_error_1.AppError("Payment not found", 404));
    }
    try {
        await (0, payments_helper_1.deletePaymentHelper)(id);
        res.status(200).json({ message: "Payment deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError(`Error deleting payment ${error}`, 500));
    }
};
exports.deletePayment = deletePayment;
//# sourceMappingURL=payments.controller.js.map