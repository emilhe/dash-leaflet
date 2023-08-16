import {createElementHook, createElementObject, withPane, extendContext, useEventHandlers, useLayerLifecycle, createContainerComponent, useLeafletContext, } from "@react-leaflet/core";
import "leaflet-polylinedecorator";
import * as L from "leaflet";
import {useMap} from "react-leaflet";
import Supercluster from "supercluster";
import update from "immutability-helper";
import {pick} from "../utils";
import {useEffect, useRef} from "react";

require('../marker-cluster.css');

const _options = ["pointToLayer", "style", "onEachFeature", "filter",
        "coordsToLatLng", "hoverStyle", "clusterToLayer"]

//#region Component definition
function useUpdateGeoJSON(element, props) {
    const map = useMap();
    const {instance} = element;
    // Setup references.
    const indexRef = useRef<Supercluster>();
    const geojsonRef = useRef();
    const toSpiderfyRef = useRef<object>();
    const propsRef = useRef()
    // Setup events.
    const onMoveEnd = (e) => _redrawClusters(instance, props, map, indexRef.current, toSpiderfyRef);
    const onClick = (e) => _handleClick(e, instance, props, map, indexRef.current, toSpiderfyRef);
    const onMouseOver =  (e) => {
        const feature = _getFeature(e);
        // Hover styling.
        if (props.hoverStyle) {
            e.layer.setStyle(props.hoverStyle(feature));
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                e.layer.bringToFront();
            }
        }
        // TODO: Set hover feature?
        // props.setProps({hover_feature: feature});
    }
    const onMouseOut = (e) => {
        // Hover styling.
        if (props.hoverStyle) {
            instance.resetStyle(e.layer);
        }
    }

    useEffect(
        function updateGeojson() {
            // Initialize.
            if(propsRef.current === undefined) {
                console.log("INIT")
                _fetchGeoJSON(props).then(geojson => {
                    // Cache the data for later reuse.
                    geojsonRef.current = geojson
                    // Bind hover stuff.
                    if (props.hoverStyle) {
                        instance.on('mouseover', onMouseOver);
                        instance.on('mouseout', onMouseOut);
                    }
                    // Bind update on click.
                    instance.on('click', onClick);
                    // Bind update on map move (this is where the "magic" happens).
                    if(props.cluster){
                        indexRef.current = _buildIndex(geojson, map, props.superClusterOptions)
                        map.on('moveend', onMoveEnd);
                    }
                    // Draw stuff.
                    _redraw(instance, props, map, geojson, indexRef.current, toSpiderfyRef);
                });
            }
            // Update.
            else if(propsRef.current !== props) {
                console.log("UPDATE")
                console.log(propsRef.current)
                console.log(props)
                const prevProps = propsRef.current as any;
                let redrawNeeded = false;
                let reindexNeeded = false;
                // Util functions.
                const _reindex = () => {
                    if (props.cluster) {
                        indexRef.current = _buildIndex(geojsonRef.current, map, props.superClusterOptions)
                        if (!prevProps.cluster) {
                            map.on('moveend', onMoveEnd);
                        }
                    } else if (prevProps.cluster) {
                        map.off('moveend', onMoveEnd);
                    }
                }
                // Update element options.
                let optionsChanged = prevProps.hideout !== props.hideout
                _options.forEach(o => {
                    if(prevProps[o] !== props[o]){
                        if(props[o] instanceof Function && prevProps[o] instanceof Function){
                            if(prevProps[o].toString() !== props[o].toString()){
                                optionsChanged = true;
                            }
                        }
                        else{
                            optionsChanged = true;
                        }
                    }
                });
                if (optionsChanged) {
                    instance.options = {...instance.options, ..._parseOptions(props)}
                    redrawNeeded = true;
                }
                // Change rendering.
                if (prevProps.cluster !== props.cluster) {
                    reindexNeeded = true;
                    redrawNeeded = true;
                }
                // Fetch new data.
                if (prevProps.data !== props.data || prevProps.url !== props.url) {
                    redrawNeeded = false;  // redraw will happen async
                    reindexNeeded = false;  // reindex will happen async
                    _fetchGeoJSON(props).then(geojson => {
                        geojsonRef.current = geojson
                        _reindex();
                        _redraw(instance, props, map, geojson, indexRef.current, toSpiderfyRef);
                    });
                }
                // If needed, dispatch actions.
                if(redrawNeeded){
                   _redraw(instance, props, map, geojsonRef.current, indexRef.current, toSpiderfyRef);
                }
                if(reindexNeeded){
                    _reindex()
                }
            }
            // Update ref.
            propsRef.current = props
            // Do cleanup.
            return function removeEventHandlers() {
                if(props.hoverStyle){
                    instance.off('mouseover', onMouseOver);
                    instance.off('mouseout', onMouseOut);
                }
                instance.off('click', onClick);
                if (props.cluster) {
                    map.off('moveend', onMoveEnd);
                }
            }
        },
        [element, props],
    )

}

function createGeoJSONComponent(){
    // Return an initially empty object, data will be loaded async via useUpdateGeoJSON hook.
    const createGeoJSONElement = (props, ctx) =>
    {
        const geoJSON = new L.GeoJSON(null, {..._parseOptions(props)});
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

function _parseOptions(props) {
    const {pointToLayer, clusterToLayer} = props
    const options = pick(props, ..._options);
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
                return clusterToLayer(feature, latlng, this.state.index);
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
        this._redrawClusters(instance, props, map, index, toSpiderfyRef)
    }
}

function _getFeature(e) {
    const feature = e.layer.feature;
    if (e.layer.getBounds) {
        let bounds = e.layer.getBounds();
        feature.bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
    }
    return feature;
}

// TODO: WHAT ABOUT EVENTS?
function _getDefaultEventHandlers(props) {
    return {
        click: (e) => {
            const p = {n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1}
            p["data-click"] = _getFeature(e)
            props.setProps(p)
        },
        dblclick: (e) => {
            const p = {n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1}
            p["data-dblclick"] = _getFeature(e)
            props.setProps(p)
        },
        keydown: (e) => {
            const p = {n_keydowns: props.n_keydowns == undefined ? 1 : props.n_keydowns + 1}
            p["data-keydown"] = pick(e, 'key', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat')
            props.setProps(p)
        }
    }

//#endregion



}

//#endregion

export const GeoJSON = createGeoJSONComponent()
