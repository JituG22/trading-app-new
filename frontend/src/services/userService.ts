import api from "./api";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  theme: "light" | "dark" | "glass";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  theme?: "light" | "dark" | "glass";
}

export const userService = {
  // Get user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get("/user/profile");
    return response.data.data.user;
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await api.put("/user/profile", data);
    return response.data.data.user;
  },

  // Update theme preference
  updateTheme: async (
    theme: "light" | "dark" | "glass"
  ): Promise<UserProfile> => {
    const response = await api.put("/user/theme", { theme });
    return response.data.data.user;
  },
};
