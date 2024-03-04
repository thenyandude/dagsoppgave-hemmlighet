require('dotenv').config();
const express = require('express');
const connectDatabase = require('./handlers/databaseHandler');
const runTests = require('./tests/user-crud-testing'); // Import the test function
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

app.use(express.json()); // For å parse JSON request-bodies
app.use(express.static('public'));

app.use(cors());

app.use('/user', userRoutes);

// Establish the database connection
connectDatabase()
  // .then(() => {
  //   console.log('Database connected. Running tests...');

  //   Run the tests after successful database connection
  //   runTests().then(() => {
  //     console.log('Tests completed');
  //   }).catch(err => {
  //     console.error('Tests failed:', err);
  //   });
  // })
  .catch(err => console.error('Database connection failed:', err));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});