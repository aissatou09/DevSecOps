import React from 'react';
import Navbar from './components/Navbar';
import AppointmentForm from './AppointmentForm';

export default function Dashboard({ userRole }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4 text-blue-700">Bienvenue sur le tableau de bord</h1>
        <div className="bg-white p-6 rounded shadow-md">
          {userRole === 'admin' && <p className="text-lg">Bienvenue Admin 👑</p>}
          {userRole === 'dentist' && <p className="text-lg">Bienvenue Dentiste 🦷</p>}
          {userRole === 'patient' && <p className="text-lg">Bienvenue Patient 😊</p>}
          {userRole === 'patient' && <AppointmentForm />}
          {!userRole && <p>Chargement des infos...</p>}
        </div>
      </main>
    </div>
  );
}
