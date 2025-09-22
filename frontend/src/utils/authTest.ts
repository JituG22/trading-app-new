// Simple auth test utility to debug refresh issues
export const testAuthPersistence = () => {
  console.log("=== AUTH PERSISTENCE TEST ===");

  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("Token exists:", !!token);
  console.log("User exists:", !!user);
  console.log("Refresh token exists:", !!refreshToken);

  if (token) {
    console.log("Token value:", token.substring(0, 50) + "...");
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Token expires:", new Date(payload.exp * 1000));
      console.log("Current time:", new Date());
      console.log("Is expired:", payload.exp <= Math.floor(Date.now() / 1000));
    } catch (e) {
      console.error("Error parsing token:", e);
    }
  }

  if (user) {
    try {
      const userData = JSON.parse(user);
      console.log("User data:", userData);
    } catch (e) {
      console.error("Error parsing user:", e);
    }
  }

  console.log("=== END AUTH TEST ===");
};

// Run test automatically
testAuthPersistence();
