"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
exports.ErrorHandler = ErrorHandler;
const http_status_1 = require("../utils/http-status");
const http_error_1 = __importDefault(require("../utils/http-error"));
function ErrorHandler(error, req, res, next) {
    let httpError;
    if (error instanceof http_error_1.default) {
        httpError = error;
    }
    else {
        const status = error.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || "Internal Server Error";
        httpError = new http_error_1.default(status, message);
    }
    res.status(httpError.status).json({
        status: httpError.status,
        message: httpError.message,
    });
}
;
const throwError = (status, message) => {
    throw new http_error_1.default(status, message);
};
exports.throwError = throwError;
