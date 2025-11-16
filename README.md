# StudyTrackr

A modern, full-stack task management system built with MERN stack for students, teachers, and principals with comprehensive role-based access control.

## 📋 Overview

StudyTrackr is an educational task management platform designed to streamline task assignment, tracking, and monitoring between students and teachers. The system enforces strict role-based permissions to ensure data security and proper workflow management.

### Core Features

- **Student Role** 
  - Create, read, update, and delete personal tasks
  - Filter tasks by progress status (not-started, in-progress, completed)
  - View assigned teacher information
  - Track task progress with visual indicators
  - Secure authentication with JWT tokens

- **Teacher Role** 
  - Create and manage personal tasks
  - View tasks from assigned students (read-only)
  - Monitor student progress across all assigned students
  - Filter tasks by ownership (My Tasks / Student Tasks) and progress
  - Cannot modify or delete student-created tasks
  - View list of assigned students

- **Principal Role** (Optional Feature)
  - Create and manage teacher accounts
  - View all teachers in the system
  - Cannot access task management features 

- **System Features**
  - JWT-based authentication with secure token storage
  - Role-based routing and access control
  - Responsive UI built with Tailwind CSS
  - Real-time error handling with user-friendly notifications
  - RESTful API architecture
  - MongoDB database with Mongoose ODM

## 🏗️ Architecture

### MERN Stack Architecture

```mermaid
flowchart LR

  A[React Frontend - Vite & Tailwind] -->|HTTP Requests| B[Express Backend - Node.js]

  B -->|Queries| C[(MongoDB Database)]



  A --> A1[AuthContext]

  A --> A2[Role Based Routing]



  B --> B1[Auth Middleware]

  B --> B2[Task Controller]

  B --> B3[User Controller]



  C --> C1[Users Collection]

  C --> C2[Tasks Collection]
```

### Authentication Flow (JWT)

```mermaid
sequenceDiagram
  participant U as User
  participant F as Frontend
  participant B as Backend
  participant DB as MongoDB

  U->>F: Enter email/password
  F->>B: POST /auth/login
  B->>DB: Verify user + password
  DB-->>B: Valid user
  B-->>F: Return JWT Token + User Info
  F->>F: Save token in localStorage (AuthContext)

  U->>F: Access protected route
  F->>B: GET /tasks (Authorization: Bearer TOKEN)
  B->>B: Validate token (auth middleware)
  B->>DB: Fetch tasks based on role
  DB-->>B: Return tasks
  B-->>F: Send tasks
```

### Role-Based Access Control Flow

```mermaid
flowchart TD
    A[User Login] -->|JWT Token| B[Authenticate Middleware]
    B -->|Valid Token| C[Extract User Role]
    C -->|student| D[Student Dashboard]
    C -->|teacher| E[Teacher Dashboard]
    C -->|principal| F[Principal Dashboard]
    
    D -->|GET /tasks| G[Filter: userId = student.id]
    E -->|GET /tasks| H[Filter: userId = teacher.id OR<br/>userId IN assignedStudentIds]
    
    I[Update/Delete Task] -->|Check Ownership| J{Is Owner?}
    J -->|Yes| K[Allow Operation]
    J -->|No| L[403 Forbidden]
```

## 📁 Project Structure

```
StudyTrackr/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth, Toast)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── styles/         # Global styles & theme
│   └── package.json
│
├── server/                 # Node.js backend application
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Auth & error middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API route definitions
│   │   └── utils/          # Validators & constants
│   └── package.json
│
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StudyTrackr
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb://localhost:27017/studytrackr
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Frontend Environment Variables

Create a `.env` file in the `client/` directory (if using custom API URL):

```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** The default API URL is `http://localhost:5000/api` (configured in `client/src/services/api.js`).

### Running the Application

1. **Start the MongoDB server** (if using local MongoDB)
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm run dev    # Development mode with auto-reload
   # or
   npm start      # Production mode
   ```

3. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

## 🚀 Deployment on Render

### Prerequisites

- GitHub repository with your code
- MongoDB Atlas account (for production database)
- Render account (free tier available)

### Step 1: Prepare MongoDB Atlas

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0)
3. Create a database user
4. Whitelist IP addresses (use `0.0.0.0/0` for Render)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/studytrackr`

### Step 2: Deploy Backend

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** `studytrackr-backend`
   - **Environment:** `Node`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `NODE_ENV` = `production`
   - `PORT` = `5000` (Render sets this automatically, but good to have)
6. Click **"Create Web Service"**
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://studytrackrbackend.onrender.com`)

**Note:** Your backend URL is `https://studytrackrbackend.onrender.com`

### Step 3: Deploy Frontend

1. In Render Dashboard, click **"New +"** → **"Static Site"** (NOT Web Service)
2. Connect the same GitHub repository
3. Configure the service:
   - **Name:** `studytrackr-frontend`
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://studytrackrbackend.onrender.com/api`
   
   **Note:** This is already configured in the code, but you can override it with environment variable if needed.

5. **Configure Routing (CRITICAL - Required for React Router):**
   - After creating the static site, go to **Settings** → **Redirects and Rewrites** section
   - Click **"Add Redirect"** or **"Add Rewrite"**
   - Configure as follows:
     - **Type:** Rewrite (NOT Redirect)
     - **Source Path:** `/*` (matches all paths)
     - **Destination Path:** `/index.html`
     - **Status Code:** `200` (NOT 301 or 302)
   - Click **"Save"**
   - This ensures React Router handles all routes client-side
   
   **Why this is needed:** When you refresh `/home` or `/student/dashboard`, Render tries to find a file at that path. Without this rewrite, you get a 404. With it, Render serves `index.html` and React Router handles the routing.

6. Click **"Create Static Site"** (or save if editing)
7. Wait for deployment to complete

### Step 4: Update CORS Configuration

After deploying frontend, update backend environment variable:

**Backend Environment Variable:**
- `FRONTEND_URL` = `https://studytrackr-5ckd.onrender.com`

**Note:** The CORS configuration is already set up to accept requests from the deployed frontend URL. Just set the `FRONTEND_URL` environment variable in Render dashboard.

### Environment Variables Summary

**Backend (.env):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studytrackr
JWT_SECRET=your-generated-secret-key
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://studytrackr-5ckd.onrender.com
```

**Frontend (.env) - Optional (defaults to production URL):**
```env
# For local development:
VITE_API_URL=http://localhost:5000/api

# Production (already set as default):
VITE_API_URL=https://studytrackrbackend.onrender.com/api
```

### Alternative: Using render.yaml

If you prefer infrastructure as code, use the provided `render.yaml` file:

1. Push `render.yaml` to your repository root
2. In Render Dashboard, click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will automatically detect and configure services from `render.yaml`

### Post-Deployment Checklist

- [ ] Backend is accessible at `https://studytrackrbackend.onrender.com/api/health`
- [ ] Frontend environment variable `VITE_API_URL` points to backend
- [ ] MongoDB Atlas cluster is accessible from Render
- [ ] CORS is configured correctly
- [ ] Test login/signup functionality
- [ ] Test task CRUD operations
- [ ] Verify JWT tokens are working

### Troubleshooting

**Issue: Backend won't start**
- Check MongoDB connection string
- Verify all environment variables are set
- Check Render logs for errors

**Issue: Frontend can't connect to backend**
- Verify `VITE_API_URL` is set correctly
- Check CORS configuration
- Ensure backend URL includes `/api` at the end

**Issue: 401 Unauthorized errors**
- Verify JWT_SECRET is set in backend
- Check token is being sent in Authorization header
- Verify token expiration settings

## 👥 User Flow

### Role-Based Navigation

```mermaid
flowchart TD

  Start([Visit Website]) --> Login[Login Page]



  Login -->|Valid Student| SD[Student Dashboard]

  Login -->|Valid Teacher| TD[Teacher Dashboard]

  Login -->|Valid Principal| PD[Principal Dashboard]



  SD --> S1[View Own Tasks]

  SD --> S2[Create Task]

  SD --> S3[Update/Delete Task]



  TD --> T1[View Own Tasks]

  TD --> T2[View Student Tasks]

  TD --> T3[Cannot Edit/Delete Student Tasks]



  PD --> P1[Create Teachers]

  PD --> P2[Manage Teachers]
```

## 🎯Compliance

✅ **Students must provide `teacherId` at signup**  
✅ **Students can only access their own tasks**  
✅ **Teachers can view tasks of assigned students + their own**  
✅ **Teachers can update/delete only tasks they created**  
✅ **Principals cannot touch tasks** (Optional feature properly isolated)



## 📸 Screenshots

### Welcome Screen
<img src="screenshots/welcome-screen.png" alt="Welcome Screen" width="600" />

### Login Page
<img src="screenshots/login-page.png" alt="Login Page" width="600" />

### Registration Page
<img src="screenshots/register-page.png" alt="Registration Page" width="600" />

### Student Dashboard
<img src="screenshots/student-dashboard.png" alt="Student Dashboard" width="600" />

### Teacher Dashboard
<img src="screenshots/teacher-dashboard.png" alt="Teacher Dashboard" width="600" />

## 🎥 Video Walkthrough

_Placeholder for video walkthrough demonstrating:_

1. **Login as Student**
   - Student registration with teacher selection
   - Student login flow
   - Student dashboard features (CRUD operations)
   - Task filtering by progress

2. **Login as Teacher**
   - Teacher registration
   - Teacher login flow
   - Teacher dashboard features
   - Viewing student tasks (read-only)
   - Managing own tasks

3. **Restricted Task Visibility**
   - Students can only see their own tasks
   - Teachers can see assigned student tasks
   - Ownership validation demonstration

4. **CRUD Demonstration**
   - Create task
   - Update task progress
   - Delete task
   - Authorization errors (403) for unauthorized operations

5. **Code Walkthrough**
   - Authentication middleware
   - Role-based access control logic
   - Teacher-student relationship implementation
   - Task filtering logic per role

## 📚 Documentation

- **[Backend Documentation](./server/README.md)** - Complete API documentation, database schemas, and backend setup
- **[Frontend Documentation](./client/README.md)** - React components, routing, and frontend architecture

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **express-validator** - Input validation

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (salt rounds: 10)
- Role-based authorization middleware
- Protected API routes
- CORS configuration
- Input validation with express-validator
- Secure token storage in localStorage
- Auto-logout on token expiration

## 📝 API Documentation

See [Backend README](./server/README.md) for complete API documentation including:

- Authentication endpoints
- Task CRUD operations
- Role-based access rules
- Request/response formats
- Error handling

##  License

This project is created for educational purposes as part of an academic.

## AI Usage Acknowledgment

Some parts of this project were developed with assistance from AI tools for UI design ideas, boilerplate code, and documentation. All core logic and architecture were implemented manually.

AI was used only for non-critical areas like UI design inspiration, writing helper boilerplate, and improving documentation clarity.

All core logic—including authentication, authorization, role-based access control, task management, backend API structure, database models, and frontend integration—was written, designed, and implemented manually.

AI assistance was used as a productivity helper, not as a substitute for development effort.

---

**Built with  for modern education**
