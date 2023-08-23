import React from 'react';
import { VideoOverlay as ReactLeafletVideoOverlay } from 'react-leaflet';
import {VideoOverlayProps} from '../dash-props';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers, ClickEvents, EventComponent, LoadEvents} from "../events";

type Props = Modify<VideoOverlayProps, EventComponent & ClickEvents & LoadEvents & DashComponent>

/**
 * Used to load and display a video player over specific bounds of the map. Uses the <video> HTML5 element.
 */
const VideoOverlay = ({ 
    muted = true, // without this setting, autoplay does not work
    ...props
}: Props) => {
    return (
        <ReactLeafletVideoOverlay muted={muted} {...assignEventHandlers(props, ["click", "dblclick", "load"])}></ReactLeafletVideoOverlay>
    )
}

export default VideoOverlay;
