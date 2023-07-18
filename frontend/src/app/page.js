/* homepage */

"use client";
import React from "react";
import dynamic from "next/dynamic";
import "./css/homepage.css";
import Datetimepicker from './components/Datepicker';

const MapWithNoSSR = dynamic(() => import("./components/DisplayMap"), {
  ssr: false,
});

export default function App() {
  return (
    <div className="App">
      {/*<header>*/}
      {/*    <div className="container">*/}
      {/*        <nav className="navbar">*/}
      {/*            <a href="/" className="nav-branding">DEV.</a>*/}
      {/*            <ul>*/}
      {/*                <li className="nav-link"><a href="/">Home</a></li>*/}
      {/*                <li className="nav-link"><a href="/">About</a></li>*/}
      {/*                <li className="nav-link"><a href="/">Home</a></li>*/}
      {/*            </ul>*/}
      {/*        </nav>*/}
      {/*    </div>*/}
      {/*</header>*/}
      <div className="map-container">
        <MapWithNoSSR />
      </div>

      <style jsx>{`
        .App {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .map-container {
          width: 95%;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
