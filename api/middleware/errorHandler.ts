import { Request, Response, NextFunction } from "express";

interface ValidationErrorItem {
  message: string;
}

interface AppError extends Error {
  statusCode?: number;
  errors?: {
    [key: string]: ValidationErrorItem;
  };
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;

  if (err.name === "ValidationError" && err.errors) {
    const fieldErrors: Record<string, string> = {};
    for (const field in err.errors) {
      fieldErrors[field] = err.errors[field].message;
    }

    res.status(statusCode).json({
      statusCode,
      success: false,
      message: err.message || "Validation failed",
      errors: fieldErrors
    });
    return;
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message: err.message || "Internal Server Error"
  });
};

export default errorHandler;