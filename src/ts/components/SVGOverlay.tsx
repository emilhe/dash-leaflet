import React from 'react';
import {dashifyProps} from '../utils';
import { SVGOverlay as ReactLeafletSVGOverlay } from 'react-leaflet';
import {SVGOverlayProps as Props} from '../dash-props';

/**
 * Used to load, display and provide DOM access to an SVG file over specific bounds of the map.
 */
const SVGOverlay = (props: Props) => {
    return (
        <ReactLeafletSVGOverlay {...dashifyProps(props)}></ReactLeafletSVGOverlay>
    )
}

export default SVGOverlay;
