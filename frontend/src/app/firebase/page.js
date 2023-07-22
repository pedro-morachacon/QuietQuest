"use client";
import React from "react";

import SignIn from "@/app/firebase/SignIn";
import SignUp from "@/app/firebase/SignUp";
import AuthDetails from "@/app/firebase/AuthDetails";
import "./firebase.css";

function App() {
  return (
    <div className="App">
      <section>
        <SignIn />
        <SignUp />
        <AuthDetails />
      </section>
    </div>
  );
}

export default App;

