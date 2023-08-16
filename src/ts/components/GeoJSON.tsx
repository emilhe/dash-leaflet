import React, { Suspense } from 'react';
import {
    getContext,
    mergeEventHandlers,
    pick,
    resolveAllProps,
    resolveProps,
    unDashify
} from '../utils';
import {GeoJSONProps as Props} from '../dash-props';

// eslint-disable-next-line no-inline-comments
const LazyGeoJSON = React.lazy(() => import(/* webpackChunkName: "GeoJSON" */ '../fragments/GeoJSON'));

/**
 * The GeoJSON component is based on the Leaflet counterpart, https://leafletjs.com/reference.html#geojson, but with
 * extra functionality (e.g. marker clustering via supercluster https://github.com/mapbox/supercluster) added on top.
 * Marker cluster styles are based on https://github.com/Leaflet/Leaflet.markercluster
 */
const GeoJSON = ({spiderfyOnMaxZoom=true, ...props}: Props) => {
    // Resolve main functional properties.
    const nProps = resolveProps(props, ["pointToLayer", "style", "onEachFeature", "filter",
        "coordsToLatLng", "hoverStyle", "clusterToLayer"], getContext(props));
    // Bind default onEachFeature.
    if (!nProps.onEachFeature) {
        nProps.onEachFeature = (feature, layer) => {
            if (!feature.properties) {
                return
            }
            if (feature.properties.popup) {
                layer.bindPopup(feature.properties.popup)
            }
            if (feature.properties.tooltip) {
                layer.bindTooltip(feature.properties.tooltip)
            }
        }
    }
    // Add event handlers.
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : getDefaultEventHandlers(props);
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)
    // Render the component.
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyGeoJSON
                spiderfyOnMaxZoom={spiderfyOnMaxZoom} {...unDashify(nProps, ['disableDefaultEventHandlers'])}></LazyGeoJSON>
        </Suspense>
    )
}

function getDefaultEventHandlers(props) {
    return {
        click: (e) => {
            const p = {n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1}
            p["data-click"] = getFeature(e)
            props.setProps(p)
        },
        dblclick: (e) => {
            const p = {n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1}
            p["data-dblclick"] = getFeature(e)
            props.setProps(p)
        },
        keydown: (e) => {
            const p = {n_keydowns: props.n_keydowns == undefined ? 1 : props.n_keydowns + 1}
            p["data-keydown"] = pick(e, 'key', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat')
            props.setProps(p)
        }
    }

}

function getFeature(e) {
    const feature = e.layer.feature;
    if (e.layer.getBounds) {
        let bounds = e.layer.getBounds();
        feature.bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
    }
    return feature;
}

export default GeoJSON;