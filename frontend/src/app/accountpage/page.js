"use client";
import React from "react";
import Accountpage from "@/app/accountpage/Accountpage";

import "./account.css";

function App() {
  return (
    <div className="App">
        <section>
        <Accountpage />
        </section>

        <style jsx>{`
          
          //.App {
          //  transform: scale(0.5);
          //}
          
          section {
            width: 100%;
            max-width: 700px;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 1rem;
            background-color: rgba(0, 0, 0, 0.4);
          }
        `}</style>
    </div>

  );
}

export default App;
