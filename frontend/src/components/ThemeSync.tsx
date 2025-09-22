import React from "react";
import { useThemeSync } from "../hooks/useThemeSync";

/**
 * Component that handles syncing user's theme preference from the database
 * This should be rendered within both AuthProvider and ThemeProvider contexts
 */
const ThemeSync: React.FC = () => {
  useThemeSync();
  return null; // This component doesn't render anything visible
};

export default ThemeSync;
