import React from 'react';
import {dashifyProps} from '../utils';
import { VideoOverlay as ReactLeafletVideoOverlay } from 'react-leaflet';
import {VideoOverlayProps as Props} from '../dash-props';

/**
 * Used to load and display a video player over specific bounds of the map. Uses the <video> HTML5 element.
 */
const VideoOverlay = ({ 
    muted = true, // without this setting, autoplay does not work
    ...props
}: Props) => {
    return (
        <ReactLeafletVideoOverlay {...dashifyProps(props, {muted: muted})}></ReactLeafletVideoOverlay>
    )
}

export default VideoOverlay;
