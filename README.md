# QuestSearch 🔍

A modern fullstack application for searching questions, built with React and Node.js.

## 🌟 Features

- Real-time question search functionality
- MongoDB integration for data persistence
- Responsive and modern UI
- Pagination support
- Sorting and filtering options
- Type-safe implementation with TypeScript

## 🛠 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm package manager

## 🚀 Quick Start

### Environment Setup

1. Clone the repository
```bash
git clone https://github.com/vansh-codes/QuestSearch.git
cd quest-search
```

2. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Configure environment variables

Frontend (`client/.env`):
```env
VITE_API_URL=http://localhost:3000
```

Backend (`server/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/questsearch
PORT=3000
```

## 📡 API Endpoints

### Frontend
- Development: `http://localhost:5173`
- Production: `https://questssearch.vercel.app`

### Backend
- express Server: `http://localhost:3000`
- Production: `https://questsearchbackend.vercel.app/`

## 🔧 Available Scripts

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Serve production build
- `npm run lint`: Run linter
- `npm run format`: Format code using prettier

### Backend

- `npm run dev`: Start development server
- `npm run build`: Build for production

## 🔍 Monitoring

The application includes built-in monitoring capabilities:

- Health check endpoint: `https://questsearchbackend.vercel.app/api/health`
- React Query DevTools (development mode only)

## Local Testing

Build and run client and server individually:

```bash
# Backend
cd server
npm run dev
open http://localhost:3000

# Frontend
cd client
npm run dev
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

<p align="center">Made with ❤️</p>
