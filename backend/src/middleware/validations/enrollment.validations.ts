import * as Joi from "joi";

export const createEnrollmentSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required",
    "string.uuid": "User ID must be a valid UUID",
  }),
  welfareProgramId: Joi.string().required().messages({
    "string.empty": "Welfare program ID is required",
    "string.uuid": "Welfare program ID must be a valid UUID",
  }),
});

export const updateEnrollmentSchema = Joi.object({
  userId: Joi.string().optional().messages({
    "string.uuid": "User ID must be a valid UUID",
  }),
  welfareProgramId: Joi.string().optional().messages({
    "string.uuid": "Welfare program ID must be a valid UUID",
  }),
});
