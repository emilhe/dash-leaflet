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

import {Modify, DashComponent} from "./dash-extensions-js";
import * as LP from "./leaflet-props";
import * as RLP from "./react-leaflet-props";
import {resolveEventHandlers, assignEventHandlers as _assignEventHandlers} from "./utils";

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

export type EventProps = {
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

export type SingleClickEvent = {
    /**
     * An integer that represents the number of times that this element has been clicked on.
     */
    'n_clicks'?: number;

    /**
     * An object holding data related to the click event. Typing is indicative.
     */
    'clickData'?: {
        'latlng': number[],
        'layerPoint': number[],
        'containerPoint': number[]
    };
};

export type DoubleClickEvent = {
    /**
     * An integer that represents the number of times that this element has been double-clicked on.
     */
    'n_dblclicks'?: number;

    /**
     * An object holding data related to the double click event. Typing is indicative.
     */
    'dblclickData'?: {
        'latlng': number[],
        'layerPoint': number[],
        'containerPoint': number[]
    };
};

export type ClickEvents = SingleClickEvent & DoubleClickEvent;

export type KeyboardEvents = {
    /**
     * An integer that represents the number of times that the keyboard has been pressed.
     */
    'n_keydowns'?: number;

    /**
     * An object holding data related to the keydown event. Typing is indicative.
     */
    'keydownData'?: {
        'key': string,
        'ctrlKey': boolean,
        'metaKey': boolean,
        'shiftKey': boolean,
        'repeat': boolean
    };
};

//#endregion

//#region Behavior

// TODO: Maybe rename/refactor this part?

export function assignEventHandlers(props, target={}, robustify=false) {
    return _assignEventHandlers(props, [], target, true, robustify);
}

export type EventComponent = DashComponent & EventProps & ClickEvents

export function assignClickEventHandlers(props, target={}, robustify=false) {
    return _assignEventHandlers(props, ["click", "dblclick"], target, true, robustify);
}

export type ClickComponent = DashComponent & EventProps & ClickEvents

export function assignLoadEventHandlers(props, target={}, robustify=false) {
    return _assignEventHandlers(props, ["load"], target, true, robustify);
}

export type LoadComponent = DashComponent & EventProps & LoadEvents

export function assignMediaEventHandlers(props, target={}, robustify=false) {
    return _assignEventHandlers(props, ["click", "dblclick", "load"], target, robustify)
}

export type MediaComponent = DashComponent & EventProps & ClickEvents & LoadEvents

//#endregion

export { DashComponent, Modify, DashFunction, unDashify, robustifySetProps, resolveProp, resolveAllProps, resolveProps } from './dash-extensions-js';
