"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollments_controller_1 = require("../../../controllers/enrollments.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const validations_middleware_1 = require("../../../middleware/validations/validations.middleware");
const enrollment_validations_1 = require("../../../middleware/validations/enrollment.validations");
const enrollmentRoutes = (0, express_1.Router)();
// CRUD routes
enrollmentRoutes.post("/", auth_middleware_1.authenticateUser, (0, validations_middleware_1.validateRequest)(enrollment_validations_1.createEnrollmentSchema), enrollments_controller_1.createEnrollment);
enrollmentRoutes.get("/", auth_middleware_1.authenticateAdmin, enrollments_controller_1.getAllEnrollments);
enrollmentRoutes.get("/:id", auth_middleware_1.authenticateUser, enrollments_controller_1.getEnrollmentById);
enrollmentRoutes.get("/user/:id", auth_middleware_1.authenticateUser, enrollments_controller_1.getEnrollmentByUserId);
enrollmentRoutes.patch("/:id", (0, validations_middleware_1.validateRequest)(enrollment_validations_1.updateEnrollmentSchema), auth_middleware_1.authenticateUser, enrollments_controller_1.updateEnrollment);
enrollmentRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, enrollments_controller_1.deleteEnrollment);
// Re-submission route
enrollmentRoutes.patch("/resubmit/:id", auth_middleware_1.authenticateUser, enrollments_controller_1.resubmitEnrollment);
// Approval route
enrollmentRoutes.patch("/approve/:id", auth_middleware_1.authenticateAdmin, enrollments_controller_1.approveEnrollment);
// Rejection route
enrollmentRoutes.patch("/reject/:id", auth_middleware_1.authenticateAdmin, enrollments_controller_1.rejectEnrollment);
exports.default = enrollmentRoutes;
