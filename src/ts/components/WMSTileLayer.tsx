import L from 'leaflet';
import React from 'react';
import {dashifyProps} from '../utils';
import { WMSTileLayer as ReactLeafletWMSTileLayer } from 'react-leaflet';
import {WMSTileLayerProps as Props} from '../dash-props';

/**
 * Used to display WMS services as tile layers on the map.
 */
const WMSTileLayer = ({crs, eventHandlers, ...props}: Props) => {
    const crsObj = L.CRS[crs];  // map from string repr of CRS to actual object
    const nProps = dashifyProps(props, {crs: crsObj})
    const stripped = (({ id, setProps, loading_state, ...o }) => o)(nProps)  // remove extra props to avoid them being added to the WMS URL
    return (
        <ReactLeafletWMSTileLayer {...stripped}></ReactLeafletWMSTileLayer>
    )
}

export default WMSTileLayer;
