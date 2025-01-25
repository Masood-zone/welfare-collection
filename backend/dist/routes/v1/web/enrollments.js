"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollments = __importStar(require("../../../controllers/enrollments.controller"));
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const validations_middleware_1 = require("../../../middleware/validations/validations.middleware");
const enrollment_validations_1 = require("../../../middleware/validations/enrollment.validations");
const enrollmentRoutes = (0, express_1.Router)();
enrollmentRoutes.post("/", auth_middleware_1.authenticateUser, (0, validations_middleware_1.validateRequest)(enrollment_validations_1.createEnrollmentSchema), async (req, res, next) => {
    try {
        await enrollments.createEnrollment(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.get("/", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await enrollments.getAllEnrollments(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.get("/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await enrollments.getEnrollmentById(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.get("/user/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await enrollments.getEnrollmentByUserId(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.patch("/:id", (0, validations_middleware_1.validateRequest)(enrollment_validations_1.updateEnrollmentSchema), auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await enrollments.updateEnrollment(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await enrollments.deleteEnrollment(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.patch("/resubmit/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await enrollments.resubmitEnrollment(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.patch("/approve/:id", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await enrollments.approveEnrollment(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
enrollmentRoutes.patch("/reject/:id", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await enrollments.rejectEnrollment(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = enrollmentRoutes;
//# sourceMappingURL=enrollments.js.map