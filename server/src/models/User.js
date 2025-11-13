const mongoose = require('mongoose');
const { ALLOWED_ROLES } = require('../utils/constants');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 60, // bcrypt hash length
    },
    role: {
      type: String,
      enum: ALLOWED_ROLES,
      required: true,
      default: 'student',
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        validator(value) {
          if (this.role === 'student') {
            return Boolean(value);
          }
          return true;
        },
        message: 'Students must be assigned to a teacher',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);

