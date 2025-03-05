// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Used in authRoutes.js and middleware/auth.js
const bcrypt = require('bcryptjs'); // Used in authRoutes.js
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Match your frontend URL (adjust for production)
  credentials: true, // Allow cookies for authentication
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

// MongoDB Connection with learno_db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // Add options for modern MongoDB
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Exit if connection fails
  });