"use client";
import React from "react";
import dynamic from "next/dynamic";
import Routing2 from "@/app/components/Routing2";

const MapWithNoSSR = dynamic(() => import('../components/Routing2'), {
  ssr: false,
});

export default function App() {
  return (
    <div className="App">
      <Routing2 />
      <style jsx>{`
        .App {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 800px;
        }
      `}</style>
    </div>
  );
}
