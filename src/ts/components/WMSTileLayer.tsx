import L from 'leaflet';
import React from 'react';
import {assignEventHandlers, unDashify} from '../utils';
import { WMSTileLayer as ReactLeafletWMSTileLayer } from 'react-leaflet';
import {WMSTileLayerProps as Props} from '../dash-props';

/**
 * Used to display WMS services as tile layers on the map.
 */
const WMSTileLayer = ({crs, eventHandlers, ...props}: Props) => {
    const crsObj = L.CRS[crs];  // map from string repr of CRS to actual object
    const nProps = assignEventHandlers(props, {crs: crsObj})
    return (
        <ReactLeafletWMSTileLayer {...unDashify(nProps)}></ReactLeafletWMSTileLayer>
    )
}

export default WMSTileLayer;
