import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

export default function JobDetail(){
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [cover, setCover] = useState('');
  const [resume, setResume] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get(`/jobs/${id}`).then(r => setJob(r.data)).catch(e => console.error(e));
  }, [id]);

  const apply = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to apply.');
    if (user.role !== 'candidate') return alert('Only candidates may apply.');

    const fd = new FormData();
    fd.append('coverLetter', cover);
    if (resume) fd.append('resume', resume);

    try {
      await API.post(`/applications/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      alert('Application submitted!');
      setCover('');
      setResume(null);
    } catch (err) {
      console.error(err);
      alert('Failed to submit application.');
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p className="muted">{job.company} • {job.location}</p>
      <section className="card">
        <h3>Description</h3>
        <p>{job.description}</p>
      </section>

      <section className="card">
        <h3>Apply</h3>
        <form onSubmit={apply}>
          <label>Cover letter</label>
          <textarea value={cover} onChange={e => setCover(e.target.value)} placeholder="Write a short message..." />
          <label>Resume (pdf/doc)</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} />
          <button type="submit">Submit Application</button>
        </form>
      </section>
    </div>
  );
}
