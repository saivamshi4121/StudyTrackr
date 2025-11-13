const mongoose = require('mongoose');
const { PROGRESS_STATES_ARRAY } = require('../utils/constants');

const { Schema } = mongoose;

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
      enum: PROGRESS_STATES_ARRAY,
      default: 'not-started',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);

