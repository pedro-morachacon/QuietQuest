import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

// Add a second document with a generated ID.
import { addDoc, collection, getDocs } from "firebase/firestore";
// import "../firebase";
import { db } from "@/app/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);

      // add data to Cloud Firestore
      const docRef = await addDoc(collection(db, "users"), {
        // UserName: username,
        UserEmail: email,
        // UserBorn: birthday,
      });
      console.log("Document written with ID: ", docRef.id);

      // read data from Cloud Firestore
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log("User Data: ", `${doc.id} => ${doc.data().UserName}`);
      });

      // navigate to account page
      navigate("/firebaseauth/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign up for an account</h1>
        <p className="py-2">
          Already have an account yet?{" "}
          <Link to="/firebaseauth" className="underline">
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {/*<div className="flex flex-col py-2">*/}
        {/*  <label className="py-2 font-medium">Username</label>*/}
        {/*  <input*/}
        {/*    onChange={(e) => setUsername(e.target.value)}*/}
        {/*    className="border p-3"*/}
        {/*    type="text"*/}
        {/*    placeholder="Enter your username"*/}
        {/*  />*/}
        {/*</div>*/}

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

        {/*<div className="flex flex-col py-2">*/}
        {/*  <label className="py-2 font-medium">Birth</label>*/}
        {/*  <input*/}
        {/*    onChange={(e) => setBirthday(e.target.value)}*/}
        {/*    className="border p-3"*/}
        {/*    type="text"*/}
        {/*    placeholder="Enter your birthday"*/}
        {/*  />*/}
        {/*</div>*/}

        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
