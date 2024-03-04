// src/components/DeleteAccount.js

import React from 'react';
import axios from 'axios';

function DeleteAccount({ token, onAccountDeleted }) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/user/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        // Call the onAccountDeleted prop, which is a function passed from the parent component
        onAccountDeleted();
      }
    } catch (err) {
      alert('Failed to delete account.'); // This will show if there is an actual error response
    }
  };
  
  return (
    <div>
      <h2>Delete Account</h2>
      <button onClick={handleDelete}>Delete My Account</button>
    </div>
  );
}

export default DeleteAccount;
