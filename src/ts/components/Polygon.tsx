import React from 'react';
import {dashifyProps} from '../utils';
import { Polygon as ReactLeafletPolygon } from 'react-leaflet';
import {PolygonProps as Props} from '../dash-props';

/**
 * A class for drawing polygon overlays on a map.
 */
const Polygon = (props: Props) => {
    return (
        <ReactLeafletPolygon {...dashifyProps(props)}></ReactLeafletPolygon>
    )
}

export default Polygon;
