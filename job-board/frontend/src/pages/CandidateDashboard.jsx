import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

export default function CandidateDashboard(){
  const { user } = useContext(AuthContext);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Basic fetch: get applications for candidate
        const res = await API.get('/applications'); // NOTE: backend route to fetch candidate apps required
        setApps(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetch();
  }, [user]);

  return (
    <div>
      <h2>Candidate Dashboard</h2>
      <p className="muted">Logged in as: {user?.name} ({user?.email})</p>

      <section>
        <h3>Your Applications</h3>
        {apps.length === 0 ? <p>No applications yet.</p> : (
          <ul>
            {apps.map(a => (
              <li key={a._id}>
                {a.job?.title || '—'} at {a.job?.company || '—'} — <strong>{a.status}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
