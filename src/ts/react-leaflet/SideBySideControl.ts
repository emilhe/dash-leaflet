import "leaflet-side-by-side"
import * as L from "leaflet";
import {useMap} from "react-leaflet";
import {useEffect} from "react";

require('leaflet-side-by-side/layout.css');
require('leaflet-side-by-side/range.css');

export type SideBySideControlProps = {
    /**
     * url of layer to show on the left side of the map.
     */
    leftLayer?: string;

    /**
     * url of layer to show on the right side of the map.
     */
    rightLayer?: string;
};

export const SideBySideControl = (props: SideBySideControlProps) => {
    const map = useMap() as any;

    useEffect(() => {
        const _leftLayer = L.tileLayer(props.leftLayer).addTo(map)
        const _rightLayer = L.tileLayer(props.rightLayer).addTo(map)
        L.control.sideBySide(_leftLayer, _rightLayer).addTo(map);
    })

    return null
}
