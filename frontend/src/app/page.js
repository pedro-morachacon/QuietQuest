/* homepage */

"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tabs from './components/Tabs';
import "./weather/weather.css";
import PageHeaderTable from './components/PageHeaderTable';


const MapWithNoSSR = dynamic(() => import("./components/DisplayMap"), {
  ssr: false,
});

const WeatherWithNoSSR = dynamic(() => import("./weather/weather-cards2"),
    { ssr: false,
    });

export default function App() {


  const [activeTab, setActiveTab] = useState('');
  // Initialize the activeTab state


  useEffect(() => {
    // Code to run when the activeTab changes
    // You can add any side effects or logic here
    console.log('activeTab changed:', activeTab);
  }, [activeTab]);


  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update the activeTab state when the tab is changed
  };

  return (
      <main>
    <div className="App">

      <div><PageHeaderTable /></div>
      <div className='main-body'>
      <div className='tab-container'>
         <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div className="map-container">
        <MapWithNoSSR activeTab={activeTab}/>
      </div>
      <div className="weather-text">
        <WeatherWithNoSSR />
      </div>
      </div>
      <style jsx>{`
        html, body {
        height: 100vh;
        width: 100vw;
        }
        .tab-container{
          margin-top: 40px;
        }
        .main-body{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .map-container {
          width: 95%;
          z-index: 1;
        }
      `}</style>
    </div>
  </main>
  );
}
