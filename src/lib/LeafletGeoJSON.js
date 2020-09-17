import { GeoJSON, Marker} from 'leaflet'
import { withLeaflet, Path } from 'react-leaflet';
import {assembleGeojson} from "./utils";
import Supercluster from "supercluster";
import update from "immutability-helper";

// TODO: Maybe make a separate style file?
require('react-leaflet-markercluster/dist/styles.min.css');

class LeafletGeoJSON extends Path {

    constructor(props) {
        super(props);
        this.state = {index: null, toSpiderfy: null, geojson: null};
    }

    createLeafletElement(props) {
        // Render the geojson empty initially.
        return new GeoJSON(null, {...this._resolveProps(props)});
    }

    updateLeafletElement(fromProps, toProps) {
        // Change style (dynamic).
        if (typeof toProps.options.style === 'function') {  // TODO: Function handle stuff?
            this.leafletElement.setStyle(toProps.options.style)
        } else {
            this.setStyleIfChanged(fromProps.options, toProps.options)
        }
        // When the content of hideout changes, trigger redraw.
        if(fromProps.hideout !== toProps.hideout) {
            // Update element options. TODO: Maybe handle separately, this is not so efficient...
            this.leafletElement.options = { ...this.leafletElement.options, ...this._resolveProps(toProps) }
            // Update the layers.
            if (!toProps.cluster) {
                this._draw(this.state.geojson)
            } else {
                this._render_clusters()
            }
        }
        // Change data (dynamic).
        if (toProps.url !== fromProps.url ||
            toProps.data !== fromProps.data ||
            toProps.format !== fromProps.format ||
            toProps.cluster !== fromProps.cluster) {
            // Update element options. TODO: Maybe handle separately, this is not so efficient...
            this.leafletElement.options = { ...this.leafletElement.options, ...this._resolveProps(toProps) }
            // Update the layers.
            this._setData(toProps);
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._setData(this.props)
    }

    componentWillUnmount() {
        this.leafletElement.off('click', this._handle_click.bind(this));
        // Remove manually added event handlers.
        if(this.props.cluster) {
            const {map} = this.props.leaflet;
            map.off('moveend', this._render_clusters.bind(this));
        }
        // Call super.
        super.componentWillUnmount();
    }

    _resolveProps(props){
        const nProps = Object.assign({}, props.options);
        const {pointToLayer} = props.options
        const {clusterToLayer} = props
        // When in cluster mode, modify point rendering to treat clusters in a particular way.
        if (props.cluster) {
            nProps.pointToLayer = (feature, latlng) => {
                if (!feature.properties.cluster) {
                    if (pointToLayer) {
                        return pointToLayer(feature, latlng);
                    }
                    return defaultPointToLayer(feature, latlng, nProps);
                }
                if (clusterToLayer) {
                    return clusterToLayer(feature, latlng, this.state.index);
                }
                return defaultClusterToLayer(feature, latlng, nProps);
            }
            if (!nProps.style) {
                nProps.style = {weight: 1.5, color: '#222', opacity: 0.5}
            }
        }
        // Otherwise, just inject the options.
        else {
            nProps.pointToLayer = (feature, latlng) => {
                if (pointToLayer) {
                    return pointToLayer(feature, latlng);
                }
                return defaultPointToLayer(feature, latlng, nProps)
            }
        }
        // Propagate pane.
        if (props.leaflet.pane) {
            nProps.pane = props.leaflet.pane;
        }
        return nProps
    }

    _setData(props) {
        assembleGeojson(props).then(geojson => this._init.bind(this)(geojson, props));
    }

    _init(geojson, props) {
        // Keep geojson for redraw events. // TODO: Is this too in-efficient?
        this.state.geojson = geojson;
        // Add click handler.
        this.leafletElement.on('click', this._handle_click.bind(this));
        // If clustering is not enabled, just draw the geojson.
        if (!props.cluster) {
            return this._draw(geojson)
        }
        // Setup cluster index.
        const {map} = this.props.leaflet;
        this.state.index = buildIndex(geojson, map, props.superClusterOptions)
        // Bind update on map move (this is where the "magic" happens).
        map.on('moveend', this._render_clusters.bind(this));
        // Move the map if necessary.
        if (this.props.zoomToBounds && geojson.features.length > 0) {
            const dummy = L.geoJSON(geojson);
            this.props.leaflet.map.fitBounds(dummy.getBounds())
        }
        // Render the cluster.
        this._render_clusters()
    }

    _handle_click(e){
        const {map} = this.props.leaflet;
        const {zoomToBoundsOnClick, spiderfyOnMaxZoom, cluster} = this.props;
        // Check if any actions are enabled. If not, just return.
        if(!zoomToBoundsOnClick && !(cluster && spiderfyOnMaxZoom)){
            return
        }
        // If clustering is not enabled, just fly to feature.
        if(!cluster){
            if(e.layer.getBounds){
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
        const {index} = this.state
        // Set spiderfy.
        const expansionZoom = index.getClusterExpansionZoom(clusterId)
        const spiderfy = expansionZoom > index.options.maxZoom;
        if (spiderfy) {
            this.state.toSpiderfy = {"clusterId": clusterId};
        }
        // Fly to.
        if (zoomToBoundsOnClick) {
            if (spiderfy) {
                map.flyTo(latlng);
            } else {
                map.flyTo(latlng, expansionZoom);
            }
        }
        else{
            this._render_clusters()
        }
    }

    _render_clusters() {
        const {map} = this.props.leaflet;
        const {toSpiderfy, index} = this.state;
        const bounds = map.getBounds();
        const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
        const zoom = map.getZoom();
        // Update the data.
        let clusters = index.getClusters(bbox, zoom);
        if (this.props.spiderfyOnMaxZoom && toSpiderfy) {
            // If zoom level has changes, drop the spiderfy state.
            if (toSpiderfy.zoom && toSpiderfy.zoom !== zoom) {
                this.state.toSpiderfy = null;  // TODO: Will this work?
            }
            // Otherwise, do spiderfy.
            else {
                clusters = defaultSpiderfy(map, index, clusters, [toSpiderfy.clusterId]);
                toSpiderfy.zoom = zoom;
            }
        }
        this.leafletElement.clearLayers();
        this.leafletElement.addData(clusters);
    }

    _draw(geojson) {
        this.leafletElement.clearLayers();
        if(geojson) {
            this.leafletElement.addData(geojson);
            if(this.props.zoomToBounds && geojson.features.length > 0){
                this.props.leaflet.map.fitBounds(this.leafletElement.getBounds())
            }
        }
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

function defaultSpiderfy(map, index, clusters, toSpiderfy) {

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
            res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
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
                res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
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

export default withLeaflet(LeafletGeoJSON)