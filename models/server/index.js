const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());

const uri = "PASTE_YOUR_CONNECTION_STRING_HERE"; // Use the string you copied!
const client = new MongoClient(uri);

// This endpoint saves the "Mental Health" questions and User Info
app.post('/api/signup', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('AeroGate');
    const users = database.collection('Users');
    
    // This saves: Email, Password, Age, and the "Mental State" question
    const result = await users.insertOne(req.body);
    res.status(201).send({ message: "Account Created!", id: result.insertedId });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log("AeroGate Server running on port 3000"));