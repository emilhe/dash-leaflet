import React from 'react';
import { Circle as ReactLeafletCircle } from 'react-leaflet';
import {assignEventHandlers} from '../utils';
import {DashComponent, Modify} from "../dash-extensions-js";
import {CircleProps, ClickEvents, EventComponent} from "../props";

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
