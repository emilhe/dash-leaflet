import React from 'react';
import { ScaleControl as ReactLeafletScaleControl } from 'react-leaflet';
import {unDashify, DashComponent, Modify} from "../dash-extensions-js";
import {ScaleControlProps} from "../props";

type Props = Modify<ScaleControlProps, DashComponent>;

/**
 * A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems.
 */
const ScaleControl = (props: Props) => {
    return (
        <ReactLeafletScaleControl {...unDashify(props)}></ReactLeafletScaleControl>
    )
}

export default ScaleControl;
