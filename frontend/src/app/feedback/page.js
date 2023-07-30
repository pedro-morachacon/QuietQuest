"use client";
import React from "react";
import "./feedback.css";

function App() {
  return (
    <div>
      <a href="/" className={"App"}>
        <img
          src="https://imagizer.imageshack.com/img924/9498/pk6w5C.png"
          alt=" "
          width="400"
          height="100"
        />
      </a>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSextMT9iyD7CNwkyfN_AoqJrG4rdScDrq4V9ebERZM_EFhPSw/viewform?embedded=true"
        width="100%"
        height="1200"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>

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
