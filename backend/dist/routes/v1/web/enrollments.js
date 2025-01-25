"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollments_controller_1 = require("../../../controllers/enrollments.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const validations_middleware_1 = require("../../../middleware/validations/validations.middleware");
const enrollment_validations_1 = require("../../../middleware/validations/enrollment.validations");
const enrollmentRoutes = (0, express_1.Router)();
enrollmentRoutes.post("/", auth_middleware_1.authenticateUser, (0, validations_middleware_1.validateRequest)(enrollment_validations_1.createEnrollmentSchema), async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.createEnrollment)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.get("/", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.getAllEnrollments)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.get("/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.getEnrollmentById)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.get("/user/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.getEnrollmentByUserId)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.patch("/:id", (0, validations_middleware_1.validateRequest)(enrollment_validations_1.updateEnrollmentSchema), auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.updateEnrollment)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.deleteEnrollment)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.patch("/resubmit/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.resubmitEnrollment)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.patch("/approve/:id", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.approveEnrollment)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.patch("/reject/:id", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await (0, enrollments_controller_1.rejectEnrollment)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = enrollmentRoutes;
//# sourceMappingURL=enrollments.js.map