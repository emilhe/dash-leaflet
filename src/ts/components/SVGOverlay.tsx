import React from 'react';
import { SVGOverlay as ReactLeafletSVGOverlay } from 'react-leaflet';
import {SVGOverlayProps} from '../dash-props';
import {DashComponent, Modify} from "../props";
import {assignEventHandlers, ClickEvents, EventComponent} from "../events";

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
