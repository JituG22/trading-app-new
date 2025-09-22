import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme, type Theme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";
import {
  UserCircleIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    trading: boolean;
    portfolio: boolean;
  };
  privacy: {
    showPortfolio: boolean;
    showActivity: boolean;
  };
  trading: {
    confirmations: boolean;
    autoRebalance: boolean;
  };
}

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, updateUserTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      trading: true,
      portfolio: false,
    },
    privacy: {
      showPortfolio: false,
      showActivity: true,
    },
    trading: {
      confirmations: true,
      autoRebalance: false,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "profile", name: "Profile", icon: UserCircleIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "privacy", name: "Privacy", icon: ShieldCheckIcon },
    { id: "trading", name: "Trading", icon: CogIcon },
    { id: "theme", name: "Theme", icon: PaintBrushIcon },
  ];

  const handleSettingChange = (
    category: keyof UserSettings,
    setting: string,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would make an API call to save settings
    console.log("Saving settings:", settings);

    setIsLoading(false);

    // Show success message (you could use a toast library here)
    alert("Settings saved successfully!");
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              defaultValue={user?.firstName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              defaultValue={user?.lastName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              defaultValue={user?.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="currentPassword"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email Updates</p>
              <p className="text-sm text-gray-500">
                Receive account and trading updates via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "email",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Trading Alerts
              </p>
              <p className="text-sm text-gray-500">
                Get notified about trade executions and market opportunities
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.trading}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "trading",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Portfolio Updates
              </p>
              <p className="text-sm text-gray-500">
                Weekly portfolio performance summaries
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.portfolio}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "portfolio",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Push Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Browser Notifications
              </p>
              <p className="text-sm text-gray-500">
                Receive notifications in your browser
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) =>
                  handleSettingChange("notifications", "push", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Privacy Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Portfolio Visibility
              </p>
              <p className="text-sm text-gray-500">
                Make your portfolio visible to other users
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showPortfolio}
                onChange={(e) =>
                  handleSettingChange(
                    "privacy",
                    "showPortfolio",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Activity Feed</p>
              <p className="text-sm text-gray-500">
                Show your trading activity to followers
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showActivity}
                onChange={(e) =>
                  handleSettingChange(
                    "privacy",
                    "showActivity",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTradingTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Trading Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Trade Confirmations
              </p>
              <p className="text-sm text-gray-500">
                Require confirmation before executing trades
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.trading.confirmations}
                onChange={(e) =>
                  handleSettingChange(
                    "trading",
                    "confirmations",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Auto-Rebalancing
              </p>
              <p className="text-sm text-gray-500">
                Automatically rebalance portfolio monthly
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.trading.autoRebalance}
                onChange={(e) =>
                  handleSettingChange(
                    "trading",
                    "autoRebalance",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThemeTab = () => (
    <div className="space-y-6">
      <div>
        <h3
          className={`text-lg font-medium mb-4 ${
            theme === "glass" || theme === "dark"
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          Appearance & Theme
        </h3>
        <p
          className={`text-sm mb-6 ${
            theme === "glass"
              ? "text-white text-opacity-80"
              : theme === "dark"
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          Customize the look and feel of your trading interface
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4
            className={`font-medium mb-3 ${
              theme === "glass" || theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Theme Selection
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["light", "dark", "glass"].map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => updateUserTheme(themeOption as Theme)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  theme === themeOption
                    ? theme === "glass"
                      ? "border-blue-400 bg-white bg-opacity-20 backdrop-blur-sm"
                      : theme === "dark"
                      ? "border-blue-500 bg-blue-900 bg-opacity-30"
                      : "border-blue-500 bg-blue-50"
                    : theme === "glass"
                    ? "border-white border-opacity-30 bg-white bg-opacity-10 hover:bg-opacity-20"
                    : theme === "dark"
                    ? "border-gray-600 bg-gray-800 hover:bg-gray-700"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      themeOption === "light"
                        ? "bg-gradient-to-r from-blue-400 to-blue-600"
                        : themeOption === "dark"
                        ? "bg-gradient-to-r from-gray-700 to-gray-900"
                        : "bg-gradient-to-r from-purple-400 to-blue-600"
                    }`}
                  ></div>
                  <div>
                    <h5
                      className={`font-medium ${
                        theme === "glass" || theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {themeOption === "light"
                        ? "Light Mode"
                        : themeOption === "dark"
                        ? "Dark Mode"
                        : "Glass Mode"}
                    </h5>
                    <p
                      className={`text-sm ${
                        theme === "glass"
                          ? "text-white text-opacity-70"
                          : theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {themeOption === "light"
                        ? "Clean and professional"
                        : themeOption === "dark"
                        ? "Easy on the eyes"
                        : "Modern glassmorphism"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium ${
                theme === "glass" || theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              Quick Theme Toggle
            </span>
            <ThemeToggle />
          </div>
          <p
            className={`text-sm mt-1 ${
              theme === "glass"
                ? "text-white text-opacity-70"
                : theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Use the toggle button for quick theme switching
          </p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "notifications":
        return renderNotificationsTab();
      case "privacy":
        return renderPrivacyTab();
      case "trading":
        return renderTradingTab();
      case "theme":
        return renderThemeTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1
          className={`text-3xl font-bold mb-2 ${
            theme === "glass" || theme === "dark"
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          Settings
        </h1>
        <p
          className={`${
            theme === "glass"
              ? "text-white text-opacity-80"
              : theme === "dark"
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="lg:w-1/4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? theme === "glass"
                      ? "bg-white bg-opacity-20 text-white border-white border-opacity-30 backdrop-blur-sm"
                      : theme === "dark"
                      ? "bg-blue-900 bg-opacity-50 text-blue-300 border-blue-700"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                    : theme === "glass"
                    ? "text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon
                  className={`mr-3 h-5 w-5 ${
                    activeTab === tab.id
                      ? theme === "glass"
                        ? "text-white"
                        : theme === "dark"
                        ? "text-blue-300"
                        : "text-blue-500"
                      : theme === "glass"
                      ? "text-white text-opacity-60"
                      : theme === "dark"
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:w-3/4">
          <div
            className={`rounded-lg shadow-sm border p-6 ${
              theme === "glass"
                ? "bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20"
                : theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {renderTabContent()}

            {/* Save Button */}
            {activeTab !== "theme" && (
              <div
                className={`mt-8 pt-6 border-t ${
                  theme === "glass"
                    ? "border-white border-opacity-20"
                    : theme === "dark"
                    ? "border-gray-700"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                    className={`px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
                      theme === "glass"
                        ? "bg-white bg-opacity-20 text-white hover:bg-opacity-30 focus:ring-blue-400 backdrop-blur-sm border border-white border-opacity-30"
                        : theme === "dark"
                        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                        : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                    }`}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
