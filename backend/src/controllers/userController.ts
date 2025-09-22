import { Request, Response } from "express";
import { User } from "../models";
import { createResponse } from "../utils/helpers";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export class UserController {
  /**
   * Update user theme preference
   */
  static updateTheme = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { theme } = req.body;
      const userId = req.user?.id;

      // Validate theme value
      const validThemes = ["light", "dark", "glass"];
      if (!theme || !validThemes.includes(theme)) {
        res
          .status(400)
          .json(
            createResponse(
              false,
              undefined,
              undefined,
              "Invalid theme. Must be one of: light, dark, glass"
            )
          );
        return;
      }

      // Update user theme
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { theme },
        { new: true }
      );

      if (!updatedUser) {
        res
          .status(404)
          .json(createResponse(false, undefined, undefined, "User not found"));
        return;
      }

      res.json(
        createResponse(
          true,
          { user: updatedUser },
          "Theme updated successfully"
        )
      );
    } catch (error) {
      console.error("Theme update error:", error);
      res
        .status(500)
        .json(
          createResponse(false, undefined, undefined, "Failed to update theme")
        );
    }
  };

  /**
   * Get user profile
   */
  static getProfile = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user?.id;

      const user = await User.findById(userId);

      if (!user) {
        res
          .status(404)
          .json(createResponse(false, undefined, undefined, "User not found"));
        return;
      }

      res.json(createResponse(true, { user }));
    } catch (error) {
      console.error("Get profile error:", error);
      res
        .status(500)
        .json(
          createResponse(
            false,
            undefined,
            undefined,
            "Failed to get user profile"
          )
        );
    }
  };

  /**
   * Update user profile
   */
  static updateProfile = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const { firstName, lastName, theme } = req.body;

      const updateData: any = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (theme && ["light", "dark", "glass"].includes(theme)) {
        updateData.theme = theme;
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        res
          .status(404)
          .json(createResponse(false, undefined, undefined, "User not found"));
        return;
      }

      res.json(
        createResponse(
          true,
          { user: updatedUser },
          "Profile updated successfully"
        )
      );
    } catch (error) {
      console.error("Profile update error:", error);
      res
        .status(500)
        .json(
          createResponse(
            false,
            undefined,
            undefined,
            "Failed to update profile"
          )
        );
    }
  };
}
