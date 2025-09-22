import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { createResponse } from "../utils/helpers";
import type {
  IRegisterRequest,
  ILoginRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
} from "../types";

export class AuthController {
  // POST /api/auth/register
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: IRegisterRequest = req.body;

      const result = await AuthService.register(userData);

      res
        .status(201)
        .json(createResponse(true, result, "User registered successfully"));
    } catch (error) {
      console.error("Registration error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      const statusCode = errorMessage.includes("already exists") ? 409 : 500;

      res
        .status(statusCode)
        .json(createResponse(false, undefined, undefined, errorMessage));
    }
  }

  // POST /api/auth/login
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: ILoginRequest = req.body;

      const result = await AuthService.login(loginData);

      res.status(200).json(createResponse(true, result, "Login successful"));
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      const statusCode =
        errorMessage.includes("Invalid") || errorMessage.includes("deactivated")
          ? 401
          : 500;

      res
        .status(statusCode)
        .json(createResponse(false, undefined, undefined, errorMessage));
    }
  }

  // GET /api/auth/profile
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // User is attached to request by auth middleware
      const userId = req.user?._id?.toString();

      if (!userId) {
        res
          .status(401)
          .json(
            createResponse(
              false,
              undefined,
              undefined,
              "User not authenticated"
            )
          );
        return;
      }

      const user = await AuthService.getProfile(userId);

      res
        .status(200)
        .json(
          createResponse(true, user.toJSON(), "Profile retrieved successfully")
        );
    } catch (error) {
      console.error("Get profile error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to retrieve profile";
      const statusCode =
        errorMessage.includes("not found") ||
        errorMessage.includes("deactivated")
          ? 404
          : 500;

      res
        .status(statusCode)
        .json(createResponse(false, undefined, undefined, errorMessage));
    }
  }

  // POST /api/auth/forgot-password
  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const requestData: IForgotPasswordRequest = req.body;

      const result = await AuthService.forgotPassword(requestData);

      res
        .status(200)
        .json(createResponse(true, result, "Password reset request processed"));
    } catch (error) {
      console.error("Forgot password error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to process password reset request";
      const statusCode = errorMessage.includes("deactivated") ? 401 : 500;

      res
        .status(statusCode)
        .json(createResponse(false, undefined, undefined, errorMessage));
    }
  }

  // POST /api/auth/reset-password
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const requestData: IResetPasswordRequest = req.body;

      const result = await AuthService.resetPassword(requestData);

      res
        .status(200)
        .json(createResponse(true, result, "Password reset successful"));
    } catch (error) {
      console.error("Reset password error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Password reset failed";
      const statusCode =
        errorMessage.includes("Invalid") ||
        errorMessage.includes("expired") ||
        errorMessage.includes("deactivated")
          ? 400
          : 500;

      res
        .status(statusCode)
        .json(createResponse(false, undefined, undefined, errorMessage));
    }
  }

  // POST /api/auth/change-password (protected route)
  static async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?._id?.toString();
      const { currentPassword, newPassword } = req.body;

      if (!userId) {
        res
          .status(401)
          .json(
            createResponse(
              false,
              undefined,
              undefined,
              "User not authenticated"
            )
          );
        return;
      }

      const result = await AuthService.changePassword(
        userId,
        currentPassword,
        newPassword
      );

      res
        .status(200)
        .json(createResponse(true, result, "Password changed successfully"));
    } catch (error) {
      console.error("Change password error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to change password";
      const statusCode =
        errorMessage.includes("incorrect") ||
        errorMessage.includes("not found") ||
        errorMessage.includes("deactivated")
          ? 400
          : 500;

      res
        .status(statusCode)
        .json(createResponse(false, undefined, undefined, errorMessage));
    }
  }

  // PUT /api/auth/profile (protected route)
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?._id?.toString();
      const updateData = req.body;

      if (!userId) {
        res
          .status(401)
          .json(
            createResponse(
              false,
              undefined,
              undefined,
              "User not authenticated"
            )
          );
        return;
      }

      const user = await AuthService.updateProfile(userId, updateData);

      res
        .status(200)
        .json(
          createResponse(true, user.toJSON(), "Profile updated successfully")
        );
    } catch (error) {
      console.error("Update profile error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      const statusCode =
        errorMessage.includes("not found") ||
        errorMessage.includes("deactivated")
          ? 404
          : 500;

      res
        .status(statusCode)
        .json(createResponse(false, undefined, undefined, errorMessage));
    }
  }

  // DELETE /api/auth/account (protected route)
  static async deactivateAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?._id?.toString();

      if (!userId) {
        res
          .status(401)
          .json(
            createResponse(
              false,
              undefined,
              undefined,
              "User not authenticated"
            )
          );
        return;
      }

      const result = await AuthService.deactivateAccount(userId);

      res
        .status(200)
        .json(createResponse(true, result, "Account deactivated successfully"));
    } catch (error) {
      console.error("Deactivate account error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to deactivate account";
      const statusCode = errorMessage.includes("not found") ? 404 : 500;

      res
        .status(statusCode)
        .json(createResponse(false, undefined, undefined, errorMessage));
    }
  }
}
