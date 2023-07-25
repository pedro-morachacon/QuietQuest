import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'; // assuming you've exported auth from your firebase config

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // state for error message
  const [success, setSuccess] = useState("");  // state for success message

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setError("");  // clear error message upon successful login
        setSuccess("Login Successful!");  // set success message upon successful login
      })
      .catch((error) => {
        setError('Login Failed!');  // set error message from caught error
        setSuccess("");  // clear success message upon error
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        {error && <p style={{ color: 'orange', fontWeight: 'bold' }}>{error}</p>}
        {success && <p style={{ color: 'orange', fontWeight: 'bold' }}>{success}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
