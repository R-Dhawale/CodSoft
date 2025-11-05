const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
 },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coverLetter: String,
  resumePath: String, // stored file path
  status: { type: String, enum: ['submitted','reviewing','accepted','rejected'], default: 'submitted' },
  
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
