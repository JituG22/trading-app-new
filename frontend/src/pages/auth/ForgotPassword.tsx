import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import type { ForgotPasswordFormData } from "../../types";
import { forgotPasswordSchema } from "../../utils/validation";
import { FormField, Button } from "../../components/forms";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isSuccess, setIsSuccess] = useState(false);
  const { forgotPassword, isLoading, error, clearError, isAuthenticated } =
    useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: joiResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      clearError();
      const success = await forgotPassword(data.email);

      if (success) {
        setIsSuccess(true);
        toast.success("Password reset email sent! Please check your inbox.");
      } else {
        setError("root", {
          type: "manual",
          message: error || "Failed to send reset email. Please try again.",
        });
      }
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleResendEmail = async () => {
    const email = getValues("email");
    if (email && isValid) {
      await onSubmit({ email });
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
              theme === "glass"
                ? "bg-green-500 bg-opacity-20 backdrop-blur-sm border border-green-300 border-opacity-30"
                : theme === "dark"
                ? "bg-green-900 bg-opacity-50"
                : "bg-green-100"
            }`}
          >
            <svg
              className={`h-6 w-6 ${
                theme === "glass" || theme === "dark"
                  ? "text-green-300"
                  : "text-green-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold theme-text-primary">
            Check your email
          </h2>
          <p className="mt-2 text-sm theme-text-secondary">
            We've sent a password reset link to{" "}
            <span className="font-medium theme-text-primary">
              {getValues("email")}
            </span>
          </p>
        </div>

        <div
          className={`border rounded-md p-4 ${
            theme === "glass"
              ? "bg-blue-500 bg-opacity-20 backdrop-blur-sm border-blue-300 border-opacity-30"
              : theme === "dark"
              ? "bg-blue-900 bg-opacity-50 border-blue-700"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <div className="flex">
            <svg
              className={`h-5 w-5 ${
                theme === "glass" || theme === "dark"
                  ? "text-blue-300"
                  : "text-blue-400"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-3">
              <h3
                className={`text-sm font-medium ${
                  theme === "glass" || theme === "dark"
                    ? "text-blue-100"
                    : "text-blue-800"
                }`}
              >
                Next steps:
              </h3>
              <div
                className={`mt-2 text-sm ${
                  theme === "glass" || theme === "dark"
                    ? "text-blue-200"
                    : "text-blue-700"
                }`}
              >
                <ul className="list-disc pl-5 space-y-1">
                  <li>Check your email inbox (including spam folder)</li>
                  <li>Click the reset link within 30 minutes</li>
                  <li>Create a new secure password</li>
                  <li>Sign in with your new password</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleResendEmail}
            disabled={isLoading}
          >
            Resend Email
          </Button>

          <div className="text-center">
            <Link
              to="/auth/login"
              className={`text-sm font-medium transition-colors ${
                theme === "glass"
                  ? "text-blue-200 hover:text-white"
                  : theme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-500"
              }`}
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold theme-text-primary">
          Forgot your password?
        </h2>
        <p className="mt-2 text-sm theme-text-secondary">
          No worries! Enter your email address and we'll send you a link to
          reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          registration={register("email")}
          error={errors.email}
          required
          autoComplete="email"
          helperText="We'll send a password reset link to this email"
        />

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
                className="h-5 w-5 text-red-400"
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
          {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/login"
          className={`text-sm font-medium transition-colors ${
            theme === "glass"
              ? "text-blue-200 hover:text-white"
              : theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-500"
          }`}
        >
          ← Back to Sign In
        </Link>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Need help? Contact support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
