import React, { Suspense } from 'react';
import {LeafletMouseEvent} from "leaflet";
import {ClickComponent, Modify, resolveAllProps} from '../props';
import {mergeEventHandlers} from '../utils';
import {GeoJSONProps} from '../react-leaflet/GeoJSON'

// eslint-disable-next-line no-inline-comments
const LazyGeoJSON = React.lazy(() => import(/* webpackChunkName: "GeoJSON" */ '../fragments/GeoJSON'));

type Props = Modify<GeoJSONProps, {
    // Legacy approach to inject options.
    /**
     * Options for the GeoJSON object (see https://leafletjs.com/reference-1.6.0.html#geojson-option for details). [DEPRECATED]
     */
    options?: object;

} & ClickComponent>;

/**
 * The GeoJSON component is based on the Leaflet counterpart, https://leafletjs.com/reference.html#geojson, but with
 * extra functionality (e.g. marker clustering via supercluster https://github.com/mapbox/supercluster) added on top.
 * Marker cluster styles are based on https://github.com/Leaflet/Leaflet.markercluster
 */
const GeoJSON = ({spiderfyOnMaxZoom=true, options= {}, format="geojson", ...props}: Props) => {
    // Legacy injection of properties via options.
    const nProps: Props = Object.assign(options, props)
    // Add event handlers.
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props);
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)
    // Render the component.
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyGeoJSON
                spiderfyOnMaxZoom={spiderfyOnMaxZoom} format={format} {...nProps}></LazyGeoJSON>
        </Suspense>
    )
}

function _getDefaultEventHandlers(props: Props) {
    return {
        click: (e: LeafletMouseEvent) => {
            props.setProps({
                n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1,
                clickData: _getFeature(e)
            })
        },
        dblclick: (e: LeafletMouseEvent) => {
            props.setProps({
                n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1,
                dblclickData: _getFeature(e)
            })
        },
        // Special bindings, to mimic hover property.
        mouseover: (e: LeafletMouseEvent) => {
            props.setProps({
                hoverData: _getFeature(e)
            })
        },
        mouseout: (e: LeafletMouseEvent) => {
            props.setProps({
                hoverData: undefined
            })
        },
    }
}

function _getFeature(e: LeafletMouseEvent) {
    const feature = e.layer.feature;
    if (e.layer.getBounds) {
        let bounds = e.layer.getBounds();
        feature.bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
    }
    return feature;
}

export default GeoJSON;