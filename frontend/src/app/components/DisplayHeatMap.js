import React, {useState, useEffect} from 'react';
import {MapContainer, GeoJSON, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import tileLayer from './tileLayer';
import axios from 'axios';
import Datetimepicker from './Datepicker';
import LocateUserControl from "@/app/components/Locate";
import Geosearch from "@/app/components/Geosearch";
import L from 'leaflet';
import HeatMap from "@/app/components/HeatMap";

const DisplayMap = () => {

    return (
        <div>
            <HeatMap/>
        </div>
    );
};

export default DisplayMap;