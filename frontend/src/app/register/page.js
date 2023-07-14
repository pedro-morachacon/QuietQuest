"use client";
import React from "react";
import dynamic from "next/dynamic";
import Routing2 from "@/app/components/Routing2";
import Login from "@/app/login/Login";
import Register from "@/app/register/Register";


export default function App() {
  return (
    <main className="App">
        {/*<Login/>*/}
        <Register />
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