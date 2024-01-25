const mongoose = require('mongoose');

// Define the university schema
const universitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
});

const University = mongoose.model('University', universitySchema);

module.exports = University;
