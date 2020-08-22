import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { CircleMarker as LeafletCircleMarker } from 'react-leaflet';
import {registerDefaultEvents} from "../utils";

/**
 * CircleMarker is a wrapper of CircleMarker in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class CircleMarker extends Component {
    render() {
        return <LeafletCircleMarker {...registerDefaultEvents(this)}/>
    }
}

CircleMarker.defaultProps = {
    n_clicks: 0
};

CircleMarker.propTypes = {
    /**
     * The center of the circle marker (lat, lon)
     */
    center: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * Radius of the circle marker, in pixels
     */
    radius: PropTypes.number,

    // Inherited from Path

    /**
     * Whether to draw stroke along the path. Set it to false to disable borders 
     * on polygons or circles.
     */
    stroke: PropTypes.bool,

    /**
     * Stroke color
     */
    color: PropTypes.string,

    /**
     * Stroke width in pixels
     */
    weight: PropTypes.number,

    /**
     * Stroke opacity
     */
    opacity: PropTypes.number,

    /**
     * A string that defines shape to be used at the end of the stroke.
     */
    lineCap: PropTypes.string,

    /**
     * A string that defines shape to be used at the corners of the stroke.
     */
    lineJoin: PropTypes.string,

    /**
     * A string that defines the stroke dash pattern. Doesn't work on Canvas-powered 
     * layers in some old browsers.
     */
    dashArray: PropTypes.string,

    /**
     * A string that defines the distance into the dash pattern to start the dash. 
     * Doesn't work on Canvas-powered layers in some old browsers.
     */
    dashOffset: PropTypes.string,

    /**
     * Whether to fill the path with color. Set it to false to disable filling on 
     * polygons or circles.
     */
    fill: PropTypes.bool,

    /**
     * Fill color. Defaults to the value of the color option
     */
    fillColor: PropTypes.string,

    /**
     * Fill opacity
     */
    fillOpacity: PropTypes.number,

    /**
     * A string that defines how the inside of a shape is determined.
     */
    fillRule: PropTypes.string,

    /**
     * When true, a mouse event on this path will trigger the same 
     * event on the map (unless L.DomEvent.stopPropagation is used).
     */
    bubblingMouseEvents: PropTypes.bool,

    /**
     * Use this specific instance of Renderer for this path. Takes 
     * precedence over the map's default renderer.
     */
    renderer: PropTypes.object,

    /**
     * Custom class name set on an element. Only for SVG renderer.
     */
    className: PropTypes.string,

    /**
     * If true, the image overlay will emit mouse events when clicked or hovered.
     */
    interactive: PropTypes.bool,

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
     * The attribution string for the component
     */
    attribution: PropTypes.string,

    // Events
    setProps: PropTypes.func,

    /**
     * Dash callback property. Number of times the object has been clicked
     */
    n_clicks: PropTypes.number
};
