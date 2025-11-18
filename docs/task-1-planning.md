# Task 1: Project Planning & Design  
## Project: **JobHub Youth – Gig & Job Matching Platform**

---

## 1. Problem Statement  
Young people in many communities struggle to find part-time jobs, gigs, internships, or entry-level roles. Employers also struggle to reach local youth with the right skillset. Existing job platforms are often too broad, complicated, or not optimized for youths and local gig-type work.

**JobHub Youth** solves this by providing a simple, modern platform that connects youth job seekers with local employers offering gigs, temporary roles, and part-time jobs.

---

## 2. Solution Overview  
JobHub Youth is a full-stack MERN application designed to:

- Help young job seekers create profiles and browse local job opportunities  
- Allow employers to post job openings and manage applications  
- Provide a clean, mobile-friendly interface  
- Offer dashboards for both youth and employers  
- Support authentication, role-based access, and application tracking  

---

## 3. Target Users  
### 🎯 Youth Job Seekers  
- Students  
- Fresh graduates  
- People seeking part-time/side gigs  

### 🏢 Employers  
- Small businesses  
- Individuals offering tasks/gigs  
- Startups looking for junior talent  

---

## 4. Wireframes (Text-Based Outline)  
### Home Page  
- Hero section with CTA  
- Featured jobs  
- Navigation header  

### Login / Register  
- Youth login  
- Employer login  
- Simple forms with validation  

### Jobs Page  
- List of available jobs  
- Search + filter  
- Job cards  

### Job Details  
- Job title, description, pay, tags  
- Apply button  
- Employer details  

### Dashboards  
**Youth:**  
- Profile overview  
- Applications list  
- Saved jobs (optional)  

**Employer:**  
- Posted jobs  
- Applicants list  
- Ability to update job status  

---

## 5. Database Schema & Relationships  

### **User Model**  
```
User {
  _id: ObjectId
  name: String
  email: String
  password: String (hashed)
  role: "youth" | "employer"
  createdAt
}
```

### **Job Model**  
```
Job {
  _id: ObjectId
  employerId: ObjectId (ref: User)
  title: String
  description: String
  category: String
  location: String
  salary: Number
  requirements: [String]
  createdAt
}
```

### **Application Model**  
```
Application {
  _id: ObjectId
  jobId: ObjectId (ref: Job)
  jobSeekerId: ObjectId (ref: User)
  status: "pending" | "reviewed" | "accepted" | "rejected"
  createdAt
}
```

### Relationships  
- **User (employer)** → can create → many jobs  
- **User (youth)** → can apply to → many jobs  
- **Job** → has → many applications  

---

## 6. API Endpoints & Data Flow  

### **Auth Routes**
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### **Jobs**
```
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs        (employer only)
PUT    /api/jobs/:id    (employer only)
DELETE /api/jobs/:id    (employer only)
```

### **Applications**
```
POST   /api/applications
GET    /api/applications/user       (youth only)
GET    /api/applications/employer   (employer only)
PUT    /api/applications/:id/status (employer only)
```

### Data Flow Example  
1. Youth registers → receives token  
2. Youth browses jobs → GET /jobs  
3. Youth applies → POST /applications  
4. Employer views applicants → GET /applications/employer  
5. Employer updates status → PUT /applications/:id/status  

---

## 7. Project Roadmap (Milestones)

### **Phase 1: Planning & Setup**  
- Project initialization  
- Folder structure  
- Environment variables  
- MongoDB setup  

### **Phase 2: Backend Development**  
- Models  
- Auth  
- Jobs API  
- Applications API  
- Middleware  

### **Phase 3: Frontend Development**  
- Next.js pages  
- UI components  
- Auth pages  
- Jobs + Details page  
- Dashboards  

### **Phase 4: Testing & Optimization**  
- Backend tests  
- Frontend tests  
- Accessibility  
- Performance  

### **Phase 5: Deployment**  
- Backend → Render  
- Frontend → Vercel  
- Final documentation  
- Demo video  

---

## 8. Technical Architecture Decisions  

### **Frontend:**  
- **Next.js 14** for routing & performance  
- **TailwindCSS** for fast styling  
- **Framer Motion** (optional) for animations  
- **Context API / hooks** for theme + auth state  

### **Backend:**  
- **Node.js + Express** RESTful API  
- **TypeScript** for type safety  
- **JWT Authentication** (httpOnly cookies)  
- **bcryptjs** for password hashing  
- **Mongoose** for ODM  

### **Database:**  
- **MongoDB Atlas** cloud database  

### **Deployment:**  
- **Render** for backend  
- **Vercel** for frontend  

### **Reasoning:**  
- MERN stack is ideal for full-stack JavaScript learning  
- Next.js provides SEO, server-side rendering, and better structure  
- Tailwind speeds up UI building  
- MongoDB handles flexible job + application data  
- Render + Vercel give free hosting tiers  

---
