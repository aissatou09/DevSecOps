import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

function Planning({ userRole }) {
  const [rdvs, setRdvs] = useState([]);
  const [patients, setPatients] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [form, setForm] = useState({
    patient: '',
    dentist: '',
    date: '',
    motif: ''
  });

  useEffect(() => {
    axios.get('/api/accounts/appointments/').then(res => setRdvs(res.data));
    axios.get('/api/accounts/users/?role=patient').then(res => setPatients(res.data));
    axios.get('/api/accounts/users/?role=dentist').then(res => setDentists(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/accounts/appointments/', form)
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Planning</h2>

      {userRole === 'assistant' && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
          <select name="patient" onChange={handleChange} className="w-full border p-2" required>
            <option value="">-- Sélectionner un patient --</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.username}</option>
            ))}
          </select>

          <select name="dentist" onChange={handleChange} className="w-full border p-2" required>
            <option value="">-- Sélectionner un dentiste --</option>
            {dentists.map((d) => (
              <option key={d.id} value={d.id}>{d.username}</option>
            ))}
          </select>

          <input type="datetime-local" name="date" onChange={handleChange} className="w-full border p-2" required />
          <input name="motif" placeholder="Motif" onChange={handleChange} className="w-full border p-2" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">Ajouter RDV</button>
        </form>
      )}

      <ul className="space-y-2">
        {rdvs.map((r) => (
          <li key={r.id} className="border p-2 rounded">
            📅 {r.date} — 👤 {r.patient} 🦷 {r.dentist} — {r.motif}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planning;
