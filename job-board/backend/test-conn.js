// backend/test-conn.js
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGO_URI missing in .env');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Test: connected to MongoDB Atlas');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Test: connection failed:', err.message || err);
    process.exit(1);
  }
})();
