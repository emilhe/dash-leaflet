import React from 'react';
import { WMSTileLayer as ReactLeafletWMSTileLayer } from 'react-leaflet';
import {WMSTileLayerProps, assignLoadEventHandlers, LoadComponent, Modify} from "../props";
import {omit, resolveCRS} from '../utils';

export type Props = Modify<WMSTileLayerProps, {
    /**
     * The Coordinate Reference System to use. Don't change this if you're not sure what it means. [DL]
     */
    crs?: string;
} & LoadComponent>;

/**
 * Used to display WMS services as tile layers on the map.
 */
const WMSTileLayer = ({crs, url, ...props}: Props) => {
    const nProps = omit(assignLoadEventHandlers(props), 'id', 'children', 'setProps', 'loading_state')
    return (
        <ReactLeafletWMSTileLayer url={url} crs={resolveCRS(crs)} {...nProps}></ReactLeafletWMSTileLayer>
    )
}

export default WMSTileLayer;
