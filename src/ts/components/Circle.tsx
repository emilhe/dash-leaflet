import React from 'react';
import {dashifyProps} from '../utils';
import { Circle as ReactLeafletCircle } from 'react-leaflet';
import {CircleProps as Props} from '../dash-props';

/**
 * A class for drawing circle overlays on a map.
 */
const Circle = (props: Props) => {
    return (
        <ReactLeafletCircle {...dashifyProps(props)}></ReactLeafletCircle>
    )
}

export default Circle;
