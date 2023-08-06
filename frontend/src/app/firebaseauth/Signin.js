import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

import { signInWithGoogle } from "@/app/firebaseauth/GoogleLogin";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const [success, setSuccess] = useState(""); // state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // setSuccess("Login Successful!");  // set success message upon successful login

    // Log user login details (WARNING: Be careful about logging passwords, especially in production!)
    console.log(`Attempting to sign in with
    Email: ${email}
    Password: ${password}`);

    try {
      await signIn(email, password);
      // window.location.href = "http://localhost:3000"; // Redirect to http://localhost:3000
      // navigate("/firebaseauth/account");
      window.location.href = "./";
      setSuccess("Login Successful!");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      setError("Login Failed!"); // clear error message upon successful login
      setSuccess("");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <div>
        <div className="center-container">
          <a href="/">
            <img
              src="https://imagizer.imageshack.com/img924/9498/pk6w5C.png"
              alt=" "
              width="200"
              height="200"
            />
          </a>
        </div>
        <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
        {error && (
          <p style={{ color: "orange", fontWeight: "bold" }}>{error}</p>
        )}
        {success && (
          <p style={{ color: "orange", fontWeight: "bold" }}>{success}</p>
        )}
        <p className="py-2">
          Do not have an account yet?{" "}
          <Link to="/firebaseauth/signup" className="underline">
            Sign up.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <button className="border border-green-600 bg-blue-600 hover:bg-blue-500 w-full my-2 text-white" style={{ backgroundColor: 'rgba(57,75,86,255)' }}>
          Sign In
        </button>
        <button
          onClick={signInWithGoogle}
          type="button"
          className="login-with-google-btn"
        >
          Sign in with Google
        </button>
        {/*<h1>{localStorage.getItem("name")}</h1>*/}
        {/*<h1>{localStorage.getItem("email")}</h1>*/}
        {/*<img src={localStorage.getItem("profilePic")}/>*/}
      </form>
      <style jsx>{`
        .center-container {
          display: flex;
          justify-content: center; /* Horizontally center */
          align-items: center; /* Vertically center */
        }
      `}</style>
    </div>
  );
};

export default Signin;
