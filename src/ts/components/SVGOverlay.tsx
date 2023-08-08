import React from 'react';
import {assignEventHandlers} from '../utils';
import { SVGOverlay as ReactLeafletSVGOverlay } from 'react-leaflet';
import {SVGOverlayProps as Props} from '../dash-props';

/**
 * Used to load, display and provide DOM access to an SVG file over specific bounds of the map.
 */
const SVGOverlay = (props: Props) => {
    return (
        <ReactLeafletSVGOverlay {...assignEventHandlers(props)}></ReactLeafletSVGOverlay>
    )
}

export default SVGOverlay;
