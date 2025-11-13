const mongoose = require('mongoose');

const { Schema } = mongoose;

const progressStates = ['not-started', 'in-progress', 'completed'];

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    progress: {
      type: String,
      enum: progressStates,
      default: 'not-started',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);

