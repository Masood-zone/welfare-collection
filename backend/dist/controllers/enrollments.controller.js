"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectEnrollment = exports.resubmitEnrollment = exports.approveEnrollment = exports.deleteEnrollment = exports.updateEnrollment = exports.getEnrollmentByUserId = exports.getEnrollmentById = exports.getAllEnrollments = exports.createEnrollment = void 0;
const app_error_1 = require("../utils/app-error");
const enrollments_helper_1 = require("../helpers/enrollments.helper");
const createEnrollment = async (req, res, next) => {
    const { userId, welfareProgramId } = req.body;
    try {
        const enrollment = await (0, enrollments_helper_1.createEnrollmentHelper)({
            userId,
            welfareProgramId,
        });
        res
            .status(201)
            .json({ message: "Enrollment created successfully", enrollment });
    }
    catch (error) {
        next(new app_error_1.AppError("Error creating enrollment", 500));
    }
};
exports.createEnrollment = createEnrollment;
const getAllEnrollments = async (req, res, next) => {
    try {
        const enrollments = await (0, enrollments_helper_1.getAllEnrollmentsHelper)();
        res.status(200).json({ enrollments });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching enrollments", 500));
    }
};
exports.getAllEnrollments = getAllEnrollments;
const getEnrollmentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const enrollment = await (0, enrollments_helper_1.getEnrollmentByIdHelper)(id);
        if (!enrollment) {
            return next(new app_error_1.AppError("Enrollment not found", 404));
        }
        res.status(200).json({ enrollment });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching enrollment", 500));
    }
};
exports.getEnrollmentById = getEnrollmentById;
const getEnrollmentByUserId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const enrollments = await (0, enrollments_helper_1.getEnrollmentsByUserIdHelper)({ userId: id });
        res.status(200).json({ enrollments });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching enrollments", 500));
    }
};
exports.getEnrollmentByUserId = getEnrollmentByUserId;
const updateEnrollment = async (req, res, next) => {
    const { id } = req.params;
    const { welfareProgramId, userId } = req.body;
    const enrollment = await (0, enrollments_helper_1.getEnrollmentByIdHelper)(id);
    if (!enrollment) {
        return next(new app_error_1.AppError("Enrollment not found", 404));
    }
    try {
        const updatedEnrollment = await (0, enrollments_helper_1.updateEnrollmentHelper)(id, {
            userId,
            welfareProgramId,
        });
        res.status(200).json({
            message: "Enrollment updated successfully",
            enrollment: updatedEnrollment,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error updating enrollment", 500));
    }
};
exports.updateEnrollment = updateEnrollment;
const deleteEnrollment = async (req, res, next) => {
    const { id } = req.params;
    const enrollment = await (0, enrollments_helper_1.getEnrollmentByIdHelper)(id);
    if (!enrollment) {
        return next(new app_error_1.AppError("Enrollment not found", 404));
    }
    try {
        await (0, enrollments_helper_1.deleteEnrollmentHelper)(id);
        res.status(200).json({ message: "Enrollment deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError("Error deleting enrollment", 500));
    }
};
exports.deleteEnrollment = deleteEnrollment;
const approveEnrollment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedEnrollment = await (0, enrollments_helper_1.approveEnrollmentHelper)(id);
        res.status(200).json({
            message: "Enrollment approved successfully",
            enrollment: updatedEnrollment,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error approving enrollment", 500));
    }
};
exports.approveEnrollment = approveEnrollment;
const resubmitEnrollment = async (req, res, next) => {
    const { id } = req.params;
    const { userId, welfareProgramId } = req.body;
    try {
        const updatedEnrollment = await (0, enrollments_helper_1.resubmitEnrollmentHelper)(id, {
            userId,
            welfareProgramId,
        });
        res.status(200).json({
            message: "Enrollment resubmitted successfully",
            enrollment: updatedEnrollment,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error resubmitting enrollment", 500));
    }
};
exports.resubmitEnrollment = resubmitEnrollment;
const rejectEnrollment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedEnrollment = await (0, enrollments_helper_1.rejectEnrollmentHelper)(id);
        res.status(200).json({
            message: "Enrollment rejected successfully",
            enrollment: updatedEnrollment,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error rejecting enrollment", 500));
    }
};
exports.rejectEnrollment = rejectEnrollment;
//# sourceMappingURL=enrollments.controller.js.map