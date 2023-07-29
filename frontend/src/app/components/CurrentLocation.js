import React, { useEffect, useState } from "react";

const CurrentLocation = ({ setCurrentLocation}) => {
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

  return (
      <button className="button-onclick" onClick={currentLocationClick}>
          {'\u2316'}
      </button>
  );
};

export default CurrentLocation;
