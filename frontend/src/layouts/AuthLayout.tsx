import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const AuthLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`login-container theme-container ${theme}`}>
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Panel - Background Image/Content */}
        <div className="login-left-panel hidden lg:flex flex-col justify-center items-center p-12 text-white">
          <div className="login-left-content max-w-md text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
                  <ChartBarIcon className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Trading App</h1>
              <p className="text-xl text-white text-opacity-90 mb-8">
                Your gateway to smart trading and financial success
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Advanced Analytics</h3>
                  <p className="text-sm text-white text-opacity-80">
                    Real-time market data and insights
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                  <CurrencyDollarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Smart Trading</h3>
                  <p className="text-sm text-white text-opacity-80">
                    AI-powered trading recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                  <ChartBarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Portfolio Management</h3>
                  <p className="text-sm text-white text-opacity-80">
                    Track and optimize your investments
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-white text-opacity-70">
                Join thousands of successful traders
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="login-right-panel flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:max-w-md">
            {/* Mobile Header */}
            <div className="text-center mb-8 lg:hidden">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full theme-bg-secondary">
                  <ChartBarIcon className="h-8 w-8 theme-text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold theme-text-primary">
                Trading App
              </h1>
              <p className="mt-2 text-sm theme-text-secondary">
                Your gateway to smart trading
              </p>
            </div>

            {/* Form Content */}
            <div className="theme-form">
              <Outlet />
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs theme-text-secondary">
                © 2025 Trading App. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
