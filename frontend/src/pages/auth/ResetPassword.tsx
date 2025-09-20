import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import type { ResetPasswordFormData } from "../../types";
import { resetPasswordSchema } from "../../utils/validation";
import { FormField, Button, PasswordStrength } from "../../components/forms";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [passwordValue, setPasswordValue] = useState("");

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    setValue,
  } = useForm<ResetPasswordFormData>({
    resolver: joiResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const watchedPassword = watch("password", "");

  useEffect(() => {
    setPasswordValue(watchedPassword);
  }, [watchedPassword]);

  // Set token in form and validate it
  useEffect(() => {
    if (token) {
      setValue("token", token);
      validateToken(token);
    } else {
      setTokenValid(false);
    }
  }, [token, setValue]);

  const validateToken = async (tokenToValidate: string) => {
    try {
      // TODO: Replace with actual API call to validate token
      console.log("Validating token:", tokenToValidate);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, assume token is valid if it's not empty
      setTokenValid(tokenToValidate.length > 0);
    } catch (error) {
      console.error("Token validation error:", error);
      setTokenValid(false);
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      console.log("Reset password data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to login page with success message
      navigate("/auth/login", {
        state: {
          message:
            "Password reset successfully! Please log in with your new password.",
        },
      });
    } catch (error) {
      console.error("Reset password error:", error);
      setError("root", {
        type: "manual",
        message:
          "Failed to reset password. Please try again or request a new reset link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while validating token
  if (tokenValid === null) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Validating reset link...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we verify your password reset token.
          </p>
        </div>
      </div>
    );
  }

  // Show error if token is invalid
  if (!tokenValid) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Invalid reset link
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Common reasons for invalid links:
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>The link has expired (links are valid for 30 minutes)</li>
                  <li>The link has already been used</li>
                  <li>The link was copied incorrectly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/auth/forgot-password">
            <Button variant="primary" size="lg" fullWidth>
              Request New Reset Link
            </Button>
          </Link>

          <div className="text-center">
            <Link
              to="/auth/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
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
        <h2 className="text-2xl font-bold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new password below. Make sure it's strong and secure.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <FormField
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            registration={register("password")}
            error={errors.password}
            showPasswordToggle
            required
            autoComplete="new-password"
          />
          <PasswordStrength password={passwordValue} showRequirements />
        </div>

        <FormField
          label="Confirm New Password"
          type="password"
          placeholder="Confirm your new password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
          showPasswordToggle
          required
          autoComplete="new-password"
        />

        {errors.root && (
          <div className="rounded-md bg-red-50 p-4">
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
                <p className="text-sm text-red-800">{errors.root.message}</p>
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
        >
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
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
              Your new password will be encrypted and secure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
