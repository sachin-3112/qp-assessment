// index.js
const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./Middleware/authMiddleware');
const userRoutes = require('./Routes/Users.routes');
const mongoURI = process?.env?.MONGODB_URL;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

/** Below routes are un-secured routs */
app.use('/api/v1', userRoutes);


/** Below routes are secured routs */
// app.use(authMiddleware.verifyRequest);

app.use('/api/v1',authMiddleware.verifyRequest, userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
