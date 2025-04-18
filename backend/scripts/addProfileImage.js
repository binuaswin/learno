// backend/scripts/addProfileImage.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/learno_db')
  .then(async () => {
    console.log('Connected to MongoDB');
    const users = await User.find();
    for (const user of users) {
      if (!user.profileImage) {
        user.profileImage = null;
        await user.save();
        console.log(`Updated profileImage for ${user.email}`);
      }
    }
    console.log('Profile image field added to all users');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });