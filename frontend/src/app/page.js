/* homepage */

"use client"
import React from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./components/DisplayMap'), {
  ssr: false,
});


export default function App() {
  return (
      <main>
    <div className="App">
      {/*<div className="search-params-container">*/}
      {/*  <SearchParamsWithNoSSR />*/}
      {/*</div>*/}
      <div className="map-container">
        <MapWithNoSSR />
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
