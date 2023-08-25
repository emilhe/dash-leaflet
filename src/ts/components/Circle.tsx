import React from 'react';
import { Circle as ReactLeafletCircle } from 'react-leaflet';
import {CircleProps, assignClickEventHandlers, ClickComponent, Modify} from "../props";

type Props = Modify<CircleProps, ClickComponent>;

/**
 * A class for drawing circle overlays on a map.
 */
const Circle = (props: Props) => {
    return (
        <ReactLeafletCircle {...assignClickEventHandlers(props)}></ReactLeafletCircle>
    )
}

export default Circle;
