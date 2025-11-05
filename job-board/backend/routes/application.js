const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

// upload config
const uploadDir = path.join(__dirname, "../uploads");
if (!require("fs").existsSync(uploadDir)) {
  require("fs").mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname))
});
const upload = multer({ storage });

// send email helper (basic, requires env SMTP config)
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
  }
}

// apply to job
router.post('/:jobId', auth, upload.single('resume'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('postedBy');
    if(!job) return res.status(404).json({ msg: 'Job not found' });

    const appDoc = new Application({
      job: job._id,
      candidate: req.user._id,
      coverLetter: req.body.coverLetter || '',
      resumePath: req.file ? req.file.path : ''
    });
    await appDoc.save();

    // send email to employer (example)
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: job.postedBy.email,
          subject: `New application for ${job.title}`,
          text: `Candidate ${req.user.name} applied. View resume at attached path (server).`,
          // you can attach resume: attachments: [{ path: req.file.path }]
        });
      } catch (error) {
        console.error('Failed to send email notification:', error);
        // Don't fail the application process if email fails
      }
    }

    res.json({ msg: 'Application submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// employer can get applications for their jobs
router.get('/job/:jobId', auth, async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ msg: 'Job not found' });
  if (job.postedBy.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Unauthorized' });
  const apps = await Application.find({ job: job._id }).populate('candidate','name email');
  res.json(apps);
});

module.exports = router;