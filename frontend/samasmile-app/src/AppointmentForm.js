import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

export default function AppointmentForm() {
  const [dentists, setDentists] = useState([]);
  const [dentist, setDentist] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Charger les dentistes (ex : /api/accounts/dentists/)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    axios
      .get('/api/accounts/dentists/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDentists(res.data))
      .catch((err) => console.error('Erreur chargement dentistes', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('accessToken');
    try {
      const res = await axios.post(
        '/api/appointments/create/',
        {
          patient: null, // le backend doit l'inférer depuis le token
          dentist,
          date,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess('Rendez-vous enregistré avec succès ✅');
    } catch (err) {
      setError('Erreur lors de la prise de rendez-vous ❌');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto my-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Prendre un rendez-vous</h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Dentiste</label>
        <select
          value={dentist}
          onChange={(e) => setDentist(e.target.value)}
          className="border w-full p-2 mb-4"
          required
        >
          <option value="">-- Choisir un dentiste --</option>
          {dentists.map((d) => (
            <option key={d.id} value={d.id}>
              {d.username}
            </option>
          ))}
        </select>

        <label className="block mb-2">Date et heure</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border w-full p-2 mb-4"
          required
        />

        <label className="block mb-2">Motif (optionnel)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2 mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
