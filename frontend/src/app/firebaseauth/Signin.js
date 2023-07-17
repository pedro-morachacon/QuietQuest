import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

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
    try {
      await signIn(email, password);
      navigate("/firebaseauth/account");
      setSuccess("Login Successful!");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      setError("Login Failed!"); // clear error message upon successful login
      setSuccess("");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
        {error && (
          <p style={{ color: "orange", fontWeight: "bold" }}>{error}</p>
        )}
        {success && (
          <p style={{ color: "orange", fontWeight: "bold" }}>{success}</p>
        )}
        <p className="py-2">
          Don't have an account yet?{" "}
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
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3"
            type="password"
          />
        </div>
        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
