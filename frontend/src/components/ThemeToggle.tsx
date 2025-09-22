import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { SunIcon, MoonIcon, EyeIcon } from "@heroicons/react/24/outline";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon className="h-4 w-4" />;
      case "dark":
        return <MoonIcon className="h-4 w-4" />;
      case "glass":
        return <EyeIcon className="h-4 w-4" />;
      default:
        return <SunIcon className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light Mode";
      case "dark":
        return "Dark Mode";
      case "glass":
        return "Glass Mode";
      default:
        return "Light Mode";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all duration-200 hover:scale-105"
      title={`Switch to ${
        theme === "light" ? "Dark" : theme === "dark" ? "Glass" : "Light"
      } Mode`}
    >
      {getIcon()}
      <span className="text-xs font-medium hidden sm:block">{getLabel()}</span>
    </button>
  );
};

export default ThemeToggle;
