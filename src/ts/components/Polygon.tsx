import React from 'react';
import {assignEventHandlers} from '../utils';
import { Polygon as ReactLeafletPolygon } from 'react-leaflet';
import {PolygonProps as Props} from '../dash-props';

/**
 * A class for drawing polygon overlays on a map.
 */
const Polygon = (props: Props) => {
    return (
        <ReactLeafletPolygon {...assignEventHandlers(props)}></ReactLeafletPolygon>
    )
}

export default Polygon;
