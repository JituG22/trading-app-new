import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
// import AuthDebug from "../../components/AuthDebug"; // Hidden for production
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

interface DashboardStats {
  totalValue: number;
  todayChange: number;
  todayPercentage: number;
  activePositions: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats] = useState<DashboardStats>({
    totalValue: 0,
    todayChange: 0,
    todayPercentage: 0,
    activePositions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      setStats({
        totalValue: 125487.32,
        todayChange: 2847.91,
        todayPercentage: 2.34,
        activePositions: 12,
      });

      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const summaryCards = [
    {
      title: "Portfolio Value",
      value: `$${stats.totalValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`,
      icon: CurrencyDollarIcon,
      color: "blue",
    },
    {
      title: "Today's Change",
      value: `$${Math.abs(stats.todayChange).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`,
      change: `${stats.todayPercentage >= 0 ? "+" : ""}${
        stats.todayPercentage
      }%`,
      changeType: stats.todayPercentage >= 0 ? "positive" : "negative",
      icon:
        stats.todayPercentage >= 0
          ? ArrowTrendingUpIcon
          : ArrowTrendingDownIcon,
      color: stats.todayPercentage >= 0 ? "green" : "red",
    },
    {
      title: "Active Positions",
      value: stats.activePositions.toString(),
      icon: ChartBarIcon,
      color: "purple",
    },
    {
      title: "Available Cash",
      value: "$8,234.67",
      icon: CurrencyDollarIcon,
      color: "indigo",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "buy",
      symbol: "AAPL",
      name: "Apple Inc.",
      quantity: 50,
      price: 184.92,
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "sell",
      symbol: "TSLA",
      name: "Tesla, Inc.",
      quantity: 25,
      price: 248.42,
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "buy",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      quantity: 30,
      price: 378.85,
      time: "1 day ago",
    },
  ];

  const quickActions = [
    { name: "Buy Stock", color: "green", icon: PlusIcon },
    { name: "Sell Stock", color: "red", icon: ArrowTrendingDownIcon },
    { name: "View Analytics", color: "blue", icon: ChartBarIcon },
    {
      name: "Market Research",
      color: "purple",
      icon: ArrowTopRightOnSquareIcon,
    },
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div
          className={`h-8 rounded w-1/4 mb-6 ${
            theme === "glass"
              ? "bg-white bg-opacity-20"
              : theme === "dark"
              ? "bg-gray-700"
              : "bg-gray-200"
          }`}
        ></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-32 rounded-lg ${
                theme === "glass"
                  ? "bg-white bg-opacity-10"
                  : theme === "dark"
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className={`h-64 rounded-lg ${
              theme === "glass"
                ? "bg-white bg-opacity-10"
                : theme === "dark"
                ? "bg-gray-800"
                : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`h-64 rounded-lg ${
              theme === "glass"
                ? "bg-white bg-opacity-10"
                : theme === "dark"
                ? "bg-gray-800"
                : "bg-gray-200"
            }`}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* <AuthDebug /> - Hidden for production */}
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your portfolio today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.change && (
                  <p
                    className={`text-sm font-medium ${
                      card.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {card.change}
                  </p>
                )}
              </div>
              <div
                className={`p-3 rounded-full ${
                  card.color === "blue"
                    ? "bg-blue-50"
                    : card.color === "green"
                    ? "bg-green-50"
                    : card.color === "red"
                    ? "bg-red-50"
                    : card.color === "purple"
                    ? "bg-purple-50"
                    : "bg-indigo-50"
                }`}
              >
                <card.icon
                  className={`h-6 w-6 ${
                    card.color === "blue"
                      ? "text-blue-600"
                      : card.color === "green"
                      ? "text-green-600"
                      : card.color === "red"
                      ? "text-red-600"
                      : card.color === "purple"
                      ? "text-purple-600"
                      : "text-indigo-600"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.type === "buy"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activity.type.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.symbol}
                      </p>
                      <p className="text-sm text-gray-500">{activity.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {activity.quantity} shares
                    </p>
                    <p className="text-sm text-gray-500">
                      ${activity.price} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg border-2 border-dashed transition-colors duration-200 hover:bg-gray-50 ${
                    action.color === "green"
                      ? "border-green-300 hover:border-green-400"
                      : action.color === "red"
                      ? "border-red-300 hover:border-red-400"
                      : action.color === "blue"
                      ? "border-blue-300 hover:border-blue-400"
                      : "border-purple-300 hover:border-purple-400"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <action.icon
                      className={`h-6 w-6 ${
                        action.color === "green"
                          ? "text-green-600"
                          : action.color === "red"
                          ? "text-red-600"
                          : action.color === "blue"
                          ? "text-blue-600"
                          : "text-purple-600"
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {action.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Market Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">
              Market data and charts will be implemented in future updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
