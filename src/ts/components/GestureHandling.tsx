import React from 'react';
import {omit, unDashify} from '../utils';
import { GestureHandling as ReactLeafletGestureHandling } from '../react-leaflet/GestureHandling';
import {GestureHandlingProps as Props} from '../dash-props';

/**
 * GestureHandling is a light wrapper of https://github.com/elmarquis/Leaflet.GestureHandling
 */
const GestureHandling = (props: Props) => {
    return (
        <ReactLeafletGestureHandling {...omit(unDashify(props), 'children')}></ReactLeafletGestureHandling>
    )
}

export default GestureHandling;
