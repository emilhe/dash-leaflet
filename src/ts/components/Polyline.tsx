import React from 'react';
import { Polyline as ReactLeafletPolyline } from 'react-leaflet';
import {PolylineProps, assignClickEventHandlers, ClickComponent, Modify} from "../props";

type Props = Modify<PolylineProps, ClickComponent>;

/**
 * A class for drawing polyline overlays on a map.
 */
const Polyline = (props: Props) => {
    return (
        <ReactLeafletPolyline {...assignClickEventHandlers(props)}></ReactLeafletPolyline>
    )
}

export default Polyline;
