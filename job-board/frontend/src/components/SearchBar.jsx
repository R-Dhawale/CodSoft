import React from 'react';

export default function SearchBar({ q, setQ, onSearch }) {
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSearch(); }} className="search-bar">
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search jobs, titles, companies..." />
      <button type="submit">Search</button>
    </form>
  );
}
