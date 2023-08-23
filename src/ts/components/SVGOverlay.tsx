import React from 'react';
import { SVGOverlay as ReactLeafletSVGOverlay } from 'react-leaflet';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers} from "../utils";
import {ClickEvents, EventComponent, SVGOverlayProps} from "../props";

type Props = Modify<SVGOverlayProps, DashComponent & EventComponent & ClickEvents>;

/**
 * Used to load, display and provide DOM access to an SVG file over specific bounds of the map.
 */
const SVGOverlay = (props: Props) => {
    return (
        <ReactLeafletSVGOverlay {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletSVGOverlay>
    )
}

export default SVGOverlay;
