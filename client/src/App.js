import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import ChangePassword from './components/ChangePassword';
import DeleteAccount from './components/DeleteAccount';
import SecretPage from './components/SecretPage';
import Navbar from './components/Navbar'; // Assuming you have a Navbar component

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  const handleAccountDeleted = () => {
    localStorage.removeItem('token');
    setToken(null);
    
  };

  return (
    <BrowserRouter>
      <Navbar token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login setToken={handleLoginSuccess} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/change-password" element={<ChangePassword token={token} />} />
        <Route path="/delete-account" element={<DeleteAccount token={token} onAccountDeleted={handleAccountDeleted} />} />
        {token && <Route path="/secret" element={<SecretPage token={token} />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
