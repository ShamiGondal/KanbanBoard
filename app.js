// app.js
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const universityRoutes = require('./routes'); // Adjust the path accordingly

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Use the university routes
app.use('/api/universities', universityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
