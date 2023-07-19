/* homepage */

"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tabs from './components/Tabs'


const MapWithNoSSR = dynamic(() => import('./components/DisplayMap'), {
  ssr: false,
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
      {/*<div className="search-params-container">*/}
      {/*  <SearchParamsWithNoSSR />*/}
      {/*</div>*/}
      <div>
         <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div className="map-container">
        <MapWithNoSSR activeTab={activeTab}/>
      </div>
      <style jsx>{`
        .App {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .search-params-container {
          margin-bottom: 20px;
        }

        .map-container {
          width: 100%;
        }
      `}</style>
    </div>
  </main>
  );
}
