import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "./common/Loading";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/auth/login",
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  console.log(
    "ProtectedRoute - isLoading:",
    isLoading,
    "isAuthenticated:",
    isAuthenticated,
    "user:",
    user?.email,
    "location:",
    location.pathname
  );

  // Show loading spinner while checking authentication
  // This is crucial - we must wait for auth to be properly initialized
  if (isLoading) {
    console.log("ProtectedRoute - showing loading screen");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loading size="lg" />
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Only redirect after loading is complete and user is not authenticated
  if (!isLoading && !isAuthenticated) {
    console.log(
      "ProtectedRoute - redirecting to login, from:",
      location.pathname
    );
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Render protected content only when authenticated and not loading
  console.log("ProtectedRoute - rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
