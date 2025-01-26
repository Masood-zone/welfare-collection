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
exports.resubmitEnrollmentHelper = exports.rejectEnrollmentHelper = exports.approveEnrollmentHelper = exports.deleteEnrollmentHelper = exports.updateEnrollmentHelper = exports.findEnrollmentByIdHelper = exports.getEnrollmentsByUserIdHelper = exports.getEnrollmentByIdHelper = exports.getAllEnrollmentsHelper = exports.createEnrollmentHelper = void 0;
const db_1 = __importDefault(require("../config/db"));
const app_error_1 = require("../utils/app-error");
const createEnrollmentHelper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.enrollment.create({
        data: {
            userId: data.userId,
            welfareProgramId: data.welfareProgramId,
            status: "PENDING",
        },
    });
});
exports.createEnrollmentHelper = createEnrollmentHelper;
const getAllEnrollmentsHelper = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.enrollment.findMany({
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
});
exports.getAllEnrollmentsHelper = getAllEnrollmentsHelper;
const getEnrollmentByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.enrollment.findUnique({
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
});
exports.getEnrollmentByIdHelper = getEnrollmentByIdHelper;
const getEnrollmentsByUserIdHelper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.enrollment.findMany({
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
});
exports.getEnrollmentsByUserIdHelper = getEnrollmentsByUserIdHelper;
const findEnrollmentByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.enrollment.findUnique({ where: { id } });
});
exports.findEnrollmentByIdHelper = findEnrollmentByIdHelper;
const updateEnrollmentHelper = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.enrollment.update({
        where: { id },
        data: {
            userId: data.userId,
            welfareProgramId: data.welfareProgramId,
        },
    });
});
exports.updateEnrollmentHelper = updateEnrollmentHelper;
const deleteEnrollmentHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.enrollment.delete({ where: { id } });
});
exports.deleteEnrollmentHelper = deleteEnrollmentHelper;
const approveEnrollmentHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollment = yield db_1.default.enrollment.findUnique({ where: { id } });
    if (!enrollment) {
        throw new app_error_1.AppError("Enrollment not found", 404);
    }
    const result = yield db_1.default.enrollment.update({
        where: { id },
        data: {
            status: "APPROVED",
        },
    });
    return result;
});
exports.approveEnrollmentHelper = approveEnrollmentHelper;
const rejectEnrollmentHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollment = yield db_1.default.enrollment.findUnique({ where: { id } });
    if (!enrollment) {
        throw new app_error_1.AppError("Enrollment not found", 404);
    }
    const result = yield db_1.default.enrollment.update({
        where: { id },
        data: {
            status: "REJECTED",
        },
    });
    return result;
});
exports.rejectEnrollmentHelper = rejectEnrollmentHelper;
const resubmitEnrollmentHelper = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollment = yield db_1.default.enrollment.findUnique({ where: { id } });
    if (!enrollment) {
        throw new app_error_1.AppError("Enrollment not found", 404);
    }
    const result = yield db_1.default.enrollment.update({
        where: { id },
        data: {
            status: "PENDING",
            userId: data.userId,
            welfareProgramId: data.welfareProgramId,
        },
    });
    return result;
});
exports.resubmitEnrollmentHelper = resubmitEnrollmentHelper;
