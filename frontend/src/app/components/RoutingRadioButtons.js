import React from "react";

const RoutingRadioButtons = ({ selectedValue, setSelectedRadioButton }) => {

    const handleRadioChange = (event) => {
        setSelectedRadioButton(event.target.value);
    };

  return (
      <div>
          <div>
              <input
                type="radio"
                id="avoid_noise"
                value="noise"
                name="routingOptions"
                onChange={handleRadioChange}
              />
              <label htmlFor="avoid_noise">Avoid Noise</label>
          </div>
          <div>
              <input
                type="radio"
                id="avoid_crowds"
                value="crowds"
                name="routingOptions"
                onChange={handleRadioChange}
              />
              <label htmlFor="avoid_crowds">Avoid Crowds</label>
          </div>
          <div>
              <input
                type="radio"
                id="avoid_both"
                value="both"
                name="routingOptions"
                checked={selectedValue === "both"}
                onChange={handleRadioChange}
              />
              <label htmlFor="avoid_both">Avoid Both</label>
          </div>
    </div>
  );
};

export default RoutingRadioButtons;
