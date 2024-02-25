

const mongoose = require('mongoose');
const mongoURI = process?.env?.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Mongo Conn established successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));
