import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import axios from './axiosConfig';

import Login from './Login';
import Dashboard from './dashboard';

// Protect route component
function PrivateRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [userRole, setUserRole] = useState(null);

  // Fetch user info after login to get role
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
