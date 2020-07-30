import { GeoJSON } from 'leaflet'
import { withLeaflet, MapLayer } from 'react-leaflet';
import Supercluster from 'supercluster';
import { decode } from 'geobuf'
import { toByteArray } from 'base64-js';
import update from 'immutability-helper';

class LeafletSuperCluster extends MapLayer {

    componentDidMount() {
        // Call super.
        super.componentDidMount();
        // Mount component.
        const {map} = this.props.leaflet;
        const {superclusterOptions, format, url, data, spiderfyOnMaxZoom, spiderfyOptions, zoomToBoundsOnClick} = this.props;
        const {leafletElement, _defaultSpiderfy} = this;
        let index, to_spiderfy;

        function equalMapState(a, b) {
            // Compare zoom.
            if (a.zoom !== b.zoom) {
                return false
            }
            // Compare bbox.
            for (var i in a.bbox) {
                if (a.bbox[i] !== b.bbox[i]) {
                    return false
                }
            }
            return true
        }

        function getMapState() {
            const bounds = map.getBounds()
            const zoom = map.getZoom()
            const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
            return {bbox: bbox, zoom: zoom}
        }

        function _update() {
            const map_state = getMapState();
            // Update the data.
            let clusters = index.getClusters(map_state.bbox, map_state.zoom);
            if (spiderfyOnMaxZoom && to_spiderfy) {
                // If map has changes, drop the spiderfy state.
                if (to_spiderfy.map_state && !equalMapState(to_spiderfy.map_state, map_state)) {
                    to_spiderfy = null
                }
                // Otherwise, do spiderfy.
                else {
                    clusters = _defaultSpiderfy(spiderfyOptions, map, index, clusters, to_spiderfy.clusterId);
                    to_spiderfy.map_state = map_state;
                }
            }
            leafletElement.clearLayers();
            leafletElement.addData(clusters);
        }

        function handleClick(e) {
            const clusterId = e.layer.feature.properties.cluster_id;
            const center = e.latlng;
            let expansionZoom;
            // Zoom to bounds on cluster click.
            if (zoomToBoundsOnClick && clusterId) {
                expansionZoom = index.getClusterExpansionZoom(clusterId);
                // This is the case where all markers cannot be shown.
                if (expansionZoom > index.options.maxZoom) {
                    to_spiderfy = {"clusterId": clusterId};
                    map.flyTo(center);
                } else {
                    map.flyTo(center, expansionZoom);
                }
            }
        }

        // Fetch data.
        const asyncfunc = async () => {
            // Download data if needed.
            let geojson = data;
            if (!data && url) {
                const response = await fetch(url);
                if (format === "geojson") {
                    geojson = await response.json();
                }
                if (format == "geobuf") {
                    geojson = await response.arrayBuffer();
                }
            }
            // Unless the data are geojson, do base64 decoding.
            else{
                if (format != "geojson") {
                    geojson = toByteArray(geojson)
                }
            }
            // Do any data transformations needed to arrive at geojson data. TODO: Might work only in node?
            if (format == "geobuf") {
                var Pbf = require('pbf');
                geojson = decode(new Pbf(geojson));
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
            // Try to guess max zoom.
            if(!superclusterOptions || !("maxZoom" in superclusterOptions)){
                const maxZoom = map._layersMaxZoom;
                if(maxZoom){
                    superclusterOptions["maxZoom"] = maxZoom;
                }
            }
            // Create index.
            index = new Supercluster(superclusterOptions);
            index.load(geojson.features);
            // Do initial update.
            _update();
            // Bind update on map move (this is where the "magic" happens).
            map.on('moveend', _update);
        };

        // Load data.
        asyncfunc();
        // Bind click event(s).
        this.leafletElement.on('click', handleClick);
    }

    componentWillUnmount() {
        const {map} = this.props.leaflet;
        // Remove manually added event handlers.
        map.on('moveend', 'update');
        this.leafletElement.off('click', 'handleClick');
        this.leafletElement.off('mouseover', 'handleMouseover');
        this.leafletElement.off('mouseout', 'handleMouseout');
        // Call super.
        super.componentWillUnmount();
    }

    createLeafletElement(props) {
        const dash = props.setProps;
        return new GeoJSON(null, {
            pointToLayer: (x, y) => this._defaultCreateClusterIcon(x, y, dash),
            style: () => props.spiderfyOptions.spiderLegPolylineOptions
        });
    }

    updateLeafletElement(fromProps, toProps) {
        // MAYBE: Implement this. So far, this method being empty means that ALL properties are considered static.
    }

    // MAYBE Make all of these methods adjustable by the user.

    _defaultCreateClusterIcon(feature, latlng, dash) {
        // TODO: Add options for other types of markers? Circles? Custom stuff? Functional injection?
        if (!feature.properties.cluster) {
            return this._defaultCreateMarker(feature, latlng, dash)
        }
        return this._defaultCreateCluster(feature, latlng)
    }

    _defaultCreateCluster(feature, latlng) {
        let {iconSize, classNames} = this.props.clusterOptions;
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

    _defaultCreateMarker(feature, latlng, dash) {
        // Resolve marker options.
        const markerOptions = Object.assign({}, feature.properties.markerOptions);
        // If we are calling via Dash (setProps check), create icons dynamically.
        if (dash && markerOptions.icon) {
            markerOptions.icon = L.icon(markerOptions.icon);
        }
        // Construct marker
        const marker = L.marker(latlng, markerOptions);
        // Add tooltip if present in feature properties.
        if (feature.properties.tooltip) {
            const tooltipOptions = feature.properties.tooltipOptions ? feature.properties.tooltipOptions : {}
            marker.bindTooltip(feature.properties.tooltip, tooltipOptions)
        }
        // Add popup if present in feature properties.
        if (feature.properties.popup) {
            const popupOptions = feature.properties.popupOptions ? feature.properties.popupOptions : {}
            marker.bindPopup(feature.properties.popup, popupOptions)
        }
        return marker;
    }

    _defaultSpiderfy(options, map, index, clusters, expanded_cluster) {

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
            const circumference = options.spiderfyDistanceMultiplier * _circleFootSeparation * (2 + count),
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
            const spiderfyDistanceMultiplier = options.spiderfyDistanceMultiplier;
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
        let center =  map.latLngToLayerPoint([lnglat[1], lnglat[0]]);
        const leaves = index.getLeaves(expanded_cluster, 1000, 0);
        // Generate positions.
        let positions, leaf, leg, newPos;
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

}

export default withLeaflet(LeafletSuperCluster)