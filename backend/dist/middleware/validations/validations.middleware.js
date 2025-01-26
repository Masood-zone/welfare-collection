"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const app_error_1 = require("../../utils/app-error");
const validateRequest = (bodySchema, querySchema, paramsSchema) => {
    return (req, res, next) => {
        if (bodySchema) {
            const { error } = bodySchema.validate(req.body, { abortEarly: false });
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return next(new app_error_1.AppError("Body validation error: " + errorDetails.join(", "), 400, errorDetails));
            }
        }
        if (querySchema) {
            const { error } = querySchema.validate(req.query, { abortEarly: false });
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return next(new app_error_1.AppError("Query validation error: " + errorDetails.join(", "), 400, errorDetails));
            }
        }
        if (paramsSchema) {
            const { error } = paramsSchema.validate(req.params, {
                abortEarly: false,
            });
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return next(new app_error_1.AppError("Params validation error: " + errorDetails.join(", "), 400, errorDetails));
            }
        }
        next();
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validations.middleware.js.map