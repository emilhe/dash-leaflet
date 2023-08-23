import React from 'react';
import { TileLayer as ReactLeafletTileLayer } from 'react-leaflet';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers} from "../utils";
import {EventComponent, LoadEvents, TileLayerProps} from "../props";

type Props = Modify<TileLayerProps, {
    /**
     * The URL template in the form 'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'. [MUTABLE, DL]
     */
    url?: string;
} & EventComponent & LoadEvents & DashComponent>;

/**
 * Used to load and display tile layers on the map. Note that most tile servers require attribution.
 */
const TileLayer = ({ 
    // Set default to OSM
    url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ...props
}: Props) => {
    return (
        <ReactLeafletTileLayer {...assignEventHandlers(props,["load"], {url:url})}></ReactLeafletTileLayer>
    )
}

export default TileLayer;
