import React from 'react';
import {dashifyProps} from '../utils';
import { ImageOverlay as ReactLeafletImageOverlay } from 'react-leaflet';
import {ImageOverlayProps as Props} from '../dash-props';

/**
 * Used to load and display a single image over specific bounds of the map.
 */
const ImageOverlay = (props: Props) => {
    return (
        <ReactLeafletImageOverlay {...dashifyProps(props)}></ReactLeafletImageOverlay>
    )
}

export default ImageOverlay;