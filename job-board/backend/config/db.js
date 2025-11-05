// backend/config/db.js
const mongoose = require('mongoose');

const DEFAULT_TIMEOUT = 5000; // ms
const RETRY_COUNT = 5;
const RETRY_DELAY_MS = 2000;

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGO_URI (or MONGODB_URI) not set in .env');

  let lastErr = null;

  for (let attempt = 1; attempt <= RETRY_COUNT; attempt++) {
    try {
      console.log(`MongoDB: attempt ${attempt} to connect...`);
      await mongoose.connect(uri, {
        // modern driver ignores deprecated options; set a short selection timeout
        serverSelectionTimeoutMS: DEFAULT_TIMEOUT,
        // don't enable invalid certs in production — remove any DEBUG flags
      });
      console.log('MongoDB connected successfully');
      mongoose.connection.on('error', e => console.error('MongoDB connection error:', e));
      mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
      return; // success
    } catch (err) {
      lastErr = err;
      console.error(`MongoDB connect attempt ${attempt} failed:`, err.message || err);
      if (attempt < RETRY_COUNT) {
        console.log(`Waiting ${RETRY_DELAY_MS}ms before retrying...`);
        await wait(RETRY_DELAY_MS);
      }
    }
  }

  console.error('MongoDB: All connection attempts failed.');
  throw lastErr;
};

module.exports = connectDB;
