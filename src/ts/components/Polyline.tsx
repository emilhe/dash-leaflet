import React from 'react';
import {dashifyProps} from '../utils';
import { Polyline as ReactLeafletPolyline } from 'react-leaflet';
import {PolylineProps as Props} from '../dash-props';

/**
 * A class for drawing polyline overlays on a map.
 */
const Polyline = (props: Props) => {
    return (
        <ReactLeafletPolyline {...dashifyProps(props)}></ReactLeafletPolyline>
    )
}

export default Polyline;
