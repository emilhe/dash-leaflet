import React from 'react';
import {dashifyProps} from '../utils';
import { Rectangle as ReactLeafletRectangle } from 'react-leaflet';
import {RectangleProps as Props} from '../dash-props';

/**
 * A class for drawing rectangle overlays on a map.
 */
const Rectangle = (props: Props) => {
    return (
        <ReactLeafletRectangle {...dashifyProps(props)}></ReactLeafletRectangle>
    )
}

export default Rectangle;
