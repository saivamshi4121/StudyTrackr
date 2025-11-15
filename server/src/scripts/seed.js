/**
 * Seed script to create test users for development
 * Run with: node src/scripts/seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env');
  process.exit(1);
}

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test users (optional - comment out if you want to keep existing data)
    await User.deleteMany({
      email: {
        $in: [
          'principal@studytrackr.com',
          'teacher@studytrackr.com',
          'student@studytrackr.com',
        ],
      },
    });
    console.log('🧹 Cleared existing test users');

    // Create Principal
    const principalPassword = 'principal123';
    const principalSalt = await bcrypt.genSalt(10);
    const principalHash = await bcrypt.hash(principalPassword, principalSalt);

    const principal = await User.create({
      name: 'Principal Admin',
      email: 'principal@studytrackr.com',
      passwordHash: principalHash,
      role: 'principal',
    });
    console.log('✅ Created Principal:', principal.email);

    // Create Teacher
    const teacherPassword = 'teacher123';
    const teacherSalt = await bcrypt.genSalt(10);
    const teacherHash = await bcrypt.hash(teacherPassword, teacherSalt);

    const teacher = await User.create({
      name: 'John Teacher',
      email: 'teacher@studytrackr.com',
      passwordHash: teacherHash,
      role: 'teacher',
    });
    console.log('✅ Created Teacher:', teacher.email);

    // Create Student (assigned to teacher)
    const studentPassword = 'student123';
    const studentSalt = await bcrypt.genSalt(10);
    const studentHash = await bcrypt.hash(studentPassword, studentSalt);

    const student = await User.create({
      name: 'Alice Student',
      email: 'student@studytrackr.com',
      passwordHash: studentHash,
      role: 'student',
      teacherId: teacher._id,
    });
    console.log('✅ Created Student:', student.email);

    console.log('\n🎉 Seed completed successfully!\n');
    console.log('📋 TEST CREDENTIALS:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 PRINCIPAL:');
    console.log('   Email: principal@studytrackr.com');
    console.log('   Password: principal123');
    console.log('   Login URL: /principal/login\n');
    console.log('👨‍🏫 TEACHER:');
    console.log('   Email: teacher@studytrackr.com');
    console.log('   Password: teacher123');
    console.log('   Login URL: /login\n');
    console.log('👨‍🎓 STUDENT:');
    console.log('   Email: student@studytrackr.com');
    console.log('   Password: student123');
    console.log('   Login URL: /login\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();

