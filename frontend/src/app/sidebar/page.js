"use client";
import React from "react";
// import dynamic from 'next/dynamic';
// import {Route, Routes, BrowserRouter} from "react-router-dom";

import Sidebar from "@/app/sidebar/Sidebar";
import "./sidebar.css";




function App() {
  return (
    <div className="App">
        {/*<BrowserRouter>*/}
            <Sidebar/>
        {/*</BrowserRouter>*/}
    </div>
  );
}

export default App;
