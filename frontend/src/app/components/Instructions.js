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
