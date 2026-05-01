// back-end/models/WorkoutLog.js
const mongoose = require('mongoose');

const WorkoutLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  exerciseName: { type: String, default: 'Push-ups' },
  repsCompleted: { type: Number, default: 0 },
  targetReps: { type: Number, default: 10 },
  isGoalMet: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WorkoutLog', WorkoutLogSchema);