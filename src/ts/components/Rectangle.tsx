import React from 'react';
import {assignEventHandlers} from '../utils';
import { Rectangle as ReactLeafletRectangle } from 'react-leaflet';
import {RectangleProps as Props} from '../dash-props';

/**
 * A class for drawing rectangle overlays on a map.
 */
const Rectangle = (props: Props) => {
    return (
        <ReactLeafletRectangle {...assignEventHandlers(props)}></ReactLeafletRectangle>
    )
}

export default Rectangle;
