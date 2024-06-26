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
        if (savedRouteAddress !== "" && !startLocation) {
            currentLocationClick();
        }
    }, [savedRouteAddress]);

  return (
      <button className="button-onclick" onClick={currentLocationClick} style={{ padding: "0 0 12px 0" }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M436.413-77.935v-36.413Q310.696-128.587 219.522-220q-91.174-91.413-105.174-216.413H77.935q-18.525 0-31.056-12.531Q34.348-461.476 34.348-480t12.53-31.056q12.532-12.531 31.057-12.531h36.413Q128.587-649.304 220-740.478q91.413-91.174 216.413-105.174v-36.413q0-18.525 12.531-31.056 12.532-12.531 31.056-12.531t31.056 12.531q12.531 12.531 12.531 31.056v36.413q125 14 216.413 105.174 91.413 91.174 105.652 216.891h36.413q18.525 0 31.056 12.531 12.531 12.532 12.531 31.056t-12.531 31.056q-12.531 12.531-31.056 12.531h-36.413q-14 125-105.174 216.413-91.174 91.413-216.891 105.652v36.413q0 18.525-12.531 31.056Q498.524-34.348 480-34.348t-31.056-12.53q-12.531-12.532-12.531-31.057ZM480-202.87q115.043 0 196.087-81.043Q757.13-364.957 757.13-480q0-115.043-81.043-196.087Q595.043-757.13 480-757.13q-115.043 0-196.087 81.043Q202.87-595.043 202.87-480q0 115.043 81.043 196.087Q364.957-202.87 480-202.87ZM480-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm-.036-87.413q29.927 0 51.275-21.312t21.348-51.239q0-29.927-21.312-51.275t-51.239-21.348q-29.927 0-51.275 21.312t-21.348 51.239q0 29.927 21.312 51.275t51.239 21.348ZM480-480Z" fill="#394B56"/></svg>
      </button>
  );
};

export default CurrentLocation;
