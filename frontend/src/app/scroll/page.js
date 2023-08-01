"use client";
import React from "react";
import Scroll from "@/app/scroll/Scroll";

function App() {
  return (
    <div className="App">
      <Scroll />

      <style jsx>{`
        .App {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default App;
