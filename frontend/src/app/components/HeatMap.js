import React, {useEffect} from "react";
import {useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const Heatmap = () => {
    const map = useMap();

    useEffect(() => {
        const testData = {
            max: 8,
            data: [
                {lat: 40.7283, lng: -73.9942, count: 30},
                {lat: 40.7583, lng: -73.9942, count: 10},
                {lat: 40.7283, lng: -73.9842, count: 30},

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
            lngField: "lng",
            // which field name in your data represents the data value - default "value"
            valueField: "count",
        };

        const heatmapLayer = L.heatLayer(
            testData.data.map((item) => [item.lat, item.lng, item.count]),
            cfg
        ).addTo(map);
    }, [map]);

    return null;
};

export default Heatmap;
