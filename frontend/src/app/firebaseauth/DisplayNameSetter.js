import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';

function DisplayNameSetter() {
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, {
          displayName: displayName
        });
        setMessage("Display name updated successfully!");
      } catch (err) {
        setMessage("Error updating display name: " + err.message);
      }
    } else {
      setMessage("No user is currently signed in.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder="New Display Name"
          required
        />
        <button type="submit" className="border px-6 py-2 my-4 black">Set Display Name</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DisplayNameSetter;
