# StudyTrackr

A task management system for students, teachers, and principals with role-based access control.

## Backend

### Tech Stack

- **Node.js** with **Express.js** (MVC architecture)
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-validator** for input validation

### Project Structure

```
server/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Auth & error middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   └── utils/            # Constants & validators
├── .env.example          # Environment variables template
└── package.json
```

### Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `server/` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/studytrackr
   JWT_SECRET=your-secret-key-here
   PORT=5000
   NODE_ENV=development
   ```
   
   **Note:** Generate a strong JWT_SECRET:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Start the server:**
   ```bash
   npm run dev    # Development mode with nodemon
   npm start      # Production mode
   ```

### API Endpoints

#### Authentication

- `POST /api/auth/signup` - Register a new user
  - **Body:** `{ name, email, password, role, teacherId? }`
  - **Rules:** Students must provide `teacherId`
  
- `POST /api/auth/login` - Login user
  - **Body:** `{ email, password }`
  - **Returns:** JWT token + user data

#### Tasks (Protected)

- `GET /api/tasks` - Get tasks
  - **Students:** Only their own tasks
  - **Teachers:** Their tasks + tasks from assigned students
  - **Principals:** Not allowed

- `POST /api/tasks` - Create a task
  - **Body:** `{ title, description?, dueDate?, progress? }`
  - **Rules:** `userId` is automatically set to logged-in user
  - **Progress:** `"not-started" | "in-progress" | "completed"`

- `PUT /api/tasks/:id` - Update a task
  - **Students:** Can update only their own tasks
  - **Teachers:** Can update only tasks they created

- `DELETE /api/tasks/:id` - Delete a task
  - **Students:** Can delete only their own tasks
  - **Teachers:** Can delete only tasks they created

#### Principal Routes (Principal Only)

- `POST /api/principal/teachers` - Create a teacher account
  - **Body:** `{ name, email, password }`

- `GET /api/principal/teachers` - View all teachers

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Role-Based Access Control

#### Students
- Must provide `teacherId` at signup
- Can only view/manage their own tasks

#### Teachers
- Can view their own tasks + tasks from assigned students
- Can only create/update/delete tasks they created
- Cannot create tasks for students

#### Principals
- Cannot access task endpoints
- Can create teacher accounts
- Can view all teachers

### Error Handling

All errors return a consistent format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

### Assignment Rules Compliance

✅ Students must provide `teacherId` at signup  
✅ Students can only access their own tasks  
✅ Teachers can view tasks of assigned students + their own  
✅ Teachers can update/delete only tasks they created  
✅ Principals cannot touch tasks  

