import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserAuth } from "@/app/firebaseauth/AuthContext";
import FirebaseUserName from "@/app/components/FirebaseUserName";
import DisplayNameSetter from "@/app/firebaseauth/DisplayNameSetter";
import "../firebaseauth/firebaseauth.css";
import ImageUploader from "@/app/firebaseauth/ImageUploader";
import UpdatePhotoURL from "@/app/firebaseauth/UpdatePhotoURL";

import AccountUserName from "@/app/accountpage/AccountUserName";
import AccountUserEmail from "@/app/accountpage/AccountUserEmail";
import AccountUserImage from "@/app/accountpage/AccountUserImage";

import EditNameWithPopup from "@/app/accountpage/EditButtonWithPopup";
import EditPhotoButtonWithPopup from "@/app/accountpage/EditPhotoButtonWithPopup";

import AccountLogout from "@/app/accountpage/AccountLogout";
import dynamic from "next/dynamic";
import Signin from "@/app/firebaseauth/Signin";
import Signup from "@/app/firebaseauth/Signup";
import ProtectedRoute from "@/app/firebaseauth/ProtectedRoute";
import Account from "@/app/firebaseauth/Account";
import DeleteAccountButton from "@/app/accountpage/DeleteAccountButton";

import "./account.css";

const DynamicBrowserRouter = dynamic(
  () => import("react-router-dom").then((mod) => mod.BrowserRouter),
  { ssr: false }
);

const Accountpage = () => {
  // const {user, logout} = UserAuth();
  // const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      // await logout();
      // navigate("/firebaseauth");
      window.location.href = "/firebaseauth/";
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  //   const handleNavigation = () => {
  //   window.location.href = "http://localhost:3000"; // Redirect to http://localhost:3000
  //   // navigate("http://localhost:3000"); // Navigate to the root, which is usually the homepage
  // };

  return (
    <div className="max-w-[600px] mx-auto p-4">
      {/*<a href="/">*/}
      {/*  <img*/}
      {/*    src="https://imagizer.imageshack.com/img924/9498/pk6w5C.png"*/}
      {/*    alt=" "*/}
      {/*    width="400"*/}
      {/*    height="100"*/}
      {/*  />*/}
      {/*</a>*/}

      <div>
        <h3 className="text-2xl py-4">Username</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AccountUserName />
          <div style={{ marginLeft: "250px" }}>
            <EditNameWithPopup />
          </div>
        </div>
        <p>Change the username linked to your account</p>
      </div>
      <p>-----------------------------------------------------</p>

      <h3 className="text-2xl py-4">Email</h3>
      <AccountUserEmail />
      <p>Change the email linked to your account</p>
      <p>-----------------------------------------------------</p>

      <div>
        <h3 className="text-2xl py-4">Profile Image</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AccountUserImage />
          <div style={{ marginLeft: "380px" }}>
            <EditPhotoButtonWithPopup />
          </div>
        </div>
        <p>Change the profile image linked to your account</p>
      </div>
      <p>-----------------------------------------------------</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 className="text-2xl py-4">Delete Account</h3>
        <DeleteAccountButton />
      </div>
      <p>Permanently delete your account</p>
      <p>-----------------------------------------------------</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 className="text-2xl py-4">Logout</h3>
        {/*<button onClick={handleLogout} className="border px-6 py-2 my-4">*/}
        {/*  Logout*/}
        {/*</button>*/}
        <DynamicBrowserRouter>
          <AccountLogout />
        </DynamicBrowserRouter>
      </div>
      <p>You can still use QuletQuest after logging out</p>
    </div>
  );
};

export default Accountpage;
