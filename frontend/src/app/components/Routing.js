import { useEffect } from "react";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import L from "leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(-6.1253124, 106.7634999),
        L.latLng(-6.289363699721308, 107.06588745117188),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  function createButton(label, container) {
    var btn = L.DomUtil.create("button", "", container);
    btn.setAttribute("type", "button");
    btn.innerHTML = label;
    return btn;
  }
  map.on("click", function (e) {
    var container = L.DomUtil.create("div"),
      startBtn = createButton("Start from this location", container),
      destBtn = createButton("Go to this location", container);
    container.setAttribute("class", "leaflet-popup-btn-box");
    L.popup().setContent(container).setLatLng(e.latlng).openOn(map);
    L.DomEvent.on(startBtn, "click", function () {
      this.control.spliceWaypoints(0, 1, e.latlng);
      map.closePopup();
    });
  });

  return null;
}