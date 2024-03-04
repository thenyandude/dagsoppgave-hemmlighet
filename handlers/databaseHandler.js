// handlers/databaseHandler.js

const mongoose = require('mongoose');
const TestData = require('../models/TestData'); // Pass på riktig sti til modellen

const initializeTestData = async () => {
    try {
      const doc = await TestData.findOne({ tittel: 'test' });
      if (!doc) {
        const newTestData = new TestData({ tittel: 'test', data: ['1', '10', '11', '100', '101'] });
        await newTestData.save();
        console.log('Test data initialized');
        console.log('Initialized Data:', newTestData);
      } else {
        console.log('Test data already exists');
        console.log('Existing Data:', doc);
      }
    } catch (err) {
      console.log(err);
    }
};

const connectDatabase = () => {
  return mongoose.connect(process.env.DB_URI) // Ensure this returns a Promise
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
      console.error('MongoDB Connection Error:', err);
      throw err; // Rethrow to handle it in server.js
    });
};

module.exports = connectDatabase;
