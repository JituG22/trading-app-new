# Trading App Development Prompts

This file contains step-by-step prompts for developing the trading application. Use these prompts one by one with any AI coding agent to build your project systematically.

---

## 🚀 **STEP 1: Setup Project Structure**

**Status**: Ready to start  
**Task**: Create separate frontend and backend folders with initial configurations

```
I want to start developing my trading app project. I have comprehensive documentation in prompt.md and tracking-information.md files.

Please start with the first development task: "Setup project structure"

Create the following folder structure in my workspace:
- frontend/ directory for the React TypeScript app
- backend/ directory for the Node.js TypeScript API
- docs/ directory for additional documentation
- Initialize a Git repository with proper .gitignore files

Make sure to:
1. Create separate .gitignore files for frontend and backend
2. Add basic README.md files in each directory
3. Initialize the Git repository at the root level

This is the first step in my development checklist. After this is complete, we'll move to initializing the frontend and backend projects.
```

**✅ Mark as complete when**: Folder structure is created and Git is initialized

---

## ⚛️ **STEP 2: Initialize Frontend (React + TypeScript + Tailwind)**

**Status**: Waiting for Step 1  
**Task**: Setup React project with TypeScript, Tailwind CSS, and routing configuration

```
Great! Now let's move to the next task: "Initialize frontend (React + TypeScript + Tailwind)"

Based on my prompt.md specifications, please:

1. Setup Vite + React + TypeScript in the frontend/ directory
2. Install and configure Tailwind CSS
3. Install required dependencies: react-router-dom, axios, react-hook-form, joi
4. Setup the folder structure: components/, pages/, layouts/, hooks/, services/, utils/, types/, styles/
5. Configure TypeScript with strict mode
6. Setup basic routing structure with React Router DOM
7. Create initial layout components (AuthLayout, DashboardLayout) as placeholder files
8. Configure Vite dev server and build scripts

Follow the exact tech stack and dependencies listed in my prompt.md file.

Expected folder structure after completion:
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── types/
│   └── styles/
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

**✅ Mark as complete when**: Frontend project is initialized with all dependencies and folder structure

---

## ⚙️ **STEP 3: Initialize Backend (Node.js + TypeScript + MongoDB)**

**Status**: Waiting for Step 2  
**Task**: Setup Node.js backend with TypeScript, Express, MongoDB connection, and modular architecture

```
Perfect! Now let's initialize the backend: "Initialize backend (Node.js + TypeScript + MongoDB)"

Based on my specifications in prompt.md, please:

1. Setup Node.js + TypeScript in the backend/ directory
2. Install dependencies: express, mongoose, dotenv, cors, bcryptjs, jsonwebtoken, joi
3. Install dev dependencies: @types/node, @types/express, @types/cors, @types/bcryptjs, @types/jsonwebtoken, typescript, ts-node, nodemon
4. Configure TypeScript (tsconfig.json) with strict mode
5. Setup modular folder structure: controllers/, services/, models/, routes/, middleware/, utils/, types/, config/
6. Create basic Express server setup with CORS and JSON middleware
7. Setup MongoDB connection to localhost:27017/trading-ai
8. Create environment variables template (.env.example)
9. Setup development scripts in package.json

Follow the modular architecture specified in my prompt.md file.

Expected folder structure after completion:
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── types/
│   └── config/
├── .env.example
├── package.json
└── tsconfig.json
```

**✅ Mark as complete when**: Backend project is initialized with modular structure and MongoDB connection

---

## 🎨 **STEP 4: Create Authentication Pages (Frontend)**

**Status**: ✅ Complete  
**Task**: Develop signup, login, forgot password, and reset password pages

```
Now let's work on: "Create authentication pages (frontend)"

Create the following pages based on my specifications in prompt.md:

1. **Sign up page** with fields: firstName, lastName, email, password, confirmPassword
2. **Login page** with email, password, and "Forgot Password" link
3. **Forgot password page** with email input and clear instructions
4. **Reset password page** with new password form and token validation

Requirements:
- Use React Hook Form for form handling
- Implement Joi validation on the client side
- Use Tailwind CSS for responsive design
- Create reusable form components (Input, Button, FormField)
- Add loading states and error handling
- Use AuthLayout for all authentication pages
- Implement proper TypeScript interfaces for form data
- Add password strength validation for signup and reset forms
- Make forms responsive for mobile and desktop

Pages to create:
- src/pages/auth/SignUp.tsx
- src/pages/auth/Login.tsx
- src/pages/auth/ForgotPassword.tsx
- src/pages/auth/ResetPassword.tsx
- src/layouts/AuthLayout.tsx
- src/components/forms/ (reusable form components)

Refer to my prompt.md for detailed field specifications and validation rules.
```

**✅ Mark as complete when**: All authentication pages are created with form validation and responsive design

---

## 🔗 **STEP 5: Implement Authentication APIs (Backend)**

**Status**: Ready to start  
**Task**: Create user registration, login, forgot password, and reset password endpoints

```
Time for: "Implement authentication APIs (backend)"

Create the following endpoints with full implementation based on prompt.md specifications:

1. **POST /api/auth/register** - User registration
2. **POST /api/auth/login** - User login
3. **POST /api/auth/forgot-password** - Password reset request
4. **POST /api/auth/reset-password** - Password reset with token
5. **GET /api/auth/profile** - Get user profile (protected route)

Requirements:
- Create User model with MongoDB schema (firstName, lastName, email, password, etc.)
- Create PasswordResetToken model for forgot password functionality
- Implement JWT token generation and validation middleware
- Use bcryptjs for password hashing with salt rounds
- Add Joi validation for all input data
- Implement proper error handling and HTTP status codes
- Use modular structure: separate controllers, services, models, routes
- Add rate limiting for authentication endpoints
- Implement secure password reset workflow (30-minute token expiration)

Files to create:
- src/models/User.ts
- src/models/PasswordResetToken.ts
- src/controllers/authController.ts
- src/services/authService.ts
- src/routes/authRoutes.ts
- src/middleware/authMiddleware.ts
- src/utils/tokenUtils.ts

Follow the exact API specifications and security guidelines in my prompt.md file.
```

**✅ Mark as complete when**: All authentication APIs are implemented with proper validation and security

---

## 🔌 **STEP 6: Integrate Frontend with Backend APIs**

**Status**: Waiting for Step 5  
**Task**: Connect frontend authentication forms with backend APIs

```
Let's integrate everything: "Integrate frontend with backend APIs"

Connect the frontend authentication forms with the backend APIs:

1. **Setup Axios configuration** with base URL and interceptors
2. **Create API service functions** for all auth endpoints
3. **Implement JWT token storage** using localStorage/sessionStorage
4. **Connect all forms** to their respective APIs:
   - Signup form → /api/auth/register
   - Login form → /api/auth/login
   - Forgot password form → /api/auth/forgot-password
   - Reset password form → /api/auth/reset-password
5. **Add proper error handling** and success feedback with toast notifications
6. **Setup protected routes** that require authentication
7. **Implement logout functionality** with token cleanup
8. **Create authentication context** for managing auth state
9. **Add loading states** for all API calls
10. **Handle token expiration** with automatic logout

Files to create/update:
- src/services/api.ts (Axios configuration)
- src/services/authService.ts (API calls)
- src/contexts/AuthContext.tsx (Auth state management)
- src/hooks/useAuth.ts (Auth hook)
- src/components/ProtectedRoute.tsx
- Update all authentication pages with API integration

Test the complete authentication flow end-to-end to ensure everything works.
```

**✅ Mark as complete when**: Frontend and backend are fully integrated with working authentication flow

---

## 📊 **STEP 7: Create Dashboard Layout and Routing**

**Status**: Waiting for Step 6  
**Task**: Build dashboard with sidebar, top navigation, and content area

```
Final step: "Create dashboard layout and routing"

Create the dashboard with complete layout and navigation:

1. **DashboardLayout component** with sidebar and top navigation
2. **Sidebar navigation** with items:
   - Dashboard overview
   - Trading tools (placeholder)
   - Portfolio (placeholder)
   - Settings
   - Logout functionality
3. **Top navigation** with:
   - App logo/title
   - User avatar and name
   - Notifications icon (placeholder)
   - User profile dropdown menu
4. **Main content area** with:
   - Welcome message with user's name
   - Summary cards with placeholder data
   - Recent activity section
   - Quick actions buttons
5. **Responsive design** that works on mobile with hamburger menu
6. **Protected routing** that redirects to login if not authenticated
7. **Different layout** from authentication pages as specified

Components to create:
- src/layouts/DashboardLayout.tsx
- src/components/dashboard/Sidebar.tsx
- src/components/dashboard/TopNav.tsx
- src/components/dashboard/UserDropdown.tsx
- src/pages/dashboard/Dashboard.tsx
- src/pages/dashboard/Settings.tsx

Features to implement:
- Mobile-responsive sidebar that collapses
- User profile display with data from API
- Logout functionality that clears tokens
- Navigation between dashboard pages
- Loading states for dashboard data

Make sure the dashboard layout is completely different from the authentication layout as specified in prompt.md.
```

**✅ Mark as complete when**: Dashboard is fully functional with responsive design and proper navigation

---

## 🎯 **Development Guidelines**

### **How to Use These Prompts:**

1. **One at a time**: Complete each step fully before moving to the next
2. **Copy and paste**: Use these prompts exactly as written with any AI coding agent
3. **Test thoroughly**: Test each component/API endpoint as it's created
4. **Follow specifications**: Always refer back to prompt.md for exact requirements
5. **Update tracking**: Mark tasks as completed in tracking-information.md
6. **Ask for help**: If something isn't working, ask the AI to debug or explain

### **Before You Start:**

- Ensure MongoDB is running on localhost:27017
- Have your code editor ready
- Keep prompt.md and tracking-information.md files open for reference

### **After Each Step:**

- Test the functionality you just built
- Update your tracking-information.md file
- Move to the next prompt only when current step is complete

---

**🚀 Ready to start? Use STEP 1 prompt above to begin development!**
