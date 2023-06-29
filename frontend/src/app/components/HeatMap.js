import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const Heatmap = () => {
  const map = useMap();

  useEffect(() => {
    const testData = {
      max: 8,
      data: [
        { lat: 40.7283, lng: -73.9942, count: 30 },
        { lat: -73.9942, lng: 40.7283, count: 10 },

      ],
    };

    const cfg = {
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

// const HeatmapMap2 = () => (
//   <MapContainer center={[25.6586, -80.3568]} zoom={4}>
//     <TileLayer
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       attribution="..."
//       maxZoom={18}
//     />
//     <Heatmap />
//   </MapContainer>
// );

export default Heatmap;
