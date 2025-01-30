const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB Atlas connection string
const uri = 'mongodb+srv://pixelpump:bvGmEFmYIMKggUvx@bishop001.sqbq1mn.mongodb.net/?retryWrites=true&w=majority&appName=bishop001';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Access the database and collections
    const database = client.db('crewScheduling');
    const propertiesCollection = database.collection('properties');
    const usersCollection = database.collection('users');
    const crewsCollection = database.collection('crews');

    app.use(express.json());

    // Properties Endpoints
    app.get('/api/properties', async (req, res) => {
      const properties = await propertiesCollection.find().toArray();
      res.json(properties);
    });

    app.post('/api/properties', async (req, res) => {
      const newProperty = req.body;
      const result = await propertiesCollection.insertOne(newProperty);
      res.json({ success: true, insertedId: result.insertedId });
    });

    // Users Endpoints (Supervisors and Gardeners)
    app.get('/api/users', async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.json(users);
    });

    app.post('/api/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.json({ success: true, insertedId: result.insertedId });
    });

    // Crews Endpoints
    app.get('/api/crews', async (req, res) => {
      const crews = await crewsCollection.find().toArray();
      res.json(crews);
    });

    app.post('/api/crews', async (req, res) => {
      const newCrew = req.body;
      const result = await crewsCollection.insertOne(newCrew);
      res.json({ success: true, insertedId: result.insertedId });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB Atlas', err);
  }
}

main().catch(console.error);
