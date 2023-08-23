import React from 'react';
import { Circle as ReactLeafletCircle } from 'react-leaflet';
import {CircleProps} from "../dash-props"
import {assignEventHandlers, ClickEvents, EventComponent} from '../events';
import {DashComponent, Modify} from "../props";

type Props = Modify<CircleProps, DashComponent & EventComponent & ClickEvents>;

/**
 * A class for drawing circle overlays on a map.
 */
const Circle = (props: Props) => {
    return (
        <ReactLeafletCircle {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletCircle>
    )
}

export default Circle;
