import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { userService } from "../services/userService";

export type Theme = "light" | "dark" | "glass";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  updateUserTheme: (theme: Theme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem("trading-app-theme") as Theme;
    return savedTheme || "light";
  });

  // Function to update theme in database and localStorage
  const updateUserTheme = async (newTheme: Theme) => {
    try {
      // Update theme in backend
      await userService.updateTheme(newTheme);

      // Update local state
      setTheme(newTheme);

      // Update localStorage as backup
      localStorage.setItem("trading-app-theme", newTheme);
    } catch (error) {
      console.error("Failed to update theme in database:", error);

      // Still update locally if backend fails
      setTheme(newTheme);
      localStorage.setItem("trading-app-theme", newTheme);
    }
  };

  const toggleTheme = async () => {
    const themes: Theme[] = ["light", "dark", "glass"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    await updateUserTheme(nextTheme);
  };

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("trading-app-theme", theme);

    // Apply theme to document root
    const root = document.documentElement;
    root.classList.remove("light", "dark", "glass");
    root.classList.add(theme);

    // Set CSS custom properties for each theme
    switch (theme) {
      case "light":
        root.style.setProperty("--primary-bg", "#ffffff");
        root.style.setProperty("--secondary-bg", "#f8fafc");
        root.style.setProperty("--text-primary", "#1f2937");
        root.style.setProperty("--text-secondary", "#6b7280");
        root.style.setProperty("--border-color", "#e5e7eb");
        root.style.setProperty("--accent-color", "#3b82f6");
        break;
      case "dark":
        root.style.setProperty("--primary-bg", "#111827");
        root.style.setProperty("--secondary-bg", "#1f2937");
        root.style.setProperty("--text-primary", "#f9fafb");
        root.style.setProperty("--text-secondary", "#d1d5db");
        root.style.setProperty("--border-color", "#374151");
        root.style.setProperty("--accent-color", "#60a5fa");
        break;
      case "glass":
        root.style.setProperty("--primary-bg", "rgba(255, 255, 255, 0.1)");
        root.style.setProperty("--secondary-bg", "rgba(255, 255, 255, 0.05)");
        root.style.setProperty("--text-primary", "#ffffff");
        root.style.setProperty("--text-secondary", "#e5e7eb");
        root.style.setProperty("--border-color", "rgba(255, 255, 255, 0.2)");
        root.style.setProperty("--accent-color", "#60a5fa");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, updateUserTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
