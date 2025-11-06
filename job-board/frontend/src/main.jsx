import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AuthProvider from './contexts/AuthContext';
import './styles.css';
import { Analytics } from '@vercel/analytics/react';


const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found. Ensure index.html contains <div id="root"></div>');
}
createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Analytics />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
