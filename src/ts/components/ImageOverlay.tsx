import React from 'react';
import {assignEventHandlers} from '../utils';
import { ImageOverlay as ReactLeafletImageOverlay } from 'react-leaflet';
import {ImageOverlayProps as Props} from '../dash-props';

/**
 * Used to load and display a single image over specific bounds of the map.
 */
const ImageOverlay = (props: Props) => {
    return (
        <ReactLeafletImageOverlay {...assignEventHandlers(props)}></ReactLeafletImageOverlay>
    )
}

export default ImageOverlay;