import React from 'react';
import { Polygon as ReactLeafletPolygon } from 'react-leaflet';
import {assignEventHandlers} from '../utils';
import {DashComponent, Modify} from "../dash-extensions-js";
import {ClickEvents, EventComponent, PolygonProps} from "../props";

type Props = Modify<PolygonProps, DashComponent & EventComponent & ClickEvents>;

/**
 * A class for drawing polygon overlays on a map.
 */
const Polygon = (props: Props) => {
    return (
        <ReactLeafletPolygon {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletPolygon>
    )
}

export default Polygon;
