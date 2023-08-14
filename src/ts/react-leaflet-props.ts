/**
 * This module holds property definitions related to react-leaflet. The original definitions cannot be used, as they
 * lack comments, which are required for Dash component generation. In some cases (mainly for event logic),
 * modifications are imported from external props definitions.
 */

import {CSSProperties, ReactNode} from "react";
import L, {ControlPosition, FitBoundsOptions, LatLngBoundsExpression} from 'leaflet';
import {PathProps} from "./leaflet-props";
import {EventComponent, InteractionEvents, LoadEvent, ParentComponent} from "./props";

//#region Behavior

export type ParentComponentBehavior = ParentComponent;

export type EventedBehavior = EventComponent;

export type AtttributionBehavior = {
    /**
     * String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. [MUTABLE]
     */
    attribution?: string; 
}

export type PaneBehavior = {
    /**
     * Map pane where the layer will be added.
     */
    pane?: string;
}

export type PathBehaviour = {
    /**
     * Path options. Use this prop, if you want to modify path options through callbacks. [MUTABLE]
     */
    pathOptions?: PathProps;
}

export type MediaOverlayBehaviour = {
    /**
     * The geographical bounds that the overlay is tied to. [MUTABLLE]
     */
    bounds: L.LatLngBoundsExpression;

    /**
     * The overlay opacity. [MUTABLLE]
     */
    opacity?: number;

    /**
     * The overlay zIndex. [MUTABLLE]
     */
    zIndex?: number;
} & LoadEvent

export type GridLayerBehavior = {
    /**
     * The layer opacity. [MUTABLLE]
     */
    opacity?: number;

    /**
     * The layer zIndex. [MUTABLLE]
     */
    zIndex?: number;
} & LoadEvent

export type ControlBehavior = {
    /**
     * Map control position. [MUTABLE]
     */
    position?: ControlPosition;
}

// Composite behavior.

export type LayerComponent = EventedBehavior & AtttributionBehavior & PaneBehavior;

export type InteractiveLayerComponent = LayerComponent & InteractionEvents;

export type PathComponent = InteractiveLayerComponent & PathBehaviour;

//#endregion

//#region Components

export type MarkerProps = {
    /**
     * A geographical point in (lat, lon) format. [MUTABLE]
     */
    position: L.LatLngExpression;

    /**
     * Icon instance to use for rendering the marker. See Icon documentation for details on how to customize the marker icon. If not specified, a common instance of L.Icon.Default is used.
     */
    icon?: L.Icon;

    /**
     * Whether the marker is draggable with mouse/touch or not. [MUTABLE]
     */
    draggable?: boolean;

    /**
     * The opacity of the marker. [MUTABLE]
     */
    opacity?: number;

    /**
     * By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like 1000 (or high negative value, respectively). [MUTABLE]
     */
    zIndexOffset?: number;
} & InteractiveLayerComponent & ParentComponentBehavior;

export type PopupProps = {
    /**
     * A geographical point in (lat, lon) format. [MUTABLE]
     */
    position?: L.LatLngExpression;
} & InteractiveLayerComponent & ParentComponentBehavior;

export type TooltipProps = {
    /**
     * A geographical point in (lat, lon) format. [MUTABLE]
     */
    position?: L.LatLngExpression;
} & InteractiveLayerComponent & ParentComponentBehavior;

export type TileLayerProps = {
    /**
     * The URL template in the form 'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'. [MUTABLE]
     */
    url: string;
} & EventedBehavior & PaneBehavior & GridLayerBehavior;

export type WMSTileLayerProps = {
    /**
     * The URL template.
     */
    url: string;

    /**
     * WMS parameters. [MUTABLE]
     */
    params?: L.WMSParams;
} & EventedBehavior & PaneBehavior & GridLayerBehavior;

export type ImageOverlayProps = {
    /**
     * The image URL. [MUTABLE]
     */
    url: string;
} & InteractiveLayerComponent & MediaOverlayBehaviour & ParentComponentBehavior;

export type VideoOverlayProps = {
    /**
     * The video URL. [MUTABLE]
     */
    url: string;
    /**
     * Set to true/false to start/stop video playback. [MUTABLE]
     */
    play?: boolean;
} & InteractiveLayerComponent & MediaOverlayBehaviour & ParentComponentBehavior;

export type CircleProps = {
    /**
     * A geographical point in (lat, lon) format. [MUTABLE]
     */
    center: L.LatLngExpression;

    /**
     * Radius of the circle, in meters.
     */
    radius: number;
} & ParentComponentBehavior & PathComponent;

export type CircleMarkerProps = {
    /**
     * A geographical point in (lat, lon) format. [MUTABLE]
     */
    center: L.LatLngExpression;

    /**
     * Radius of the circle, in pixels.
     */
    radius: number;
} &  ParentComponentBehavior & PathComponent;

export type PolylineProps = {
    /**
     * Array of geographical points. You can create a Polyline object with multiple separate lines (MultiPolyline) by passing an array of arrays of geographic points.
     */
    positions: L.LatLngExpression[] | L.LatLngExpression[][];
} &  ParentComponentBehavior & PathComponent;

export type PolygonProps = {
    /**
     * Array of geographical points. Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points. You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape. Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.
     */
    positions: L.LatLngExpression[] | L.LatLngExpression[][] | L.LatLngExpression[][][];
} & ParentComponentBehavior & PathComponent;

export type RectangleProps = {
    /**
     * Geographical bounds.
     */
    bounds: L.LatLngBoundsExpression;
} & ParentComponentBehavior & PathComponent;

export type SVGOverlayProps = {
    /**
     * The attributes must be valid SVGSVGElement properties.
     */
    attributes: Record<string, string>;
} & MediaOverlayBehaviour & PathComponent & ParentComponentBehavior;

export type LayerGroupProps = LayerComponent & ParentComponentBehavior;

export type FeatureGroupProps = LayerComponent & ParentComponentBehavior;

export type PaneProps = {
    /**
     * The name must be unique to the pane and different from the default Leaflet pane names.
     */
    name: string;

    /**
     * CSS class(es).
     */
    className?: string;

    /**
     * Component style, e.g. { zIndex: 500 } to specify the pane zIndex.
     */
    style?: CSSProperties;  // TODO: WILL THIS GENERATE SHIT LOADS OF DOCS?
} & PaneBehavior & ParentComponentBehavior;

export type ZoomControlProps = ControlBehavior & EventedBehavior;

export type AttributionControlProps = ControlBehavior & EventedBehavior;

export type ScaleControlProps = ControlBehavior & EventedBehavior;

export type LayersControlProps = {
    /**
     * If true, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation. [MUTABLE]
     */
    collapsed?: boolean;
} & ControlBehavior & EventedBehavior & ParentComponentBehavior;

export type BaseLayerProps = {
    /**
     * Name if the layer, used for the label in the LayersControl.
     */
    name: boolean;

    /**
     * If true, the layer is show, otherwise it's hidden. [MUTABLE]
     */
    checked?: boolean;
} & ParentComponentBehavior;

export type OverlayProps = BaseLayerProps;

export type MapContainerProps = {
    /**
     * Initial map bounds.
     */
    bounds?: LatLngBoundsExpression;

    /**
     * Options for initial map bounds.
     */
    boundsOptions?: FitBoundsOptions;

    /**
     * Map components [MUTABLE].
     */
    children?: ReactNode;

    /**
     * Extra CSS classes to add to the map.
     */
    className?: string;

    /**
     * Unique identifier for the map.
     */
    id?: string;

    /**
     * Component to be shown instead of the map.
     */
    placeholder?: ReactNode;

    /**
     * Inline map style.
     */
    style?: CSSProperties;

    // /**
    //  * Event that fires when the map loads.
    //  */
    // whenReady?: () => void;
} & EventedBehavior & LoadEvent & InteractionEvents;

//#endregion