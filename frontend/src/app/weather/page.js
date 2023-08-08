"use client";
import React from "react";
import Weather from "./Weather";
import DirectionDropDown from "./Direction_drop_down"; // Make sure to update the path

function App() {
  return (
    <div className="App">
      <style>{`
        svg {
          fill: #b8cbd6;
        }
      `}</style>
      <Weather />
      <DirectionDropDown />
    </div>
  );
}

export default App;
