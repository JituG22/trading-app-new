import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import type { SignUpFormData } from "../../types";
import { signUpSchema } from "../../utils/validation";
import { FormField, Button, PasswordStrength } from "../../components/forms";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<SignUpFormData>({
    resolver: joiResolver(signUpSchema),
    mode: "onChange",
  });

  const watchedPassword = watch("password", "");

  React.useEffect(() => {
    setPasswordValue(watchedPassword);
  }, [watchedPassword]);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      console.log("Sign up data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to login page with success message
      navigate("/auth/login", {
        state: { message: "Account created successfully! Please log in." },
      });
    } catch (error) {
      console.error("Sign up error:", error);
      setError("root", {
        type: "manual",
        message: "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Join us and start your trading journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            registration={register("firstName")}
            error={errors.firstName}
            required
            autoComplete="given-name"
          />

          <FormField
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            registration={register("lastName")}
            error={errors.lastName}
            required
            autoComplete="family-name"
          />
        </div>

        <FormField
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          registration={register("email")}
          error={errors.email}
          required
          autoComplete="email"
        />

        <div>
          <FormField
            label="Password"
            type="password"
            placeholder="Create a strong password"
            registration={register("password")}
            error={errors.password}
            showPasswordToggle
            required
            autoComplete="new-password"
          />
          <PasswordStrength password={passwordValue} showRequirements />
        </div>

        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
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
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
