import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Upload from './pages/Upload';

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin');
    if (stored) setAdmin(JSON.parse(stored));
  }, []);

  return (
    <Routes>
      <Route path="/" element={admin ? <Home /> : <Navigate to="/login" />} />
      <Route path="/upload" element={admin ? <Upload /> : <Navigate to="/upload" />} />
      <Route path="/login" element={<Login onLogin={setAdmin} />} />
    </Routes>
  );
}

export default App;
