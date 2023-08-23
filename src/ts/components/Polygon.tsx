import React from 'react';
import { Polygon as ReactLeafletPolygon } from 'react-leaflet';
import {PolygonProps} from "../dash-props"
import {assignEventHandlers, ClickEvents, EventComponent} from '../events';
import {DashComponent, Modify} from "../props";

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
