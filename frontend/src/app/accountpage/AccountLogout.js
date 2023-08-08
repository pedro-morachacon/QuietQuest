import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const AccountLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        // navigate('/firebaseauth');
        window.location.href = "/firebaseauth";
      })
      .catch((error) => {
        console.error("An error happened during sign-out:", error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default AccountLogout;
