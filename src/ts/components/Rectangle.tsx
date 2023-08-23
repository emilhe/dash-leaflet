import React from 'react';
import { Rectangle as ReactLeafletRectangle } from 'react-leaflet';
import {RectangleProps} from '../dash-props';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers, ClickEvents, EventComponent} from "../events";

type Props = Modify<RectangleProps, EventComponent & ClickEvents & DashComponent>;

/**
 * A class for drawing rectangle overlays on a map.
 */
const Rectangle = (props: Props) => {
    return (
        <ReactLeafletRectangle {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletRectangle>
    )
}

export default Rectangle;
