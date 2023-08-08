/* homepage */

"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Tabs from "./components/Tabs";
import "./globals.css";
import PageHeaderTable from "./components/PageHeaderTable";

const MapWithNoSSR = dynamic(() => import("./components/DisplayMap"), {
  ssr: false,
});

export default function App() {
  const [activeTab, setActiveTab] = useState("");
  // Initialize the activeTab state

  useEffect(() => {
    // Code to run when the activeTab changes
    // You can add any side effects or logic here
    console.log("activeTab changed:", activeTab);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update the activeTab state when the tab is changed
  };

  return (
    <main>
      <div className="App">
        <div>
          <PageHeaderTable />
        </div>
        <div className="main-body">
          <div className="tab-container">
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          <div className="map-container">
            <MapWithNoSSR activeTab={activeTab} />
          </div>
        </div>
      </div>
    </main>
  );
}
