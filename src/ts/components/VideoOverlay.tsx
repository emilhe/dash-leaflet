import React from 'react';
import { VideoOverlay as ReactLeafletVideoOverlay } from 'react-leaflet';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers} from "../utils";
import {ClickEvents, EventComponent, LoadEvents, VideoOverlayProps} from "../props";

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
