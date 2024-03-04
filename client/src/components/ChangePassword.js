// src/components/ChangePassword.js

import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword({ token }) {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.put('http://localhost:3000/user/change-password', { newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Password changed successfully!');
      setError('');
    } catch (err) {
      setError('Failed to change password. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
