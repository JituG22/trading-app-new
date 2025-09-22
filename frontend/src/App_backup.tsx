import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/themes.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import ThemeSync from "./components/ThemeSync";
import { SignUp, Login, ForgotPassword, ResetPassword } from "./pages/auth";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Settings";
import "./utils/debugAuth"; // Import debug utility
import "./utils/authTest"; // Import auth test utility
import "react-toastify/dist/ReactToastify.css";
import "./styles/themes.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import ThemeSync from "./components/ThemeSync";
import { SignUp, Login, ForgotPassword, ResetPassword } from "./pages/auth";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Settings";
import "./utils/debugAuth"; // Import debug utility

// Placeholder components for future implementation
const TradingPage = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading</h1>
      <p className="text-gray-600">
        Advanced trading features will be implemented in future steps.
      </p>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <p className="text-gray-500">Trading interface coming soon...</p>
    </div>
  </div>
);

const PortfolioPage = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
      <p className="text-gray-600">
        Detailed portfolio analytics and management tools.
      </p>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <p className="text-gray-500">Portfolio dashboard coming soon...</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRedirect />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "trading",
        element: <TradingPage />,
      },
      {
        path: "portfolio",
        element: <PortfolioPage />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  // Catch all route for undefined paths
  {
    path: "*",
    element: <AuthRedirect />,
  },
]);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemeSync />
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
