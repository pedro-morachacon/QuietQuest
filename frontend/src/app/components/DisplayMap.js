import React, {useState, useEffect} from 'react';
import {MapContainer, GeoJSON, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import tileLayer from './tileLayer';
import axios from 'axios';
import Datetimepicker from './Datepicker';
import LocateUserControl from "@/app/components/Locate";
import Geosearch from "@/app/components/Geosearch";
// import L from 'leaflet';
// import RoutingMachine from "@/app/components/RoutingMachine";
import Routing from "./Routing";
import CommunityDistricts from "../geojson/CommunityDistricts.json";
import HeatMap from "@/app/components/HeatMap";
import Routing2 from "@/app/components/Routing2";
import Datepicker from "./Datepicker";
import '../css/map.css';

import WeatherCards from "@/app/weather/weather-cards";
import "../weather/weather.css";


const myIcon = L.icon({
    iconUrl: 'https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png',
    iconSize: [26, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});


const DisplayMap = ({ activeTab }) => {

    const setColor = ({properties}) => {
        return {weight: 1};
    };

    const [optimalDirections, setOptimalDirections] = useState(null);
    const [avoidanceDirections, setAvoidanceDirections] = useState(null);
    // onclick, POST operation to backend django for api call

    const startTime = Date.now();  // start time
    // const location = [[-73.941297, 40.818077], [-73.950334, 40.779839]];
    const location2 = "-73.941297, 40.818077, -73.950334, 40.779839"; // changed here, replicates the string like the error
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const routingClick = () => {
        axios
            .post('http://localhost:8000/directions/', {
                // fixed locations values at the moment, should come from start and end points inputted into GeoSearch
                "locations" : location,
                "time" : time, // time goes here e.g. "09:40:52"
                "date" : date, // date goes here e.g. "04/07/2023"
            })
            .then((res) => {

                console.log(res.data);

                // Calculate Time
                const endTime = Date.now();  // end time
                const timeTaken = (endTime - startTime) / 1000;  // time taken in seconds
                console.log(`Time taken for the request: ${timeTaken} seconds`);

                setOptimalDirections(res.data.optimal_directions);
                setAvoidanceDirections(res.data.avoidance_directions);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const [heatmapData, setHeatmapData] = useState(null);
    const [showHeatmap, setShowHeatmap] = useState(false);

  const noiseHeatmapClick = () => {
      // gets noise login
      setHeatmapData(null); // Clear existing heatmap data
      setShowHeatmap(false);
    axios
        .post('http://localhost:8000/noiseheatmap/', {
                "time" : time, // time goes here e.g. "09:40:52"
                "date" : date, // date goes here e.g. "04/07/2023"
            })
        .then((res) => {
       
            setHeatmapData(res.data);
            setShowHeatmap(true);
        })
        .catch((error) => {
            console.error('Error fetching login data:', error);
        });
  };

  const busynessHeatmapClick = () => {
    setHeatmapData(null); // Clear existing heatmap data
    setShowHeatmap(false);
    // gets busyness heatmap
    axios
        .post('http://localhost:8000/busynessheatmap/', {
                "time" : time, // time goes here e.g. "09:40:52"
                "date" : date, // date goes here e.g. "04/07/2023"
            })
        .then((res) => {
        
            setHeatmapData(res.data);
            setShowHeatmap(true);
        })
        .catch((error) => {
            console.error('Error fetching login data:', error);
        });
  };

  const combinedHeatmapClick = () => {
    // gets combined heatmap
    setHeatmapData(null); // Clear existing heatmap data
    setShowHeatmap(false);
    axios
        .post('http://localhost:8000/combinedheatmap/', {
                "time" : time, // time goes here e.g. "09:40:52"
                "date" : date, // date goes here e.g. "04/07/2023"
            })
        .then((res) => {     
            setHeatmapData(res.data);
            setShowHeatmap(true);
        })
        .catch((error) => {
            console.error('Error fetching heatmap data:', error);
        });
  };



  useEffect(() => {



    switch(activeTab) {
      case 'noise':
       
        noiseHeatmapClick();
        break;
      case 'crowds':
       
        busynessHeatmapClick();
        break;
      case 'both':
     
        combinedHeatmapClick();
        break;
    case 'map-only':
        setHeatmapData([]);  // Indicate that heatmap layer should be removed
        break;
    
        
      default:
        break;
    }
  }, [activeTab, date, time]);



    return (
        <div>
            {/*<div><img src="https://upload.cc/i1/2023/06/25/UDz3pI.png" alt=" " width={200} height={200}/></div>*/}
            <div id='datepicker'>
                <Datetimepicker setDate={setDate} setTime={setTime} />
            </div>
      
            <div id="map">
                <MapContainer center={[40.76657321777155, -73.9831392189498]} zoom={10}>
                    <TileLayer {...tileLayer} />
                    {/*<Routing setLocation={setLocation}/>*/}
                    <Routing2 setLocation={setLocation}/>
                    <GeoJSON
                        data={CommunityDistricts}
                        style={setColor}/>
                    <Geosearch/>
                    <LocateUserControl/>
                    {showHeatmap && <HeatMap heatmapData={heatmapData} />}
                    {/*<Marker position={[52.136096, 11.635208]} icon={myIcon}>*/}
                    {/*    <Popup>*/}
                    {/*      52.136096, 11.635208*/}
                    {/*    </Popup>*/}
                    {/*</Marker>*/}
                    {/* displays optimal route */}
                    {optimalDirections && (
                        <GeoJSON
                            data={optimalDirections}
                            color="purple"
                            weight={5}
                        />)}
                    {/* displays route avoiding polygons*/}
                    {avoidanceDirections && (
                        <GeoJSON
                            data={avoidanceDirections}
                            color="white"
                            weight={5}
                        />)}
                </MapContainer>
            </div>
            {/*<div>*/}
            {/*    <iframe src="https://weather-app-live.netlify.app"></iframe>*/}
            {/*</div>*/}
            <div className="weather-text">
                <WeatherCards />
            </div>
        </div>
    );
};

export default DisplayMap;
