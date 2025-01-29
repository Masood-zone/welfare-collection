import { ErrorResponse } from "../utils/types";
import { HttpStatus } from "../utils/http-status";
import HttpException from "../utils/http-error";
import { Request, Response, NextFunction } from "express";

export function ErrorHandler(
    error: ErrorResponse | any, 
    req: Request,
    res: Response,
    next: NextFunction
) {
    let httpError: HttpException;

    if (error instanceof HttpException) {
        httpError = error;
    } else {
        const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || "Internal Server Error";
        httpError = new HttpException(status, message);
    }

    res.status(httpError.status).json({
        status: httpError.status,
        message: httpError.message,
    });
};

export const throwError = (status: HttpStatus, message: string): never => {
    throw new HttpException(status, message);
};

