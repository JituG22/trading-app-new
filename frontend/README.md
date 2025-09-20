# Trading App Frontend

This is the React TypeScript frontend for the Trading App project.

## Tech Stack
- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router DOM for routing
- React Hook Form for form handling
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure
```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── layouts/         # Layout components (Auth, Dashboard)
├── hooks/           # Custom React hooks
├── services/        # API service functions
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
└── styles/          # Global styles and Tailwind config
```

## Features
- User authentication (signup, login, forgot/reset password)
- Protected routes
- Responsive dashboard with sidebar navigation
- Form validation with real-time feedback
- Loading states and error handling

## Development
This frontend connects to the Node.js backend API running on http://localhost:5000

## Documentation
See the main project documentation in the root directory for complete specifications.