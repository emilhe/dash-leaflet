import React from 'react';
import {MousePosition as ReactLeafletMousePosition, MousePositionProps} from '../react-leaflet/MousePosition';
import { DashComponent, Modify} from "../props";

type Props = Modify<MousePositionProps, DashComponent>;

/**
 *  A simple mouse position control that you can drop into your leaflet map. It displays geographic coordinates of the mouse pointer, as it is moved about the map.
 */
const MousePosition = (props: Props) => {
    return (
        <ReactLeafletMousePosition {...props}></ReactLeafletMousePosition>
    )
}

export default MousePosition;
