import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Placeholder */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Trading App</h1>
        </div>
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            <div className="bg-primary-50 text-primary-700 px-3 py-2 rounded-lg">
              Dashboard
            </div>
            <div className="text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg cursor-pointer">
              Trading
            </div>
            <div className="text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg cursor-pointer">
              Portfolio
            </div>
            <div className="text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg cursor-pointer">
              Settings
            </div>
          </div>
        </nav>
      </div>

      {/* Main content area */}
      <div className="ml-64">
        {/* Top navigation - Placeholder */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Welcome back!</div>
              <div className="h-8 w-8 bg-primary-500 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
