import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';

export default function Jobs(){
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs', { params: { q } });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ fetchJobs(); }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      <SearchBar q={q} setQ={setQ} onSearch={fetchJobs} />

      <div>
        {jobs.length === 0 ? <p>No jobs found.</p> : jobs.map(j => <JobCard key={j._id} job={j} />)}
      </div>
    </div>
  );
}
