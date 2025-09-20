import { apiRequest } from "./api";
import type {
  AuthResponse,
  SignUpFormData,
  LoginFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  User,
  ApiResponse,
} from "../types";

// Authentication service functions
export const authService = {
  // User registration
  register: async (
    data: SignUpFormData
  ): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>("POST", "/auth/register", data);
  },

  // User login
  login: async (data: LoginFormData): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>("POST", "/auth/login", data);
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

  // Logout user (client-side)
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  },

  // Get stored auth token
  getToken: (): string | null => {
    return localStorage.getItem("authToken");
  },

  // Store auth token
  setToken: (token: string): void => {
    localStorage.setItem("authToken", token);
  },

  // Get stored user data
  getUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Store user data
  setUser: (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = authService.getToken();
    const user = authService.getUser();
    return !!(token && user);
  },
};
