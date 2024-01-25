// db.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://ehtishamahmedgondal:shamigondal345@cluster0.zrn0sjs.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {

    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
