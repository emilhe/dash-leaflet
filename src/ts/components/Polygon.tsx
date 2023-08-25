import React from 'react';
import { Polygon as ReactLeafletPolygon } from 'react-leaflet';
import {PolygonProps, assignClickEventHandlers, ClickComponent, Modify} from "../props";

type Props = Modify<PolygonProps, ClickComponent>;

/**
 * A class for drawing polygon overlays on a map.
 */
const Polygon = (props: Props) => {
    return (
        <ReactLeafletPolygon {...assignClickEventHandlers(props)}></ReactLeafletPolygon>
    )
}

export default Polygon;
