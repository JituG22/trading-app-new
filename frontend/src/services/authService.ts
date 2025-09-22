import { apiRequest } from "./api";
import { tokenManager } from "./api";
import type {
  AuthResponse,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  User,
  ApiResponse,
} from "../types";

// Authentication service functions
export const authService = {
  // User registration
  signUp: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await apiRequest<AuthResponse>(
        "POST",
        "/auth/register",
        userData
      );

      if (response.success && response.data) {
        // Store tokens and user data
        const { user, token } = response.data;
        if (token) {
          tokenManager.setToken(token);
          // Note: API returns single 'token' field, not 'tokens.accessToken'
        }
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      }

      return response;
    } catch (error) {
      console.error("SignUp error:", error);
      return {
        success: false,
        message: "Network error occurred",
        data: undefined,
      };
    }
  },

  // User login
  signIn: async (
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await apiRequest<AuthResponse>("POST", "/auth/login", {
        email,
        password,
      });

      if (response.success && response.data) {
        // Store tokens and user data
        const { user, token } = response.data;
        if (token) {
          tokenManager.setToken(token);
          // Note: API returns single 'token' field, not 'tokens.accessToken'
        }
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      }

      return response;
    } catch (error) {
      console.error("SignIn error:", error);
      return {
        success: false,
        message: "Network error occurred",
        data: undefined,
      };
    }
  },

  // Forgot password request
  forgotPassword: async (
    data: ForgotPasswordFormData
  ): Promise<ApiResponse> => {
    return apiRequest("POST", "/auth/forgot-password", data);
  },

  // Reset password with token
  resetPassword: async (data: ResetPasswordFormData): Promise<ApiResponse> => {
    return apiRequest("POST", "/auth/reset-password", data);
  },

  // Get user profile (protected route)
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiRequest<User>("GET", "/auth/profile");
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await apiRequest<User>("PUT", "/auth/profile", data);

    if (response.success && response.data) {
      // Update stored user data
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse> => {
    return apiRequest("POST", "/auth/change-password", data);
  },

  // Logout user
  logout: () => {
    tokenManager.removeTokens();
    // Don't force redirect here - let React Router handle it
  },

  // Get stored user data
  getUser: (): User | null => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // Store user data
  setUser: (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = tokenManager.getToken();
    const user = authService.getUser();
    const isValid = tokenManager.isTokenValid();

    console.log("authService.isAuthenticated check:", {
      hasToken: !!token,
      hasUser: !!user,
      isTokenValid: isValid,
    });

    return !!token && !!user && isValid;
  },

  // Get current auth token
  getToken: (): string | null => {
    return tokenManager.getToken();
  },
};
