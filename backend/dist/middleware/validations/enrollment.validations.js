"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnrollmentSchema = exports.createEnrollmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEnrollmentSchema = joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        "string.empty": "User ID is required",
        "string.uuid": "User ID must be a valid UUID",
    }),
    welfareProgramId: joi_1.default.string().required().messages({
        "string.empty": "Welfare program ID is required",
        "string.uuid": "Welfare program ID must be a valid UUID",
    }),
});
exports.updateEnrollmentSchema = joi_1.default.object({
    userId: joi_1.default.string().optional().messages({
        "string.uuid": "User ID must be a valid UUID",
    }),
    welfareProgramId: joi_1.default.string().optional().messages({
        "string.uuid": "Welfare program ID must be a valid UUID",
    }),
});
