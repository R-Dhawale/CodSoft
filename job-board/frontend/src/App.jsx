import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';


export default function App(){
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="logo">JobBoard</Link>
        <nav>
          <Link to="/jobs">Jobs</Link>
          {user?.role === 'employer' && <Link to="/employer">Employer</Link>}
          {user?.role === 'candidate' && <Link to="/candidate">Candidate</Link>}
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="btn-ghost">Logout</button>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/candidate" element={<CandidateDashboard />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} JobBoard — Built with React</p>
      </footer>
    </div>
  );
}
