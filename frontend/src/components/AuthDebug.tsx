import React from "react";
import { useAuth } from "../hooks/useAuth";

/**
 * Simple debug component to show current authentication state
 * Add this to any page to see auth status
 */
export const AuthDebug: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return (
      <div className="fixed top-4 right-4 bg-blue-100 border border-blue-300 text-blue-800 px-3 py-2 rounded text-sm z-50">
        <div>
          <strong>Auth Status:</strong>
        </div>
        <div>Loading: {isLoading ? "Yes" : "No"}</div>
        <div>Authenticated: {isAuthenticated ? "Yes" : "No"}</div>
        <div>User: {user?.email || "None"}</div>
        <div>
          Token: {localStorage.getItem("accessToken") ? "Present" : "None"}
        </div>
      </div>
    );
  }

  return null;
};

export default AuthDebug;
