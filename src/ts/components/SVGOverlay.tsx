import React from 'react';
import { SVGOverlay as ReactLeafletSVGOverlay } from 'react-leaflet';
import {SVGOverlayProps, assignClickEventHandlers, ClickComponent, Modify} from "../props";

type Props = Modify<SVGOverlayProps, ClickComponent>;

/**
 * Used to load, display and provide DOM access to an SVG file over specific bounds of the map.
 */
const SVGOverlay = (props: Props) => {
    return (
        <ReactLeafletSVGOverlay {...assignClickEventHandlers(props)}></ReactLeafletSVGOverlay>
    )
}

export default SVGOverlay;
