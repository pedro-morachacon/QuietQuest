import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Instructions = ({ instructionsData }) => {
  const [instructionSteps, setInstructionSteps] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [next, setNext] = useState(100); // Next step index to load

  useEffect(() => {
    if (instructionsData && instructionsData.segments[0]) {
      const steps = instructionsData.segments[0].steps;
      setInstructionSteps(steps.slice(0, next));
    }
  }, [instructionsData, next]);

  const fetchMoreData = () => {
    // If there are no more instructions to load, set hasMore to false
    if (next >= instructionSteps.length) {
      setHasMore(false);
      return;
    }

    // Fetch more instruction steps after 1.5 sec delay (imitate network request)
    setTimeout(() => {
      setNext(next + 10);
    }, 100);
  };

  return (
    <div id="parentScrollDiv" style={{ height: 200, overflow: "auto" }}>
      <InfiniteScroll
        dataLength={instructionSteps.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        // height={500}  // Set the scroll height to 500 pixels
      >
        <div>
          <ul>
            {instructionSteps.map((step, index) => (
              <li key={index}>
                {step.instruction}
                {index !== instructionSteps.length - 1 &&
                  ` and continue for ${step.distance}m`}
              </li>
            ))}
          </ul>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Instructions;






















// import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
//
// const Instructions = ({ instructionsData }) => {
//   const [instructionSteps, setInstructionSteps] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [next, setNext] = useState(200);
//   const [showPopup, setShowPopup] = useState(false);
//
//   useEffect(() => {
//     if (instructionsData && instructionsData.segments[0]) {
//       const steps = instructionsData.segments[0].steps;
//       setInstructionSteps(steps.slice(0, next));
//     }
//   }, [instructionsData, next]);
//
//   const fetchMoreData = () => {
//     if (next >= instructionSteps.length) {
//       setHasMore(false);
//       return;
//     }
//
//     setTimeout(() => {
//       setNext(next + 10);
//     }, 1500);
//   };
//
//   return (
//     <div>
//       <button onClick={() => setShowPopup(true)}>Instruction</button>
//
//       {showPopup && (
//         <>
//           <div className="overlay"></div>
//           <div className="popup">
//             <div className="popup-header">
//               <span>Instruction</span>
//               <button onClick={() => setShowPopup(false)}>close</button>
//             </div>
//             <InfiniteScroll
//               dataLength={instructionSteps.length}
//               next={fetchMoreData}
//               hasMore={hasMore}
//               loader={<h4>Loading...</h4>}
//             >
//               <ul>
//                 {instructionSteps.map((step, index) => (
//                   <li key={index}>
//                     {step.instruction}
//                     {index !== instructionSteps.length - 1 &&
//                       ` and continue for ${step.distance}m`}
//                   </li>
//                 ))}
//               </ul>
//             </InfiniteScroll>
//           </div>
//         </>
//       )}
//
//       <style jsx>{`
//         .overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: rgba(0, 0, 0, 0.7);
//           z-index: 999;
//         }
//
//         .popup {
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           width: 50%;
//           height: 30%;
//           background-color: white;
//           overflow-y: auto;
//           padding: 20px;
//           box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
//           transform: translate(-50%, -50%);
//           z-index: 1000;
//         }
//
//         .popup-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 5px 10px;
//           background-color: #f7f7f7;
//           border-bottom: 1px solid #e0e0e0;
//         }
//
//         .popup-header button {
//           background: none;
//           border: none;
//           font-size: 20px;
//           cursor: pointer;
//           padding: 0;
//           margin: 0;
//           color: red; // 讓關閉按鈕的顏色為紅色，使其更為明顯
//         }
//       `}</style>
//     </div>
//   );
// };
//
// export default Instructions;


