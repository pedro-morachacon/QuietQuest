import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

import FirebaseUserDetails from "@/app/firebaseauth/FirebaseUserDetails";
import DisplayNameSetter from "@/app/firebaseauth/DisplayNameSetter";


const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/firebaseauth");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleNavigation = () => {
    window.location.href = "http://localhost:3000"; // Redirect to http://localhost:3000
    // navigate("http://localhost:3000"); // Navigate to the root, which is usually the homepage
  };

  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4">User Account</h1>
      {/*<p>User Email: {user && user.email}</p>*/}
      {/*<div>*/}
      {/*  <DisplayNameSetter />*/}
      {/*</div>*/}
      <DisplayNameSetter />
      <FirebaseUserDetails />
      <button
        onClick={handleNavigation}
        className="border px-6 py-2 my-4 ml-4 mr-4"
      >
        Homepage
      </button>
      <button onClick={handleLogout} className="border px-6 py-2 my-4">
        Logout
      </button>
    </div>
  );
};

export default Account;
