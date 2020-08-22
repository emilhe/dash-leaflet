import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { ImageOverlay as LeafletImageOverlay } from 'react-leaflet';
import {registerDefaultEvents} from "../utils";

/**
 * ImageOverlay is a wrapper of ImageOverlay in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class ImageOverlay extends Component {
    render() {
        return <LeafletImageOverlay {...registerDefaultEvents(this)} />
    }
}

ImageOverlay.propTypes = {
    /**
     * The URL of the image
     */
    url: PropTypes.string.isRequired,

    /**
     * The geographical bounds the image is tied to.
     */
    bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,

    /**
     * The opacity of the image overlay.
     */
    opacity: PropTypes.number,

    /**
     * The explicit zIndex of the overlay layer.
     */
    zIndex: PropTypes.number,

    // Static properties

    /**
     * Text for the alt attribute of the image (useful for accessibility).
     */
    alt: PropTypes.string,

    /**
     * If true, the image overlay will emit mouse events when clicked or hovered.
     */
    interactive: PropTypes.bool,

    /**
     * When true, a mouse event on this path will trigger the same 
     * event on the map (unless L.DomEvent.stopPropagation is used).
     */
    bubblingMouseEvents: PropTypes.bool,

    /**
     * Whether the crossOrigin attribute will be added to the image. If 
     * a String is provided, the image will have its crossOrigin attribute 
     * set to the String provided. This is needed if you want to access image 
     * pixel data. Refer to CORS Settings for valid String values.
     */
    crossOrigin: PropTypes.bool,

    /**
     * URL to the overlay image to show in place of the overlay that failed to load.
     */
    errorOverlayUrl: PropTypes.string,

    /**
     * A custom class name to assign to the image. Empty by default.
     */
    className: PropTypes.string,

    // Inherited from MapLayer

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * The leaflet pane of the component
     */
    pane: PropTypes.string,

    /**
     * The attribution string for the component (dynamic)
     */
    attribution: PropTypes.string,

    // Events
    setProps: PropTypes.func,
    /**
     * Dash callback property. Receives [lat, lng] upon click. Requires interactive=True.
     */
    click_lat_lng: PropTypes.arrayOf(PropTypes.number),

    /**
     * Dash callback property. Receives [lat, lng] upon double click. Requires interactive=True.
     */
    dbl_click_lat_lng: PropTypes.arrayOf(PropTypes.number)
};

