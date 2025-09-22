import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import type { LoginFormData } from "../../types";
import { loginSchema } from "../../utils/validation";
import { FormField, Button } from "../../components/forms";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
// import AuthDebug from "../../components/AuthDebug"; // Hidden for production

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const { theme } = useTheme();

  // Check for success message from sign up
  const successMessage = location.state?.message;

  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginFormData>({
    resolver: joiResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      const success = await login(data.email, data.password);

      if (success) {
        toast.success("Welcome back! Login successful.");
        navigate(from, { replace: true });
      } else {
        // Error is handled by context, but show a form error if needed
        setError("root", {
          type: "manual",
          message: error || "Login failed. Please try again.",
        });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* <AuthDebug /> - Hidden for production */}
      <div>
        <h2 className="text-2xl font-bold theme-text-primary">Welcome back</h2>
        <p className="mt-2 text-sm theme-text-secondary">
          Sign in to your account to continue
        </p>
      </div>

      {successMessage && (
        <div
          className={`rounded-md p-4 ${
            theme === "glass"
              ? "bg-green-500 bg-opacity-20 backdrop-blur-sm border border-green-300 border-opacity-30"
              : theme === "dark"
              ? "bg-green-900 bg-opacity-50"
              : "bg-green-50"
          }`}
        >
          <div className="flex">
            <svg
              className={`h-5 w-5 ${
                theme === "glass" || theme === "dark"
                  ? "text-green-300"
                  : "text-green-400"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-3">
              <p
                className={`text-sm ${
                  theme === "glass" || theme === "dark"
                    ? "text-green-100"
                    : "text-green-800"
                }`}
              >
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          registration={register("email")}
          error={errors.email}
          required
          autoComplete="email"
        />

        <FormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          registration={register("password")}
          error={errors.password}
          showPasswordToggle
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className={`h-4 w-4 rounded focus:ring-2 focus:ring-offset-2 ${
                theme === "glass"
                  ? "bg-white bg-opacity-20 border-white border-opacity-30 text-blue-400 focus:ring-blue-400"
                  : theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
              }`}
              {...register("rememberMe")}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm theme-text-primary"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/auth/forgot-password"
              className={`font-medium transition-colors ${
                theme === "glass"
                  ? "text-blue-200 hover:text-white"
                  : theme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-500"
              }`}
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {errors.root && (
          <div
            className={`rounded-md p-4 ${
              theme === "glass"
                ? "bg-red-500 bg-opacity-20 backdrop-blur-sm border border-red-300 border-opacity-30"
                : theme === "dark"
                ? "bg-red-900 bg-opacity-50"
                : "bg-red-50"
            }`}
          >
            <div className="flex">
              <svg
                className={`h-5 w-5 ${
                  theme === "glass" || theme === "dark"
                    ? "text-red-300"
                    : "text-red-400"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3">
                <p
                  className={`text-sm ${
                    theme === "glass" || theme === "dark"
                      ? "text-red-100"
                      : "text-red-800"
                  }`}
                >
                  {errors.root.message}
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={!isValid}
          className="theme-button-primary"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm theme-text-secondary">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className={`font-medium transition-colors ${
              theme === "glass"
                ? "text-blue-200 hover:text-white"
                : theme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Create one here
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className={`w-full border-t ${
                theme === "glass"
                  ? "border-white border-opacity-30"
                  : theme === "dark"
                  ? "border-gray-600"
                  : "border-gray-300"
              }`}
            />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={`px-2 ${
                theme === "glass"
                  ? "bg-transparent text-white text-opacity-70"
                  : theme === "dark"
                  ? "bg-gray-800 text-gray-400"
                  : "bg-white text-gray-500"
              }`}
            >
              Secure login powered by JWT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
