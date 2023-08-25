import React from 'react';
import { CircleMarker as ReactLeafletCircleMarker } from 'react-leaflet';
import {CircleMarkerProps, assignClickEventHandlers, ClickComponent, Modify} from "../props";

type Props = Modify<CircleMarkerProps, ClickComponent>;

/**
 * A circle of a fixed size with radius specified in pixels.
 */
const CircleMarker = (props: Props) => {
    return (
        <ReactLeafletCircleMarker {...assignClickEventHandlers(props)}></ReactLeafletCircleMarker>
    )
}

export default CircleMarker;
