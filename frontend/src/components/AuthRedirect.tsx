import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "./common/Loading";

/**
 * Smart redirect component that sends users to dashboard if authenticated,
 * or to login if not authenticated. Shows loading while checking auth state.
 * Preserves the intended destination if user was trying to access a protected route.
 */
const AuthRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  console.log(
    "AuthRedirect - isLoading:",
    isLoading,
    "isAuthenticated:",
    isAuthenticated,
    "location state:",
    location.state
  );

  // Show loading while checking authentication
  if (isLoading) {
    console.log("AuthRedirect - showing loading");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loading size="lg" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    // If user was trying to access a specific route, redirect there
    // Otherwise, redirect to dashboard
    const redirectTo = (location.state as any)?.from?.pathname || "/dashboard";
    console.log(
      "AuthRedirect - redirecting authenticated user to:",
      redirectTo
    );
    return <Navigate to={redirectTo} replace />;
  } else {
    console.log("AuthRedirect - redirecting to login");
    return <Navigate to="/auth/login" replace />;
  }
};

export default AuthRedirect;
