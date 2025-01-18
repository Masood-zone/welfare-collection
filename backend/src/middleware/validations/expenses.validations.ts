import Joi from "joi";

export const createExpenseSchema = Joi.object({
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  amount: Joi.number().required().messages({
    "number.empty": "Amount is required",
  }),
  recordedBy: Joi.string().required().messages({
    "string.empty": "Admin ID is required",
    "string.uuid": "Admin ID must be a valid UUID",
  }),
  welfareProgramId: Joi.string().required().messages({
    "string.empty": "Welfare program ID is required",
    "string.uuid": "Welfare program ID must be a valid UUID",
  }),
});

export const updateExpenseSchema = Joi.object({
  description: Joi.string().optional().messages({
    "string.empty": "Description is required",
  }),
  amount: Joi.number().optional().messages({
    "number.empty": "Amount is required",
  }),
  recordedBy: Joi.string().optional().messages({
    "string.empty": "Admin ID is required",
    "string.uuid": "Admin ID must be a valid UUID",
  }),
  welfareProgramId: Joi.string().optional().messages({
    "string.empty": "Welfare program ID is required",
    "string.uuid": "Welfare program ID must be a valid UUID",
  }),
});
