import React from 'react';
import {dashifyProps} from '../utils';
import { TileLayer as ReactLeafletTileLayer } from 'react-leaflet';
import {TileLayerProps as Props} from '../dash-props';

/**
 * Used to load and display tile layers on the map. Note that most tile servers require attribution.
 */
const TileLayer = ({ 
    // Set default to OSM
    url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    eventHandlers,
    ...props
}: Props) => {
    return (
        <ReactLeafletTileLayer {...dashifyProps(props, {url:url})}></ReactLeafletTileLayer>
    )
}

export default TileLayer;
