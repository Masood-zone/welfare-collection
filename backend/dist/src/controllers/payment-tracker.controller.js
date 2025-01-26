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
exports.deletePaymentTracker = exports.trackPaymentsDetails = exports.trackPaymentsByWelfareProgramAndUser = exports.trackPaymentsByUserId = void 0;
const app_error_1 = require("../utils/app-error");
const payment_tracker_helper_1 = require("../helpers/payment-tracker.helper");
/**
 * Get payment trackers by user ID.
 */
const trackPaymentsByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const paymentTrackers = yield (0, payment_tracker_helper_1.getPaymentTrackersByUserId)(userId);
        res.status(200).json({ paymentTrackers });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payment trackers by user ID", 500));
    }
});
exports.trackPaymentsByUserId = trackPaymentsByUserId;
/**
 * Get payment trackers by welfare program ID and user ID.
 */
const trackPaymentsByWelfareProgramAndUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { welfareProgramId } = req.params;
    const { userId } = req.query; // Assume `userId` is passed as a query parameter
    if (!userId) {
        return next(new app_error_1.AppError("User ID is required", 400));
    }
    try {
        const paymentTrackers = yield (0, payment_tracker_helper_1.getPaymentTrackersByWelfareProgramAndUserId)(welfareProgramId, userId);
        res.status(200).json({ paymentTrackers });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payment trackers", 500));
    }
});
exports.trackPaymentsByWelfareProgramAndUser = trackPaymentsByWelfareProgramAndUser;
const trackPaymentsDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get payment tracker by ID
    const { id } = req.params;
    try {
        const paymentTracker = yield (0, payment_tracker_helper_1.getPaymentTrackerById)(id);
        if (!paymentTracker) {
            return next(new app_error_1.AppError("Payment tracker not found", 404));
        }
        res.status(200).json({ paymentTracker });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payment tracker details", 500));
    }
});
exports.trackPaymentsDetails = trackPaymentsDetails;
// Delete payment tracker
const deletePaymentTracker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, payment_tracker_helper_1.deletePaymentTrackerById)(id);
        res.status(200).json({ message: "Payment tracker deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError("Error deleting payment tracker", 500));
    }
});
exports.deletePaymentTracker = deletePaymentTracker;
