"use client";
import React from "react";
import dynamic from 'next/dynamic';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Navbar from "@/app/sidebar/Navbar";

// import Navbar from "@/app/navbar/Navbar";
const NavbarWithNoSSR = dynamic(() => import('./Navbar'), {
  ssr: false
});




function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    </div>
  );
}

export default App;
