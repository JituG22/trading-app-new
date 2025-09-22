const http = require("http");

// Test function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test the authentication endpoints
async function testAuthEndpoints() {
  console.log("🧪 Testing Authentication Endpoints\n");

  try {
    // Test 1: API Discovery
    console.log("1. Testing API Discovery Endpoint...");
    const apiInfo = await makeRequest({
      hostname: "localhost",
      port: 5000,
      path: "/api",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`✅ Status: ${apiInfo.status}`);
    console.log(`📄 Available endpoints:`, apiInfo.data.authEndpoints);
    console.log("");

    // Test 2: Register a new user
    console.log("2. Testing User Registration...");
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "SecurePassword123!",
    };

    const registerResponse = await makeRequest(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      userData
    );

    console.log(`✅ Status: ${registerResponse.status}`);
    console.log(`📄 Response:`, registerResponse.data);
    console.log("");

    // Test 3: Login with the new user
    console.log("3. Testing User Login...");
    const loginData = {
      email: "john.doe@example.com",
      password: "SecurePassword123!",
    };

    const loginResponse = await makeRequest(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      loginData
    );

    console.log(`✅ Status: ${loginResponse.status}`);
    if (loginResponse.data.success) {
      console.log(
        `🔑 Token received: ${loginResponse.data.data.tokens.accessToken.substring(
          0,
          50
        )}...`
      );

      // Test 4: Get user profile with token
      console.log("");
      console.log("4. Testing Protected Profile Endpoint...");
      const profileResponse = await makeRequest({
        hostname: "localhost",
        port: 5000,
        path: "/api/auth/profile",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginResponse.data.data.tokens.accessToken}`,
        },
      });

      console.log(`✅ Status: ${profileResponse.status}`);
      console.log(`👤 User profile:`, profileResponse.data);
    } else {
      console.log(`❌ Login failed:`, loginResponse.data);
    }
  } catch (error) {
    console.error("❌ Error testing endpoints:", error.message);
  }
}

// Run the tests
testAuthEndpoints();
