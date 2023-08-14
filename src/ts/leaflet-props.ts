/**
 * This module holds property definitions related to "pure" leaflet. The original definitions cannot be used, as they
 * lack comments, which are required for Dash component generation.
 */

import L from 'leaflet';

export interface LayerProps {
    /**
     * String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
     */
    attribution?: string; 

    /**
     * Map pane where the layer will be added.
     */
    pane?: string;
}

export interface ControlProps{
    /**
     * Map control position.
     */
    position?: L.ControlPosition;
}

export interface GridLayerProps extends LayerProps {
    /**
     * Width and height of tiles in the grid. Use a number if width and height are equal, or L.point(width, height) otherwise.
     */
    tileSize?: number;

    /**
     * Opacity of the tiles. Can be used in the createTile() function.
     */
    opacity?: number;

    /**
     * Load new tiles only when panning ends. true by default on mobile browsers, in order to avoid too many requests and keep smooth navigation. false otherwise in order to display new tiles during panning, since it is easy to pan outside the keepBuffer option in desktop browsers.
     */
    updateWhenIdle?: boolean;

    /**
     * By default, a smooth zoom animation (during a touch zoom or a flyTo()) will update grid layers every integer zoom level. Setting this option to false will update the grid layer only when the smooth animation ends.
     */
    updateWhenZooming?: boolean;

    /**
     * Tiles will not update more than once every updateInterval milliseconds when panning.
     */
    updateInterval?: number;

     /**
     * The explicit zIndex of the tile layer.
     */
     zIndex?: number;   

     /**
     * If set, tiles will only be loaded inside the set LatLngBounds.
     */
     bounds?: L.LatLngBoundsExpression;   

     /**
     * The minimum zoom level down to which this layer will be displayed (inclusive).
     */
     minZoom?: number;  

     /**
     * The maximum zoom level up to which this layer will be displayed (inclusive).
     */
     maxZoom?: number;  

     /**
     * Maximum zoom number the tile source has available. If it is specified, the tiles on all zoom levels higher than maxNativeZoom will be loaded from maxNativeZoom level and auto-scaled.
     */
     maxNativeZoom?: number;

     /**
     * Minimum zoom number the tile source has available. If it is specified, the tiles on all zoom levels lower than minNativeZoom will be loaded from minNativeZoom level and auto-scaled.
     */
     minNativeZoom?: number;  

     /**
     * Whether the layer is wrapped around the antimeridian. If true, the GridLayer will only be displayed once at low zoom levels. Has no effect when the map CRS doesn't wrap around. Can be used in combination with bounds to prevent requesting tiles outside the CRS limits.
     */
     noWrap?: boolean;    
     
     /**
     * Map pane where the grid layer will be added.
     */
     pane?: string;

    /**
     * A custom class name to assign to the tile layer. Empty by default.
     */
    className?: string;    

     /**
     * When panning the map, keep this many rows and columns of tiles before unloading them.
     */
     keepBuffer?: number;    
}

export interface TileLayerProps extends GridLayerProps {
    /**
     * The minimum zoom level down to which this layer will be displayed (inclusive).
     */
    minZoom?: number;

    /**
     * The maximum zoom level up to which this layer will be displayed (inclusive).
     */
    maxZoom?: number;

    /**
     * Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
     */
    subdomains?: string | string[];

    /**
     * URL to the tile image to show in place of the tile that failed to load.
     */
    errorTileUrl?: string;

    /**
     * The zoom number used in tile URLs will be offset with this value.
     */
    zoomOffset?: number;

    /**
     * If true, inverses Y axis numbering for tiles (turn this on for TMS services).
     */
    tms?: boolean;
    
    /**
     * If set to true, the zoom number used in tile URLs will be reversed (maxZoom - zoom instead of zoom).
     */
    zoomReverse?: boolean;

    /**
     * If true and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
     */
    detectRetina?: boolean;

    /**
     * Whether the crossOrigin attribute will be added to the tiles. If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data. Refer to CORS Settings for valid String values.
     */
    crossOrigin?: boolean | L.CrossOrigin;

    /**
     * Whether the referrerPolicy attribute will be added to the tiles. If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided. This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer (e.g. to validate an API token). Refer to HTMLImageElement.referrerPolicy for valid String values.
     */
    referrerPolicy?: boolean | L.ReferrerPolicy;
}

export interface WMSTileLayerProps extends TileLayerProps {
    /**
     * Comma-separated list of WMS layers to show.
     */
    layers: string;

    /**
     * Comma-separated list of WMS styles.
     */
    styles?: string;

    /**
     * WMS image format (use 'image/png' for layers with transparency).
     */
    format?: string;

    /**
     * If true, the WMS service will return images with transparency.
     */
    transparent?: boolean;

    /**
     * Version of the WMS service to use.
     */
    version?: string;

    // /**
    //  * Coordinate Reference System to use for the WMS requests, defaults to map CRS. Don't change this if you're not sure what it means.
    //  */
    // crs?: L.CRS;

    /**
     * If true, WMS request parameter keys will be uppercase.
     */
    uppercase?: boolean;
}

export interface InteractiveLayerProps extends LayerProps{
    /**
     * If false, the layer will not emit mouse events and will act as a part of the underlying map.
     */
    interactive?: boolean;

    /**
     * When true, a mouse event on this layer will trigger the same event on the map (unless L.DomEvent.stopPropagation is used).
     */
    bubblingMouseEvents?: boolean;   
}

export interface DivOverlayProps extends InteractiveLayerProps {
    /**
     * If true, the popup/tooltip will listen to the mouse events.
     */
    interactive?: boolean;

    /**
     * The offset of the overlay position.
     */
    offset?: L.Point;

    /**
     * A custom CSS class name to assign to the overlay.
     */
    className?: string;

    /**
     * Map pane where the overlay will be added.
     */
    pane?: string;

    /**
     * Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be passed to the function. The function should return a String or HTMLElement to be used in the overlay.
     */
    content?: string|HTMLElement;   
}

export interface PopupProps extends DivOverlayProps {
    /**
     * Map pane where the popup will be added.
     */
    pane?: string;

    /**
     * The offset of the popup position.
     */
    offset?: L.Point;

    /**
     * Max width of the popup, in pixels.
     */
    maxWidth?: number;

    /**
     * Min width of the popup, in pixels.
     */
    minWidth?: number;

    /**
     * If set, creates a scrollable container of the given height inside a popup if its content exceeds it. The scrollable container can be styled using the leaflet-popup-scrolled CSS class selector.
     */
    maxHeight?: number;

    /**
     * Set it to false if you don't want the map to do panning animation to fit the opened popup.
     */
    autoPan?: boolean;

    /**
     * The margin between the popup and the top left corner of the map view after autopanning was performed.
     */
    autoPanPaddingTopLeft?: L.Point;

    /**
     * The margin between the popup and the bottom right corner of the map view after autopanning was performed.
     */
    autoPanPaddingBottomRight?: L.Point;

    /**
     * Equivalent of setting both top left and bottom right autopan padding to the same value.
     */
    autoPanPadding?: L.Point;

    /**
     * Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
     */
    keepInView?: boolean;

    /**
     * Controls the presence of a close button in the popup.
     */
    closeButton?: boolean;

    /**
     * Set it to false if you want to override the default behavior of the popup closing when another popup is opened.
     */
    autoClose?: boolean;

    /**
     * Set it to false if you want to override the default behavior of the ESC key for closing of the popup.
     */
    closeOnEscapeKey?: boolean;

    /**
     * Set it if you want to override the default behavior of the popup closing when user clicks on the map. Defaults to the map's closePopupOnClick option.
     */
    closeOnClick?: boolean;

    /**
     * A custom CSS class name to assign to the popup.
     */
    className?: string;
}

export interface TooltipProps extends DivOverlayProps {
    /**
     * Map pane where the popup will be added.
     */
    pane?: string;

    /**
     * The offset of the popup position.
     */
    offset?: L.Point;

    /**
     * Direction where to open the tooltip. Possible values are: right, left, top, bottom, center, auto. auto will dynamically switch between right and left according to the tooltip position on the map.
     */
    direction?: L.Direction;

    /**
     * Whether to open the tooltip permanently or only on mouseover.
     */
    permanent?: boolean;

    /**
     * If true, the tooltip will follow the mouse instead of being fixed at the feature center.

     */
    sticky?: boolean;

    /**
     * Tooltip container opacity.
     */
    opacity?: number;
}

export interface MarkerProps extends InteractiveLayerProps {
    /**
     * Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
     */    
    keyboard?: boolean;

    /**
     * Text for the browser tooltip that appear on marker hover (no tooltip
     * by default).
     */
    title?: string;

    /**
     * 	Text for the alt attribute of the icon image. Useful for accessibility.
     */
    alt?: string;

    /**
     * By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like 1000 (or high negative value, respectively).
     */
    zIndexOffset?: number;

    /**
     * The opacity of the marker.
     */
    opacity?: number;

    /**
     * If true, the marker will get on top of others when you hover the mouse over it.
     */
    riseOnHover?: boolean;

    /**
     * The z-index offset used for the riseOnHover feature.
     */
    riseOffset?: number;

    /**
     * 	Map pane where the markers icon will be added.
     */
    pane?: string;

    /**
     * 	Map pane where the markers shadow will be added.
     */
    shadowPane?: string;

    /**
     * When true, the map will pan whenever the marker is focused (via e.g. pressing tab on the keyboard) to ensure the marker is visible within the map's bounds.
     */
    autoPanOnFocus?: boolean; 

    /**
     * Whether the marker is draggable with mouse/touch or not.
     */
    draggable?: boolean;

    /**
     * Whether to pan the map when dragging this marker near its edge or not.
     */
    autoPan?: boolean; 

    /**
     * Distance (in pixels to the left/right and to the top/bottom) of the map edge to start panning the map.
     */
    autoPanPadding?: number[];

    /**
     * Number of pixels the map should pan by.
     */
    autoPanSpeed?: number;
}

export interface ImageOverlayProps extends InteractiveLayerProps {
    /**
     * The opacity of the image overlay.
     */
    opacity?: number;

    /**
     * Text for the alt attribute of the image (useful for accessibility).
     */
    alt?: string;

    /**
     * If true, the image overlay will emit mouse events when clicked or hovered.
     */
    interactive?: boolean;

    /**
     * Whether the crossOrigin attribute will be added to the image. If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data. Refer to CORS Settings for valid String values.
     */
    crossOrigin?: boolean | L.CrossOrigin;

    /**
     * URL to the overlay image to show in place of the overlay that failed to load.
     */
    errorOverlayUrl?: string;

    /**
     * The explicit zIndex of the overlay layer.
     */
    zIndex?: number;

    /**
     * A custom class name to assign to the image. Empty by default.
     */
    className?: string;
}

export interface VideoOverlayProps extends ImageOverlayProps {
    /**
     * Whether the video starts playing automatically when loaded. On some browsers autoplay will only work with muted: true
     */
    autoplay?: boolean;

    /**
     * Whether the video will loop back to the beginning when played.
     */
    loop?: boolean;

    /**
     * Whether the video will save aspect ratio after the projection.
     */
    keepAspectRatio?: boolean;

    /**
     * Whether the video starts on mute when loaded.
     */
    muted?: boolean;

    /**
     * Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
     */
    playsInline?: boolean;
}

export interface PathProps extends InteractiveLayerProps {
    /**
     * Whether to draw stroke along the path. Set false to disable borders on polygons or circles.
     */
    stroke?: boolean;

    /**
     * Stroke color.
     */
    color?: string;

    /**
     * Stroke width in pixels.
     */
    weight?: number;

    /**
     * Stroke opacity.
     */
    opacity?: number;

    /**
     * A string that defines shape to be used at the end of the stroke.
     */
    lineCap?: L.LineCapShape;

    /**
     * A string that defines shape to be used at the corners of the stroke.
     */
    lineJoin?: L.LineJoinShape;

    /**
     * A string that defines the stroke dash pattern. Doesn't work on Canvas-powered layers in some old browsers.
     */
    dashArray?: string;

    /**
     * A string that defines the distance into the dash pattern to start the dash. Doesn't work on Canvas-powered layers in some old browsers.
     */
    dashOffset?: string;

    /**
     * Whether to fill the path with color. Set it to false to disable filling on polygons or circles.
     */
    fill?: boolean;

    /**
     * Fill color. Defaults to the value of the color option.
     */
    fillColor?: string;

    /**
     * Fill opacity.
     */
    fillOpacity?: number;

    /**
     * A string that defines how the inside of a shape is determined.
     */
    fillRule?: L.FillRule;

    // /**
    //  * Use this specific instance of Renderer for this path. Takes precedence over the map's default renderer.
    //  */

    // renderer?: L.Renderer;

    /**
     * Custom class name set on an element. Only for SVG renderer.
     */
    className?: string;
}

export interface CircleMarkerProps extends PathProps {
    /**
     * Radius in pixels.
     */
    radius: number;
}

export interface CircleProps extends CircleMarkerProps {
    /**
     * Radius in meters.
     */
    radius: number;
}

export interface PolylineProps extends PathProps {
    /**
     * How much to simplify the shape on each zoom level. More means better performance and smoother look, and less means more accurate representation.
     */
    smoothFactor?: number;

    /**
     * Disable clipping.
     */
    noClip?: boolean;
}

export interface PolygonProps extends PolylineProps {}

export interface RectangleProps extends PolygonProps {}

export interface SVGOverlayProps extends ImageOverlayProps {}

export interface LayerGroupProps extends InteractiveLayerProps {}

export interface FeatureGroupProps extends InteractiveLayerProps {}

export interface ZoomControlProps extends ControlProps {}

export interface AttributionControlProps extends ControlProps {
    /**
     * The HTML text shown before the attributions. Pass false to disable.
     */
    prefix?: string | boolean;
}

export interface ScaleControlProps extends ControlProps {
    /**
     * Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
     */
    maxWidth?: number;

    /**
     * Whether to show the metric scale line (m/km).
     */
    metric?: boolean;

    /**
     * Whether to show the imperial scale line (mi/ft).
     */
    imperial?: boolean;

    /**
     * If true, the control is updated on moveend, otherwise it's always up-to-date (updated on move).
     */
    updateWhenIdle?: boolean;
}

export interface LayersControlProps extends ControlProps {
    /**
     * If true, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
     */
    collapsed?: boolean;

    /**
     * If true, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
     */
    autoZIndex?: boolean;

    /**
     * If true, the base layers in the control will be hidden when there is only one.
     */
    hideSingleBase?: boolean;

    /**
     * Whether to sort the layers. When false, layers will keep the order in which they were added to the control.
     */
    sortLayers?: boolean;

    /**
     * A compare function that will be used for sorting the layers, when sortLayers is true. The function receives both the L.Layer instances and their names, as in sortFunction(layerA, layerB, nameA, nameB). By default, it sorts layers alphabetically by their name.
     */
    sortFunction?: boolean;
}

//#region Map options

interface ControlOptions {
    /**
     * Whether a attribution control is added to the map by default.
     */
    attributionControl?: boolean;

    /**
     * Whether a zoom control is added to the map by default.
     */
    zoomControl?: boolean;
}

interface InteractionOptions {
    /**
     * Set it to false if you don't want popups to close when user clicks the map.
     */
    closePopupOnClick?: boolean;

    /**
     * 	Whether the map can be zoomed to a rectangular area specified by dragging the mouse while pressing the shift key.
     */
    boxZoom?: boolean;

    /**
     * 	Whether the map can be zoomed in by double clicking on it and zoomed out by double clicking while holding shift. If passed 'center', double-click zoom will zoom to the center of the view regardless of where the mouse was.
     */
    doubleClickZoom?: L.Zoom;

    /**
     * 	Whether the map is draggable with mouse/touch or not.
     */
    dragging?: boolean;

    /**
     * 	Forces the map's zoom level to always be a multiple of this, particularly right after a fitBounds() or a pinch-zoom. By default, the zoom level snaps to the nearest integer; lower values (e.g. 0.5 or 0.1) allow for greater granularity. A value of 0 means the zoom level will not be snapped after fitBounds or a pinch-zoom.
     */
    zoomSnap?: number;

    /**
     * 	Controls how much the map's zoom level will change after a zoomIn(), zoomOut(), pressing + or - on the keyboard, or using the zoom controls. Values smaller than 1 (e.g. 0.5) allow for greater granularity.
     */
    zoomDelta?: number;

     /**
     * 	Whether the map automatically handles browser window resize to update itself.
     */
    trackResize?: boolean;
}

interface PanningInertiaOptions {
    /**
     * If enabled, panning of the map will have an inertia effect where the map builds momentum while dragging and continues moving in the same direction for some time. Feels especially nice on touch devices. Enabled by default.
     */
    inertia?: boolean;

    /**
     * The rate with which the inertial movement slows down, in pixels/second².
     */
    inertiaDeceleration?: number;

    /**
     * Max speed of the inertial movement, in pixels/second.
     */
    inertiaMaxSpeed?: number;

    /**
     * Defaults to 0.2.
     */
    easeLinearity?: number;

    /**
     * With this option enabled, the map tracks when you pan to another "copy" of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible.
     */
    worldCopyJump?: boolean;

    /**
     * If maxBounds is set, this option will control how solid the bounds are when dragging the map around. The default value of 0.0 allows the user to drag outside the bounds at normal speed, higher values will slow down map dragging outside bounds, and 1.0 makes the bounds fully solid, preventing the user from dragging outside the bounds.
     */
    maxBoundsViscosity?: number;
}

interface KeyboardNavigationOptions {
    /**
     * Makes the map focusable and allows users to navigate the map with keyboard arrows and +/- keys.
     */
    keyboard?: boolean;

    /**
     * Amount of pixels to pan when pressing an arrow key.
     */
    keyboardPanDelta?: number;
}

interface MouseWheelOptions {
    /**
     * Whether the map can be zoomed by using the mouse wheel. If passed 'center', it will zoom to the center of the view regardless of where the mouse was.
     */
    scrollWheelZoom?: L.Zoom;

    /**
     * Limits the rate at which a wheel can fire (in milliseconds). By default user can't zoom via wheel more often than once per 40 ms.
     */
    wheelDebounceTime?: number;

    /**
     * How many scroll pixels (as reported by L.DomEvent.getWheelDelta) mean a change of one full zoom level. Smaller values will make wheel-zooming faster (and vice versa).
     */
    wheelPxPerZoomLevel?: number;
}

interface TouchInteractionOptions {
    /**
     * Enables simulation of contextmenu event, default is true for mobile Safari.
     */
    tapHold?: boolean;

    /**
     * The max number of pixels a user can shift his finger during touch for it to be considered a valid tap.
     */
    tapTolerance?: number;

    /**
     * Whether the map can be zoomed by touch-dragging with two fingers. If passed 'center', it will zoom to the center of the view regardless of where the touch events (fingers) were. Enabled for touch-capable web browsers.
     */
    touchZoom?: L.Zoom;

    /**
     * Set it to false if you don't want the map to zoom beyond min/max zoom and then bounce back when pinch-zooming.
     */
    bounceAtZoomLimits?: boolean;
}

interface MapStateOptions {
    // /**
    //  * The Coordinate Reference System to use. Don't change this if you're not sure what it means.
    //  */
    // crs?: L.CRS;

    /**
     * Initial geographic center of the map.
     */
    center?: L.LatLng;

    /**
     * Initial map zoom level.
     */
    zoom?: number;

    /**
     * Minimum zoom level of the map. If not specified and at least one GridLayer or TileLayer is in the map, the lowest of their minZoom options will be used instead.
     */
    minZoom?: number;

    /**
     * Maximum zoom level of the map. If not specified and at least one GridLayer or TileLayer is in the map, the highest of their maxZoom options will be used instead.
     */
    maxZoom?: number;

    // /**
    //  * Array of layers that will be added to the map initially.
    //  */
    // layers?: L.Layer[];

    /**
     * When this option is set, the map restricts the view to the given geographical bounds, bouncing the user back if the user tries to pan outside the view. To set the restriction dynamically, use setMaxBounds method.
     */
    maxBounds?: L.LatLngBounds;

    // /**
    //  * The default method for drawing vector layers on the map. L.SVG or L.Canvas by default depending on browser support.
    //  */

    // renderer?: L.Renderer;

}

interface AnimationOptions {
    /**
     * Whether the map zoom animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android.
     */
    zoomAnimation?: boolean;

    /**
     * Won't animate zoom if the zoom difference exceeds this value.
     */
    zoomAnimationThreshold?: number;

    /**
     * Whether the tile fade animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android.
     */
    fadeAnimation?: boolean;

    /**
     * Whether markers animate their zoom with the zoom animation, if disabled they will disappear for the length of the animation. By default it's enabled in all browsers that support CSS3 Transitions except Android.
     */
    markerZoomAnimation?: boolean;

    /**
     * Defines the maximum size of a CSS translation transform. The default value should not be changed unless a web browser positions layers in the wrong place after doing a large panBy.
     */
    transform3DLimit?: number;
}

export type MapProps = {
    /**
     * Whether Paths should be rendered on a Canvas renderer. By default, all Paths are rendered in a SVG renderer.
     */
    preferCanvas?: boolean;
} & ControlOptions & InteractionOptions & PanningInertiaOptions & KeyboardNavigationOptions & MouseWheelOptions &
    TouchInteractionOptions & MapStateOptions & AnimationOptions

//#endregion