"use client";
import React from "react";
import dynamic from "next/dynamic";
import Routing2 from "@/app/components/Routing2";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "@/app/login/Login";

const MapWithNoSSR = dynamic(() => import('../components/Routing2'), {
  ssr: false,
});

const LoginWithNoSSR = dynamic(() => import('./Login'), {
  ssr: false,
});

export default function App() {
  return (
    <main className="App">
        <Login/>
    </main>
  );
}



// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         {/* 其他路由... */}
//       </Routes>
//     </Router>
//   );
// }
//
// export default App;