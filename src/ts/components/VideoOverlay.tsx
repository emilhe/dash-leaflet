import React from 'react';
import { VideoOverlay as ReactLeafletVideoOverlay } from 'react-leaflet';
import {VideoOverlayProps, Modify, assignMediaEventHandlers, MediaComponent} from "../props";

type Props = Modify<VideoOverlayProps, MediaComponent>;

/**
 * Used to load and display a video player over specific bounds of the map. Uses the <video> HTML5 element.
 */
const VideoOverlay = ({ 
    muted = true, // without this setting, autoplay does not work
    ...props
}: Props) => {
    return (
        <ReactLeafletVideoOverlay muted={muted} {...assignMediaEventHandlers(props)}></ReactLeafletVideoOverlay>
    )
}

export default VideoOverlay;
