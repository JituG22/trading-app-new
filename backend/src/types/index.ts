import { Document } from "mongoose";

// User interface for MongoDB document
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Password Reset Token interface
export interface IPasswordResetToken extends Document {
  _id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

// JWT Payload interface
export interface IJWTPayload {
  userId: string;
  email: string;
  type?: "access" | "refresh";
  iat?: number;
  exp?: number;
  iss?: string;
  sub?: string;
}

// API Response interface
export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}

// Request body interfaces
export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

// Auth response interface
export interface IAuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}

// Express Request extensions
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
