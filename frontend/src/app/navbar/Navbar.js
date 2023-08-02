import React from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";

import FirebaseUserName from "@/app/components/FirebaseUserName";


export const Navbar = () => {
  return (
    <nav>
        <a href="/">
        <img
          src="https://upload.cc/i1/2023/07/28/2xVIi7.png"
          alt=" "
          width="200"
          height="50"
        />
      </a>
        {/*<Link to="/" className="title">Website</Link>*/}
        {/*<div className={"menu"}>*/}
        {/*    <span></span>*/}
        {/*    <span></span>*/}
        {/*    <span></span>*/}
        {/*</div>*/}
      <ul>
        <FirebaseUserName/>
      </ul>
    </nav>
  );
};

export default Navbar;
