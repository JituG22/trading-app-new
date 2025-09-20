import { Request, Response, NextFunction } from "express";
import { createResponse } from "../utils/helpers";

// Global error handler middleware
export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("🔥 Error:", error);

  // Default error
  let statusCode = 500;
  let message = "Internal server error";

  // Mongoose validation error
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((val: any) => val.message)
      .join(", ");
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    statusCode = 400;
    const field = Object.keys(error.keyValue)[0];
    message = `${field} already exists`;
  }

  // JWT errors
  if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res
    .status(statusCode)
    .json(createResponse(false, undefined, undefined, message));
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): void => {
  res
    .status(404)
    .json(
      createResponse(
        false,
        undefined,
        undefined,
        `Route ${req.originalUrl} not found`
      )
    );
};
