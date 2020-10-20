import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Map as LeafletMap} from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import {registerDefaultEvents} from "../utils";


/**
 * Map is a wrapper of Map in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class Map extends Component {

        constructor(props) {
        super(props);
        this.myRef = React.createRef();  // Create reference to be used for map object
    }

    render() {
        const nProps = registerDefaultEvents(this)
        // Bind extra events.
        nProps.onlocationfound = (e) => {
            nProps.setProps({ location_lat_lon_acc: [e.latlng.lat, e.latlng.lng, e.accuracy] });
        };
        nProps.whenReady = () => {
            const bounds = this.myRef.current.leafletElement.getBounds();
            nProps.setProps({bounds: [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]]})
        }
        // TODO: Does this affect performance? Maybe make it optional.
        nProps.onViewportChanged = (e) => {
            const bounds = this.myRef.current.leafletElement.getBounds();
            nProps.setProps({ viewport: e , zoom: e.zoom, center: e.center,
                bounds: [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]]})
        };
        // Setup CRS.
        nProps.crs = L.CRS[nProps.crs]
        // Render the leaflet component.
        return <LeafletMap {...nProps} ref={this.myRef}/>;
    }
}

Map.defaultProps = {
    crs: "EPSG3857",
    // Set some values to enable small examples.
    center: [56, 10],
    zoom: 6,
    // Per default, fill parent container.
    style: {'width': "100%", 'height': "100%", "position": "relative"}
};

Map.propTypes = {
    /**
     * If true, panning will always be animated if possible. If false, it will not
     * animate panning, either resetting the map view if panning more than a screen
     * away, or just setting a new offset for the map pane (except for panBy which
     * always does the latter).
     */
    animate: PropTypes.bool,

    /**
     * Duration of animated panning, in seconds.
     */
    duration: PropTypes.number,

    /**
     * Easing of the inertia
     */
    easeLinearity: PropTypes.number,

    /**
     * If true, panning won't fire movestart event on start (used internally for panning
     * inertia).
     */
    noMoveStart: PropTypes.bool,

    /**
     * Sets a map view that contains the given geographical bounds with the maximum zoom
     * level possible.
     */
    bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),

    /**
     * Object with the following entries:
     *
     * paddingTopLeft: Sets the amount of padding in the top left corner of a map container
     *                 that shouldn't be accounted for when setting the view to fit bounds.
     *                 Useful if you have some control overlays on the map like a sidebar
     *                 and you don't want them to obscure objects you're zooming to.
     * paddingBottomRight: The same for the bottom right corner of the map.
     * padding: Equivalent of setting both top left and bottom right padding to the same value.
     * maxZoom: The maximum possible zoom to use.
     */
    boundsOptions: PropTypes.object,

    /**
     * Whether the map can be zoomed to a rectangular area specified by dragging
     * the mouse while pressing the shift key.
     */
    boxZoom: PropTypes.bool,

    /**
     * Sets the geographic center of the map
     */
    center: PropTypes.arrayOf(PropTypes.number),

    /**
     * Whether the map can be zoomed in by double clicking on it and zoomed out by
     * double clicking while holding shift. If passed 'center', double-click zoom
     * will zoom to the center of the view regardless of where the mouse was.
     * Defaults to true.
     */
    doubleClickZoom: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),

    /**
     * Whether the map be draggable with mouse/touch or not.
     */
    dragging: PropTypes.bool,

    /**
     * Makes the map focusable and allows users to navigate the map with keyboard
     * arrows and +/- keys.
     */
    keyboard: PropTypes.bool,

    /**
     * When this option is set, the map restricts the view to the given geographical bounds,
     * bouncing the user back if the user tries to pan outside the view. To set the
     * restriction dynamically, use setMaxBounds method.
     */
    maxBounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),

    /**
     * Whether the map can be zoomed by using the mouse wheel. If passed 'center',
     * it will zoom to the center of the view regardless of where the mouse was.
     */
    scrollWheelZoom: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),

    /**
     * Boolean to control whether to use flyTo functions for bounds and center.
     * If false map.fitBounds and map.setView will be used. If true map.flyToBounds
     * and map.flyTo will be used. Defaults to false.
     */
    useFlyTo: PropTypes.bool,

    /**
     * Enables mobile hacks for supporting instant taps (fixing 200ms click delay on
     * iOS/Android) and touch holds (fired as contextmenu events).
     */
    tap: PropTypes.bool,

    /**
     * Whether the map can be zoomed by touch-dragging with two fingers. If passed
     * 'center', it will zoom to the center of the view regardless of where the touch
     * events (fingers) were. Enabled for touch-capable web browsers except for old
     * Androids.
     */
    touchZoom: PropTypes.object,

    /**
     * Sets the viewport, which is an object containing 'center' and 'zoom'.
     */
    viewport: PropTypes.object,

    /**
     * Sets the map zoom level
     */
    zoom: PropTypes.number,

    // Static parameters

    /**
     * Whether Paths should be rendered on a Canvas renderer. By default,
     * all Paths are rendered in a SVG renderer.
     */
    preferCanvas: PropTypes.bool,

    /**
     * Whether a attribution control is added to the map by default.
     */
    attributionControl: PropTypes.bool,

    /**
     * Whether a zoom control is added to the map by default.
     */
    zoomControl: PropTypes.bool,

    /**
     * Set it to false if you don't want popups to close when user clicks the map.
     */
    closePopupOnClick: PropTypes.bool,

    /**
     * Forces the map's zoom level to always be a multiple of this, particularly
     * right after a fitBounds() or a pinch-zoom. By default, the zoom level
     * snaps to the nearest integer; lower values (e.g. 0.5 or 0.1) allow for
     * greater granularity. A value of 0 means the zoom level will not be snapped
     * after fitBounds or a pinch-zoom.
     */
    zoomSnap: PropTypes.number,

    /**
     * Controls how much the map's zoom level will change after a zoomIn(),
     * zoomOut(), pressing + or - on the keyboard, or using the zoom controls.
     * Values smaller than 1 (e.g. 0.5) allow for greater granularity.
     */
    zoomDelta: PropTypes.number,

    /**
     * Whether the map automatically handles browser window resize to update itself.
     */
    trackResize: PropTypes.bool,

    /**
     * The Coordinate Reference System to use. Don't change this if you're not sure
     * what it means. Set the crs property to one of these strings to use the corresponding Leaflet CRS object
     */
    crs: PropTypes.oneOf([
            "EPSG3395",
            "EPSG3857",
            "EPSG4326",
            "Earth",
            "Simple",
            "Base"
    ]),

    /**
     * Minimum zoom level of the map. If not specified and at least one GridLayer or
     * TileLayer is in the map, the lowest of their minZoom options will be used instead.
     */
    minZoom: PropTypes.number,

    /**
     * Maximum zoom level of the map. If not specified and at least one GridLayer or
     * TileLayer is in the map, the highest of their maxZoom options will be used instead.
     */
    maxZoom: PropTypes.number,

    /**
     * The default method for drawing vector layers on the map. L.SVG or L.Canvas by default
     * depending on browser support.
     */
    renderer: PropTypes.object,

    /**
     * Whether the map zoom animation is enabled. By default it's enabled in all browsers
     * that support CSS3 Transitions except Android.
     */
    zoomAnimation: PropTypes.bool,

    /**
     * Won't animate zoom if the zoom difference exceeds this value.
     */
    zoomAnimationThreshold: PropTypes.number,

    /**
     * Whether the tile fade animation is enabled. By default it's enabled in all browsers
     * that support CSS3 Transitions except Android.
     */
    fadeAnimation: PropTypes.bool,

    /**
     * Whether markers animate their zoom with the zoom animation, if disabled they will
     * disappear for the length of the animation. By default it's enabled in all browsers
     * that support CSS3 Transitions except Android.
     */
    markerZoomAnimation: PropTypes.bool,

    /**
     * Defines the maximum size of a CSS translation transform. The default value should
     * not be changed unless a web browser positions layers in the wrong place after doing
     * a large panBy.
     */
    transform3DLimit: PropTypes.number,

    /**
     * If enabled, panning of the map will have an inertia effect where the map builds
     * momentum while dragging and continues moving in the same direction for some time.
     * Feels especially nice on touch devices. Enabled by default unless running on old
     * Android devices.
     */
    inertia: PropTypes.bool,

    /**
     * The rate with which the inertial movement slows down, in pixels/second.
     */
    inertiaDeceleration: PropTypes.number,

    /**
     * Max speed of the inertial movement, in pixels/second.
     */
    inertiaMaxSpeed: PropTypes.number,

    /**
     * With this option enabled, the map tracks when you pan to another "copy" of
     * the world and seamlessly jumps to the original one so that all overlays like
     * markers and vector layers are still visible.
     */
    worldCopyJump: PropTypes.bool,

    /**
     * If maxBounds is set, this option will control how solid the bounds are when
     * dragging the map around. The default value of 0.0 allows the user to drag
     * outside the bounds at normal speed, higher values will slow down map dragging
     * outside bounds, and 1.0 makes the bounds fully solid, preventing the user from
     * dragging outside the bounds.
     */
    maxBoundsViscosity: PropTypes.number,

    /**
     * Amount of pixels to pan when pressing an arrow key.
     */
    keyboardPanDelta: PropTypes.number,

    /**
     * Limits the rate at which a wheel can fire (in milliseconds). By default user
     * can't zoom via wheel more often than once per 40 ms.
     */
    wheelDebounceTime: PropTypes.number,

    /**
     * How many scroll pixels (as reported by L.DomEvent.getWheelDelta) mean a change
     * of one full zoom level. Smaller values will make wheel-zooming faster (and vice
     * versa).
     */
    wheelPxPerZoomLevel: PropTypes.number,

    /**
     * The max number of pixels a user can shift his finger during touch for it to
     * be considered a valid tap.
     */
    tapTolerance: PropTypes.number,

    /**
     * Set it to false if you don't want the map to zoom beyond min/max zoom and then
     * bounce back when pinch-zooming.
     */
    bounceAtZoomLimits: PropTypes.bool,

    // Standard parameters

    /**
     * The ID used to identify this component in Dash callbacks (dynamic)
     */
    id: PropTypes.string,

    /**
     * The children of this component (dynamic)
     */
    children: PropTypes.node,

    /**
     * The CSS style of the component (dynamic)
     */
    style: PropTypes.object,

    /**
     * The class name of the component (dynamic)
     */
    className: PropTypes.string,

    /**
     * The attribution string for the component (dynamic)
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
    dbl_click_lat_lng: PropTypes.arrayOf(PropTypes.number),

    /**
     * Dash callback property. Receives [lat, lng, accuracy] when user location is found.
     */
    location_lat_lon_acc: PropTypes.arrayOf(PropTypes.number)

};


