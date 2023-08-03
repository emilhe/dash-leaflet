import React from 'react';
import {dashifyProps} from '../utils';
import { CircleMarker as ReactLeafletCircleMarker } from 'react-leaflet';
import {CircleMarkerProps as Props} from '../dash-props';

/**
 * A circle of a fixed size with radius specified in pixels.
 */
const CircleMarker = (props: Props) => {
    return (
        <ReactLeafletCircleMarker {...dashifyProps(props)}></ReactLeafletCircleMarker>
    )
}

export default CircleMarker;
