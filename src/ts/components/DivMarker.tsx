import React from 'react';
import { DivMarker as ReactLeafletDivMarker } from '../react-leaflet/DivMarker';
import {MarkerProps, assignClickEventHandlers, ClickComponent, Modify} from "../props";

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
} & ClickComponent>

/**
 * Marker is used to display clickable/draggable icons on the map. Extends Layer.
 */
const DivMarker = (props: Props) => {
    return (
        <ReactLeafletDivMarker{...assignClickEventHandlers(props)}></ReactLeafletDivMarker>
    )
}

export default DivMarker;
