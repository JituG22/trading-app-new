import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import type { IJWTPayload } from "../types";

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN || "24h";
const JWT_ISSUER = "trading-app";

export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
}

export interface TokenValidationResult {
  valid: boolean;
  payload?: IJWTPayload;
  error?: string;
  expired?: boolean;
}

// Generate JWT access token
export const generateAccessToken = (
  payload: IJWTPayload,
  options?: Partial<SignOptions>
): string => {
  const signOptions: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as any,
    issuer: JWT_ISSUER,
    subject: payload.userId,
    ...options,
  };

  return jwt.sign(payload, JWT_SECRET, signOptions);
};

// Generate refresh token (longer expiration)
export const generateRefreshToken = (userId: string): string => {
  const payload = { userId, type: "refresh" };
  const signOptions: SignOptions = {
    expiresIn: "7d", // 7 days
    issuer: JWT_ISSUER,
    subject: userId,
  };

  return jwt.sign(payload, JWT_SECRET, signOptions);
};

// Generate both access and refresh tokens
export const generateTokenPair = (payload: IJWTPayload): TokenPair => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload.userId);

  return { accessToken, refreshToken };
};

// Verify JWT token with detailed error handling
export const verifyToken = (token: string): TokenValidationResult => {
  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
    }) as IJWTPayload;

    return {
      valid: true,
      payload,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        valid: false,
        expired: true,
        error: "Token has expired",
      };
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return {
        valid: false,
        error: "Invalid token",
      };
    }

    return {
      valid: false,
      error: "Token verification failed",
    };
  }
};

// Verify refresh token
export const verifyRefreshToken = (token: string): TokenValidationResult => {
  const result = verifyToken(token);

  if (result.valid && result.payload?.type !== "refresh") {
    return {
      valid: false,
      error: "Invalid refresh token",
    };
  }

  return result;
};

// Extract token from Authorization header
export const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
};

// Generate secure password reset token
export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

// Hash password reset token for secure storage
export const hashResetToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// Generate cryptographically secure random string
export const generateSecureId = (length: number = 16): string => {
  return crypto.randomBytes(length).toString("hex");
};

// Create token expiration date
export const createExpirationDate = (minutes: number): Date => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

// Check if date is expired
export const isExpired = (date: Date): boolean => {
  return new Date() > date;
};
