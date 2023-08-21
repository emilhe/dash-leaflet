import React, { Suspense } from 'react';
import {
    mergeEventHandlers,
    pick,
    resolveAllProps,
} from '../utils';
import {GeoJSONProps as Props} from '../dash-props';

// eslint-disable-next-line no-inline-comments
const LazyGeoJSON = React.lazy(() => import(/* webpackChunkName: "GeoJSON" */ '../fragments/GeoJSON'));

/**
 * The GeoJSON component is based on the Leaflet counterpart, https://leafletjs.com/reference.html#geojson, but with
 * extra functionality (e.g. marker clustering via supercluster https://github.com/mapbox/supercluster) added on top.
 * Marker cluster styles are based on https://github.com/Leaflet/Leaflet.markercluster
 */
const GeoJSON = ({spiderfyOnMaxZoom=true, options= {}, ...props}: Props) => {
    // Legacy injection of properties via options.
    const nProps = Object.assign(options, props)
    // Add event handlers.
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : getDefaultEventHandlers(props);
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)
    // Render the component.
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyGeoJSON
                spiderfyOnMaxZoom={spiderfyOnMaxZoom} {...nProps}></LazyGeoJSON>
        </Suspense>
    )
}

function getDefaultEventHandlers(props) {
    return {
        click: (e) => {
            props.setProps({
                n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1,
                clickData: getFeature(e)
            })
        },
        dblclick: (e) => {
            props.setProps({
                n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1,
                dblclickData: getFeature(e)
            })
        },
        keydown: (e) => {
            props.setProps({
                n_keydowns: props.n_keydowns == undefined ? 1 : props.n_keydowns + 1,
                keydownData: pick(e, 'key', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat')
            })
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