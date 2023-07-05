import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

function Routing2() {
  const map = useMap();
  const mapRef = useRef();

  useEffect(() => {
    window.onload = function() {
      L.mapquest.key = 'BiYPKjAMIMu2OvwYEqo0YaGxrBaCCrjd';

      var mapQuestMap = L.mapquest.map(mapRef.current, {
        center: [37.7749, -122.4194],
        layers: L.mapquest.tileLayer('map'),
        zoom: 13,
        zoomControl: false
      });

      L.control.zoom({
        position: 'topright'
      }).addTo(mapQuestMap);

      L.mapquest.directionsControl({
        routeSummary: {
          enabled: false
        },
        narrativeControl: {
          enabled: true,
          compactResults: false
        }
      }).addTo(mapQuestMap);
    };
  }, []);

  return <div ref={mapRef} style={{height: "500px", width: "100%"}}></div>;
}

export default Routing2;
