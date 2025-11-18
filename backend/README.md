# JobHub Youth - Backend

Express.js API with MongoDB, JWT authentication, and comprehensive job management features.

## 🚀 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Seed database (in another terminal):**
   ```bash
   npm run seed
   ```

## 📝 Environment Variables

Create a `.env` file with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobhub-youth
JWT_SECRET=your_super_secret_jwt_key
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

### Jobs
- `POST /api/jobs` - Create job (Employer)
- `GET /api/jobs` - Get all active jobs
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job (Employer)
- `DELETE /api/jobs/:id` - Delete job (Employer)
- `GET /api/jobs/my-jobs/list` - Get employer's jobs
- `GET /api/jobs/:id/applicants` - Get applicants

### Applications
- `POST /api/applications` - Apply for job (Job Seeker)
- `GET /api/applications/my-applications/list` - Get my applications
- `PATCH /api/applications/:id/status` - Update status (Employer)

## 🗄️ Database Models

- **User**: Job seekers, employers, and admin users
- **Job**: Job postings with requirements and details
- **Application**: Job applications with status tracking

## 🎯 Features

- JWT-based authentication with httpOnly cookies
- Role-based access control (Job Seeker, Employer, Admin)
- Comprehensive API for job management
- Applicant tracking and status updates
- Input validation and error handling


