// Simple debug utility for testing authentication state
export const debugAuth = () => {
  console.log("=== Auth Debug Info ===");
  console.log("localStorage accessToken:", localStorage.getItem("accessToken"));
  console.log("localStorage user:", localStorage.getItem("user"));
  console.log(
    "localStorage refreshToken:",
    localStorage.getItem("refreshToken")
  );

  try {
    const user = localStorage.getItem("user");
    if (user) {
      console.log("Parsed user:", JSON.parse(user));
    }
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }

  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Token payload:", payload);
      console.log("Token expires:", new Date(payload.exp * 1000));
      console.log("Current time:", new Date());
      console.log("Token valid:", payload.exp > Date.now() / 1000);
    }
  } catch (e) {
    console.error("Error parsing token:", e);
  }
  console.log("======================");
};

// Make it globally available for testing
(window as any).debugAuth = debugAuth;
