import React from 'react';
import { ZoomControl as ReactLeafletZoomControl } from 'react-leaflet';
import {DashComponent, Modify, unDashify} from "../dash-extensions-js";
import {ZoomControlProps} from "../props";

type Props = Modify<ZoomControlProps, DashComponent>;

/**
 * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its zoomControl option to false.
 */
const ZoomControl = (props: Props) => {
    return (
        <ReactLeafletZoomControl {...unDashify(props)}></ReactLeafletZoomControl>
    )
}

export default ZoomControl;
