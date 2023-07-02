import React, {useEffect, useRef} from 'react';
import {MapContainer, useMap} from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';


const myIcon = L.icon({
    iconUrl: 'https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png',
    iconSize: [26, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

let myPopup = "Icon!";

function RoutingMachine() {
    const mapRef = useRef();
    const map = useMap();

    // Save map instance to ref
    useEffect(() => {
        mapRef.current = map;
    }, [map]);

    // Initialize map events and routing control in useEffect
    useEffect(() => {
        if (!mapRef.current) return;

        const createButton = (label, container) => {
            var btn = L.DomUtil.create('button', '', container);
            btn.setAttribute('type', 'button');
            btn.innerHTML = label;
            return btn;
        }

        const map = mapRef.current;
        let control;

        map.on('click', function (e) {
            var container = L.DomUtil.create('div'),
                startBtn = createButton('Start from this location', container),
                destBtn = createButton('Go to this location', container);

            L.DomEvent.on(startBtn, 'click', function () {
                control.spliceWaypoints(0, 1, e.latlng);
                L.map.closePopup();
            });

            L.DomEvent.on(destBtn, 'click', function () {
                control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
                L.map.closePopup();
            });

            L.popup()
                .setContent(container)
                .setLatLng(e.latlng)
                .openOn(map);
        });

        var ReversablePlan = L.Routing.Plan.extend({
            createGeocoders: function () {
                var container = L.Routing.Plan.prototype.createGeocoders.call(this),
                    reverseButton = createButton('↑↓', container);
                return container;
            }
        })

        var plan = new ReversablePlan([
            L.latLng(52.136196, 11.635108),
            L.latLng(52.136296, 11.633508)
        ], {
            routeWhileDragging: true
        });

        control = L.Routing.control({
            waypoints: [
                L.latLng(52.136196, 11.635108),
                L.latLng(52.136296, 11.633508)
            ],
            createMarker: function (i, start, n) {
                // Here we return a new marker with our custom icon for the waypoints
                return L.marker(start.latLng, {
                    draggable: true,
                    bounceOnAdd: false,
                    bounceOnAddOptions: {
                        duration: 1000,
                        height: 800,
                    },
                    icon: myIcon
                }).bindPopup(myPopup).openPopup();
            }
        }).addTo(map);
    }, []);

    return null;  // This component does not render anything
}


export default RoutingMachine;
