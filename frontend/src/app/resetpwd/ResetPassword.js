import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase";

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Password reset email sent! Please check your inbox.');
        setError('');
      })
      .catch((error) => {
        // setError(error.message);
        setError("Couldn't find your Account");
        setMessage('');
      });
  };

  return (
    <div>
      <h2 style={{textDecoration: 'underline'}}>Forgot Password?</h2>
      <h2>Reset Your Password Here</h2>
      <form onSubmit={handleSubmit}>
        <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        <button type="submit" className="border border-green-600 bg-blue-600 hover:bg-blue-500 w-full my-2 text-white" style={{ backgroundColor: 'rgba(57,75,86,255)' }}>
          Send Reset Email</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ResetPassword;