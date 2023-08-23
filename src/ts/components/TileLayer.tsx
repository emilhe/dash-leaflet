import React from 'react';
import { TileLayer as ReactLeafletTileLayer } from 'react-leaflet';
import {TileLayerProps, assignLoadEventHandlers, LoadComponent, Modify} from "../props";

type Props = Modify<TileLayerProps, {
    /**
     * The URL template in the form 'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'. [MUTABLE, DL]
     */
    url?: string;
} & LoadComponent>;

/**
 * Used to load and display tile layers on the map. Note that most tile servers require attribution.
 */
const TileLayer = ({ 
    // Set default to OSM
    url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ...props
}: Props) => {
    return (
        <ReactLeafletTileLayer url={url} {...assignLoadEventHandlers(props)}></ReactLeafletTileLayer>
    )
}

export default TileLayer;
