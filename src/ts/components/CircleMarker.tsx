import React from 'react';
import { CircleMarker as ReactLeafletCircleMarker } from 'react-leaflet';
import {CircleMarkerProps} from "../dash-props"
import {assignEventHandlers, ClickEvents, EventComponent} from '../events';
import {DashComponent, Modify} from "../props";

type Props = Modify<CircleMarkerProps, DashComponent & EventComponent & ClickEvents>;

/**
 * A circle of a fixed size with radius specified in pixels.
 */
const CircleMarker = (props: Props) => {
    return (
        <ReactLeafletCircleMarker {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletCircleMarker>
    )
}

export default CircleMarker;
