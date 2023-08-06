"use client";
import React from "react";
import { ContactUs } from "@/app/contact/ContactUs";
import "./contact.css";
import PageHeaderTable from "@/app/components/PageHeaderTable";
import RatingStar from "@/app/rating/RatingStar";

function App() {
  return (
    <div className="outer-container">
      <PageHeaderTable />
      <div className="App">
        <section className="account-section">
            {/*<iframe src="./rating"></iframe>*/}
            <RatingStar/>
          <ContactUs />
        </section>

        <style jsx global>{`
          body, html {
            overflow: hidden;
          }

          .outer-container {
            overflow: hidden;
            width: 100vw;
            height: 100vh;
          }

          .App {
            overflow: hidden;
          }

          .account-section {
            transform: scale(0.7);
            transform-origin: top center;
            margin-top: 80px;
            
            width: 100%;
            max-width: 700px;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 1rem;
            //background-color: rgba(0, 0, 0, 0.4);
            background-color: #829BA9;
            color: #394B56;
          }
        `}</style>
      </div>
    </div>
  );
}

export default App;
