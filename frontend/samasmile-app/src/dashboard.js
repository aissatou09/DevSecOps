// src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Planning from './Planning';

export default function Dashboard({ userRole }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4 text-blue-700">Bienvenue sur le tableau de bord</h1>

        <div className="bg-white p-6 rounded shadow-md space-y-4">
          {!userRole && <p>Chargement du rôle...</p>}

          {userRole === 'admin' && (
            <div>
              <p>👑 Bienvenue Admin</p>
              <ul className="list-disc ml-6 text-blue-700">
                <li><Link to="/admin/users">Gérer les utilisateurs</Link></li>
                <li><Link to="/audit">Consulter le journal d’audit</Link></li>
              </ul>
            </div>
          )}

          {userRole === 'dentist' && (
            <div>
              <p>🦷 Bonjour Docteur</p>
              <ul className="list-disc ml-6 text-blue-700">
                <li><Link to="/dossiers">Voir / modifier les dossiers patients</Link></li>
                <li><Link to="/messages">Messagerie sécurisée</Link></li>
                <li><Link to="/prescriptions">Signer des prescriptions</Link></li>
              </ul>
            </div>
          )}

          {userRole === 'assistant' && (
            <div>
              <p>📋 Bonjour Assistant</p>
              <ul className="list-disc ml-6 text-blue-700">
                <li><Link to="/planning">Gérer le planning des RDV</Link></li>
                <li><Link to="/notifications">Voir les notifications</Link></li>
              </ul>
            </div>
          )}

          {userRole === 'patient' && (
            <div>
              <p>👤 Bonjour Patient</p>
              <ul className="list-disc ml-6 text-blue-700">
                <li><Link to="/planning">Mes rendez-vous</Link></li>
                <li><Link to="/dossier">Mon dossier médical</Link></li>
                <li><Link to="/messages">Contacter mon dentiste</Link></li>
              </ul>
            </div>
          )}
        </div>

        {(userRole === 'assistant' || userRole === 'dentist' || userRole === 'patient') && (
          <div className="mt-8">
            <Planning userRole={userRole} />
          </div>
        )}
      </main>
    </div>
  );
}
