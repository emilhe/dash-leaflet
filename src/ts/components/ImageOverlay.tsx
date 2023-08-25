import React from 'react';
import { ImageOverlay as ReactLeafletImageOverlay } from 'react-leaflet';
import {ImageOverlayProps, Modify, assignMediaEventHandlers, MediaComponent} from "../props";

type Props = Modify<ImageOverlayProps, MediaComponent>;

/**
 * Used to load and display a single image over specific bounds of the map.
 */
const ImageOverlay = (props: Props) => {
    return (
        <ReactLeafletImageOverlay {...assignMediaEventHandlers(props)}></ReactLeafletImageOverlay>
    )
}

export default ImageOverlay;