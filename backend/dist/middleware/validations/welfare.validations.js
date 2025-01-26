"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welfareQuerySchema = exports.welfareIdParamSchema = exports.updateWelfareProgramSchema = exports.createWelfareProgramSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createWelfareProgramSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 50 characters",
    }),
    description: joi_1.default.string().max(255).optional(),
    amount: joi_1.default.number()
        .positive()
        .not(joi_1.default.number().greater(1000000), joi_1.default.number().less(1))
        .required()
        .messages({
        "number.base": "Amount must be a valid number",
        "number.positive": "Amount must be greater than zero",
    }),
    paymentCycle: joi_1.default.string()
        .valid("DAILY", "WEEKLY", "MONTHLY")
        .required()
        .messages({
        "any.only": "Payment cycle must be one of DAILY, WEEKLY, or MONTHLY",
    }),
    createdBy: joi_1.default.string().required().messages({
        "string.empty": "Creator ID is required",
    }),
});
exports.updateWelfareProgramSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).optional(),
    description: joi_1.default.string().max(255).optional(),
    amount: joi_1.default.number().positive().optional(),
    paymentCycle: joi_1.default.string().valid("DAILY", "WEEKLY", "MONTHLY").optional(),
});
exports.welfareIdParamSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required().messages({
        "string.empty": "Welfare program ID is required",
        "string.uuid": "Welfare program ID must be a valid UUID",
    }),
});
exports.welfareQuerySchema = joi_1.default.object({
    createdBy: joi_1.default.string().uuid().optional().messages({
        "string.uuid": "CreatedBy must be a valid UUID",
    }),
});
//# sourceMappingURL=welfare.validations.js.map