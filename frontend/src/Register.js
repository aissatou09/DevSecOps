// src/Register.js
import React, { useState } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'patient',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/accounts/register/', form);
      navigate('/login');
    } catch (err) {
      setError('Erreur : ' + (err.response?.data?.username || err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border mb-4">
          <option value="admin">Administrateur</option>
          <option value="dentist">Dentiste</option>
          <option value="assistant">Assistant</option>
          <option value="patient">Patient</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white w-full p-2">Créer un compte</button>
      </form>
    </div>
  );
}

export default Register;
