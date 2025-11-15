# 🧪 Test Credentials for StudyTrackr

## Quick Setup

Run the seed script to create test users:

```bash
cd server
npm run seed
```

## 📋 Test Accounts

After running the seed script, you can use these credentials:

### 👑 Principal Account
- **Email:** `principal@studytrackr.com`
- **Password:** `principal123`
- **Login URL:** `/principal/login`
- **Access:** Can create and manage teachers

### 👨‍🏫 Teacher Account
- **Email:** `teacher@studytrackr.com`
- **Password:** `teacher123`
- **Login URL:** `/login`
- **Access:** Can view own tasks + assigned students' tasks

### 👨‍🎓 Student Account
- **Email:** `student@studytrackr.com`
- **Password:** `student123`
- **Login URL:** `/login`
- **Access:** Can manage only own tasks

---

## 🔄 Manual Registration Flow

If you prefer to register manually:

### Step 1: Create Principal (via Database or Seed)
- Use the seed script OR create directly in MongoDB

### Step 2: Create Teacher (via Principal Dashboard)
1. Login as Principal: `/principal/login`
2. Go to "Manage Teachers" page
3. Create a new teacher account

### Step 3: Register Student
1. Go to `/register`
2. Fill in student details
3. Select the teacher from dropdown
4. Complete registration

---

## 🗑️ Reset Test Data

To clear and recreate test users:

```bash
cd server
npm run seed
```

The seed script will automatically delete existing test users and create fresh ones.

---

## 📝 Notes

- All test passwords are simple for development purposes
- In production, use strong passwords
- The seed script creates users with predictable emails for easy testing
- Student is automatically assigned to the teacher created by seed script

