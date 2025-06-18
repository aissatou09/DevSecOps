import React, { useState } from 'react';
import { login } from './authService';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password)
      .then(response => {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        alert('Connecté !');
      })
      .catch(error => {
        console.error(error);
        alert("Échec de la connexion");
      });
  };

  return (
    <div>
      <h1>SamaSmile</h1>
      <input placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Connexion</button>
    </div>
  );
}

export default App;