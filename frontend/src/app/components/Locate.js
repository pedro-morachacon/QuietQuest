import {useMapEvents} from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';
import {useEffect, useRef} from 'react';

const LocateUserControl = () => {
    const map = useMapEvents({});
    const lc = useRef(null);

    useEffect(() => {
        lc.current = new Locate({
            // You can set your locate options here, check leaflet.locatecontrol documentation
        }).addTo(map);

        return () => {
            map.removeControl(lc.current);
        };
    }, [map]);

    return null;
};

export default LocateUserControl;
