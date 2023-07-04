"use client";
import React from "react";
import dynamic from "next/dynamic";
import PostTest from "@/app/components/PostTest";

// const MapWithNoSSR = dynamic(() => import('../components/PostTest'), {
//   ssr: false,
// });

export default function App() {
  return (
    <div className="App">
      <PostTest />

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
