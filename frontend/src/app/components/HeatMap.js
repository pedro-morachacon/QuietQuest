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
            radius: 20,
            maxOpacity: 0.8,
            scaleRadius: true,
            useLocalExtrema: true,
            latField: "lat",
            lngField: "lng",
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
