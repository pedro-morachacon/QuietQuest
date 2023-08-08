"use client";
import React from "react";

import ResetPassword from "@/app/resetpwd/ResetPassword";
import "./resetpwd.css";

function App() {
  return (
    <div className="App">
      <section>
        <h1 className="text-2xl font-bold py-2">Reset Password</h1>
        <ResetPassword />
        <div>
          <a href="./firebaseauth" className="home-page">
            Back
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
