"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const app_error_1 = require("../../utils/app-error");
const errorHandler = (err, req, res, next) => {
    console.error("Error:", Object.assign({ message: err.message, stack: err.stack }, (err instanceof app_error_1.AppError && { errors: err.errors })));
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof app_error_1.AppError) {
        return res.status(err.statusCode).json(Object.assign({ status: "error", message: err.message }, (err.errors && { errors: err.errors })));
    }
    res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again later.",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map