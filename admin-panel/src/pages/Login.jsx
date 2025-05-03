import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const VITE_REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;


export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${VITE_REACT_APP_API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin', JSON.stringify(data));
        onLogin(data);
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-64 gap-3">
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2" />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2" />
        <button type="submit" className="bg-blue-600 text-white p-2">Login</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
