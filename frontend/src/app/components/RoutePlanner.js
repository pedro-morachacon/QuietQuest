function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function (e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
});
L.DomEvent.on(startBtn, 'click', function () {
    control.spliceWaypoints(0, 1, e.latlng);
    map1.closePopup();
});

L.DomEvent.on(destBtn, 'click', function () {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    map1.closePopup();
});

var ReversablePlan = L.Routing.Plan.extend({
    createGeocoders: function () {
        var container = L.Routing.Plan.prototype.createGeocoders.call(this),
            reverseButton = createButton('↑↓', container);
        return container;
    }
})

var plan = new ReversablePlan([
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
    ], {
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true
    }),
    control = L.Routing.control({
        routeWhileDragging: true,
        plan: plan
    }).addTo(map1);
