// src/components/SecretPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SecretPage({ token }) {
  const [secretContent, setSecretContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSecretData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/secret', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSecretContent(response.data); // Assuming the response contains the image URL or data
        setError('');
      } catch (err) {
        const message = err.response && err.response.status === 403
          ? err.response.data.message  // Use the custom message from the response
          : 'Error fetching secret data.';
        setError(message);
        setSecretContent('');
      }
    };

    if (token) {
      fetchSecretData();
    }
  }, [token]);

  return (
    <div>
      <h2>Secret Page</h2>
      {error && <p>{error}</p>}
      {secretContent && <img src="/secret.webp" alt="Secret" />}
    </div>
  );
}

export default SecretPage;
