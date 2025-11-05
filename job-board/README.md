# Job Board

Simple job board application with a Node/Express backend and a React + Vite frontend.

This README documents how to run the project on Windows (PowerShell), environment variables, known issues/fixes that were applied, and a short API reference so you can paste this into ChatGPT or share with others.

---

## Quick summary

- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React (Vite)
- Auth: JWT
- File uploads: multer (uploads stored in backend/uploads)

## Repo layout

```
job-board/
├── backend/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/*.js
│   └── routes/*.js
└── frontend/
    ├── .env
    ├── package.json
    └── src/
```

---

## Preparing the environment

1. Install Node.js (LTS recommended) and npm.
2. Install MongoDB locally or create a MongoDB Atlas cluster.
3. Open two PowerShell windows (one for backend, one for frontend).

## Backend setup

1. Open PowerShell and change into backend folder:

```powershell
cd D:\job-board\backend
```

2. Copy/adjust the `.env` file. Example `.env` (update values):

```properties
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-board
JWT_SECRET=your_jwt_secret_key_here
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password-or-app-password
FRONTEND_URL=http://localhost:5173
```

Important: Replace `MONGODB_URI` with your actual connection string (for Atlas use the connection string provided by Atlas and replace <password>).

3. Install dependencies (if not already installed):

```powershell
npm install
```

4. Start the backend:

```powershell
npm run dev
```

The backend listens on the port from `.env` (default 5000). If you see MongoDB connection errors, verify the `MONGODB_URI`, network access, and that your MongoDB is running.

## Frontend setup

1. Open a second PowerShell and change into frontend folder:

```powershell
cd D:\job-board\frontend
```

2. Ensure the frontend `.env` contains the API base URL (Vite uses `VITE_` prefix):

```properties
VITE_API_URL=http://localhost:5000/api
```

3. Install dependencies (if not already installed):

```powershell
npm install
```

4. Start dev server:

```powershell
npm run dev
```

The frontend runs on http://localhost:5173 by default.

---

## API quick reference

Base URL: http://localhost:5000/api

Auth:

- POST /api/auth/register
  - Body: { name, email, password, role }
  - Response: { token }
- POST /api/auth/login
  - Body: { email, password }
  - Response: { token }
- GET /api/auth/me
  - Headers: Authorization: Bearer <token>
  - Response: user object

Jobs:

- GET /api/jobs?q=search
  - Returns list of jobs (supports text search)
- GET /api/jobs/:id
  - Returns job by id
- POST /api/jobs
  - Protected (employer)
  - Body: job fields

Applications:

- POST /api/applications/:jobId (multipart/form-data)
  - Protected (candidate)
  - File: resume (optional)
  - Fields: coverLetter
- GET /api/applications/job/:jobId
  - Protected (employer who posted job)

## Known fixes and notes (what was changed)

During development a few issues were found and fixed; these are documented here so you can reproduce or explain the repo when sharing with ChatGPT:

- server.js didn't exist originally; a minimal `server.js` was created to wire up routes and connect to DB.
- `applicaion.js` in `backend/routes/` was renamed to `application.js` and route imports were updated.
- Some model files initially used ES module `import`/`export` but the project uses CommonJS. All models were converted to `require`/`module.exports` (e.g. `Job.js`, `User.js`, `Application.js`).
- `package.json` (backend) `main` was changed to `server.js` and dev script to `nodemon --ignore node_modules/ server.js`.
- In `routes/application.js` multer upload directory is now created programmatically (uploaded files saved under `backend/uploads`).
- Email sending is optional and wrapped with checks (transporter only created when SMTP env vars present) and wrapped in try/catch so application creation doesn't fail due to email errors.
- `MONGODB_URI`/.env variable keys were normalized (server expects `MONGODB_URI`). If you use `MONGO_URI` change either .env or code to match.
- Frontend: component file naming mismatch (JobCards.jsx vs JobCard.jsx) was resolved—component filename and imports are consistent now.

If you want a linear changelog for sharing, I can produce a short bullet list you can paste into ChatGPT.

---

## Troubleshooting

- "Cannot find module index.js" when running nodemon: ensure `package.json` `main` points to `server.js` and `scripts.dev` references `server.js` only.
- "Cannot use import statement outside a module": file uses ES modules but project is CommonJS — convert `import` to `require` or set `type: "module"` (but then all files must be ESM).
- MongoDB TLS/SSL errors (Atlas): ensure correct connection string, IP whitelist, and network connectivity. If using Atlas and you see SSL errors, use the connection string provided by Atlas and ensure drivers are up-to-date.
- File uploads failing: ensure `backend/uploads` exists or allow the server to create it (server now creates the folder automatically).
- Vite import errors (e.g. "Failed to resolve import ../components/JobCard"): verify file exists and import path matches exactly (case-sensitive on some systems). Restart dev server after renames.

---

## If you plan to paste this into ChatGPT

- Paste the README and the specific files you want help with (e.g. a route file, an error trace, or a model). Provide the exact error output you're seeing and the command you ran.
- For environment-sensitive errors (MongoDB auth, SMTP), either sanitize credentials or replace them with placeholders like `<MONGO_URI>` and explain how to reproduce (local vs Atlas).

---

## Next steps (suggestions)

- Add unit tests for API endpoints (supertest + jest)
- Add basic input validation (express-validator)
- Add integration for production builds (Dockerfile, PM2)

---

If you'd like, I can now:

- Combine all code files into one single markdown file for copy/paste to ChatGPT.
- Produce a succinct changelog you can include when asking for help.
- Create a zip or single-file export of the repository (if you want to upload it somewhere).
