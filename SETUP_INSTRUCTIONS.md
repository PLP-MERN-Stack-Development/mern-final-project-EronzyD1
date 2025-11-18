# JobHub Youth - Complete Setup Guide 🚀

## Overview

JobHub Youth is a modern full-stack web application connecting young job-seekers with local gig opportunities. Built with Next.js 14, Express, MongoDB, featuring beautiful animations and light/dark mode.

## 📋 Prerequisites

- Node.js 18 or higher
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## 🚀 Quick Start

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
copy env.example.txt .env

# Edit .env and add your MongoDB connection string
# For local MongoDB: mongodb://localhost:27017/jobhub-youth
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/jobhub-youth

# Start the development server
npm run dev

# In a new terminal, seed the database
npm run seed
```

**Important Environment Variables:**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Step 2: Frontend Setup

```bash
# Navigate to frontend folder
cd ../frontend

# Install dependencies
npm install

# Create environment file
copy env.local.example.txt .env.local

# Edit .env.local and ensure API URL is set
NEXT_PUBLIC_API_URL=http://localhost:5000

# Start the development server
npm run dev
```

### Step 3: Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🗄️ Database Seed Data

The seed script creates:
- ✅ 1 Admin user
- ✅ 3 Employer users
- ✅ 5 Job Seeker users
- ✅ 10 Active job postings
- ✅ 15 Job applications

## 🔑 Test Credentials

### Admin Account
- Email: `admin@jobhub.com`
- Password: `admin123`

### Employer Account
- Email: `employer1@example.com`
- Password: `password123`

### Job Seeker Account
- Email: `seeker1@example.com`
- Password: `password123`

## 📁 Project Structure

```
jobhub-youth/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── middleware/   # Auth middleware
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── seed/         # Seed script
│   ├── package.json
│   └── README.md
│
├── frontend/             # Next.js application
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities & API client
│   ├── package.json
│   └── README.md
│
└── README.md             # Main documentation
```

## 🎯 Features Implemented

### ✅ User Authentication
- Registration (Job Seeker & Employer)
- Login/Logout
- JWT-based authentication with httpOnly cookies
- Role-based access control

### ✅ Job Seeker Features
- Profile management (skills, bio, portfolio link)
- Browse all job postings
- Apply for jobs
- View application status
- Personalized dashboard

### ✅ Employer Features
- Post new job listings
- View applicants for their jobs
- Update application statuses
- Manage posted jobs

### ✅ UI/UX Features
- Sleek, modern design
- Light/Dark mode toggle
- Smooth animations with Framer Motion
- Fully responsive (desktop, tablet, mobile)
- Eye-catching dashboards
- Professional color scheme

## 🔧 Available Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run seed     # Seed the database
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

## 🎨 Key Pages

- `/` - Homepage with hero section
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Job Seeker dashboard
- `/jobs` - Browse all jobs
- `/profile` - User profile management

## 🐛 Troubleshooting

### Backend won't start
1. Check MongoDB is running
2. Verify environment variables in `.env`
3. Ensure port 5000 is not in use

### Frontend won't start
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Ensure backend is running on the correct port
3. Clear `.next` folder and restart

### Database connection error
1. Verify MongoDB connection string
2. Check network connectivity (for Atlas)
3. Ensure MongoDB server is running (for local)

## 📝 Next Steps

1. Start both servers (backend and frontend)
2. Visit http://localhost:3000
3. Register a new account or use test credentials
4. Explore the features!

## 🎓 For Your Graduation Demo

This application is ready for demonstration:
- ✅ Complete authentication system
- ✅ Role-based dashboards
- ✅ Job posting and application flow
- ✅ Beautiful, modern UI with animations
- ✅ Fully responsive design
- ✅ Light/Dark mode
- ✅ Comprehensive seed data for demo

**Perfect for showcasing:**
- Modern full-stack development
- Database design and management
- Authentication and authorization
- API development
- React/Next.js expertise
- UI/UX design skills

Good luck with your graduation project! 🎓✨


