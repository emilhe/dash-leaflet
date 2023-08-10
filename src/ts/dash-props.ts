import {DashComponent, Modify} from "./props";
import * as LP from "./leaflet-props"
import * as RLP from "./react-leaflet-props"
import L, {Control} from "leaflet";
import {ControlProps} from "./leaflet-props";
import {ReactNode} from "react";

//#region Default components

export type CircleProps = Modify<Modify<LP.CircleProps, RLP.CircleProps>, DashComponent>;
export type CircleMarkerProps = Modify<Modify<LP.CircleMarkerProps, RLP.CircleMarkerProps>, DashComponent>;
export type PolylineProps = Modify<Modify<LP.PolylineProps, RLP.PolylineProps>, DashComponent>;
export type PolygonProps = Modify<Modify<LP.PolygonProps, RLP.PolygonProps>, DashComponent>;
export type RectangleProps = Modify<Modify<LP.RectangleProps, RLP.RectangleProps>, DashComponent>;
export type SVGOverlayProps = Modify<Modify<LP.SVGOverlayProps, RLP.SVGOverlayProps>, DashComponent>;
export type ImageOverlayProps = Modify<Modify<LP.ImageOverlayProps, RLP.ImageOverlayProps>, DashComponent>;
export type MarkerProps = Modify<Modify<LP.MarkerProps, RLP.MarkerProps>, {
    /**
     * Options passed to L.icon constructor. See https://leafletjs.com/reference.html#icon for details on how to customize the marker icon. [DL]
     */
    icon?: L.IconOptions;
} & DashComponent>;
export type PopupProps = Modify<Modify<LP.PopupProps, RLP.PopupProps>, DashComponent>;
export type TileLayerProps = Modify<Modify<LP.TileLayerProps, RLP.TileLayerProps>, {
    /**
     * The URL template in the form 'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'. [MUTABLE, DL]
     */
    url?: string;
} & DashComponent>;
export type TooltipProps = Modify<Modify<LP.TooltipProps, RLP.TooltipProps>, DashComponent>;
export type VideoOverlayProps = Modify<Modify<LP.VideoOverlayProps, RLP.VideoOverlayProps>, DashComponent>;
export type WMSTileLayerProps = Modify<Modify<LP.WMSTileLayerProps, RLP.WMSTileLayerProps>, {
    /**
     * The Coordinate Reference System to use. Don't change this if you're not sure what it means. [DL]
     */
    crs?: string;
} & DashComponent>;
export type LayerGroupProps = Modify<Modify<LP.LayerGroupProps, RLP.LayerGroupProps>, DashComponent>;
export type FeatureGroupProps = Modify<Modify<LP.FeatureGroupProps, RLP.FeatureGroupProps>, DashComponent>;
export type PaneProps = Modify<RLP.PaneProps, DashComponent>;
export type ZoomControlProps = Modify<Modify<LP.ZoomControlProps, RLP.ZoomControlProps>, DashComponent>;
export type AttributionControlProps = Modify<Modify<LP.AttributionControlProps, RLP.AttributionControlProps>, DashComponent>;
export type ScaleControlProps = Modify<Modify<LP.ScaleControlProps, RLP.ScaleControlProps>, DashComponent>;
export type LayersControlProps = Modify<Modify<LP.LayersControlProps, RLP.LayersControlProps>, DashComponent>;
export type BaseLayerProps = Modify<RLP.BaseLayerProps, DashComponent>;
export type OverlayProps = Modify<RLP.OverlayProps, DashComponent>;
export type MapContainerProps =  Modify<Modify<LP.MapProps, RLP.MapContainerProps>, {
    /**
     * The Coordinate Reference System to use. Don't change this if you're not sure what it means. [DL]
     */
    crs?: string;
} & DashComponent>;

//#endregion

export type LocateControlProps = {
    // /**
    //  * The layer that the user's location should be drawn on.
    //  */
    // layer?: L.Layer;

    /**
     * Set the map view (zoom and pan) to the user's location as it updates.
     */
    setView?: false | 'once' | 'always' | 'untilPan' | 'untilPanOrZoom';

    /**
     * Smooth pan and zoom to the location of the marker. Only works in Leaflet 1.0+.
     */
    flyTo?: boolean;

    /**
     * Only pan when setting the view.
     */
    keepCurrentZoomLevel?: boolean;

    /**
     * After activating the plugin by clicking on the icon, zoom to the selected zoom level, even when keepCurrentZoomLevel is true. Set to false to disable this feature.
     */
    initialZoomLevel?: boolean | number;

    /**
     * What to do when the user clicks on the control. Has three options inView, inViewNotFollowing and outOfView. Possible values are stop and setView, or the name of a behaviour to inherit from.
     */
    clickBehavior?: object;

    /**
     * If set, save the map bounds just before centering to the user's location. When control is disabled, set the view back to the bounds that were saved.
     */
    returnToPrevBounds?: boolean;

    /**
     * Keep a cache of the location after the user deactivates the control. If set to false, the user has to wait until the locate API returns a new location before they see where they are again.
     */
    cacheLocation?: boolean;

    /**
     * Show the compass bearing on top of the location marker.
     */
    showCompass?: boolean;

    /**
     * If set, a circle that shows the location accuracy is drawn.
     */
    drawCircle?: boolean;

    /**
     * If set, the marker at the users' location is drawn.
     */
    drawMarker?: boolean;

    // /**
    //  * The class to be used to create the marker.
    //  */
    // markerClass?: class;
    //
    // /**
    //  * The class to be used to create the compass.
    //  */
    // compassClass?: class;
    //
    // /**
    //  * Accuracy circle style properties.
    //  */
    // circleStyle?: L.PathOptions;
    //
    // /**
    //  * Inner marker style properties. Only works if your marker class supports setStyle.
    //  */
    // markerStyle?: L.PathOptions;
    //
    // /**
    //  * Triangle compass heading marker style properties. Only works if your marker class supports setStyle.
    //  */
    // compassStyle?: L.PathOptions;
    //
    // /**
    //  * Changes to the accuracy circle while following. Only need to provide changes.
    //  */
    // followCircleStyle?: L.PathOptions;
    //
    // /**
    //  * Changes to the inner marker while following. Only need to provide changes.
    //  */
    // followMarkerStyle?: L.PathOptions;
    //
    // /**
    //  * Changes to the compass marker while following. Only need to provide changes.
    //  */
    // followCompassStyle?: L.PathOptions;

    /**
     * The CSS class for the icon.
     */
    icon?: string;

    /**
     * The CSS class for the icon while loading.
     */
    iconLoading?: string;

    /**
     * The element to be created for icons.
     */
    iconElementTag?: string;

    /**
     * Padding around the accuracy circle.
     */
    circlePadding?: number[];

    // /**
    //  * This callback can be used in case you would like to override button creation behavior.
    //  */
    // createButtonCallback?: ((container: HTMLDivElement, options: L.LocateOptions) => void);
    //
    // /**
    //  * This callback can be used to override the viewport tracking behavior.
    //  */
    // getLocationBounds?: function;
    //
    // /**
    //  * This event is called when the user's location is outside the bounds set on the map.
    //  */
    // onLocationError?: ((event: ErrorEvent, control: L.Control.Locate) => void);

    /**
     * Use metric units.
     */
    metric?: boolean;

    // /**
    //  * Called when the user's location is outside the bounds set on the map. Called repeatedly when the user's location changes.
    //  */
    // onLocationOutsideMapBounds?: ((control: L.Control.Locate) => void);

    /**
     * Display a pop-up when the user click on the inner marker.
     */
    showPopup?: boolean;

    /**
     * Strings used in the control. Options are title, text, metersUnit, feetUnit, popup and outsideMapBoundsMsg
     */
    strings?: L.Control.StringsOptions;

    /**
     * The default options passed to leaflets locate method.
     */
    locateOptions?: L.LocateOptions;

} & ControlProps & DashComponent;

export type EasyButtonProps = {
    /**
     * The icon to show, e.g. 'fa-globe' from "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
     */
    icon: string,

    /**
     * Title on the button.
     */
    title?: string,

} & RLP.EventedBehavior & ControlProps & DashComponent;

export type PolylineDecoratorProps = {
    /**
     * An array of geographical points (lat, lon)
     */
    positions?: number[][] | number[][][],

    /**
     * The children of this component. If positions are not specified, an attempt is made to read them from the
     * children property. In this case, the children must be a single PolyLine or a single Polygon.
     */
    children?: ReactNode

    /**
     * List of patterns to be added.
     */
    patterns: {
        // Options of the pattern itself.
        offset: string,
        endOffset: string,
        repeat: string,
        // What to draw; either dashes, arrow heads or (arbitrary) makers.
        dash: {
            pixelSize: number,
            pathOptions: object
        },
        arrowHead: {
            polygon: boolean,
            pixelSize: number,
            headAngle: number,
            pathOptions: object
        },
        marker: {
            markerOptions: object,
            rotate: boolean
        }
    }[]
} & RLP.EventedBehavior & DashComponent;

export type FullScreenControlProps = {
    /**
     * Content of the button, can be HTML, default 'null'.
     */
    content?: string;

    /**
     * Title of the button, default 'Full Screen'.
     */
    title?: string;

    /**
     * Title of the button when fullscreen is on, default 'Exit Full Screen'.
     */
    titleCancel?: string;

    /**
     * Force separate button to detach from zoom buttons, default 'false'.
     */
    forceSeparateButton?: boolean;

    /**
     * Force use of pseudo full screen even if full screen API is available, default 'false'.
     */
    forcePseudoFullscreen?: boolean;

    /**
     * Dom element to render in full screen, false by default, fallback to 'map._container'.
     */
    fullscreenElement?: false | HTMLElement;
} & RLP.EventedBehavior & ControlProps & DashComponent

// TODO: https://github.com/elmarquis/Leaflet.GestureHandling/issues/47#issuecomment-775158618
export type GestureHandlingProps = {
    // /**
    //  * The plugin will auto-detect a users language from the browser setting and show the appropriate translation.
    //  * 52 languages are supported without you needing to do anything. However if you wish to override this, you can
    //  * set your own text by supplying gestureHandlingOptions and a text option as shown below. You must specify text
    //  * for touch, scroll and scrollMac.
    //  */
    // text?: {
    //     touch: string,
    //     scroll: string,
    //     scrollMac: string
    // }
    //
    // /**
    //  * Time in ms before the message should disappear. default: 1000 (1 sec).
    //  */
    // duration?: number,
} & DashComponent;

export type DivMarkerProps = {
    /**
     * Options passed to DivIcon constructor.
     */
    iconOptions: {
        iconSize: number,
        iconAnchor: number
        popupAnchor: number,
        className: string,
        html: string
    };
} & Modify<LP.MarkerProps, Omit<RLP.MarkerProps, "icon">> & DashComponent;

export type ColorbarOptions = {
    /**
     * Chroma-js colorscale. Either a colorscale name, e.g. "Viridis", or a list of colors,
     * e.g. ["black", "#fdd49e", "rgba(255,0,0,0.35)"].
     * The predefined colorscales are listed here:
     * https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.js
     */
    colorscale?: string | string[];

    /**
     * Width in pixels.
     */
    width?: number;

    /**
     * Height in pixels.
     */
    height?: number;

    /**
     * Domain minimum of the colorbar. Translates to the first color of the colorscale.
     */
    min?: number;

    /**
     * Domain maximum of the colorbar. Translates to the last color of the colorscale.
     */
    max?: number;

    /**
     * The number or positions of discrete classes in the colorbar. If not set the
     * colorbar will be continuous, which is the default.
     */
    classes?: number | number[];

    /**
     * Optional text to append to the colorbar ticks.
     */
    unit?: string;

    /**
     * Number of ticks on the colorbar.
     */
    nTicks?: number;

    /**
     * If set, fixes the tick decimal points to the given number.
     */
    tickDecimals?: number;

    /**
     * If set, these values are used for ticks (rather than the ones genrated based on nTicks).
     */
    tickValues?: number[],

   /**
     * If set, this text will be used instead of the data values.
     */
    tickText?: number[],

    /**
     * If true, the value will be shown as tooltip on hover.
     */
    tooltip?: boolean,

    /**
     * Opacity of the colorbar. Use it to match the perceived colors from an overlay
     * with opacity.
     */
    opacity?: number;

    /**
     * HTML style object to add to the colorbar entity, e.g. to set font color.
     */
    style?: object;

    /**
     * Any CSS classes to appy.
     */
    className?: string;

} & ControlProps;
export type ColorbarProps = ColorbarOptions & DashComponent;

export type MeasureControlOptions = {
    /**
     * The primary units used to display length results.
     */
    primaryLengthUnit?: "feet" | "meters" | "miles" | "kilometers";

    /**
     * The secondary units used to display length results.
     */
    secondaryLengthUnit?: "feet" | "meters" | "miles" | "kilometers";

    /**
     * The primary units used to display area results.
     */
    primaryAreaUnit?: "acres" | "hectares"| "sqfeet"| "sqmeters"| "sqmiles";

    /**
     * The secondary units used to display area results.
     */
    secondaryAreaUnit?: "acres" | "hectares"| "sqfeet"| "sqmeters"| "sqmiles";

    /**
     * The color to use for map features rendered while actively performing a measurement.
     */
    activeColor?: string,

    /**
     * The color to use for features generated from a completed measurement.
     */
    completedColor?: string,

    /**
     * The options applied to the popup of the resulting measure feature.
     */
    popupOptions?: L.PopupOptions,

    // /**
    //  * Custom units to make available to the measurement calculator. Packaged units are feet, meters, miles, and kilometers for length and acres, hectares, sqfeet, sqmeters, and sqmiles for areas. Additional unit definitions can be added to the packaged units using this option.
    //  */
    // unit: string,

    /**
     * The Z-index of the marker used to capture measure clicks.
     */
    captureZIndex?: number,

    /**
     * The decimal point separator used when displaying measurements.
     */
    decPoint?: string,

    /**
     * The thousands separator used when displaying measurements.
     */
    thousandsSep?: string,
} & ControlProps;
export type MeasureControlProps = MeasureControlOptions & RLP.EventedBehavior & DashComponent ;

export type EditControlOptions = {
    /**
     * Enable/disable draw controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    draw?: object; // TODO: MAYBE ADD MORE INFO?

    /**
     * Enable/disable edit controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    edit?: object; // TODO: MAYBE ADD MORE INFO?

    // Custom properties.  TODO: WHAT TO DO ABOUT THESE?

    /**
     * Fires on every action.
     */
    action?: object; // TODO: MAYBE ADD MORE INFO?

    /**
     * Change this prop to manipulate the drawing toolbar, i.e. to change modes and/or invoke actions.
    */
    drawToolbar?: {
        mode: "marker" | "polygon" | "polyline" | "rectangle" | "circle" | "circlemarker",
        action: "cancel" | "finish" | "delete last point",  // Optionally, invoke an action
        n_clicks: number,
    };

    /**
     * Change this prop to manipulate the edit toolbar, i.e. to change modes and/or invoke actions.
     */
    editToolbar?: {
        mode: "edit" | "remove",
        action: "save" | "cancel" | "clear all",  // Optionally, invoke an action
        n_clicks: number,
    };

    /**
     * Geojson representing the current features.
     */
    geojson?: object,

    // TODO: Think about event mapping. Just use the handler map stuff? ADD TEST TO CHECK THAT IT WORKS!

} & ControlProps;
export type EditControlProps = EditControlOptions & RLP.EventedBehavior & DashComponent ;

