// map component for the site
import React, { useState } from 'react';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import tileLayer from './tileLayer';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const DisplayMap = () => {
  const [optimalDirections, setOptimalDirections] = useState(null);
  const [avoidanceDirections, setAvoidanceDirections] = useState(null);

  /* on load send a GET request to the backend to get the coordinates data and the noise/busyness value
  from the model for each coordinate */
  axios.get('http://localhost:8000/')
      .then((res) => {
          // code to render the heatmap goes here
          console.log(res);
      }).catch((error) => {
          console.error('Error:', error)
  })

  // onclick, POST operation to backend django for api call
  const handleClick = () => {
    axios
      .post('http://localhost:8000/directions/', [
        [11.653361, 52.144116],
        [11.62847, 52.1303],
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
      <div id="map">
        <MapContainer center={[52.136096, 11.635208]} zoom={14}>
          <TileLayer {...tileLayer} />
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
