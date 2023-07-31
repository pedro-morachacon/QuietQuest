"use client";
import React from "react";

import { ContactUs } from "@/app/contact/ContactUs";
// import "../firebase/firebase.css";
import "./contact.css";

function App() {
  return (
    <div className="App">
      <section>
        <a href="/">
          <img
            src="https://imagizer.imageshack.com/img924/9498/pk6w5C.png"
            alt=" "
            width="200"
            height="200"
          />
        </a>
        <h1 className="text-2xl font-bold py-2">Contact Us</h1>
        <iframe src="http://localhost:3000/rating"></iframe>
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
