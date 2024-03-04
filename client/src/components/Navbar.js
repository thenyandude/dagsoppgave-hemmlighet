// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ token, onLogout }) {
  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      {token && (
        <>
          <Link to="/change-password">Change Password</Link>
          <Link to="/delete-account">Delete Account</Link>
          <Link to="/secret">Secret Page</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
