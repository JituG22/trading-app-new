import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "./common/Loading";

interface AuthRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * AuthRoute component - for login/signup pages
 * Redirects authenticated users away from auth pages
 * Only allows unauthenticated users to access login/signup
 */
const AuthRoute: React.FC<AuthRouteProps> = ({
  children,
  redirectTo = "/dashboard",
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  console.log(
    "AuthRoute - isLoading:",
    isLoading,
    "isAuthenticated:",
    isAuthenticated,
    "location:",
    location.pathname
  );

  // Show loading spinner while checking authentication
  if (isLoading) {
    console.log("AuthRoute - showing loading screen");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loading size="lg" />
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is already authenticated, redirect to dashboard
  if (!isLoading && isAuthenticated) {
    console.log(
      "AuthRoute - user already authenticated, redirecting to:",
      redirectTo
    );
    return <Navigate to={redirectTo} replace />;
  }

  // Render auth content (login/signup) only when user is not authenticated
  console.log("AuthRoute - rendering auth content for unauthenticated user");
  return <>{children}</>;
};

export default AuthRoute;
