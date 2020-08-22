import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Polygon as LeafletPolygon } from 'react-leaflet';
import {registerDefaultEvents} from "../utils";

/**
 * Polygon is a wrapper of Polygon in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class Polygon extends Component {
    render() {
        return <LeafletPolygon {...registerDefaultEvents(this)}/>
    }
}

Polygon.propTypes = {
    /**
     * An array of geographical points (lat, lon)
     */
    positions: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)))
    ]).isRequired,

    // Static parameters

    /**
     * How much to simplify the polyline on each zoom level. More means better 
     * performance and smoother look, and less means more accurate representation.
     */
    smoothFactor: PropTypes.number,

    /**
     * Disable polyline clipping.
     */
    noClip: PropTypes.bool,

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
     * If false, the layer will not emit mouse events and will act
     * as a part of the underlying map.
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
     * Dash callback property. Receives [lat, lng] upon click.
     */
    click_lat_lng: PropTypes.arrayOf(PropTypes.number),

    /**
     * Dash callback property. Receives [lat, lng] upon double click.
     */
    dbl_click_lat_lng: PropTypes.arrayOf(PropTypes.number)
}
