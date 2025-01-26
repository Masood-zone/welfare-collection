"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentTracker = exports.trackPaymentsDetails = exports.trackPaymentsByWelfareProgramAndUser = exports.trackPaymentsByUserId = void 0;
const app_error_1 = require("../utils/app-error");
const payment_tracker_helper_1 = require("../helpers/payment-tracker.helper");
const trackPaymentsByUserId = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const paymentTrackers = await (0, payment_tracker_helper_1.getPaymentTrackersByUserId)(userId);
        res.status(200).json({ paymentTrackers });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payment trackers by user ID", 500));
    }
};
exports.trackPaymentsByUserId = trackPaymentsByUserId;
const trackPaymentsByWelfareProgramAndUser = async (req, res, next) => {
    const { welfareProgramId } = req.params;
    const { userId } = req.query;
    if (!userId) {
        return next(new app_error_1.AppError("User ID is required", 400));
    }
    try {
        const paymentTrackers = await (0, payment_tracker_helper_1.getPaymentTrackersByWelfareProgramAndUserId)(welfareProgramId, userId);
        res.status(200).json({ paymentTrackers });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payment trackers", 500));
    }
};
exports.trackPaymentsByWelfareProgramAndUser = trackPaymentsByWelfareProgramAndUser;
const trackPaymentsDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
        const paymentTracker = await (0, payment_tracker_helper_1.getPaymentTrackerById)(id);
        if (!paymentTracker) {
            return next(new app_error_1.AppError("Payment tracker not found", 404));
        }
        res.status(200).json({ paymentTracker });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching payment tracker details", 500));
    }
};
exports.trackPaymentsDetails = trackPaymentsDetails;
const deletePaymentTracker = async (req, res, next) => {
    const { id } = req.params;
    try {
        await (0, payment_tracker_helper_1.deletePaymentTrackerById)(id);
        res.status(200).json({ message: "Payment tracker deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError("Error deleting payment tracker", 500));
    }
};
exports.deletePaymentTracker = deletePaymentTracker;
//# sourceMappingURL=payment-tracker.controller.js.map