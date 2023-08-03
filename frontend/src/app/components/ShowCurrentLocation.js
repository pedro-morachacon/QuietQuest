import {Marker, Popup, useMap} from "react-leaflet";
import React from "react";
import L from "leaflet";
import {startPosIcon} from "@/app/components/DisplayMap";

const ShowCurrentLocation = ({ currentLocation }) => {

    const startPosIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" width="35"><path d="M480-362.391q56 0 101-27.5t71-72.5q-35-29-79-44.5t-93-15.5q-49 0-93 15.5t-79 44.5q26 45 71 72.5t101 27.5Zm0-200q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0 490.522Q315.174-211.261 233.522-329.36q-81.653-118.097-81.653-223.598 0-153.28 98.952-244.227T480-888.131q130.227 0 229.179 90.947t98.952 244.227q0 105.501-81.653 223.598Q644.826-211.261 480-71.869Z"/></svg>
`,
  className: "svg-icon",
});


    const map = useMap();

    if (!currentLocation) {
        return null;
    } else {
        map.setView([currentLocation.lat, currentLocation.lng], 14);
    }

    return (
        <Marker position={currentLocation} icon={startPosIcon}>
            <Popup>Current Location</Popup>
        </Marker>
    );
};

export default ShowCurrentLocation;


