import { GeoJSON, Marker, DivIcon, Point } from 'leaflet'
import { withLeaflet, Path } from 'react-leaflet';
import {assembleGeojson} from "./utils";
import Supercluster from "supercluster";
import update from "immutability-helper";

class LeafletGeoJSON extends Path {

    constructor(props) {
        super(props);
        this.cluster_props = {index: null, to_spiderfy: null}
        // TODO: Where to put initial values?
    }

    createLeafletElement(props) {
        const nProps = Object.assign({}, props.geojsonOptions);
        const {pointToLayer} = props.geojsonOptions
        const {clusterToLayer} = props
        // When in cluster mode, modify point rendering to treat clusters in a particular way.
        if(props.cluster){
            nProps.pointToLayer = (feature, latlng) => {
                if (!feature.properties.cluster) {
                    if(pointToLayer){
                        return pointToLayer(feature, latlng);
                    }
                    return defaultPointToLayer(feature, latlng, nProps)
                }
                if(clusterToLayer){
                    return clusterToLayer(feature, latlng);
                }
                return defaultClusterToLayer(feature, latlng, nProps);
            }
            if(!nProps.style){
                nProps.style = {weight: 1.5, color: '#222', opacity: 0.5}
            }
        }
        // Render the geojson empty initially.
        return new GeoJSON(null, {...nProps});
    }

    updateLeafletElement(fromProps, toProps) {
        // Change style (dynamic).
        if (typeof toProps.style === 'function') {
            this.leafletElement.setStyle(toProps.style)
        } else {
            this.setStyleIfChanged(fromProps, toProps)
        }
        // Change data (dynamic).
        if (toProps.url !== fromProps.url ||
            toProps.data !== fromProps.data ||
            toProps.format !== fromProps.format) {
            this._setData(toProps)
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._setData(this.props)
    }

    componentWillUnmount() {
        // Remove manually added event handlers.
        if(this.props.cluster) {
            const {map} = this.props.leaflet;
            map.off('moveend', this._render_clusters.bind(this));
            this.leafletElement.off('click', this._click_clusters.bind(this));
        }
        // Call super.
        super.componentWillUnmount();
    }

    _setData(props) {
        assembleGeojson(props).then(geojson => this._init.bind(this)(geojson, props));
    }

    _init(geojson, props) {
        // If clustering is not enabled, just draw the geojson.
        if (!props.cluster) {
            return this._draw(geojson)
        }
        // Setup cluster index.
        const {map} = this.props.leaflet;
        this.cluster_props.index = buildIndex(geojson, map)
        // Bind update on map move (this is where the "magic" happens).
        map.on('moveend', this._render_clusters.bind(this));
        // Bind click event.
        this.leafletElement.on('click', this._click_clusters.bind(this));
        // Render the cluster.
        this._render_clusters()
    }

    _render_clusters() {
        const {map} = this.props.leaflet;
        const {to_spiderfy, index} = this.cluster_props;
        const map_state = getMapState(map);
        // Update the data.
        let clusters = index.getClusters(map_state.bbox, map_state.zoom);
        if (this.props.spiderfyOnMaxZoom && to_spiderfy) {
            // If map has changes, drop the spiderfy state.
            if (to_spiderfy.map_state && !equalMapState(to_spiderfy.map_state, map_state)) {
                this.to_spiderfy = null;  // TODO: Will this work?
            }
            // Otherwise, do spiderfy.
            else {
                clusters = defaultSpiderfy(map, index, clusters, to_spiderfy.clusterId);
                to_spiderfy.map_state = map_state;
            }
        }
        this._draw(clusters)
    }

    _click_clusters(e) {
        const {map} = this.props.leaflet;
        const clusterId = e.layer.feature.properties.cluster_id;
        const {latlng} = e;
        const {index} = this.cluster_props
        const {zoomToClusterOnClick, spiderfyOnMaxZoom} = this.props
        // Return early if possible.
        if(!zoomToClusterOnClick && ! spiderfyOnMaxZoom){
            return
        }
        // Set spiderfy.
        const expansionZoom = index.getClusterExpansionZoom(clusterId)
        const spiderfy = expansionZoom > index.options.maxZoom;
        if(spiderfy){
            this.cluster_props.to_spiderfy = {"clusterId": clusterId};
        }
        // Fly to.
        if(zoomToClusterOnClick){
            if(spiderfy) {
                map.flyTo(latlng);
            }else{
                map.flyTo(latlng, expansionZoom);
            }
        }
    }

    _draw(geojson) {
        this.leafletElement.clearLayers();
        this.leafletElement.addData(geojson);
    }

}

// Default values, maybe move?

function defaultPointToLayer(feature, latlng, options) {
    return new Marker(latlng, options && options.markersInheritOptions && options);
}

function defaultClusterToLayer(feature, latlng, options) {
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

// External functions, maybe move?

function buildIndex(geojson, map, superclusterOptions){
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

function defaultSpiderfy(map, index, clusters, expanded_cluster) {

    // Source: https://github.com/Leaflet/Leaflet.markercluster/blob/master/src/MarkerCluster.Spiderfier.js

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
            res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
        }
        return res;
    }

    function _generatePointsSpiral(count, centerPt) {
        const spiderfyDistanceMultiplier = 1; // TODO: Make make it available as option?
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
                res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
            }
            angle += separation / legLength + i * 0.0005;
            legLength += lengthFactor / angle;
        }
        return res;
    }

    const cluster = clusters.filter(item => item.properties.cluster_id === expanded_cluster)[0];
    const lnglat = cluster.geometry.coordinates;
    let center = map.latLngToLayerPoint([lnglat[1], lnglat[0]]);
    const leaves = index.getLeaves(expanded_cluster, 1000, 0);
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
    // Remove expanded cluster.
    let spiderfied = clusters.filter(item => item.properties.cluster_id !== expanded_cluster);
    // Add leaves.
    spiderfied = spiderfied.concat(leaves);
    spiderfied = spiderfied.concat(legs);

    return spiderfied
}

function getMapState(map) {
    const bounds = map.getBounds();
    const zoom = map.getZoom();
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
    return {bbox: bbox, zoom: zoom}
}

function equalMapState(a, b) {
    // Compare zoom.
    if (a.zoom !== b.zoom) {
        return false
    }
    // Compare bbox.
    for (let i in a.bbox) {
        if (a.bbox[i] !== b.bbox[i]) {
            return false
        }
    }
    return true
}

export default withLeaflet(LeafletGeoJSON)