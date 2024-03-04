// src/components/Registration.js

import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/register', { email, password });
      setSuccess('Registration successful!');
      setError('');
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
