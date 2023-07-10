import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
// import { useMap } from "react-leaflet";
// import L from 'leaflet';


// test
const myIcon = L.icon({
  iconUrl:
    "https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png",
  iconSize: [26, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function Routing2({ setLocation }) {
  const map = useMapEvents({
    click: (e) => {
      console.log(e.latlng); // Log latlng on map click
    },
  });

  useEffect(() => {
    const ReversablePlan = L.Routing.Plan.extend({
      createGeocoders: function () {
        const container = L.Routing.Plan.prototype.createGeocoders.call(this);
        return container;
      },
    });

    const plan = new ReversablePlan(
      [L.latLng(40.7283, -73.9942), L.latLng(40.7483, -73.9942), L.latLng()],
      {
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true,
      }
    );

    // const plan = new ReversablePlan(
    //   [L.marker([40.7283, -73.9942], {icon: myIcon}), L.marker([40.7483, -73.9942], {icon: myIcon})],
    //   {
    //     geocoder: L.Control.Geocoder.nominatim(),
    //     routeWhileDragging: true,
    //   }
    // );

    // Weitz & Luxenberg Building, East 4th Street, Manhattan Community Board 2, Manhattan, New York County, New York, 10009, United States
    // 224, West 29th Street, Chelsea, Manhattan, New York County, New York, 10001, United States

    plan.on("waypointschanged", function () {
      const waypoints = plan.getWaypoints();

      const point = [
        [waypoints[0].latLng.lng, waypoints[0].latLng.lat],
        [waypoints[1].latLng.lng, waypoints[1].latLng.lat],
      ];
      console.log("Point: ", point);
      setLocation(point.toLocaleString());
    });

    // Create the route controller
    window.control = L.Routing.control({
      routeWhileDragging: true,
      plan: plan,
      show: false,
    }).addTo(map);

    // Get the DOM element of the route controller
    const controlElement = window.control.getContainer();

    // Add a mouseover event listener to the route controller
    controlElement.addEventListener("mouseover", () => {
      window.control.show();
    });

    // Add a mouseout event listener to the route controller
    controlElement.addEventListener("mouseout", () => {
      window.control.hide(); // Collapse the route controller
    });
  }, [map]);

  return null;
}

export default Routing2;



// original

// function Routing2({setLocation}) {
//   const map = useMapEvents({
//     click: (e) => {
//       const container = L.DomUtil.create("div"),
//         startBtn = createButton("Start from this location", container),
//         destBtn = createButton("Go to this location", container);
//
//       L.popup()
//         // .setContent(container)
//         .setLatLng(e.latlng);
//       // .openOn(map);
//
//       L.DomEvent.on(startBtn, "click", function () {
//         console.log("Start from this location:", e.latlng); // Log latlng on startBtn click
//         control.spliceWaypoints(0, 1, e.latlng);
//         map.closePopup();
//       });
//
//       L.DomEvent.on(destBtn, "click", function () {
//         console.log("Go to this location:", e.latlng); // Log latlng on destBtn click
//         control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
//         map.closePopup();
//       });
//     },
//   });
//
//   const createButton = (label, container) => {
//     var btn = L.DomUtil.create("button", "", container);
//     btn.setAttribute("type", "button");
//     btn.innerHTML = label;
//     return btn;
//   };
//
//   useEffect(() => {
//     const ReversablePlan = L.Routing.Plan.extend({
//       createGeocoders: function () {
//         const container = L.Routing.Plan.prototype.createGeocoders.call(this),
//           reverseButton = createButton("↑↓", container);
//         return container;
//       },
//     });
//
//     const plan = new ReversablePlan(
//       [L.latLng(40.7283, -73.9942), L.latLng(40.7483, -73.9942)],
//       {
//         geocoder: L.Control.Geocoder.nominatim(),
//         routeWhileDragging: true,
//       }
//     );
//
//     plan.on("waypointschanged", function () {
//       const waypoints = plan.getWaypoints();
//
//       const point = [[waypoints[0].latLng.lng, waypoints[0].latLng.lat], [waypoints[1].latLng.lng, waypoints[1].latLng.lat]];
//       const point1 = [waypoints[0].latLng.lng, waypoints[0].latLng.lat];
//       const point2 = [waypoints[1].latLng.lng, waypoints[1].latLng.lat];
//
//       console.log("Point: ", point);
//       // console.log("Point 1: ", point1);
//       // console.log("Point 2: ", point2);
//
//       setLocation(point.toLocaleString());
//     });
//
//     window.control = L.Routing.control({
//       routeWhileDragging: true,
//       plan: plan,
//     }).addTo(map);
//   }, [map]);
//
//   return null;
// }
//
// export default Routing2;