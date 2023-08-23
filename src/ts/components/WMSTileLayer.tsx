import React from 'react';
import {assignEventHandlers, resolveCRS} from '../utils';
import { WMSTileLayer as ReactLeafletWMSTileLayer } from 'react-leaflet';
import {DashComponent, Modify, omit} from "../dash-extensions-js";
import {WMSTileLayerProps} from "../props";

export type Props = Modify<WMSTileLayerProps, {
    /**
     * The Coordinate Reference System to use. Don't change this if you're not sure what it means. [DL]
     */
    crs?: string;
} & DashComponent>;

/**
 * Used to display WMS services as tile layers on the map.
 */
const WMSTileLayer = ({crs, url, ...props}: Props) => {
    const nProps = omit(assignEventHandlers(props, ["load"]), 'id')
    return (
        <ReactLeafletWMSTileLayer url={url} crs={resolveCRS(crs)} {...nProps}></ReactLeafletWMSTileLayer>
    )
}

export default WMSTileLayer;
