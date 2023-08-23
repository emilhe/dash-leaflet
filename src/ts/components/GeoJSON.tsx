import React, { Suspense } from 'react';
import {
    DashComponent,
    DashFunction, Modify,
    resolveAllProps,
} from '../dash-extensions-js';
import {mergeEventHandlers} from '../events';
import {FeatureGroupProps} from '../dash-props';

type SuperClusterOptions = {
    /**
     * If true, marker clustering will be performed. [MUTABLE, DL]
     */
    cluster?: boolean;

    /**
     * Function that determines how a cluster is drawn. [MUTABLE, DL]
     */
    clusterToLayer?: DashFunction;

    /**
     * If true, markers that are not resolved at max zoom level will be spiderfied on click. [MUTABLE, DL]
     */
    spiderfyOnMaxZoom?: boolean;

    /**
     * Options for the SuperCluster object (see https://github.com/mapbox/supercluster for details). [MUTABLE, DL]
     */
    superClusterOptions?: object;
}
type GeoJSONOptions = {
    /**
     * Function defining how GeoJSON points spawn Leaflet layers. It is internally called when data is added, passing the GeoJSON point feature and its LatLng. The default is to spawn a default Marker:
     * function(geoJsonPoint, latlng) {
     *     return L.marker(latlng);
     * }
     * [MUTABLE, DL]
     */
    pointToLayer?: DashFunction;

    /**
     * A Function defining the Path options for styling GeoJSON lines and polygons, called internally when data is added. The default value is to not override any defaults:
     * function (geoJsonFeature) {
     *     return {}
     * }
     * [MUTABLE, DL]
     */
    style?: DashFunction;

    /**
     * A Function that will be called once for each created Feature, after it has been created and styled. Useful for attaching events and popups to features. The default is to do nothing with the newly created layers:
     * function (feature, layer) {}
     * [MUTABLE, DL]
     */
    onEachFeature?: DashFunction;

    /**
     * A Function that will be used to decide whether to include a feature or not. The default is to include all features:
     * function (geoJsonFeature) {
     *     return true;
     * }
     * [MUTABLE, DL]
     */
    filter?: DashFunction;

    /**
     * A Function that will be used for converting GeoJSON coordinates to LatLngs. The default is the coordsToLatLng static method. [MUTABLE, DL]
     */
    coordsToLatLng?: DashFunction;

    /**
     * Whether default Markers for "Point" type Features inherit from group options. [MUTABLE, DL]
     */
    markersInheritOptions?: boolean;
}
type Props = Modify<Modify<FeatureGroupProps, GeoJSONOptions>, {

    /**
     * Data (consider using url for better performance). One of data/url must be set. [MUTABLE, DL]
     */
    data?: string | object;

    /**
     * Url to data (use instead of data for better performance). One of data/url must be set. [MUTABLE, DL]
     */
    url?: string;

    // Convenience props

    /**
     * If true, zoom to feature bounds on click. [MUTABLE, DL]
     */
    zoomToBoundsOnClick?: boolean;

    /**
     * If true, zoom bounds when data are set. [MUTABLE, DL]
     */
    zoomToBounds?: boolean;

    /**
     * Style function applied on hover. [MUTABLE, DL]
     */
    hoverStyle?: DashFunction;

    /**
     * Object intended for passing variables to functional properties, i.e. clusterToLayer, hoverStyle and
     * (options) pointToLayer, style, filter, and onEachFeature functions. [MUTABLE, DL]
     */
    hideout?: string | object;

    // Legacy approach to inject options.

    /**
     * Options for the GeoJSON object (see https://leafletjs.com/reference-1.6.0.html#geojson-option for details). [DEPRECATED]
     */
    options?: object;

} & SuperClusterOptions & DashComponent>;

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