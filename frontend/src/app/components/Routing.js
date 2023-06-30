import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
// import L from 'leaflet';
import {useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet';
import 'leaflet-routing-machine';
import "leaflet-control-geocoder";


// // L.Routing.control({
// //   waypoints: [
// //     L.latLng(57.74, 11.94),
// //     L.latLng(57.6792, 11.949)
// //   ]
// // }).addTo(map);
//



// function Routing({ from, to }) {
//   const map = useMap();
//
//   useEffect(() => {
//     if (from && to) {
//       L.Routing.control({
//         waypoints: [
//           L.latLng(from[0], from[1]),
//           L.latLng(to[0], to[1])
//         ],
//         routeWhileDragging: true,
//         geocoder: L.Control.Geocoder.nominatim(),
//       }).addTo(map);
//     }
//   }, [from, to, map]);
//
//   return null;
// }
//
// export default Routing;



function Routing() {
  const map = useMapEvents({
    click: (e) => {
      var container = L.DomUtil.create("div"),
          startBtn = createButton("Start from this location", container),
          destBtn = createButton("Go to this location", container);

      L.popup()
        // .setContent(container)
        .setLatLng(e.latlng)
        // .openOn(map);

      L.DomEvent.on(startBtn, "click", function () {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
      });

      L.DomEvent.on(destBtn, "click", function () {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
      });
    },
  });

  const createButton = (label, container) => {
    var btn = L.DomUtil.create("button", "", container);
    btn.setAttribute("type", "button");
    btn.innerHTML = label;
    return btn;
  };

  useEffect(() => {
    var ReversablePlan = L.Routing.Plan.extend({
      createGeocoders: function () {
        var container = L.Routing.Plan.prototype.createGeocoders.call(this),
          reverseButton = createButton("↑↓", container);
        return container;
      },
    });

    var plan = new ReversablePlan(
      [
        L.latLng(40.7283, -73.9942),
        L.latLng(40.7483, -73.9942),
      ],
      {
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true,
      }
    );

    window.control = L.Routing.control({
      routeWhileDragging: true,
      plan: plan,
    }).addTo(map);
  }, [map]);

  return null;
}

export default Routing;