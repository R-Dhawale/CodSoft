import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

export default function Home(){
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/jobs', { params: { q: '' } });
        // simple: show first 3 as featured (or rely on job.featured)
        setFeatured(res.data.slice(0,3));
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <section className="hero">
        <h1>Welcome to JobBoard</h1>
        <p>Find your next opportunity or hire top talent — fast.</p>
        <Link to="/jobs" className="btn">Browse Jobs</Link>
      </section>

      <section>
        <h2>Featured Jobs</h2>
        {featured.length === 0 ? <p>No featured jobs yet.</p> : featured.map(j => <JobCard key={j._id} job={j} />)}
      </section>
    </div>
  );
}
