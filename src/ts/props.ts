/**
 * Every Dash components are given these props.
 * Use with your own props:
 * ```
 * type Props = {
 *     my_prop: string;
 * } & DashComponentProps;
 * ```
 * Recommended to use `type` instead of `interface` so you can define the
 * order of props with types concatenation.
 */

import {Modify} from "./dash-extensions-js";
import * as LP from "./leaflet-props";
import * as RLP from "./react-leaflet-props";

//#region Combination of Leaflet and React Leaflet props

export type CircleProps = Modify<LP.CircleProps, RLP.CircleProps>;
export type CircleMarkerProps = Modify<LP.CircleMarkerProps, RLP.CircleMarkerProps>;
export type PolylineProps = Modify<LP.PolylineProps, RLP.PolylineProps>;
export type PolygonProps = Modify<LP.PolygonProps, RLP.PolygonProps>;
export type RectangleProps = Modify<LP.RectangleProps, RLP.RectangleProps>;
export type SVGOverlayProps = Modify<LP.SVGOverlayProps, RLP.SVGOverlayProps>;
export type ImageOverlayProps = Modify<LP.ImageOverlayProps, RLP.ImageOverlayProps>;
export type MarkerProps = Modify<LP.MarkerProps, RLP.MarkerProps>
export type PopupProps = Modify<LP.PopupProps, RLP.PopupProps>;
export type TileLayerProps = Modify<LP.TileLayerProps, RLP.TileLayerProps>;
export type TooltipProps = Modify<LP.TooltipProps, RLP.TooltipProps>;
export type VideoOverlayProps = Modify<LP.VideoOverlayProps, RLP.VideoOverlayProps>;
export type WMSTileLayerProps = Modify<LP.WMSTileLayerProps, RLP.WMSTileLayerProps>;
export type LayerGroupProps = Modify<LP.LayerGroupProps, RLP.LayerGroupProps>;
export type FeatureGroupProps = Modify<LP.FeatureGroupProps, RLP.FeatureGroupProps>;
export type PaneProps = RLP.PaneProps;
export type ZoomControlProps = Modify<LP.ZoomControlProps, RLP.ZoomControlProps>;
export type AttributionControlProps = Modify<LP.AttributionControlProps, RLP.AttributionControlProps>;
export type ScaleControlProps = Modify<LP.ScaleControlProps, RLP.ScaleControlProps>;
export type LayersControlProps = Modify<LP.LayersControlProps, RLP.LayersControlProps>;
export type BaseLayerProps = RLP.BaseLayerProps;
export type OverlayProps = RLP.OverlayProps;
export type MapContainerProps = Modify<LP.MapProps, RLP.MapContainerProps>;

//#endregion

//#region Event props

export type EventComponent = {
    /**
     * Object with keys specifying the event type and the value the corresponding event handlers. [MUTABLE]
     */
    eventHandlers?: object;

    /**
     * If set to true, default events handlers are not registered. [MUTABLE]
     */
    disableDefaultEventHandlers?: boolean;

    // TODO: Add this one, when Dash starts to support it
    // /**
    //  * A wildcard data attribute. Used to pass (dynamic) data from/to Dash callbacks.
    //  */
    // '*Data'?: object,
}

export type LoadEvents = {
    /**
     * An integer that represents the number of times that the load event has fired.
     */
    'n_loads'?: number,
}

export type ClickEvents = {
    /**
     * An integer that represents the number of times that this element has been clicked on.
     */
    'n_clicks'?: number,

    /**
     * An integer that represents the number of times that this element has been double-clicked on.
     */
    'n_dblclicks'?: number,
};

export type KeyboardEvents = {
    /**
     * An integer that represents the number of times that the keyboard has been pressed.
     */
    'n_keydowns'?: number;
};

//#endregion