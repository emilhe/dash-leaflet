import React from 'react';
import { Rectangle as ReactLeafletRectangle } from 'react-leaflet';
import {RectangleProps, assignClickEventHandlers, ClickComponent, Modify} from "../props";

type Props = Modify<RectangleProps, ClickComponent>;

/**
 * A class for drawing rectangle overlays on a map.
 */
const Rectangle = (props: Props) => {
    return (
        <ReactLeafletRectangle {...assignClickEventHandlers(props)}></ReactLeafletRectangle>
    )
}

export default Rectangle;
