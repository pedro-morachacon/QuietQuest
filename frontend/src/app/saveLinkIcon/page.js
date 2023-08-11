"use client";
import React from "react";
import Weather from "./SaveLinkIcon"; // Make sure to update the path

function App() {
  return (
    <div className="App">
      <style>{`
        svg {
          fill: black;
        }
      `}</style>
      <Weather />

    </div>
  );
}


export default App;