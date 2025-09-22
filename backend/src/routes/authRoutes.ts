import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authMiddleware, guestOnly } from "../middleware/auth";
import {
  authRateLimit,
  loginRateLimit,
  registerRateLimit,
  forgotPasswordRateLimit,
} from "../middleware/rateLimiting";
import {
  validateRequest,
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "../utils/validation";

const router = Router();

// Public routes (no authentication required)
router.post(
  "/register",
  registerRateLimit,
  guestOnly, // Prevent already authenticated users from registering
  validateRequest(registerSchema),
  AuthController.register
);

router.post(
  "/login",
  loginRateLimit,
  guestOnly, // Prevent already authenticated users from logging in
  validateRequest(loginSchema),
  AuthController.login
);

router.post(
  "/forgot-password",
  forgotPasswordRateLimit,
  validateRequest(forgotPasswordSchema),
  AuthController.forgotPassword
);

router.post(
  "/reset-password",
  authRateLimit,
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword
);

// Protected routes (authentication required)
router.get(
  "/profile",
  authRateLimit,
  authMiddleware,
  AuthController.getProfile
);

router.put(
  "/profile",
  authRateLimit,
  authMiddleware,
  validateRequest(updateProfileSchema),
  AuthController.updateProfile
);

router.post(
  "/change-password",
  authRateLimit,
  authMiddleware,
  validateRequest(changePasswordSchema),
  AuthController.changePassword
);

router.delete(
  "/account",
  authRateLimit,
  authMiddleware,
  AuthController.deactivateAccount
);

export default router;
