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
exports.rejectEnrollment = exports.resubmitEnrollment = exports.approveEnrollment = exports.deleteEnrollment = exports.updateEnrollment = exports.getEnrollmentByUserId = exports.getEnrollmentById = exports.getAllEnrollments = exports.createEnrollment = void 0;
const app_error_1 = require("../utils/app-error");
const enrollments_helper_1 = require("../helpers/enrollments.helper");
const createEnrollment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, welfareProgramId } = req.body;
    try {
        const enrollment = yield (0, enrollments_helper_1.createEnrollmentHelper)({
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
});
exports.createEnrollment = createEnrollment;
const getAllEnrollments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enrollments = yield (0, enrollments_helper_1.getAllEnrollmentsHelper)();
        res.status(200).json({ enrollments });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching enrollments", 500));
    }
});
exports.getAllEnrollments = getAllEnrollments;
const getEnrollmentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const enrollment = yield (0, enrollments_helper_1.getEnrollmentByIdHelper)(id);
        if (!enrollment) {
            return next(new app_error_1.AppError("Enrollment not found", 404));
        }
        res.status(200).json({ enrollment });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching enrollment", 500));
    }
});
exports.getEnrollmentById = getEnrollmentById;
const getEnrollmentByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const enrollments = yield (0, enrollments_helper_1.getEnrollmentsByUserIdHelper)({ userId: id });
        res.status(200).json({ enrollments });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching enrollments", 500));
    }
});
exports.getEnrollmentByUserId = getEnrollmentByUserId;
const updateEnrollment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { welfareProgramId, userId } = req.body;
    // Check if enrollment exists
    const enrollment = yield (0, enrollments_helper_1.getEnrollmentByIdHelper)(id);
    if (!enrollment) {
        return next(new app_error_1.AppError("Enrollment not found", 404));
    }
    try {
        const updatedEnrollment = yield (0, enrollments_helper_1.updateEnrollmentHelper)(id, {
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
});
exports.updateEnrollment = updateEnrollment;
const deleteEnrollment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check if enrollment exists
    const enrollment = yield (0, enrollments_helper_1.getEnrollmentByIdHelper)(id);
    if (!enrollment) {
        return next(new app_error_1.AppError("Enrollment not found", 404));
    }
    try {
        yield (0, enrollments_helper_1.deleteEnrollmentHelper)(id);
        res.status(200).json({ message: "Enrollment deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError("Error deleting enrollment", 500));
    }
});
exports.deleteEnrollment = deleteEnrollment;
const approveEnrollment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedEnrollment = yield (0, enrollments_helper_1.approveEnrollmentHelper)(id);
        res.status(200).json({
            message: "Enrollment approved successfully",
            enrollment: updatedEnrollment,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error approving enrollment", 500));
    }
});
exports.approveEnrollment = approveEnrollment;
const resubmitEnrollment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, welfareProgramId } = req.body;
    try {
        const updatedEnrollment = yield (0, enrollments_helper_1.resubmitEnrollmentHelper)(id, {
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
});
exports.resubmitEnrollment = resubmitEnrollment;
const rejectEnrollment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedEnrollment = yield (0, enrollments_helper_1.rejectEnrollmentHelper)(id);
        res.status(200).json({
            message: "Enrollment rejected successfully",
            enrollment: updatedEnrollment,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error rejecting enrollment", 500));
    }
});
exports.rejectEnrollment = rejectEnrollment;
