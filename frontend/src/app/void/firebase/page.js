"use client";
import React from "react";

import SignIn from "@/app/void/firebase/SignIn";
import SignUp from "@/app/void/firebase/SignUp";
import AuthDetails from "@/app/void/firebase/AuthDetails";
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

