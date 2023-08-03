import {DashComponent, Modify} from "./props";
import * as LP from "./leaflet-props"
import * as RLP from "./react-leaflet-props"
import L from "leaflet";

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


