"use client";
import React from "react";

import { ContactUs } from "@/app/contact/ContactUs";
// import "../firebase/firebase.css";
import "./contact.css";
import PageHeaderTable from "@/app/components/PageHeaderTable";
import Accountpage from "@/app/accountpage/Accountpage";

// function App() {
//   return (
//     <div className="App">
//       <section>
//         <a href="/">
//           <img
//             src="https://imagizer.imageshack.com/img924/9498/pk6w5C.png"
//             alt=" "
//             width="200"
//             height="200"
//           />
//         </a>
//         <h1 className="text-2xl font-bold py-2">Contact Us</h1>
//         <iframe src="http://localhost:3000/rating"></iframe>
//         <ContactUs />
//         <div>
//           <a href="http://localhost:3000/firebaseauth" className="home-page">
//             Back
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// }

function App() {
  return (
    <div className="outer-container">
      <PageHeaderTable />
      <div className="App">
        <section className="account-section">
            <iframe src="http://localhost:3000/rating"></iframe>
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
            margin-top: 150px;
            
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
    </div>
  );
}

export default App;
