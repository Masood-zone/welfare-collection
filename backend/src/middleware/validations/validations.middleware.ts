import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { AppError } from "../../utils/app-error";

export const validateRequest = (
  bodySchema?: ObjectSchema,
  querySchema?: ObjectSchema,
  paramsSchema?: ObjectSchema
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (bodySchema) {
      const { error } = bodySchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorDetails = error.details.map((detail) => detail.message);
        return next(
          new AppError(
            "Body validation error: " + errorDetails.join(", "),
            400,
            errorDetails // Pass the array of errors
          )
        );
      }
    }

    if (querySchema) {
      const { error } = querySchema.validate(req.query, { abortEarly: false });
      if (error) {
        const errorDetails = error.details.map((detail) => detail.message);
        return next(
          new AppError(
            "Query validation error: " + errorDetails.join(", "),
            400,
            errorDetails
          )
        );
      }
    }

    if (paramsSchema) {
      const { error } = paramsSchema.validate(req.params, {
        abortEarly: false,
      });
      if (error) {
        const errorDetails = error.details.map((detail) => detail.message);
        return next(
          new AppError(
            "Params validation error: " + errorDetails.join(", "),
            400,
            errorDetails
          )
        );
      }
    }

    next();
  };
};
