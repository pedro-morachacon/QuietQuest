import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Instructions = ({ instructionsData }) => {
  const [instructionSteps, setInstructionSteps] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [next, setNext] = useState(100); // Next step index to load
  const [isLoading, setIsLoading] = useState(true); // Added this state so Loading with desappear agfter intructions are loaded


  useEffect(() => {
    if (instructionsData && instructionsData.segments[0]) {
      const steps = instructionsData.segments[0].steps;
      setInstructionSteps(steps.slice(0, Math.min(next, steps.length)));
      if(next >= steps.length) {
        setHasMore(false);
      }
    }
  }, [instructionsData, next]);

  const fetchMoreData = () => {
    // If there are no more instructions to load, set hasMore to false
    if (next >= instructionsData.segments[0].steps.length) {
      setHasMore(false);
      return;
    }



     // Fetch more instruction steps after 1.5 sec delay (imitate network request)
  setTimeout(() => {
    setNext(next + 10);
  }, 1500); // Also, this should probably be 1500ms not 100ms, according to the comment above
};

  return (
    <div id="parentScrollDiv" style={{ height: 205, overflow: "auto" }}>
      <InfiniteScroll
        dataLength={instructionSteps.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={isLoading ? <h4 id="loader">Loading...</h4> :null}
      >
        <div>
          <ul className="instructions-list">
            {instructionSteps.map((step, index) => (
              <li id= "instructions-list-item" key={index}>
                {index + 1}. {step.instruction}
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
