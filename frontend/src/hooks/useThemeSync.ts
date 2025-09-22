import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useTheme } from "../contexts/ThemeContext";
import { userService } from "../services/userService";

/**
 * Hook to sync user's saved theme preference from the database
 * This runs when the user is authenticated and loads their saved theme
 */
export const useThemeSync = () => {
  const { isAuthenticated, user } = useAuth();
  const { setTheme } = useTheme();

  useEffect(() => {
    const syncUserTheme = async () => {
      if (isAuthenticated && user) {
        try {
          // Fetch user profile to get the latest theme preference
          const userProfile = await userService.getProfile();

          if (userProfile.theme) {
            // Update the theme context with the user's saved preference
            setTheme(userProfile.theme);

            // Also update localStorage as backup
            localStorage.setItem("trading-app-theme", userProfile.theme);
          }
        } catch (error) {
          console.error("Failed to sync user theme:", error);
          // If API fails, continue with current theme from localStorage
        }
      }
    };

    // Only sync theme once when user becomes authenticated
    if (isAuthenticated && user) {
      syncUserTheme();
    }
  }, [isAuthenticated, user, setTheme]);
};
