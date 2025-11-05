// backend/models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  description: { type: String },
  requirements: { type: [String], default: [] },
  // store salary as text so ranges & currency symbols are allowed
  salary: { type: String, default: "" },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// text index for search
JobSchema.index({ title: 'text', description: 'text', company: 'text' });

module.exports = mongoose.model('Job', JobSchema);
