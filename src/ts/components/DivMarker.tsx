import React from 'react';
import {assignEventHandlers} from '../utils';
import { DivMarker as ReactLeafletDivMarker } from '../react-leaflet/DivMarker';
import {DivMarkerProps as Props} from '../dash-props';

/**
 * Marker is used to display clickable/draggable icons on the map. Extends Layer.
 */
const DivMarker = (props: Props) => {
    return (
        <ReactLeafletDivMarker{...assignEventHandlers(props)}></ReactLeafletDivMarker>
    )
}

export default DivMarker;
