import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();

  const baseClasses = `
    inline-flex items-center justify-center border font-medium rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "primary":
        switch (theme) {
          case "glass":
            return "border-transparent text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-blue-400 backdrop-blur-sm border border-white border-opacity-30";
          case "dark":
            return "border-transparent text-gray-900 bg-blue-500 hover:bg-blue-600 focus:ring-blue-400";
          default:
            return "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800";
        }
      case "secondary":
        switch (theme) {
          case "glass":
            return "border-transparent text-white bg-white bg-opacity-10 hover:bg-opacity-20 focus:ring-gray-400 backdrop-blur-sm";
          case "dark":
            return "border-transparent text-white bg-gray-700 hover:bg-gray-600 focus:ring-gray-500";
          default:
            return "border-transparent text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800";
        }
      case "outline":
        switch (theme) {
          case "glass":
            return "border-white border-opacity-30 text-white bg-transparent hover:bg-white hover:bg-opacity-10 focus:ring-blue-400";
          case "dark":
            return "border-gray-600 text-gray-200 bg-transparent hover:bg-gray-700 focus:ring-blue-500";
          default:
            return "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 hover:border-gray-400";
        }
      case "ghost":
        switch (theme) {
          case "glass":
            return "border-transparent text-blue-200 bg-transparent hover:bg-white hover:bg-opacity-10 focus:ring-blue-400";
          case "dark":
            return "border-transparent text-blue-400 bg-transparent hover:bg-gray-800 focus:ring-blue-500";
          default:
            return "border-transparent text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500";
        }
      default:
        return "";
    }
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`
        ${baseClasses}
        ${getVariantClasses(variant)}
        ${sizeClasses[size]}
        ${widthClass}
        ${className || ""}
      `}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
