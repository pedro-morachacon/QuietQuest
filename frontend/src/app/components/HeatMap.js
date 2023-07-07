import React, {useEffect} from "react";
import {useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import axios from 'axios';

const Heatmap = () => {
    const map = useMap();

    useEffect(() => {
        axios.get('http://localhost:8000/')
       .then((res) => {

          /* on load send a GET request to the backend to get the coordinates data and the
          noise/busyness value from the model for each coordinate */
           let heatmapData = res.data;
            const testData = {
                max: 8,
                data: [
                    heatmapData
                ],
            };

            const cfg = {
                // radius: 2
                // radius should be small ONLY if scaleRadius is true (or small radius is intended)
                // if scaleRadius is false it will be the constant radius used in pixels
                radius: 20,
                maxOpacity: 0.8,
                // scales the radius based on map zoom
                scaleRadius: true,
                // if set to false the heatmap uses the global maximum for colorization
                 // if activated: uses the data maximum within the current map boundaries
                //   (there will always be a red spot with useLocalExtremas true)
                useLocalExtrema: true,
                // which field name in your data represents the latitude - default "lat"
                latField: "lat",
                // which field name in your data represents the longitude - default "lng"
                lngField: "long",
                // which field name in your data represents the data value - default "value"
                valueField: "count",
                // customises thresholds and colours in the heatmap gradient
                gradient: {0.25 : "cyan", 0.5: "blue", 0.75: "indigo", 1: "black"},
            };

        const heatmapLayer = L.heatLayer(
            testData.data[0].map((item) => [item.lat, item.long, item.count]),
            cfg
        ).addTo(map);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [map]);

  return null;
};

export default Heatmap;
