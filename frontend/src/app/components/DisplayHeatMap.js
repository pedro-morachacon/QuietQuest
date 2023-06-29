import React, {useState, useEffect} from 'react';
import {MapContainer, GeoJSON, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import "./HeatMap";
import CommunityDistricts from "@/app/components/CommunityDistricts.json";
import HeatmapMap2 from "@/app/components/HeatMap";

const DisplayMap = () => {

    return (
        <div>
            <HeatmapMap2/>
        </div>
        // <div id="map">
        //         <MapContainer center={[40.7283, -73.9942]} zoom={10}>
        //             <TileLayer {...tileLayer} />
        //             <HeatmapMap2 />
        //         </MapContainer>
        //     </div>
    );
};

export default DisplayMap;