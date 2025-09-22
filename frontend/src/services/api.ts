import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import type { ApiResponse } from "../types";

// Token management utilities
export const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  setToken: (token: string): void => {
    localStorage.setItem("accessToken", token);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem("refreshToken", token);
  },

  removeTokens: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  isTokenValid: (): boolean => {
    const token = tokenManager.getToken();
    if (!token) return false;

    try {
      // Basic token expiration check (JWT payload)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp <= now;

      console.log(
        "Token validation - expires at:",
        new Date(payload.exp * 1000),
        "current time:",
        new Date(),
        "isExpired:",
        isExpired
      );

      return !isExpired;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  },
};

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token && tokenManager.isTokenValid()) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common responses
// Response interceptor for handling errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.log("API Error:", error.response?.status, error.config?.url);

    // Handle 401 Unauthorized - be more careful about when we clear tokens
    if (error.response?.status === 401) {
      console.log("401 Unauthorized detected");
      // TODO: Implement more sophisticated token refresh logic
      // For now, let the auth context handle token validation
    }

    return Promise.reject(error);
  }
);

// Generic API request wrapper
export const apiRequest = async <T = any>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.request<ApiResponse<T>>({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Network error occurred",
    };
  }
};

export default api;
