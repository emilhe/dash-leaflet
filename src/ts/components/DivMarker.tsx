import React from 'react';
import { DivMarker as ReactLeafletDivMarker } from '../react-leaflet/DivMarker';
import {MarkerProps} from '../dash-props';
import {assignEventHandlers, ClickEvents, EventComponent} from '../events';
import {DashComponent, Modify} from "../dash-extensions-js";

type Props = Modify<Omit<MarkerProps, "icon">, {
    /**
     * Options passed to DivIcon constructor.
     */
    iconOptions: {
        iconSize: number,
        iconAnchor: number
        popupAnchor: number,
        className: string,
        html: string
    };
} & DashComponent & EventComponent & ClickEvents>

/**
 * Marker is used to display clickable/draggable icons on the map. Extends Layer.
 */
const DivMarker = (props: Props) => {
    return (
        <ReactLeafletDivMarker{...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletDivMarker>
    )
}

export default DivMarker;
