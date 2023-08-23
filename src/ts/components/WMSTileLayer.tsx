import React from 'react';
import {assignEventHandlers} from '../events';
import { WMSTileLayer as ReactLeafletWMSTileLayer } from 'react-leaflet';
import {WMSTileLayerProps} from '../dash-props';
import {DashComponent, Modify, omit} from "../dash-extensions-js";
import {resolveCRS} from "../utils";

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
