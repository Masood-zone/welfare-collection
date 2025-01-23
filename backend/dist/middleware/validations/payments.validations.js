"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentSchema = exports.createPaymentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPaymentSchema = joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        "string.empty": "User ID is required",
        "string.uuid": "User ID must be a valid UUID",
    }),
    amount: joi_1.default.number()
        .positive()
        .not(joi_1.default.number().greater(1000000), joi_1.default.number().less(1))
        .required()
        .messages({
        "number.base": "Amount must be a valid number",
        "number.positive": "Amount must be greater than zero",
    }),
    paymentMode: joi_1.default.string().valid("MOMO", "CARD", "CASH").required().messages({
        "any.only": "Payment method must be one of MOMO, CARD, or CASH",
    }),
    welfareProgramId: joi_1.default.string().required().messages({
        "string.empty": "Welfare program ID is required",
        "string.uuid": "Welfare program ID must be a valid UUID",
    }),
    email: joi_1.default.string().email().optional().messages({
        "string.email": "Email must be a valid email address",
    }),
});
exports.updatePaymentSchema = joi_1.default.object({
    userId: joi_1.default.string().optional().messages({
        "string.empty": "User ID is required",
        "string.uuid": "User ID must be a valid UUID",
    }),
    amount: joi_1.default.number()
        .positive()
        .not(joi_1.default.number().greater(1000000), joi_1.default.number().less(1))
        .optional()
        .messages({
        "number.base": "Amount must be a valid number",
        "number.positive": "Amount must be greater than zero",
    }),
    welfareProgramId: joi_1.default.string().optional().messages({
        "string.empty": "Welfare program ID is required",
        "string.uuid": "Welfare program ID must be a valid UUID",
    }),
});
