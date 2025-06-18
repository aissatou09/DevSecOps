import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import axios from './axiosConfig';

import Login from './Login';
import Dashboard from './dashboard';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios
        .get('/api/accounts/me/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUserRole(res.data.role))
        .catch(() => {
          localStorage.removeItem('accessToken');
          setUserRole(null);
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard userRole={userRole} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
