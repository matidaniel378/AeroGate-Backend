// back-end/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const WorkoutLog = require('./models/WorkoutLog');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Ensure your .env has MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Fitness Database"))
  .catch(err => console.log(err));

// API: Log a new rep session
app.post('/api/logs', async (req, res) => {
  try {
    const { userId, repsCompleted, targetReps } = req.body;
    
    const isGoalMet = repsCompleted >= targetReps;
    
    const newLog = new WorkoutLog({
      userId,
      repsCompleted,
      targetReps,
      isGoalMet
    });

    await newLog.save();
    
    res.status(200).json({ 
      success: true, 
      unlocked: isGoalMet,
      message: isGoalMet ? "Goal reached! Apps Unlocked." : "Keep going!" 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));