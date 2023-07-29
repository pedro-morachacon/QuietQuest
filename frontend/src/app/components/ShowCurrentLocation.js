import {Marker, Popup, useMap} from "react-leaflet";
import React from "react";
import L from "leaflet";

const ShowCurrentLocation = ({ currentLocation }) => {

    const map = useMap();

    const blueIcon = L.icon({
      iconUrl:
        "https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/blue-pushpin.png",
      iconSize: [26, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    map.setView([currentLocation.lat, currentLocation.lng], 14);

    return (
        <Marker position={currentLocation} icon={blueIcon}>
            <Popup>Current Location</Popup>
        </Marker>
    );
};

export default ShowCurrentLocation;


