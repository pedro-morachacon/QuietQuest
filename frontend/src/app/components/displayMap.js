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
import RoutingMachine from "@/app/components/RoutingMachine";



const myIcon = L.icon({
    iconUrl: 'https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png',
    iconSize: [26, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});


const DisplayMap = () => {
  const [optimalDirections, setOptimalDirections] = useState(null);
  const [avoidanceDirections, setAvoidanceDirections] = useState(null);

  /* on load send a GET request to the backend to get the coordinates data and the noise/busyness value
  from the model for each coordinate */
  axios.get('http://localhost:8000/')
      .then((res) => {
          // code to render the heatmap on load goes here
          console.log(res);
      }).catch((error) => {
          console.error('Error:', error)
  })

  // onclick, POST operation to backend django for api call
  const handleClick = () => {

    axios
      .post('http://localhost:8000/directions/', [
          // add inputs for start and destination for routing
        [11.653361, 52.144116], // start coordinates
        [11.62847, 52.1303], // destination coordinates
          // from Datepicker
          // time goes here e.g. "09:40:52"
          // date goes here e.g. "Wed Jun 28 2023"
      ])
      .then((res) => {
          setOptimalDirections(res.data.optimal_directions);
          setAvoidanceDirections(res.data.avoidance_directions);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

    return (
        <div>
            <div><img src="https://upload.cc/i1/2023/06/25/UDz3pI.png" alt=" " width={200} height={200}/></div>
            <div id='datepicker'>
                <Datetimepicker/>
            </div>
            <div id="map">
                <MapContainer center={[52.136096, 11.635208]} zoom={14}>
                    <TileLayer {...tileLayer} />
                    <Geosearch/>
                    <LocateUserControl/>
                    <RoutingMachine/>
                    {/*<Marker position={[52.136096, 11.635208]} icon={myIcon}>*/}
                    {/*    <Popup>*/}
                    {/*      52.136096, 11.635208*/}
                    {/*    </Popup>*/}
                    {/*</Marker>*/}
                    {/* displays optimal route */}
                    {optimalDirections && (
                        <GeoJSON
                            data={optimalDirections}
                            strokeColor="red"
                            fillColor="green"
                            weight={2}
                        />)}
                    {/* displays route avoiding polygons*/}
                    {avoidanceDirections && (
                        <GeoJSON
                            data={avoidanceDirections}
                            strokeColor="blue"
                            fillColor="yellow"
                            weight={2}
                        />)}
                </MapContainer>
            </div>
            <div>
                {/* test button to check rest framework is working correctly */}
                <button type="button" onClick={handleClick}>
                    Click Me
                </button>
            </div>
        </div>
    );
};

export default DisplayMap;
