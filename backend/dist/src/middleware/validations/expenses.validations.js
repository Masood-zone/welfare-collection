"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpenseSchema = exports.createExpenseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createExpenseSchema = joi_1.default.object({
    description: joi_1.default.string().required().messages({
        "string.empty": "Description is required",
    }),
    amount: joi_1.default.number().required().messages({
        "number.empty": "Amount is required",
    }),
    recordedBy: joi_1.default.string().required().messages({
        "string.empty": "Admin ID is required",
        "string.uuid": "Admin ID must be a valid UUID",
    }),
    welfareProgramId: joi_1.default.string().required().messages({
        "string.empty": "Welfare program ID is required",
        "string.uuid": "Welfare program ID must be a valid UUID",
    }),
});
exports.updateExpenseSchema = joi_1.default.object({
    description: joi_1.default.string().optional().messages({
        "string.empty": "Description is required",
    }),
    amount: joi_1.default.number().optional().messages({
        "number.empty": "Amount is required",
    }),
    recordedBy: joi_1.default.string().optional().messages({
        "string.empty": "Admin ID is required",
        "string.uuid": "Admin ID must be a valid UUID",
    }),
    welfareProgramId: joi_1.default.string().optional().messages({
        "string.empty": "Welfare program ID is required",
        "string.uuid": "Welfare program ID must be a valid UUID",
    }),
});
