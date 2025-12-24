import React, { Suspense } from 'react';
import { LeafletMouseEvent } from "leaflet";
import { ClickComponent, Modify, resolveAllProps } from '../props';
import { VectorTileLayerProps as BaseVectorTileLayerProps } from '../react-leaflet/VectorTileLayer';
import { mergeEventHandlers } from '../utils';

// eslint-disable-next-line no-inline-comments
const LazyVectorTileLayer = React.lazy(() => import(/* webpackChunkName: "VectorTileLayer" */ '../fragments/VectorTileLayer'));

type Props = Modify<BaseVectorTileLayerProps, {
    /**
     * Object intended for passing variables to functional properties, i.e. style, filter, and other functions. [MUTABLE, DL]
     */
    hideout?: string | object;

    /**
     * Data from the most recent click event. Contains feature properties and layer name. [READ-ONLY]
     */
    clickData?: object;

    /**
     * Data from the feature currently being hovered. Contains feature properties and layer name. [READ-ONLY]
     */
    hoverData?: object;

}> & ClickComponent;

/**
 * Used to load and display vector tile layers on the map. Supports Mapbox Vector Tile (MVT) format.
 * Click and hover events provide access to feature properties. Note that most tile servers require attribution.
 */
const VectorTileLayer = ({ ...props }: Props) => {
    const nProps: Props = Object.assign({}, props)
    // Add event handlers.
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props);
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)
    // Render the component.
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyVectorTileLayer {...nProps}></LazyVectorTileLayer>
        </Suspense>
    )
}

function _getFeatureData(e: LeafletMouseEvent) {
    const layer = e.layer as any;
    // Extract feature data from the vector tile event
    // leaflet-vector-tile-layer attaches feature and layerName to the layer
    const feature = layer?.feature;
    const layerName = layer?.layerName;

    return {
        feature: feature ? {
            type: feature.type,
            id: feature.id,
            properties: feature.properties,
            geometry: feature.geometry,
        } : null,
        layerName: layerName,
        latlng: e.latlng ? [e.latlng.lat, e.latlng.lng] : null,
    };
}

function _getDefaultEventHandlers(props: Props) {
    return {
        click: (e: LeafletMouseEvent) => {
            const featureData = _getFeatureData(e);
            props.setProps({
                n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1,
                clickData: featureData
            })
        },
        dblclick: (e: LeafletMouseEvent) => {
            const featureData = _getFeatureData(e);
            props.setProps({
                n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1,
                dblclickData: featureData
            })
        },
        mouseover: (e: LeafletMouseEvent) => {
            const featureData = _getFeatureData(e);
            props.setProps({
                hoverData: featureData
            })
        },
        mouseout: (e: LeafletMouseEvent) => {
            props.setProps({
                hoverData: undefined
            })
        },
    }
}

export default VectorTileLayer;
