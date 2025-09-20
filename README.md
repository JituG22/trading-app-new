# Trading App

A full-stack trading application built with React TypeScript frontend and Node.js TypeScript backend.

## Project Structure

```
trading-app-new/
├── frontend/                 # React TypeScript app
├── backend/                  # Node.js TypeScript API
├── docs/                     # Additional documentation
├── prompt.md                 # Enhanced development prompt
├── tracking-information.md   # Project tracking and task management
└── development-prompts.md    # Step-by-step development prompts
```

## Tech Stack

### Frontend

- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router DOM for routing
- React Hook Form for form handling
- Axios for API calls

### Backend

- Node.js with TypeScript
- Express.js web framework
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Joi for validation

## Features

### Authentication System

- ✅ User registration with email/password
- ✅ User login with JWT tokens
- ✅ Forgot password functionality
- ✅ Password reset with secure tokens
- ✅ Protected routes and middleware

### Dashboard

- ✅ Responsive dashboard layout
- ✅ Sidebar navigation
- ✅ Top navigation with user profile
- ✅ Mobile-friendly design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB running on localhost:27017
- Git

### Development Setup

1. **Clone and setup project structure** ✅ COMPLETED
2. **Initialize frontend** (Next: Copy Step 2 prompt from development-prompts.md)
3. **Initialize backend** (Next: Copy Step 3 prompt from development-prompts.md)
4. **Create authentication pages** (Next: Copy Step 4 prompt)
5. **Implement backend APIs** (Next: Copy Step 5 prompt)
6. **Integrate frontend with backend** (Next: Copy Step 6 prompt)
7. **Create dashboard** (Next: Copy Step 7 prompt)

## Documentation

- **📋 development-prompts.md** - Step-by-step development prompts
- **📖 prompt.md** - Enhanced technical specifications
- **📊 tracking-information.md** - Project tracking and progress
- **📁 frontend/README.md** - Frontend-specific documentation
- **📁 backend/README.md** - Backend-specific documentation

## Development Workflow

Use the prompts in `development-prompts.md` file with any AI coding agent to build this project step by step. Each prompt is designed to be self-contained and will guide the development process.

## Database

- **Database Name**: trading-ai
- **Connection**: mongodb://localhost:27017/trading-ai
- **Collections**: users, passwordresettokens

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/profile` - Get user profile (protected)

## Current Status

✅ **Step 1 Complete**: Project structure setup with Git initialization

**Next Step**: Copy Step 2 prompt from `development-prompts.md` to initialize the frontend React project.

---

_Built with comprehensive planning and step-by-step development approach._
