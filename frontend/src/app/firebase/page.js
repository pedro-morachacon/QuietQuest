"use client";
import React from "react";

import Signup from "@/app/firebase/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider} from "@/app/firebase/AuthContext";

export default function App() {
  return (
      <AuthProvider>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxHeight: "400px" }}>
        <Signup />
      </div>
    </Container>
        </AuthProvider>
  );
}
