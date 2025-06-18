import React from 'react';

export default function Dashboard({ userRole }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      {userRole === 'admin' && <p>Bienvenue Admin 👑</p>}
      {userRole === 'dentist' && <p>Bienvenue Dentiste 🦷</p>}
      {userRole === 'patient' && <p>Bienvenue Patient 😊</p>}
      {!userRole && <p>Chargement des infos...</p>}

      <button
        onClick={() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }}
      >
        Déconnexion
      </button>
    </div>
  );
}
