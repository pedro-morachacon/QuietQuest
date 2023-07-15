"use client";
import React from "react";
import LoginButton from "@/app/components/LoginButton";
import LogoutButton from "@/app/components/LogoutButton";
import { Auth0Provider } from "@auth0/auth0-react";
import "../login/login.css";

export default function App() {
  return (
    <Auth0Provider
      domain="dev-y6t510jqaw8jsdi6.us.auth0.com"
      clientId="CDZE5G4yNMZ7QiVNQJ8XKr2jWuArddVB"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <main className="App">
        <h1>QuietQuest Login</h1>
        <LoginButton />
        <LogoutButton />
      </main>
    </Auth0Provider>
  );
}
