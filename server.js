require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const TestData = require('./models/TestData'); // Importer din modell
const app = express();

const DBUri = process.env.DB_URI;

mongoose.connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    initializeTestData();
  })
  .catch(err => console.log('MongoDB Connection Error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

async function initializeTestData() {
    try {
      const doc = await TestData.findOne({ tittel: 'test' });
      if (!doc) {
        const newTestData = new TestData({ tittel: 'test', data: ['1', '10', '11', '100', '101'] });
        await newTestData.save();
        console.log('Test data initialized');
      } else {
        console.log('Test data already exists');
      }
    } catch (err) {
      console.log(err);
    }
  }
