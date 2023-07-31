import React, { useState } from "react";

const SavedRouteDropdown = ({ savedRouteData }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleRouteSelection = (route) => {
    // Fill the end search field and location with the selected route's data
    setSavedRouteAddress(route.label);
    setEndLocation(route.value);
    setIsDropdownVisible(false); // Hide the dropdown after a route is selected
  };

  return (
    <div className="saved-routes-dropdown">
      <button
        onMouseEnter={toggleDropdownVisibility}
        onMouseLeave={toggleDropdownVisibility}
      >
        Saved Routes
      </button>
      {isDropdownVisible && (
        <ul>
          {savedRouteData.map((route, index) => (
            <li key={index} onClick={() => handleRouteSelection(route)}>
              {route.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRouteDropdown;
