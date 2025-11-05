import React from "react";
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <div>
        <Link to={`/jobs/${job._id}`}><h3>{job.title}</h3></Link>
        <p className="muted">{job.company} • {job.location || 'Remote'}</p>
      </div>
      <div>
        <small className="muted">{new Date(job.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
}
