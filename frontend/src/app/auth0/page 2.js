"use client";
import React from "react";
import LoginButton from "@/app/auth0/LoginButton";
import LogoutButton from "@/app/auth0/LogoutButton";
import { Auth0Provider } from "@auth0/auth0-react";
import "./auth0.css";

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
        <section>
        <h1>Quiet Quest</h1>
        <LoginButton />
        <LogoutButton />
          </section>
      </main>
    </Auth0Provider>
  );
}
