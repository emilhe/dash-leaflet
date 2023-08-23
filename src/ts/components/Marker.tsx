import React from 'react';
import L from 'leaflet';
import { Marker as ReactLeafletMarker } from 'react-leaflet';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers} from '../utils';
import {ClickEvents, EventComponent, MarkerProps} from "../props";

// This forces webpack to use url-loader, and returns the proper base64 encoded URLs to Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
 iconRetinaUrl: require('../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
 iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
 shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png'),
});

type Props = Modify<MarkerProps, {
    /**
     * Options passed to L.icon constructor. See https://leafletjs.com/reference.html#icon for details on how to customize the marker icon. [DL]
     */
    icon?: L.IconOptions;
} & DashComponent & EventComponent & ClickEvents>;

/**
 * Marker is used to display clickable/draggable icons on the map. Extends Layer.
 */
const Marker = ({ icon = null, ...props}: Props) => {
    const iconObj = icon === null ? new L.Icon.Default() : L.icon(icon); // map from icon options to icon object
    return (
        <ReactLeafletMarker icon={iconObj} {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletMarker>
    )
}

export default Marker;
