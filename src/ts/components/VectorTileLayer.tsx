import React, { Suspense } from 'react';
import {ClickComponent, LoadComponent, Modify, resolveAllProps} from "../props";
import { VectorTileLayerProps } from 'react-leaflet/VectorTileLayer';
import {mergeEventHandlers} from '../utils';
import {LeafletMouseEvent} from "leaflet";

// eslint-disable-next-line no-inline-comments
const LazyVectorTileLayer = React.lazy(() => import(/* webpackChunkName: "VectorTileLayer" */ '../fragments/VectorTileLayer'));

type Props = Modify<VectorTileLayerProps, {} & ClickComponent & LoadComponent>;

/**
 * Used to load and display vector tile layers on the map. Vector tiles are an efficient way to display large
 * amounts of vector data. This component uses leaflet-vector-tile-layer which provides better styling flexibility
 * and zoom handling compared to alternatives.
 *
 * Key features:
 * - Dynamic styling via style function or vectorTileLayerStyles
 * - Efficient rendering with minDetailZoom/maxDetailZoom
 * - Interactive features with click and hover events
 * - Custom feature filtering and layer ordering
 */
const VectorTileLayer = ({...props}: Props) => {
    const nProps: Props = Object.assign({}, props)
    // Add event handlers.
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props);
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)
    // Render the component.
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyVectorTileLayer
                 {...nProps}></LazyVectorTileLayer>
        </Suspense>
    )
}

function _getDefaultEventHandlers(props: Props) {
    return {
        click: (e: LeafletMouseEvent) => {
            props.setProps({
                n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1,
                clickData: _getFeatureData(e)
            })
        },
        dblclick: (e: LeafletMouseEvent) => {
            props.setProps({
                n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1,
                dblclickData: _getFeatureData(e)
            })
        },
        // Special bindings, to mimic hover property.
        mouseover: (e: LeafletMouseEvent) => {
            props.setProps({
                hoverData: _getFeatureData(e)
            })
        },
        mouseout: (e: LeafletMouseEvent) => {
            props.setProps({
                hoverData: undefined
            })
        },
    }
}

function _getFeatureData(e: LeafletMouseEvent) {
    const data: any = {
        latlng: e.latlng,
        layerPoint: e.layerPoint,
        containerPoint: e.containerPoint
    };

    // Extract feature properties if available
    if (e.layer && (e.layer as any).properties) {
        data.properties = (e.layer as any).properties;
    }

    // Extract layer info if available
    if (e.layer && (e.layer as any).layerName) {
        data.layerName = (e.layer as any).layerName;
    }

    return data;
}

export default VectorTileLayer;
