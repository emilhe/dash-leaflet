import React from 'react';
import { GestureHandling as ReactLeafletGestureHandling, GestureHandlingProps} from '../react-leaflet/GestureHandling';
import {DashComponent, Modify} from "../props";

type Props = Modify<GestureHandlingProps, DashComponent>;

/**
 * GestureHandling is a light wrapper of https://github.com/elmarquis/Leaflet.GestureHandling
 */
const GestureHandling = (props: Props) => {
    return (
        <ReactLeafletGestureHandling {...props}></ReactLeafletGestureHandling>
    )
}

export default GestureHandling;
