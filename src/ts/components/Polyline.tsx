import React from 'react';
import { Polyline as ReactLeafletPolyline } from 'react-leaflet';
import {assignEventHandlers} from '../utils';
import {DashComponent, Modify} from "../dash-extensions-js";
import {ClickEvents, EventComponent, PolylineProps} from "../props";

type Props = Modify<PolylineProps, DashComponent & EventComponent & ClickEvents>;
/**
 * A class for drawing polyline overlays on a map.
 */
const Polyline = (props: Props) => {
    return (
        <ReactLeafletPolyline {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletPolyline>
    )
}

export default Polyline;
