export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: string[]; // Optional field for additional error details

  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
