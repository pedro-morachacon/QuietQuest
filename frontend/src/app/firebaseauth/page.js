"use client";
import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Account from "./Account";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import "./firebaseauth.css";
import "./googleLogin.css";

import dynamic from 'next/dynamic';

const DynamicBrowserRouter = dynamic(
  () => import('react-router-dom').then((mod) => mod.BrowserRouter),
  { ssr: false }
);


function App() {
  return (
    <div className="App">
      <section className="account-section">
        <AuthContextProvider>
          <DynamicBrowserRouter>
            <Routes>
              <Route path="/firebaseauth" element={<Signin />} />
              <Route path="/firebaseauth/signup" element={<Signup />} />
              <Route
                path="/firebaseauth/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </DynamicBrowserRouter>
        </AuthContextProvider>
        <div>
          <a href="http://localhost:3000/contact" className="contact">
            Contact Us
          </a>
        </div>
        <div>
          <a href="http://localhost:3000/resetpwd" className="reset-pwd">
            Forgot Password ?
          </a>
        </div>
      </section>

      <style jsx global>{`
          body, html {
            overflow: hidden;
          }

          .outer-container {
            overflow: hidden;
            width: 100vw;
            height: 100vh;
          }

          .App {
            overflow: hidden;
          }

          .account-section {
            transform: scale(0.8);
            transform-origin: top center;
            margin-top: 20px;
            
            width: 100%;
            max-width: 500px;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 1rem;
            background-color: rgba(0, 0, 0, 0.4);
          }
        `}</style>


    </div>
  );
}

export default App;
