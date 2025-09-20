# Trading App Backend

This is the Node.js TypeScript backend API for the Trading App project.

## Tech Stack
- Node.js with TypeScript
- Express.js web framework
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Joi for validation

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running on localhost:27017
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## Project Structure
```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── types/           # TypeScript interfaces
└── config/          # Database and app configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/profile` - Get user profile (protected)

## Database
- **Database**: trading-ai
- **Connection**: mongodb://localhost:27017/trading-ai
- **Models**: User, PasswordResetToken

## Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Input validation with Joi
- CORS configuration
- Rate limiting for auth endpoints

## Documentation
See the main project documentation in the root directory for complete specifications.