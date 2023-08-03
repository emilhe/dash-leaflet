import React from 'react';
import {dashifyProps} from '../utils';
import { ZoomControl as ReactLeafletZoomControl } from 'react-leaflet';
import {ZoomControlProps as Props} from '../dash-props';

/**
 * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its zoomControl option to false.
 */
const ZoomControl = (props: Props) => {
    return (
        <ReactLeafletZoomControl {...dashifyProps(props)}></ReactLeafletZoomControl>
    )
}

export default ZoomControl;
