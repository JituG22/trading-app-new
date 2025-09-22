import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { apiRateLimit } from "./middleware/rateLimiting";
import { authRoutes, userRoutes } from "./routes";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Global rate limiting
app.use("/api", apiRateLimit);

// Health check route
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Trading App API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/api", (_req, res) => {
  res.json({
    success: true,
    message: "Trading App API v1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth/*",
      user: "/api/user/*",
    },
    authEndpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      profile: "GET /api/auth/profile",
      updateProfile: "PUT /api/auth/profile",
      forgotPassword: "POST /api/auth/forgot-password",
      resetPassword: "POST /api/auth/reset-password",
      changePassword: "POST /api/auth/change-password",
      deactivateAccount: "DELETE /api/auth/account",
    },
    userEndpoints: {
      profile: "GET /api/user/profile",
      updateProfile: "PUT /api/user/profile",
      updateTheme: "PUT /api/user/theme",
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `🌐 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
  );
});

export default app;
