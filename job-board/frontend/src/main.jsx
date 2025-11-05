import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AuthProvider from './contexts/AuthContext';
import './styles.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found. Ensure index.html contains <div id="root"></div>');
}
createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
