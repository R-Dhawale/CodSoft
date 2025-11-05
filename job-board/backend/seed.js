// // backend/seed.js
// require('dotenv').config();
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const connectDB = require('./config/db');

// // import models - ensure paths are correct
// const User = require('./models/User');
// const Job = require('./models/Job');
// const Application = require('./models/Application'); // optional - if exists

// // sample data
// const sampleUsers = {
//   employer: {
//     name: "Acme HR",
//     email: "employer@example.com",
//     password: "password123",
//     role: "employer"
//   },
//   candidate: {
//     name: "Jane Candidate",
//     email: "candidate@example.com",
//     password: "password123",
//     role: "candidate"
//   }
// };

// const sampleJobs = [
//   {
//     title: "Frontend Developer",
//     company: "TechNova Solutions",
//     location: "Remote",
//     description: "Develop responsive UI components using React and Tailwind CSS.",
//     requirements: ["React", "JavaScript", "HTML", "CSS", "Git"],
//     salary: "₹6–10 LPA",
//     featured: true
//   },
//   {
//     title: "Backend Engineer",
//     company: "CodeWorks Pvt. Ltd.",
//     location: "Pune, India",
//     description: "Design and implement REST APIs using Node.js and Express.",
//     requirements: ["Node.js", "Express", "MongoDB", "JWT", "API Design"],
//     salary: "₹8–12 LPA",
//     featured: true
//   },
//   {
//     title: "Full Stack Developer",
//     company: "Innovent Technologies",
//     location: "Bangalore, India",
//     description: "Work on both frontend and backend systems of a scalable SaaS platform.",
//     requirements: ["React", "Node.js", "MongoDB", "REST APIs"],
//     salary: "₹10–15 LPA",
//     featured: false
//   },
//   {
//     title: "Python Developer",
//     company: "DataEdge Analytics",
//     location: "Hyderabad, India",
//     description: "Build backend services and data pipelines using Python and FastAPI.",
//     requirements: ["Python", "FastAPI", "PostgreSQL", "Docker"],
//     salary: "₹7–11 LPA",
//     featured: false
//   },
//   {
//     title: "Mobile App Developer",
//     company: "Appify Studios",
//     location: "Mumbai, India",
//     description: "Develop cross-platform apps with React Native and integrate REST APIs.",
//     requirements: ["React Native", "JavaScript", "REST APIs", "Redux"],
//     salary: "₹6–9 LPA",
//     featured: false
//   },
//   {
//     title: "DevOps Engineer",
//     company: "CloudCraft Labs",
//     location: "Chennai, India",
//     description: "Manage CI/CD pipelines and deploy cloud-based microservices.",
//     requirements: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
//     salary: "₹12–18 LPA",
//     featured: true
//   },
//   {
//     title: "Data Analyst",
//     company: "InsightCorp",
//     location: "Remote",
//     description: "Analyze datasets to extract insights and visualize results with Power BI.",
//     requirements: ["SQL", "Python", "Power BI", "Excel"],
//     salary: "₹5–8 LPA",
//     featured: false
//   },
//   {
//     title: "Machine Learning Engineer",
//     company: "DeepLearn Systems",
//     location: "Pune, India",
//     description: "Build and deploy ML models for predictive analytics.",
//     requirements: ["Python", "TensorFlow", "scikit-learn", "NumPy"],
//     salary: "₹9–14 LPA",
//     featured: true
//   },
//   {
//     title: "UI/UX Designer",
//     company: "DesignHaven",
//     location: "Remote",
//     description: "Create beautiful and user-friendly web and mobile interfaces.",
//     requirements: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
//     salary: "₹5–9 LPA",
//     featured: false
//   },
//   {
//     title: "Cybersecurity Analyst",
//     company: "SecureWave Technologies",
//     location: "Delhi, India",
//     description: "Monitor, detect, and respond to security threats across systems.",
//     requirements: ["Network Security", "Linux", "SIEM", "Incident Response"],
//     salary: "₹9–13 LPA",
//     featured: false
//   }
// ];

// (async () => {
//   try {
//     await connectDB(); // uses backend/config/db.js

//     // Optional: clear old data
//     await Application.deleteMany().catch(()=>{});
//     await Job.deleteMany();
//     await User.deleteMany();

//     // Create employer & candidate (hashed password)
//     const empHash = await bcrypt.hash(sampleUsers.employer.password, 10);
//     const candHash = await bcrypt.hash(sampleUsers.candidate.password, 10);

//     const employer = new User({
//       name: sampleUsers.employer.name,
//       email: sampleUsers.employer.email,
//       password: empHash,
//       role: "employer"
//     });
//     await employer.save();

//     const candidate = new User({
//       name: sampleUsers.candidate.name,
//       email: sampleUsers.candidate.email,
//       password: candHash,
//       role: "candidate"
//     });
//     await candidate.save();

//     // Insert jobs with postedBy = employer._id
//     const jobsToInsert = sampleJobs.map(j => ({ ...j, postedBy: employer._id }));
//     const inserted = await Job.insertMany(jobsToInsert);

//     // Optionally create one application from candidate to first job
//     if (inserted.length > 0 && Application) {
//       const appDoc = new Application({
//         job: inserted[0]._id,
//         candidate: candidate._id,
//         coverLetter: "I'm interested in this role.",
//         resumePath: "" // you can update later if uploading
//       });
//       await appDoc.save();
//     }

//     console.log('✅ Seed completed. Employer:', employer.email, 'Candidate:', candidate.email);
//     console.log('Inserted jobs:', inserted.length);
//     process.exit(0);
//   } catch (err) {
//     console.error('❌ Seed failed:', err);
//     process.exit(1);
//   }
// })();
