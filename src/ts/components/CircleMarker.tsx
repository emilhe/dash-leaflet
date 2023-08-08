import React from 'react';
import {assignEventHandlers} from '../utils';
import { CircleMarker as ReactLeafletCircleMarker } from 'react-leaflet';
import {CircleMarkerProps as Props} from '../dash-props';

/**
 * A circle of a fixed size with radius specified in pixels.
 */
const CircleMarker = (props: Props) => {
    return (
        <ReactLeafletCircleMarker {...assignEventHandlers(props)}></ReactLeafletCircleMarker>
    )
}

export default CircleMarker;
