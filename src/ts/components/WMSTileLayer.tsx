import React from 'react';
import {assignEventHandlers, omit, resolveCRS, unDashify} from '../utils';
import { WMSTileLayer as ReactLeafletWMSTileLayer } from 'react-leaflet';
import {WMSTileLayerProps as Props} from '../dash-props';

/**
 * Used to display WMS services as tile layers on the map.
 */
const WMSTileLayer = ({crs, url, ...props}: Props) => {
    const nProps = omit(assignEventHandlers(props), 'id')
    return (
        <ReactLeafletWMSTileLayer url={url} crs={resolveCRS(crs)} {...nProps}></ReactLeafletWMSTileLayer>
    )
}

export default WMSTileLayer;
