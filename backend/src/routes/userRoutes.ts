import { Router } from "express";
import { UserController } from "../controllers";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

// User profile routes
router.get("/profile", UserController.getProfile);
router.put("/profile", UserController.updateProfile);

// Theme preference route
router.put("/theme", UserController.updateTheme);

export default router;
