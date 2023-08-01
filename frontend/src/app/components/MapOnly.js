import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import ShowCurrentLocation from "@/app/components/ShowCurrentLocation";
import HeatMap from "@/app/components/HeatMap";
import L from 'leaflet';
import tileLayer from './tileLayer';
import CommunityDistricts from "../geojson/CommunityDistricts.json";

const redIcon = L.icon({
  iconUrl: "https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png",
  iconSize: [26, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const blueIcon = L.icon({
  iconUrl: "https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/blue-pushpin.png",
  iconSize: [26, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapOnly= ({ startMarkerPosition, endMarkerPosition, currentLocation, heatmapData, showHeatmap, optimalDirections, avoidanceDirections }) => {
  const setColor = ({ properties }) => {
    return { weight: 1 };
  };
  
  return (
    <div id="map">
    <MapContainer
      center={[40.76657321777155, -73.9831392189498]}
      zoom={12}
    >
      {/* Display start marker */}
      {startMarkerPosition && (
        <Marker position={startMarkerPosition} icon={redIcon}>
          <Popup>Start Location</Popup>
        </Marker>
      )}

      {/* Display end marker */}
      {endMarkerPosition && (
        <Marker position={endMarkerPosition} icon={blueIcon}>
          <Popup>End Location</Popup>
        </Marker>
      )}

      {/* Display currentLocation marker */}
      {currentLocation && (
        <ShowCurrentLocation currentLocation={currentLocation} />
      )}
      <TileLayer {...tileLayer} />

      <GeoJSON data={CommunityDistricts} style={setColor} />
      {showHeatmap && <HeatMap heatmapData={heatmapData} />}
  
      {optimalDirections && (
        <GeoJSON data={optimalDirections} color="purple" weight={5} />
      )}
      {/* displays route avoiding polygons*/}
      {avoidanceDirections && (
        <GeoJSON data={avoidanceDirections} color="white" weight={5} />
      )}
    </MapContainer>
  
    </div>
  );
};

export default MapOnly;
