"use client";
import React from "react";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <style>{`
        svg {
          fill: #b8cbd6;
        }
      `}</style>
      <Weather />
    </div>
  );
}


export default App;
