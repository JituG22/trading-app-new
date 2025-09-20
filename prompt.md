# Enhanced Trading App Development Prompt

## Project Overview

Develop a full-stack trading application with user authentication and a dashboard interface.

## Tech Stack

### Frontend

- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API / React Query (for API state)
- **Form Handling**: React Hook Form
- **Validation**: Client-side validation with Joi/Yup
- **HTTP Client**: Axios
- **Build Tool**: Vite (recommended for speed)

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (localhost:27017)
- **Database Name**: trading-ai
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv
- **CORS**: cors middleware

## Project Structure

```
trading-app-new/
├── frontend/                 # React TypeScript app
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components (Auth, Dashboard)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service functions
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── styles/          # Global styles and Tailwind config
│   ├── public/
│   └── package.json
├── backend/                  # Node.js TypeScript API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript interfaces
│   │   └── config/          # Database and app configuration
│   ├── .env                 # Environment variables
│   └── package.json
├── docs/                     # Project documentation
└── README.md
```

## Core Features to Implement

### 1. User Authentication System

- **Sign Up Page**

  - Fields: First Name, Last Name, Email, Password, Confirm Password
  - Client-side validation with real-time feedback
  - Email format validation
  - Password strength requirements
  - Responsive design with Tailwind CSS

- **Login Page**

  - Fields: Email, Password
  - "Remember Me" option
  - "Forgot Password" link
  - Form validation and error handling

- **Forgot Password Page**

  - Email input field for password reset request
  - Clear instructions for user
  - Email validation and submission feedback
  - Link back to login page

- **Reset Password Page**

  - New password and confirm password fields
  - Password strength validation
  - Token validation from URL parameters
  - Success/error handling

- **JWT Implementation**
  - Generate JWT tokens on successful authentication
  - Include user ID and email in token payload
  - Set appropriate expiration time (e.g., 24 hours)
  - Implement token refresh mechanism

### 2. Backend API Architecture

- **Modular Structure**

  - Separate controllers, services, models, and routes
  - Clear separation of concerns
  - Error handling middleware
  - Request validation middleware

- **Authentication Endpoints**
  - POST /api/auth/register - User registration
  - POST /api/auth/login - User login
  - POST /api/auth/refresh - Token refresh
  - GET /api/auth/profile - Get user profile (protected)
  - POST /api/auth/forgot-password - Request password reset
  - POST /api/auth/reset-password - Reset password with token

### 3. Database Design

- **User Model (MongoDB)**

  ```typescript
  interface User {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // hashed
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  }
  ```

- **Password Reset Token Model (MongoDB)**
  ```typescript
  interface PasswordResetToken {
    _id: ObjectId;
    userId: ObjectId;
    token: string; // hashed
    expiresAt: Date;
    used: boolean;
    createdAt: Date;
  }
  ```

### 4. Frontend Layouts

- **Authentication Layout**

  - Simple, centered design
  - Clean background
  - Minimal navigation
  - Responsive for mobile/desktop

- **Dashboard Layout**
  - Left sidebar navigation
  - Top navigation bar
  - Main content area
  - Responsive design with mobile hamburger menu
  - User profile dropdown in top nav

### 5. Dashboard Components

- **Sidebar Navigation**

  - Dashboard overview
  - Trading tools (placeholder)
  - Portfolio (placeholder)
  - Settings
  - Logout functionality

- **Top Navigation**

  - App logo/title
  - User avatar and name
  - Notifications icon (placeholder)
  - User dropdown menu

- **Content Area**
  - Welcome message
  - Summary cards (placeholder data)
  - Recent activity section
  - Quick actions buttons

### 6. Password Reset Workflow

#### Backend Implementation

1. **Forgot Password Request**

   - Generate secure random token (crypto.randomBytes)
   - Hash token before storing in database
   - Set expiration time (15-30 minutes)
   - Store in PasswordResetToken collection
   - Send email with reset link (for now, log to console)

2. **Reset Password Verification**
   - Validate token from URL parameter
   - Check token expiration
   - Verify token hasn't been used
   - Allow user to set new password

#### Frontend Implementation

1. **Forgot Password Page**

   - Simple email input form
   - Clear instructions and feedback
   - Email validation
   - Success message with next steps

2. **Reset Password Page**
   - Extract token from URL parameters
   - Password and confirm password fields
   - Password strength indicator
   - Form validation and submission
   - Redirect to login on success

#### Security Considerations

- Tokens expire after 30 minutes
- Tokens are single-use only
- Rate limiting on forgot password requests
- Clear tokens after successful reset
- Hash tokens in database storage

## Development Guidelines

### Security Best Practices

1. Hash passwords using bcryptjs with salt rounds
2. Validate all inputs on both client and server
3. Implement CORS properly
4. Use environment variables for sensitive data
5. Add rate limiting for authentication endpoints
6. Sanitize user inputs to prevent XSS

### Code Quality Standards

1. Use TypeScript strict mode
2. Implement proper error handling
3. Add loading states for async operations
4. Use consistent naming conventions
5. Add proper commenting for complex logic
6. Implement proper logging for debugging

### API Response Format

```typescript
// Success Response
{
  success: true,
  data: any,
  message?: string
}

// Error Response
{
  success: false,
  error: string,
  details?: any
}
```

### Development Workflow

1. Set up project structure and dependencies
2. Configure development environment
3. Implement backend authentication system
4. Create frontend authentication pages
5. Integrate frontend with backend APIs
6. Implement dashboard layout and basic components
7. Add proper error handling and loading states
8. Test authentication flow end-to-end

## Environment Variables (Backend)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trading-ai
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=12
```

## Getting Started Commands

### Backend Setup

```bash
cd backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken joi
npm install -D @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken typescript ts-node nodemon
npx tsc --init
```

### Frontend Setup

```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install tailwindcss react-router-dom axios react-hook-form @hookform/resolvers joi
npx tailwindcss init -p
```

This enhanced prompt provides a comprehensive roadmap for building your trading application with modern best practices and a clear development path.
