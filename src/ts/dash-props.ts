/**
 * This module holds property base property definitions derived from the combination of the "pure" Leaflet definitions
 * combined with the React Leaflet definitions. Dash specific modification(s) should NOT be here.
 */
import {Modify} from "./dash-extensions-js";
import * as LP from "./leaflet-props"
import * as RLP from "./react-leaflet-props"

//#region Default components

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
