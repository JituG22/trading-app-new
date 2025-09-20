import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IJWTPayload } from "../types";

// JWT utility functions
export const generateToken = (payload: IJWTPayload): string => {
  const secret = process.env.JWT_SECRET || "your-super-secret-jwt-key";

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

export const verifyToken = (token: string): IJWTPayload => {
  const secret = process.env.JWT_SECRET || "your-super-secret-jwt-key";

  return jwt.verify(token, secret) as IJWTPayload;
};

// Password reset token utilities
export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const hashResetToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// Response helper
export const createResponse = <T = any>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
) => {
  return {
    success,
    ...(data && { data }),
    ...(message && { message }),
    ...(error && { error }),
  };
};
