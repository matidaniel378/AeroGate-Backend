const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const app = express();

app.use(express.json());

// Your MongoDB Atlas Connection String
const dbURI = 'mongodb+srv://aerogate_admin:abenezer12@cluster0.mongodb.net/AeroGate?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => console.log('✅ Connected to MongoDB via Mongoose'))
  .catch((err) => console.log('❌ Connection error:', err));

app.post('/api/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User secured in database' });
  } catch (error) {
    res.status(400).json({ error: 'Data validation failed' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});