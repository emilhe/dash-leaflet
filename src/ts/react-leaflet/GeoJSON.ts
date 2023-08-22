import {createElementHook, createElementObject, withPane, extendContext, useEventHandlers, useLayerLifecycle, createContainerComponent, useLeafletContext, } from "@react-leaflet/core";
import "leaflet-polylinedecorator";
import * as L from "leaflet";
import {useMap} from "react-leaflet";
import Supercluster from "supercluster";
import update from "immutability-helper";
import {getContext, pick, resolveProp, resolveProps} from "../utils";
import {useEffect, useRef} from "react";

require('../marker-cluster.css');

const _funcOptions = ["pointToLayer", "style", "onEachFeature", "filter", "coordsToLatLng"]
const _options = _funcOptions.concat(["markersInheritOptions"])

//#region Component definition
function useUpdateGeoJSON(element, props) {
    const map = useMap();
    const {instance} = element;
    // Setup references.
    const indexRef = useRef<Supercluster>();
    const geojsonRef = useRef();
    const toSpiderfyRef = useRef<object>();
    const propsRef = useRef(props)
    const busyRef = useRef(false)

    //#region Events

    const _onMoveEnd = (e) => {
        if (!propsRef.current.cluster) {
            return;
        }
        _redrawClusters(instance, propsRef.current, map, indexRef.current, toSpiderfyRef)
    };
    const _onClick = (e) => _handleClick(e, instance, propsRef.current, map, indexRef.current, toSpiderfyRef);
    const _onMouseOver = (e) => {
        const feature = e.layer.feature;
        let hoverStyle = propsRef.current.hoverStyle
        // Hover styling.
        if (hoverStyle) {
            hoverStyle = resolveProp(hoverStyle, {map: map, ...props})
            hoverStyle = typeof hoverStyle === "function" ? hoverStyle(feature) : hoverStyle
            e.layer.setStyle(hoverStyle);
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                e.layer.bringToFront();
            }
        }
        props.setProps({hoverData: feature});
    }
    const _onMouseOut = (e) => {
        // Hover styling.
        if (propsRef.current.hoverStyle) {
            instance.resetStyle(e.layer);
        }
        props.setProps({hoverData: undefined});
    }
    const _bindEvents = () => {
        // Bind hover stuff.
        instance.on('mouseover', _onMouseOver);
        instance.on('mouseout', _onMouseOut);
        // Bind update on click.
        instance.on('click', _onClick);
        // Bind update on map move (this is where the "magic" happens).
        map.on('moveend', _onMoveEnd);
    }
    const _unbindEvents = () => {
        if (props.hoverStyle) {
            instance.off('mouseover', _onMouseOver);
            instance.off('mouseout', _onMouseOut);
        }
        instance.off('click', _onClick);
        if (props.cluster) {
            map.off('moveend', _onMoveEnd);
        }
    }

    //#endregion

    const _setData = (init: boolean = false) => {
        busyRef.current = true;
        _fetchGeoJSON(props).then(geojson => {
            // Cache the data for later reuse.
            geojsonRef.current = geojson
            // Register events on init.
            if (init) {
                _bindEvents()  // TODO: Is it necessary ever to re-register?
            }
            // Refresh index.
            if (props.cluster) {
                indexRef.current = _buildIndex(geojson, map, props.superClusterOptions)
            }
            // Draw stuff.
            _redraw(instance, props, map, geojson, indexRef.current, toSpiderfyRef);
            // Mark as not busy.
            busyRef.current = false;
        });
    }
    // This hook is responsible for initialization and cleanup.
    useEffect(
        function initGeojson() {
            instance.options = _parseOptions(props, map, indexRef);
            _setData(true);
            return function removeEventHandlers() {
                _unbindEvents();
            }
        },
        [instance],
    )
    // This hook is responsible for updates.
    useEffect(
        function updateGeojson() {
            if(busyRef.current){
                return;
            }
            if (propsRef.current !== props) {
                const prevProps = propsRef.current as any;
                let reparseNeeded = false;
                let redrawNeeded = false;
                let reindexNeeded = false;
                // Update element options.
                let optionsChanged = prevProps.hideout !== props.hideout
                if(!optionsChanged) {
                    _options.forEach(o => {
                        if (prevProps[o] !== props[o]) {
                            optionsChanged = true;
                        }
                    });
                }
                if (optionsChanged) {
                    reparseNeeded = true
                    redrawNeeded = true;
                }
                // Fetch new data.
                if (prevProps.data !== props.data || prevProps.url !== props.url) {
                    redrawNeeded = false;  // redraw will happen async
                    reindexNeeded = false;  // reindex will happen async
                    _setData()
                }
                // If needed, dispatch actions.
                if(reindexNeeded){
                    indexRef.current = _buildIndex(geojsonRef.current, map, props.superClusterOptions)
                }
                if(reparseNeeded){
                    instance.options = {...instance.options, ..._parseOptions(props, map, indexRef)}
                }
                if(redrawNeeded){
                   _redraw(instance, props, map, geojsonRef.current, indexRef.current, toSpiderfyRef);
                }
            }
            // Update ref.
            propsRef.current = props
        },
        [element, props, instance],
    )


}

function createGeoJSONComponent(){
    // Return an initially empty object, data will be loaded async via useUpdateGeoJSON hook.
    const createGeoJSONElement = (props, ctx) =>
    {
        const geoJSON = new L.GeoJSON(null);
        return createElementObject(
            geoJSON,
            extendContext(ctx, {overlayContainer: geoJSON}),
        )
    }
    // Don't use update function here, updates will be performed via useUpdateGeoJSON hook.
    const useElement = createElementHook(createGeoJSONElement)
    // Similar to "createPathHook", except that "usePathOptions" is exchanged with "useUpdateGeoJSON".
    const useGeoJSON = (props) => {
        const context = useLeafletContext()
        const elementRef = useElement(withPane(props, context), context)
        useLayerLifecycle(elementRef.current, context)
        useEventHandlers(elementRef.current, props.eventHandlers)
        useUpdateGeoJSON(elementRef.current, props)
        return elementRef
    }
    return createContainerComponent(useGeoJSON)
}

function _parseOptions(props, map, indexRef) {
    // TODO: Can it be avoided to do resolveProps here?
    const context = {map: map, ...props};
    const clusterToLayer = props.clusterToLayer? resolveProp(props.clusterToLayer, context) : undefined;
    const options = resolveProps(pick(props, ..._options), _funcOptions,  context);
    const {pointToLayer} = options;
    // Bind default onEachFeature.
    if (!options.onEachFeature) {
        options.onEachFeature = (feature, layer) => {
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
    // When in cluster mode, modify point rendering to treat clusters in a particular way.
    if (props.cluster) {
        options.pointToLayer = (feature, latlng) => {
            if (!feature.properties.cluster) {
                if (pointToLayer) {
                    return pointToLayer(feature, latlng);
                }
                return _defaultPointToLayer(feature, latlng, options);
            }
            if (clusterToLayer) {
                return clusterToLayer(feature, latlng, indexRef.current);
            }
            return _defaultClusterToLayer(feature, latlng, options);
        }
        if (!options.style) {
            options.style = {weight: 1.5, color: '#222', opacity: 0.5}
        }
    }
    // Otherwise, just inject the options.
    else {
        options.pointToLayer = (feature, latlng) => {
            if (pointToLayer) {
                return pointToLayer(feature, latlng);
            }
            return _defaultPointToLayer(feature, latlng, options)
        }
    }
    return options
}

//#endregion

//#region Data update

async function _fetchGeoJSON(props) {
    const { data, url } = props;
    // Handle case when there is no data.
    if (!data && !url) {
        return { features: [] };
    }
    // Download data if needed.
    let geojson = data;
    if (!data && url) {
        const response = await fetch(url);
        geojson = await response.json();
    }
    // Add cluster properties if they are missing.
    geojson.features = geojson.features.map(feature => {
        if (!feature.properties) {
            feature["properties"] = {}
        }
        if (!feature.properties.cluster) {
            feature["properties"]["cluster"] = false
        }
        return feature
    });
    return geojson
}

function _buildIndex(geojson, map, superclusterOptions){
    // Try to guess max zoom.
    if(!superclusterOptions || !("maxZoom" in superclusterOptions)){
        const maxZoom = map._layersMaxZoom;
        if(maxZoom){
            if(superclusterOptions){
                superclusterOptions["maxZoom"] =  maxZoom;
            }
            else{
                superclusterOptions = {maxZoom: maxZoom};
            }
        }
    }
    // Create index.
    const index = new Supercluster(superclusterOptions);
    index.load(geojson.features);
    return index
}

//#endregion

//#region Drawing logic

function _redrawClusters(instance, props, map, index, toSpiderfyRef) {
    const bounds = map.getBounds();
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
    const zoom = map.getZoom();
    // Get clusters. Silence error that happens if you pan during flyTo.
    let clusters = null;
    try {
        clusters = index.getClusters(bbox, zoom);
    } catch (err) {
        return
    }
    // Update the data.
    if (props.spiderfyOnMaxZoom && toSpiderfyRef.current) {
        // If zoom level has changes, drop the spiderfy state.
        if (toSpiderfyRef.current.zoom && toSpiderfyRef.current.zoom !== zoom) {
            toSpiderfyRef.current = null;  // TODO: Will this work?
        }
        // Otherwise, do spiderfy.
        else {
            clusters = _defaultSpiderfy(map, index, clusters, [toSpiderfyRef.current.clusterId]);
            toSpiderfyRef.current.zoom = zoom;
        }
    }
    instance.clearLayers();
    instance.addData(clusters);
}

function _redrawGeoJSON(instance, props, map, geojson) {
    instance.clearLayers();
    instance.addData(geojson);
    if (props.zoomToBounds && geojson.features.length > 0) {
        const bounds = instance.getBounds()
        if (bounds._southWest) {
            map.fitBounds(instance.getBounds())
        }
    }
}

function _redraw(instance, props, map, geojson, index, toSpiderfyRef) {
    // If not cluster, just draw the GeoJSON as usual.
    if (!props.cluster) {
        return _redrawGeoJSON(instance, props, map, geojson)
    }
    // Move the map if necessary.
    if (props.zoomToBounds && geojson.features.length > 0) {
        const dummy = L.geoJSON(geojson);
        map.fitBounds(dummy.getBounds())
    }
    // Draw the cluster.
    _redrawClusters(instance, props, map, index, toSpiderfyRef)
}

//#endregion

//#region Default rendering

function _defaultPointToLayer(feature, latlng, options) {
    return new L.Marker(latlng, options && options.markersInheritOptions && options);
}

function _defaultClusterToLayer(feature, latlng, options) {
    const iconSize = 40;
    const classNames = [
        {minCount: 0, className: "marker-cluster marker-cluster-small"},
        {minCount: 100, className: "marker-cluster marker-cluster-medium"},
        {minCount: 1000, className: "marker-cluster marker-cluster-large"},
    ]
    const count = feature.properties.point_count;
    let className = "";
    for (let i in classNames) {
        if (count > classNames[i]["minCount"]) {
            className = classNames[i]["className"]
        }
    }
    const icon = L.divIcon({
        html: '<div><span>' + feature.properties.point_count_abbreviated + '</span></div>',
        className: className,
        iconSize: L.point(iconSize, iconSize)
    });
    return L.marker(latlng, {
        icon: icon
    });
}

function _defaultSpiderfy(map, index, clusters, toSpiderfy) {

    // Source: https://github.com/Leaflet/Leaflet.markercluster/blob/master/src/MarkerCluster.Spiderfier.js

    const spiderfyDistanceMultiplier = 1; // TODO: Make make it available as option?
    const _2PI = Math.PI * 2;
    const _circleFootSeparation = 25; //related to circumference of circle
    const _circleStartAngle = 0;
    const _spiralFootSeparation = 28; //related to size of spiral (experiment!)
    const _spiralLengthStart = 11;
    const _spiralLengthFactor = 5;
    const _circleSpiralSwitchover = 9; //show spiral instead of circle from this marker count upwards.
    // 0 -> always spiral; Infinity -> always circle

    function _generatePointsCircle(count, centerPt) {
        const circumference = spiderfyDistanceMultiplier * _circleFootSeparation * (2 + count),
            angleStep = _2PI / count,
            res = [];
        let legLength = circumference / _2PI;  //radius from circumference
        let i, angle;
        legLength = Math.max(legLength, 35); // Minimum distance to get outside the cluster icon.
        res.length = count;
        for (i = 0; i < count; i++) { // Clockwise, like spiral.
            angle = _circleStartAngle + i * angleStep;
            res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle)).round();
        }
        return res;
    }

    function _generatePointsSpiral(count, centerPt) {
        const separation = spiderfyDistanceMultiplier * _spiralFootSeparation;
        let legLength = spiderfyDistanceMultiplier * _spiralLengthStart;
        let lengthFactor = spiderfyDistanceMultiplier * _spiralLengthFactor * _2PI;
        let angle = 0;
        const res = [];
        let i;

        res.length = count;

        // Higher index, closer position to cluster center.
        for (i = count; i >= 0; i--) {
            // Skip the first position, so that we are already farther from center and we avoid
            // being under the default cluster icon (especially important for Circle Markers).
            if (i < count) {
                res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle)).round();
            }
            angle += separation / legLength + i * 0.0005;
            legLength += lengthFactor / angle;
        }
        return res;
    }

    function _spiderfy(cluster) {
        const lnglat = cluster.geometry.coordinates;
        let center = map.latLngToLayerPoint([lnglat[1], lnglat[0]]);
        const leaves = index.getLeaves(cluster.properties.cluster_id, 1000, 0);
        // Generate positions.
        let positions, leg, newPos;
        if (leaves.length >= _circleSpiralSwitchover) {
            positions = _generatePointsSpiral(leaves.length, center);
        } else {
            center.y += 10; // Otherwise circles look wrong => hack for standard blue icon, renders differently for other icons.
            positions = _generatePointsCircle(leaves.length, center);
        }
        // Create spiderfied leaves.
        let legs = [];
        for (let i = 0; i < leaves.length; i++) {
            newPos = map.layerPointToLatLng(positions[i]);
            leg = [cluster.geometry.coordinates, [newPos.lng, newPos.lat]];
            legs.push({"type": "Feature", "geometry": {"type": "LineString", "coordinates": leg}});
            // Update the marker position.
            leaves[i] = update(leaves[i], {geometry: {coordinates: {$set: [newPos.lng, newPos.lat]}}})
        }
        return leaves.concat(legs);
    }
    // Check if there are any cluster(s) to spiderfy.
    const matches = clusters.filter(item => toSpiderfy.includes(item.properties.cluster_id));
    if(matches.length < 1){
        return clusters
    }
    // Do spiderfy.
    let spiderfied = clusters.filter(item => !toSpiderfy.includes(item.properties.cluster_id));
    for (let i = 0; i < matches.length; i++) {
        spiderfied = spiderfied.concat(_spiderfy(matches[i]))
    }

    return spiderfied
}

//#endregion

//#region Events

function _handleClick(e, instance, props, map, index, toSpiderfyRef) {
    const {zoomToBoundsOnClick, spiderfyOnMaxZoom, cluster} = props;
    // Check if any actions are enabled. If not, just return.
    if (!zoomToBoundsOnClick && !(cluster && spiderfyOnMaxZoom)) {
        return
    }
    // If clustering is not enabled, just fly to feature.
    if (!cluster) {
        if (e.layer.getBounds) {
            map.fitBounds(e.layer.getBounds());
        }
        return
    }
    // If we didn't hit a cluster, return early.
    if (!e.layer.feature.properties) {
        return
    }
    const clusterId = e.layer.feature.properties.cluster_id;
    if (!clusterId) {
        return
    }
    // It we get to here, a cluster has been clicked.
    const {latlng} = e;
    // Set spiderfy.
    const expansionZoom = index.getClusterExpansionZoom(clusterId)
    const spiderfy = expansionZoom > index.options.maxZoom;
    if (spiderfy) {
        toSpiderfyRef.current = {"clusterId": clusterId};
    }
    // Fly to.
    if (zoomToBoundsOnClick) {
        if (spiderfy) {
            map.flyTo(latlng);
        } else {
            map.flyTo(latlng, expansionZoom);
        }
    } else {
        _redrawClusters(instance, props, map, index, toSpiderfyRef)
    }
}

//#endregion

export const GeoJSON = createGeoJSONComponent()
