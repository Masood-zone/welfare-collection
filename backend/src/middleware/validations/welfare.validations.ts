import Joi from "joi";

export const createWelfareProgramSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
  }),
  description: Joi.string().max(255).optional(),
  amount: Joi.number()
    .positive()
    .not(Joi.number().greater(1000000), Joi.number().less(1))
    .required()
    .messages({
      "number.base": "Amount must be a valid number",
      "number.positive": "Amount must be greater than zero",
    }),
  paymentCycle: Joi.string()
    .valid("DAILY", "WEEKLY", "MONTHLY")
    .required()
    .messages({
      "any.only": "Payment cycle must be one of DAILY, WEEKLY, or MONTHLY",
    }),
  createdBy: Joi.string().required().messages({
    "string.empty": "Creator ID is required",
  }),
});

export const updateWelfareProgramSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  description: Joi.string().max(255).optional(),
  amount: Joi.number().positive().optional(),
  paymentCycle: Joi.string().valid("DAILY", "WEEKLY", "MONTHLY").optional(),
});

// Query params schema
export const welfareIdParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.empty": "Welfare program ID is required",
    "string.uuid": "Welfare program ID must be a valid UUID",
  }),
});

export const welfareQuerySchema = Joi.object({
  createdBy: Joi.string().uuid().optional().messages({
    "string.uuid": "CreatedBy must be a valid UUID",
  }),
});
