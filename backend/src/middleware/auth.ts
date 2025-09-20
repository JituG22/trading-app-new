import { Request, Response, NextFunction } from "express";
import { verifyToken, createResponse } from "../utils/helpers";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json(createResponse(false, undefined, undefined, "No token provided"));
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = verifyToken(token);

    // In a real application, you would fetch the user from database
    // For now, we'll attach the decoded payload to the request
    req.user = { userId: decoded.userId, email: decoded.email } as any;

    next();
  } catch (error) {
    res
      .status(401)
      .json(createResponse(false, undefined, undefined, "Invalid token"));
  }
};
