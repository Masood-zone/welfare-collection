"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resubmitEnrollmentHelper = exports.rejectEnrollmentHelper = exports.approveEnrollmentHelper = exports.deleteEnrollmentHelper = exports.updateEnrollmentHelper = exports.findEnrollmentByIdHelper = exports.getEnrollmentsByUserIdHelper = exports.getEnrollmentByIdHelper = exports.getAllEnrollmentsHelper = exports.createEnrollmentHelper = void 0;
const db_1 = __importDefault(require("../config/db"));
const app_error_1 = require("../utils/app-error");
const createEnrollmentHelper = async (data) => {
    return await db_1.default.enrollment.create({
        data: {
            userId: data.userId,
            welfareProgramId: data.welfareProgramId,
            status: "PENDING",
        },
    });
};
exports.createEnrollmentHelper = createEnrollmentHelper;
const getAllEnrollmentsHelper = async () => {
    return await db_1.default.enrollment.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            welfareProgram: true,
        },
    });
};
exports.getAllEnrollmentsHelper = getAllEnrollmentsHelper;
const getEnrollmentByIdHelper = async (id) => {
    return await db_1.default.enrollment.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            welfareProgram: true,
        },
    });
};
exports.getEnrollmentByIdHelper = getEnrollmentByIdHelper;
const getEnrollmentsByUserIdHelper = async (data) => {
    return await db_1.default.enrollment.findMany({
        where: { userId: data.userId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            welfareProgram: true,
        },
    });
};
exports.getEnrollmentsByUserIdHelper = getEnrollmentsByUserIdHelper;
const findEnrollmentByIdHelper = async (id) => {
    return await db_1.default.enrollment.findUnique({ where: { id } });
};
exports.findEnrollmentByIdHelper = findEnrollmentByIdHelper;
const updateEnrollmentHelper = async (id, data) => {
    return await db_1.default.enrollment.update({
        where: { id },
        data: {
            userId: data.userId,
            welfareProgramId: data.welfareProgramId,
        },
    });
};
exports.updateEnrollmentHelper = updateEnrollmentHelper;
const deleteEnrollmentHelper = async (id) => {
    return await db_1.default.enrollment.delete({ where: { id } });
};
exports.deleteEnrollmentHelper = deleteEnrollmentHelper;
const approveEnrollmentHelper = async (id) => {
    const enrollment = await db_1.default.enrollment.findUnique({ where: { id } });
    if (!enrollment) {
        throw new app_error_1.AppError("Enrollment not found", 404);
    }
    const result = await db_1.default.enrollment.update({
        where: { id },
        data: {
            status: "APPROVED",
        },
    });
    return result;
};
exports.approveEnrollmentHelper = approveEnrollmentHelper;
const rejectEnrollmentHelper = async (id) => {
    const enrollment = await db_1.default.enrollment.findUnique({ where: { id } });
    if (!enrollment) {
        throw new app_error_1.AppError("Enrollment not found", 404);
    }
    const result = await db_1.default.enrollment.update({
        where: { id },
        data: {
            status: "REJECTED",
        },
    });
    return result;
};
exports.rejectEnrollmentHelper = rejectEnrollmentHelper;
const resubmitEnrollmentHelper = async (id, data) => {
    const enrollment = await db_1.default.enrollment.findUnique({ where: { id } });
    if (!enrollment) {
        throw new app_error_1.AppError("Enrollment not found", 404);
    }
    const result = await db_1.default.enrollment.update({
        where: { id },
        data: {
            status: "PENDING",
            userId: data.userId,
            welfareProgramId: data.welfareProgramId,
        },
    });
    return result;
};
exports.resubmitEnrollmentHelper = resubmitEnrollmentHelper;
//# sourceMappingURL=enrollments.helper.js.map