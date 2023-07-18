"use client";
import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Account from "./Account";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import './firebaseauth.css';

function App() {
  return (
    <div className="App">
      <section>
        {/*<h3 className='text-center text-2xl font-bold'>*/}
        {/*  Firebase Auth & Context*/}
        {/*</h3>*/}
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
      </section>
    </div>
  );
}

export default App;
