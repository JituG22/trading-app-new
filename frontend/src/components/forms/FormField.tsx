import React, { useState } from "react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import Input from "./Input";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  helperText?: string;
  showPasswordToggle?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  registration,
  error,
  helperText,
  showPasswordToggle = false,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Input
        label={label}
        type={type}
        error={error?.message}
        registration={registration}
        showPasswordToggle={showPasswordToggle}
        onTogglePassword={handleTogglePassword}
        showPassword={showPassword}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FormField;
