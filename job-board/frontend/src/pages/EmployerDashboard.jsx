import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

export default function EmployerDashboard(){
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ title:'', company:'', location:'', description:'', requirements:'' });

  const createJob = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'employer') return alert('Only employers can post jobs.');

    const payload = { ...form, requirements: form.requirements.split(',').map(s => s.trim()) };
    try {
      await API.post('/jobs', payload);
      alert('Job posted');
      setForm({ title:'', company:'', location:'', description:'', requirements:'' });
    } catch (err) {
      console.error(err);
      alert('Could not post job');
    }
  };

  return (
    <div>
      <h2>Employer Dashboard</h2>
      <p className="muted">Logged in as: {user?.name} ({user?.email})</p>

      <form onSubmit={createJob} className="card">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <input placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} required />
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required />
        <input placeholder="Requirements (comma-separated)" value={form.requirements} onChange={e=>setForm({...form,requirements:e.target.value})} />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}
