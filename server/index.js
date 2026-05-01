const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());

// Replace with your string from Cluster0!
const uri = "mongodb+srv://aerogate_admin:<password>@cluster0.mongodb.net/AeroGate?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.post('/api/signup', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db("AeroGate").collection("Users").insertOne(req.body);
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(3000, () => console.log("AeroGate Server is live!"));