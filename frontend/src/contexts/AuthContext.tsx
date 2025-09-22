import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";
import type { User, AuthTokens } from "../types";

// Auth state interface
interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth actions
type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; tokens: AuthTokens } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_USER"; payload: User };

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to prevent premature redirects
  error: null,
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Auth context interface
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    token: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
  refreshAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const initializeAuth = useCallback(async () => {
    console.log("=== Auth Initialization Started ===");

    try {
      const token = localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");

      console.log("Stored token exists:", !!token);
      console.log("Stored user exists:", !!userStr);

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          console.log("Parsed user:", user);

          // Basic token format check
          if (token.split(".").length === 3) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const isExpired = payload.exp <= Math.floor(Date.now() / 1000);

            console.log("Token expires at:", new Date(payload.exp * 1000));
            console.log("Current time:", new Date());
            console.log("Is token expired:", isExpired);

            if (!isExpired) {
              console.log("✅ Token is valid, restoring authentication");
              dispatch({
                type: "AUTH_SUCCESS",
                payload: {
                  user,
                  tokens: { accessToken: token },
                },
              });
              console.log("✅ Authentication restored successfully");
              return; // Exit early - user is authenticated, loading will be set to false in reducer
            } else {
              console.log("❌ Token is expired, clearing storage");
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("user");
            }
          } else {
            console.log("❌ Invalid token format, clearing storage");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
          }
        } catch (parseError) {
          console.error("Error parsing stored data:", parseError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
        }
      } else {
        console.log("ℹ️ No stored credentials - this is normal for new users");
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
    }

    // Only reach here if user is not authenticated
    console.log("Setting loading to false - user not authenticated");
    dispatch({ type: "SET_LOADING", payload: false });
  }, [dispatch]); // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      dispatch({ type: "AUTH_START" });

      try {
        const response = await authService.signIn(email, password);

        if (response.success && response.data) {
          // Transform API response to match expected format
          const { user, token } = response.data;
          dispatch({
            type: "AUTH_SUCCESS",
            payload: {
              user,
              tokens: { accessToken: token }, // Convert single token to tokens object
            },
          });
          return true;
        } else {
          dispatch({
            type: "AUTH_FAILURE",
            payload: response.message || "Login failed",
          });
          return false;
        }
      } catch (error: any) {
        dispatch({
          type: "AUTH_FAILURE",
          payload: error.message || "Login failed",
        });
        return false;
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }): Promise<boolean> => {
      dispatch({ type: "AUTH_START" });

      try {
        const response = await authService.signUp(data);

        if (response.success && response.data) {
          // Transform API response to match expected format
          const { user, token } = response.data;
          dispatch({
            type: "AUTH_SUCCESS",
            payload: {
              user,
              tokens: { accessToken: token }, // Convert single token to tokens object
            },
          });
          return true;
        } else {
          dispatch({
            type: "AUTH_FAILURE",
            payload: response.message || "Registration failed",
          });
          return false;
        }
      } catch (error: any) {
        dispatch({
          type: "AUTH_FAILURE",
          payload: error.message || "Registration failed",
        });
        return false;
      }
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    authService.logout();
    dispatch({ type: "AUTH_LOGOUT" });
  }, [dispatch]);

  const forgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const response = await authService.forgotPassword({ email });
        dispatch({ type: "SET_LOADING", payload: false });

        if (response.success) {
          return true;
        } else {
          dispatch({
            type: "AUTH_FAILURE",
            payload: response.message || "Failed to send reset email",
          });
          return false;
        }
      } catch (error: any) {
        dispatch({
          type: "AUTH_FAILURE",
          payload: error.message || "Failed to send reset email",
        });
        return false;
      }
    },
    [dispatch]
  );

  const resetPassword = useCallback(
    async (
      token: string,
      password: string,
      confirmPassword: string
    ): Promise<boolean> => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const response = await authService.resetPassword({
          token,
          password,
          confirmPassword,
        });

        dispatch({ type: "SET_LOADING", payload: false });

        if (response.success) {
          return true;
        } else {
          dispatch({
            type: "AUTH_FAILURE",
            payload: response.message || "Password reset failed",
          });
          return false;
        }
      } catch (error: any) {
        dispatch({
          type: "AUTH_FAILURE",
          payload: error.message || "Password reset failed",
        });
        return false;
      }
    },
    [dispatch]
  );

  const changePassword = useCallback(
    async (
      currentPassword: string,
      newPassword: string,
      confirmPassword: string
    ): Promise<boolean> => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const response = await authService.changePassword({
          currentPassword,
          newPassword,
          confirmPassword,
        });

        dispatch({ type: "SET_LOADING", payload: false });

        if (response.success) {
          return true;
        } else {
          dispatch({
            type: "AUTH_FAILURE",
            payload: response.message || "Password change failed",
          });
          return false;
        }
      } catch (error: any) {
        dispatch({
          type: "AUTH_FAILURE",
          payload: error.message || "Password change failed",
        });
        return false;
      }
    },
    [dispatch]
  );

  const updateProfile = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const response = await authService.updateProfile(data);
        dispatch({ type: "SET_LOADING", payload: false });

        if (response.success && response.data) {
          dispatch({ type: "UPDATE_USER", payload: response.data });
          return true;
        } else {
          dispatch({
            type: "AUTH_FAILURE",
            payload: response.message || "Profile update failed",
          });
          return false;
        }
      } catch (error: any) {
        dispatch({
          type: "AUTH_FAILURE",
          payload: error.message || "Profile update failed",
        });
        return false;
      }
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, [dispatch]);

  const refreshAuth = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await authService.getProfile();

      if (response.success && response.data) {
        dispatch({ type: "UPDATE_USER", payload: response.data });
      }
    } catch (error) {
      console.error("Failed to refresh auth:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch]);

  const value: AuthContextType = useMemo(
    () => ({
      ...state,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      changePassword,
      updateProfile,
      clearError,
      refreshAuth,
    }),
    [
      state,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      changePassword,
      updateProfile,
      clearError,
      refreshAuth,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
