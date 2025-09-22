import { Request, Response, NextFunction } from "express";
import { verifyToken, extractTokenFromHeader } from "../utils/tokenUtils";
import { createResponse } from "../utils/helpers";
import { User } from "../models";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      res
        .status(401)
        .json(
          createResponse(
            false,
            undefined,
            undefined,
            "Access denied. No token provided."
          )
        );
      return;
    }

    const tokenResult = verifyToken(token);

    if (!tokenResult.valid) {
      const statusCode = tokenResult.expired ? 401 : 403;
      res
        .status(statusCode)
        .json(
          createResponse(
            false,
            undefined,
            undefined,
            tokenResult.error || "Invalid token"
          )
        );
      return;
    }

    // Fetch user from database to ensure they still exist and are active
    const user = await User.findById(tokenResult.payload!.userId);

    if (!user) {
      res
        .status(401)
        .json(
          createResponse(false, undefined, undefined, "User no longer exists")
        );
      return;
    }

    if (!user.isActive) {
      res
        .status(401)
        .json(
          createResponse(
            false,
            undefined,
            undefined,
            "User account is deactivated"
          )
        );
      return;
    }

    // Attach user to request object
    req.user = user as any;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res
      .status(500)
      .json(
        createResponse(
          false,
          undefined,
          undefined,
          "Internal server error during authentication"
        )
      );
  }
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const tokenResult = verifyToken(token);

      if (tokenResult.valid) {
        const user = await User.findById(tokenResult.payload!.userId);
        if (user && user.isActive) {
          req.user = user as any;
        }
      }
    }

    next();
  } catch (error) {
    // Continue without authentication on error
    next();
  }
};

// Middleware to check if user is already authenticated (for login/register routes)
export const guestOnly = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = extractTokenFromHeader(authHeader);

  if (token) {
    const tokenResult = verifyToken(token);
    if (tokenResult.valid) {
      res
        .status(400)
        .json(
          createResponse(false, undefined, undefined, "Already authenticated")
        );
      return;
    }
  }

  next();
};
