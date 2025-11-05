const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// list / search
router.get('/', async (req, res) => {
  const q = req.query.q || '';
  const filter = q ? { $text: { $search: q } } : {};
  const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(50);
  res.json(jobs);
});

// get job
router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ msg: 'Job not found' });
  res.json(job);
});

// create job (employer)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ msg: 'Unauthorized' });
  const job = new Job({ ...req.body, postedBy: req.user._id });
  await job.save();
  res.json(job);
});

// delete or update - similar
module.exports = router;