import {createElementHook, createElementObject, createPathComponent, withPane, extendContext, useEventHandlers, usePathOptions, useLayerLifecycle, createPathHook, createContainerComponent, useLeafletContext, } from "@react-leaflet/core";
import "leaflet-polylinedecorator";
import * as L from "leaflet";
import {toByteArray} from "base64-js";
import {useMap} from "react-leaflet";
import Supercluster from "supercluster";
import update from "immutability-helper";
import {pick} from "../utils";
import {GeoJSONProps} from "../dash-props";
import {useEffect, useRef} from "react";

// // TODO: Maybe make a separate style file?
require('../marker-cluster.css');
function createLeafletElement(props, ctx) {
    const geoJSON = new L.GeoJSON(null, {..._parseOptions(props)});
    return createElementObject(
        geoJSON,
        extendContext(ctx, {overlayContainer: geoJSON}),
    )
}
function updateLeafletElement(layer, props, prevProps) {
    // console.log("UPDATE")
    // console.log(layer)

    // Copied from react-leaflet.
    if (props.style !== prevProps.style) {
      if (props.style == null) {
        layer.resetStyle()
      } else {
        layer.setStyle(props.style)
      }
    }

    // // When the content of hideout changes, trigger redraw.
    // if (prevProps.hideout !== props.hideout) {
    //     // Update element options. TODO: Maybe handle separately, this is not so efficient...
    //     instance.options = {...instance.options, ..._parseOptions(props)}
    //     // Update the layers.
    //     if (!props.cluster) {
    //         _draw(this.state.geojson)  // TODO: STATE?
    //     } else {
    //         _render_clusters()
    //     }
    // }
    // // Change data (dynamic).
    // if (props.url !== prevProps.url ||
    //     props.data !== prevProps.data ||
    //     props.format !== prevProps.format ||
    //     props.cluster !== prevProps.cluster) {
    //     // Update element options. TODO: Maybe handle separately, this is not so efficient...
    //     instance.options = {...instance.options, ..._parseOptions(props)}
    //     // Update the layers.
    //     _setData(props);
    // }
}

function _parseOptions(props) {
    const {pointToLayer, clusterToLayer} = props
    const options = pick(props, 'pointToLayer', 'clusterToLayer', 'style', 'pane',
        'onEachFeature', 'filter', 'coordsToLatLng', 'markersInheritOptions');
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

async function _assembleGeojson(props) {
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

function _handle_click(e, instance, props, map, index, toSpiderfyRef) {
    console.log("CLICK")
    console.log(e.layer)
    console.log(instance)
    // console.log(e.layer.getBounds())
    // console.log(instance.getBounds())
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
        this._drawClusters(instance, props, map, index, toSpiderfyRef)
    }
}

function _drawClusters(instance, props, map, index, toSpiderfyRef) {
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

function _drawGeoJSON(instance, props, map, geojson) {
    instance.clearLayers();
    instance.addData(geojson);
    if (props.zoomToBounds && geojson.features.length > 0) {
        const bounds = instance.getBounds()
        if (bounds._southWest) {
            map.fitBounds(instance.getBounds())
        }
    }
}

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

// PLAYGROUND


// export function createGeoJSONHook<GeoJSON, GEO
// >(useElement: ElementHook<E, P>) {
//   return function usePath(props: P): ReturnType<ElementHook<E, P>> {
//     const context = useLeafletContext()
//     const elementRef = useElement(withPane(props, context), context)
//
//     useEventHandlers(elementRef.current, props.eventHandlers)
//     useLayerLifecycle(elementRef.current, context)
//     usePathOptions(elementRef.current, props)
//
//     return elementRef
//   }
// }

function useStuff(element, props, context) {
    const map = useMap();
    const {instance} = element;
    const indexRef = useRef<Supercluster>();
    const geojsonRef = useRef();
    const toSpiderfyRef = useRef();
    // Default events. TODO: Is merging neededed?
    const onMoveEnd = (e) => _drawClusters(instance, props, map, indexRef.current, toSpiderfyRef);
    const onClick = (e) => _handle_click(e, instance, props, map, indexRef.current, toSpiderfyRef);

    useEffect(
        function updateGeojson() {
            console.log("INVOKE UPDATE")
            _assembleGeojson(props).then(geojson => {
                console.log("DOING UPDATE")
                // Bind update on click.
                instance.on('click', onClick);
                // If not cluster, just draw the GeoJSON as usual.
                if (!props.cluster) {
                    return _drawGeoJSON(instance, props, map, geojson)
                }
                // Setup cluster index.
                const index = _buildIndex(geojson, map, props.superClusterOptions)
                // Bind update on map move (this is where the "magic" happens). TODO
                map.on('moveend', onMoveEnd);
                // Move the map if necessary.
                if (props.zoomToBounds && geojson.features.length > 0) {
                    const dummy = L.geoJSON(geojson);
                    map.fitBounds(dummy.getBounds())
                }
                // Draw the cluster.
                _drawClusters(instance, props, map, index, toSpiderfyRef)
                // TODO: Do we need it?
                indexRef.current = index
                geojsonRef.current = geojson
            });
            return function removeEventHandlers() {
                instance.off('click', onClick);
                // Remove manually added event handlers.
                if (props.cluster) {
                    map.off('moveend', onMoveEnd);
                }
            }
        },
        [], //[element, props],
    )

}

function createGeoJSONComponent(){
    const useElement = createElementHook(createLeafletElement, updateLeafletElement)
    const useGeoJSON = (props) => {
        const context = useLeafletContext()
        const elementRef = useElement(withPane(props, context), context)
        useLayerLifecycle(elementRef.current, context)  // MAYBE OK
        useStuff(elementRef.current, props, context)
        useEventHandlers(elementRef.current, props.eventHandlers)  // PROBABLY OK
        return elementRef
    }
    return createContainerComponent(useGeoJSON)
}

export const GeoJSON = createGeoJSONComponent()
