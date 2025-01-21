import Joi from "joi";

export const createPaymentSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required",
    "string.uuid": "User ID must be a valid UUID",
  }),
  amount: Joi.number()
    .positive()
    .not(Joi.number().greater(1000000), Joi.number().less(1))
    .required()
    .messages({
      "number.base": "Amount must be a valid number",
      "number.positive": "Amount must be greater than zero",
    }),
  paymentMode: Joi.string().valid("MOMO", "CARD", "CASH").required().messages({
    "any.only": "Payment method must be one of MOMO, CARD, or CASH",
  }),
  welfareProgramId: Joi.string().required().messages({
    "string.empty": "Welfare program ID is required",
    "string.uuid": "Welfare program ID must be a valid UUID",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid email address",
  }),
});

export const updatePaymentSchema = Joi.object({
  userId: Joi.string().optional().messages({
    "string.empty": "User ID is required",
    "string.uuid": "User ID must be a valid UUID",
  }),
  amount: Joi.number()
    .positive()
    .not(Joi.number().greater(1000000), Joi.number().less(1))
    .optional()
    .messages({
      "number.base": "Amount must be a valid number",
      "number.positive": "Amount must be greater than zero",
    }),
  welfareProgramId: Joi.string().optional().messages({
    "string.empty": "Welfare program ID is required",
    "string.uuid": "Welfare program ID must be a valid UUID",
  }),
});
