import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Placeholder components for routes
const LoginPage = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <p className="text-gray-600">Login page will be implemented in Step 4</p>
  </div>
);

const SignUpPage = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
    <p className="text-gray-600">Sign up page will be implemented in Step 4</p>
  </div>
);

const ForgotPasswordPage = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
    <p className="text-gray-600">Forgot password page will be implemented in Step 4</p>
  </div>
);

const ResetPasswordPage = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
    <p className="text-gray-600">Reset password page will be implemented in Step 4</p>
  </div>
);

const DashboardPage = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Welcome</h3>
        <p className="text-gray-600">Dashboard will be implemented in Step 7</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Trading</h3>
        <p className="text-gray-600">Trading features coming soon</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
        <p className="text-gray-600">Portfolio view coming soon</p>
      </div>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
