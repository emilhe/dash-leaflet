import React from 'react';
import { ImageOverlay as ReactLeafletImageOverlay } from 'react-leaflet';
import {assignEventHandlers} from '../utils';
import {DashComponent, Modify} from "../dash-extensions-js";
import {ClickEvents, EventComponent, ImageOverlayProps, LoadEvents} from "../props";

type Props = Modify<ImageOverlayProps, EventComponent & ClickEvents & LoadEvents & DashComponent>

/**
 * Used to load and display a single image over specific bounds of the map.
 */
const ImageOverlay = (props: Props) => {
    return (
        <ReactLeafletImageOverlay {...assignEventHandlers(props, ["click", "dblclick", "load"])}></ReactLeafletImageOverlay>
    )
}

export default ImageOverlay;