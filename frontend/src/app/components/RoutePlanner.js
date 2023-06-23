import React, { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/assets/css/leaflet.css';

// Define your own marker icon if needed
const icon = L.icon({
  url: "https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png",
  size: {width: 26, height: 32},
});

const RoutePlanner = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [distance, setDistance] = useState(null);
  const map = useMapEvents({
    click: (e) => {
      if (!start) {
        setStart(e.latlng);
        L.marker(e.latlng, {icon}).addTo(map);
      } else if (!end) {
        setEnd(e.latlng);
        L.marker(e.latlng, {icon}).addTo(map);

        // Use your own routing API to get the distance between start and end points
        fetch(`http://localhost:8000/directions/${start.lng},${start.lat};${e.latlng.lng},${e.latlng.lat}?overview=false`)
        .then((res) => res.json())
        .then((data) => {
          const distanceInMeters = data.routes[0].distance;
          setDistance(distanceInMeters / 1000); // convert to km
        })
        .catch((error) => console.error(error));
      }
    },
  });

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      autoComplete: true,
      autoClose: true,
      searchLabel: 'Enter location',
      keepResult: true
    });
    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return distance ? (
    <p>Distance between start and end points: {distance} km</p>
  ) : null;
};

export default RoutePlanner;
