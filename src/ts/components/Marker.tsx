import React from 'react';
import {dashifyProps} from '../utils';
import { Marker as ReactLeafletMarker } from 'react-leaflet';
import {MarkerProps as Props} from '../dash-props';

// This forces webpack to use url-loader, and returns the proper base64 encoded URLs to Leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
 iconRetinaUrl: require('../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
 iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
 shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png'),
});

/**
 * Marker is used to display clickable/draggable icons on the map. Extends Layer.
 */
const Marker = ({ icon = null, ...props}: Props) => {
    const iconObj = icon === null ? new L.Icon.Default() : L.icon(icon); // map from icon options to icon object
    return (
        <ReactLeafletMarker {...dashifyProps(props, {icon: iconObj})}></ReactLeafletMarker>
    )
}

Marker.defaultProps = {
    icon: null
};

export default Marker;
