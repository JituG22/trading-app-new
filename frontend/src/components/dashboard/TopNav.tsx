import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import UserDropdown from "./UserDropdown";
import ThemeToggle from "../ThemeToggle";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";

interface TopNavProps {
  onMenuClick: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const getHeaderClasses = () => {
    switch (theme) {
      case "glass":
        return "bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20";
      case "dark":
        return "bg-gray-800 border-b border-gray-700";
      default:
        return "bg-white border-b border-gray-200";
    }
  };

  const getButtonClasses = () => {
    switch (theme) {
      case "glass":
        return "p-1.5 rounded-md text-white hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400";
      case "dark":
        return "p-1.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500";
      default:
        return "p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500";
    }
  };

  return (
    <header
      className={`${getHeaderClasses()} px-4 py-2 sm:px-6 lg:px-8 w-full flex-shrink-0`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left side - Mobile menu button and breadcrumb */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className={`lg:hidden ${getButtonClasses()}`}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-5 w-5" />
          </button>

          {/* Welcome message */}
          <div className="ml-4 lg:ml-0">
            <h1
              className={`text-lg font-semibold ${
                theme === "glass" || theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              Welcome back, {user?.firstName}!
            </h1>
            <p
              className={`text-xs ${
                theme === "glass"
                  ? "text-white text-opacity-80"
                  : theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Right side - Theme toggle, Notifications and user menu */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button
            className={`relative ${getButtonClasses().replace(
              "p-1.5",
              "p-1.5"
            )} rounded-full transition-colors duration-200`}
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-5 w-5" />
            {/* Notification badge */}
            <span
              className={`absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ${
                theme === "glass" || theme === "dark"
                  ? "ring-gray-800"
                  : "ring-white"
              }`}
            ></span>
          </button>

          {/* User dropdown */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
