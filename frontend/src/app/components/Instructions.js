import React, { useEffect, useState } from "react";

const Instructions = ({ instructionsData }) => {
  const [instructionSteps, setInstructionSteps] = useState([]);

  useEffect(() => {
    if (instructionsData && instructionsData.segments[0]) {
      const steps = instructionsData.segments[0].steps;
      setInstructionSteps(steps);
    }
  }, [instructionsData]);

  if (!instructionSteps.length) {
    // If instructionSteps is an empty array (data not fetched yet), return null
    return null;
  }

  return (
    <div>
      <ul>
        {instructionSteps.map((step, index) => (
          <li key={index}>
            {step.instruction}
            {index !== instructionSteps.length - 1 && ` and continue for ${step.distance}m`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Instructions;
