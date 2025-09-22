import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import {
  HomeIcon,
  ChartBarIcon,
  BriefcaseIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Trading Tools", href: "/dashboard/trading", icon: ChartBarIcon },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: BriefcaseIcon },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const getSidebarClasses = () => {
    switch (theme) {
      case "glass":
        return "fixed inset-y-0 left-0 z-30 w-64 bg-white/10 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0";
      case "dark":
        return "fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0";
      default:
        return "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0";
    }
  };

  const getBorderClasses = () => {
    switch (theme) {
      case "glass":
        return "border-white/20";
      case "dark":
        return "border-gray-700";
      default:
        return "border-gray-200";
    }
  };

  const getTextClasses = () => {
    switch (theme) {
      case "glass":
        return "text-white";
      case "dark":
        return "text-gray-100";
      default:
        return "text-gray-900";
    }
  };

  const getSecondaryTextClasses = () => {
    switch (theme) {
      case "glass":
        return "text-white/70";
      case "dark":
        return "text-gray-400";
      default:
        return "text-gray-500";
    }
  };

  const getNavActiveClasses = () => {
    switch (theme) {
      case "glass":
        return "bg-white/20 text-white border-r-2 border-white";
      case "dark":
        return "bg-blue-600 text-white border-r-2 border-blue-400";
      default:
        return "bg-blue-50 text-blue-700 border-r-2 border-blue-700";
    }
  };

  const getNavInactiveClasses = () => {
    switch (theme) {
      case "glass":
        return "text-white/80 hover:bg-white/10 hover:text-white";
      case "dark":
        return "text-gray-300 hover:bg-gray-700 hover:text-white";
      default:
        return "text-gray-700 hover:bg-gray-50 hover:text-gray-900";
    }
  };

  const getNavIconActiveClasses = () => {
    switch (theme) {
      case "glass":
        return "text-white";
      case "dark":
        return "text-white";
      default:
        return "text-blue-700";
    }
  };

  const getNavIconInactiveClasses = () => {
    switch (theme) {
      case "glass":
        return "text-white/60 group-hover:text-white/80";
      case "dark":
        return "text-gray-400 group-hover:text-gray-300";
      default:
        return "text-gray-400 group-hover:text-gray-500";
    }
  };

  const getLogoutButtonClasses = () => {
    switch (theme) {
      case "glass":
        return "group flex items-center w-full px-3 py-2 text-sm font-medium text-red-300 rounded-md hover:bg-red-500/20 hover:text-red-200 transition-colors duration-200";
      case "dark":
        return "group flex items-center w-full px-3 py-2 text-sm font-medium text-red-400 rounded-md hover:bg-red-600/20 hover:text-red-300 transition-colors duration-200";
      default:
        return "group flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors duration-200";
    }
  };

  const getLogoutIconClasses = () => {
    switch (theme) {
      case "glass":
        return "mr-3 h-5 w-5 text-red-300 group-hover:text-red-200";
      case "dark":
        return "mr-3 h-5 w-5 text-red-400 group-hover:text-red-300";
      default:
        return "mr-3 h-5 w-5 text-red-500 group-hover:text-red-600";
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${getSidebarClasses()} ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={`flex items-center justify-between h-16 px-6 border-b ${getBorderClasses()}`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
              </div>
              <span
                className={`ml-3 text-xl font-semibold ${getTextClasses()}`}
              >
                Trading App
              </span>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User info */}
          <div className={`px-6 py-4 border-b ${getBorderClasses()}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${getTextClasses()}`}>
                  {user?.firstName} {user?.lastName}
                </p>
                <p className={`text-xs ${getSecondaryTextClasses()} truncate`}>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive ? getNavActiveClasses() : getNavInactiveClasses()
                  }`}
                  onClick={() => {
                    // Close sidebar on mobile when navigating
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                      isActive
                        ? getNavIconActiveClasses()
                        : getNavIconInactiveClasses()
                    }`}
                  />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="px-4 pb-6">
            <button onClick={handleLogout} className={getLogoutButtonClasses()}>
              <ArrowRightOnRectangleIcon className={getLogoutIconClasses()} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
