import React, { useEffect, useState } from "react";

const CurrentLocation = ({ setCurrentLocation, savedRouteAddress, startLocation }) => {
    const currentLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                }
            );
        }
    };

    useEffect(() => {
        if (savedRouteAddress !== "" && startLocation) {
            currentLocationClick();
        }
    }, [savedRouteAddress]);

  return (
      <button className="button-onclick" onClick={currentLocationClick}>
          {'\u2316'}
      </button>
  );
};

export default CurrentLocation;
