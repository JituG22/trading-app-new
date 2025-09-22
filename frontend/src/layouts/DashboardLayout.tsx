import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/dashboard/Sidebar";
import TopNav from "../components/dashboard/TopNav";

const DashboardLayout: React.FC = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const getBackgroundClasses = () => {
    switch (theme) {
      case "glass":
        return "h-screen w-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex flex-col overflow-hidden";
      case "dark":
        return "h-screen w-full bg-gray-900 flex flex-col overflow-hidden";
      default:
        return "h-screen w-full bg-gray-50 flex flex-col overflow-hidden";
    }
  };

  return (
    <div className={`theme-container ${theme} ${getBackgroundClasses()}`}>
      {/* Top navigation - Full width */}
      <TopNav onMenuClick={handleSidebarToggle} />

      {/* Main layout with sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <div className="h-full px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
