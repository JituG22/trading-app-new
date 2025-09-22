import { User, PasswordResetToken } from "../models";
import type { IUser } from "../models/User";
import { generateTokenPair } from "../utils/tokenUtils";
import { emailService } from "./emailService";
import type {
  IRegisterRequest,
  ILoginRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  IAuthResponse,
} from "../types";

export class AuthService {
  // User registration
  static async register(userData: IRegisterRequest): Promise<IAuthResponse> {
    const { firstName, lastName, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Create new user (password will be hashed by pre-save middleware)
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    // Send welcome email (don't await to avoid blocking the response)
    emailService.sendWelcomeEmail(email, firstName).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user._id.toString(),
      email: user.email,
    });

    // Return response (password excluded by toJSON transform)
    return {
      user: user.toJSON() as any,
      token: tokens.accessToken,
    };
  }

  // User login
  static async login(loginData: ILoginRequest): Promise<IAuthResponse> {
    const { email, password } = loginData;

    // Find user with password field included
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user._id.toString(),
      email: user.email,
    });

    // Return response (password excluded by toJSON transform)
    return {
      user: user.toJSON() as any,
      token: tokens.accessToken,
    };
  }

  // Get user profile
  static async getProfile(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    return user;
  }

  // Forgot password - generate reset token
  static async forgotPassword(
    requestData: IForgotPasswordRequest
  ): Promise<{ message: string; resetToken?: string }> {
    const { email } = requestData;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists for security
      return {
        message:
          "If an account with that email exists, a reset link has been sent.",
      };
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    // Generate reset token
    const tokenData = await (PasswordResetToken as any).createResetToken(
      user._id,
      30 // 30 minutes expiration
    );

    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(email, tokenData.token);
      console.log(`✅ Password reset email sent to: ${email}`);
    } catch (error) {
      console.error("❌ Failed to send password reset email:", error);
      // Don't throw error to avoid revealing if email exists
    }

    return {
      message:
        "If an account with that email exists, a reset link has been sent.",
    };
  }

  // Reset password with token
  static async resetPassword(
    requestData: IResetPasswordRequest
  ): Promise<{ message: string }> {
    const { token, password } = requestData;

    // Find valid reset token
    const resetTokenDoc = await (PasswordResetToken as any).findValidToken(
      token
    );
    if (!resetTokenDoc) {
      throw new Error("Invalid or expired reset token");
    }

    // Get the user
    const user = await User.findById(resetTokenDoc.userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    // Update user password (will be hashed by pre-save middleware)
    user.password = password;
    await user.save();

    // Mark reset token as used
    await resetTokenDoc.markAsUsed();

    return {
      message: "Password has been reset successfully",
    };
  }

  // Change password (for authenticated users)
  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    // Find user with password field included
    const user = await User.findById(userId).select("+password");
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    return {
      message: "Password changed successfully",
    };
  }

  // Deactivate user account
  static async deactivateAccount(userId: string): Promise<{ message: string }> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.isActive = false;
    await user.save();

    return {
      message: "Account deactivated successfully",
    };
  }

  // Update user profile
  static async updateProfile(
    userId: string,
    updateData: Partial<Pick<IUser, "firstName" | "lastName">>
  ): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    // Update allowed fields
    if (updateData.firstName !== undefined) {
      user.firstName = updateData.firstName;
    }
    if (updateData.lastName !== undefined) {
      user.lastName = updateData.lastName;
    }

    await user.save();
    return user;
  }

  // Cleanup expired reset tokens (utility method)
  static async cleanupExpiredTokens(): Promise<{ deletedCount: number }> {
    const result = await (PasswordResetToken as any).cleanupExpired();
    return { deletedCount: result.deletedCount };
  }
}
