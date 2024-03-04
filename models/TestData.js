const mongoose = require('mongoose');

const testDataSchema = new mongoose.Schema({
  tittel: String,
  data: [String]
});

const TestData = mongoose.model('TestData', testDataSchema);

module.exports = TestData;
