import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LeafletDivMarker from '../LeafletDivMarker';
import {registerDefaultEvents} from "../utils";

/**
 * Marker is a wrapper of Marker in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class DivMarker extends Component {
    render() {
        return <LeafletDivMarker {...registerDefaultEvents(this)}/>
    }
}

DivMarker.defaultProps = {
    n_clicks: 0
};

DivMarker.propTypes = {
    /**
     * A geographical point (lat, lon)
     */
    position: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * Options passed to DivIcon constructor.
     */
    iconOptions: PropTypes.shape({
        iconSize: PropTypes.arrayOf(PropTypes.number),
        iconAnchor: PropTypes.arrayOf(PropTypes.number),
        popupAnchor: PropTypes.arrayOf(PropTypes.number),
        className: PropTypes.arrayOf(PropTypes.number),
        html: PropTypes.string
    }),

    /**
     * Whether the marker is draggable with mouse/touch or not.
     */
    draggable: PropTypes.bool,

    /**
     * The opacity of the marker.
     */
    opacity: PropTypes.number,

    /**
     * By default, marker images zIndex is set automatically based
     * on its latitude. Use this option if you want to put the
     * marker on top of all others (or below), specifying a high
     * value like 1000 (or high negative value, respectively).
     */
    zIndexOffset: PropTypes.number,

    // Static parameters

    /**
     * Whether the marker can be tabbed to with a keyboard and clicked by
     * pressing enter.
     */
    keyboard: PropTypes.bool,

    /**
     * Text for the browser tooltip that appear on marker hover (no tooltip
     * by default).
     */
    title: PropTypes.string,

    /**
     * Text for the alt attribute of the icon image (useful for accessibility).
     */
    alt: PropTypes.string,

    /**
     * If true, the marker will get on top of others when you hover the mouse
     * over it.
     */
    riseOnHover: PropTypes.bool,

    /**
     * The z-index offset used for the riseOnHover feature.
     */
    riseOffset: PropTypes.number,

    /**
     * When true, a mouse event on this marker will trigger the same event
     * on the map (unless L.DomEvent.stopPropagation is used).
     */
    bubblingMouseEvents: PropTypes.bool,

    /**
     * Whether to pan the map when dragging this marker near its edge or not.
     */
    autoPan: PropTypes.bool,

    /**
     * Distance (in pixels to the left/right and to the top/bottom) of the map
     * edge to start panning the map.
     */
    autoPanPadding: PropTypes.object,

    /**
     * Number of pixels the map should pan by.
     */
    autoPanSpeed: PropTypes.number,

    /**
     * If false, the layer will not emit mouse events and will act as a part of
     * the underlying map.
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
