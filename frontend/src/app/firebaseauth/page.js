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

function App() {
  return (
    <div className="App">
      <section>
        <AuthContextProvider>
          <BrowserRouter>
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
          </BrowserRouter>
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
    </div>
  );
}

export default App;
