import {Marker, Popup, useMap} from "react-leaflet";
import React from "react";
import L from "leaflet";
import {startPosIcon} from "@/app/components/DisplayMap";

const ShowCurrentLocation = ({ currentLocation, startPosIcon }) => {

    const map = useMap();

    map.setView([currentLocation.lat, currentLocation.lng], 14);

    return (
        <Marker position={currentLocation} icon={startPosIcon}>
            <Popup>Current Location</Popup>
        </Marker>
    );
};

export default ShowCurrentLocation;


