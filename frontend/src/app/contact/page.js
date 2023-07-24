"use client";
import React from "react";

import {ContactUs} from "@/app/contact/ContactUs";
// import "../firebase/firebase.css";
import "./contact.css";

function App() {
  return (
    <div className="App">
      <section>
          <h1 className="text-2xl font-bold py-2">Contact Us</h1>
        <ContactUs />
          <div>
          <a href="http://localhost:3000/firebaseauth" className="home-page">
            Back
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
