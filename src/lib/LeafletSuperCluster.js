// import { GeoJSON } from 'leaflet'
// import { withLeaflet, MapLayer } from 'react-leaflet';
// import Supercluster from 'supercluster';
// import { decode } from 'geobuf'
// import { toByteArray } from 'base64-js';
// import update from 'immutability-helper';
// import {assembleGeojson} from './utils'
//
// // region Util functions
//
// function getMapState(map) {
//     const bounds = map.getBounds();
//     const zoom = map.getZoom();
//     const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
//     return {bbox: bbox, zoom: zoom}
// }
//
// function equalMapState(a, b) {
//     // Compare zoom.
//     if (a.zoom !== b.zoom) {
//         return false
//     }
//     // Compare bbox.
//     for (let i in a.bbox) {
//         if (a.bbox[i] !== b.bbox[i]) {
//             return false
//         }
//     }
//     return true
// }
//
// function buildIndex(geojson, map, superclusterOptions){
//     // Try to guess max zoom.
//     if(!superclusterOptions || !("maxZoom" in superclusterOptions)){
//         const maxZoom = map._layersMaxZoom;
//         if(maxZoom){
//             if(superclusterOptions){
//                 superclusterOptions["maxZoom"] =  maxZoom;
//             }
//             else{
//                 superclusterOptions = {maxZoom: maxZoom};
//             }
//         }
//     }
//     // Create index.
//     const index = new Supercluster(superclusterOptions);
//     index.load(geojson.features);
//     return index
// }
//
// // endregion
//
// class LeafletSuperCluster extends MapLayer {
//
//     // region Leaflet element
//
//     constructor(props) {
//         super(props);
//         this.index = null;
//         this.to_spiderfy = null;
//     }
//
//     createLeafletElement(props) {
//         const dash = props.setProps;
//         return new GeoJSON(null, {
//             pointToLayer: (x, y) => this._defaultCreateClusterIcon(x, y, dash),
//             style: () => props.spiderfyOptions.spiderLegPolylineOptions
//         });
//     }
//
//     // MAYBE: Implement this. So far, this method being empty means that ALL properties are considered static.
//
//     updateLeafletElement(fromProps, toProps) {
//         if (toProps.data !== fromProps.data || toProps.url !== fromProps.url) {
//             // Update props.
//             this.props.url = toProps.url;
//             this.props.data = toProps.data;
//             this.props.format = toProps.format;
//             // Update data.
//             const {map} = this.props.leaflet;
//             assembleGeojson(toProps.data, toProps.url, toProps.format)
//                 .then(geojson => buildIndex(geojson, map, this.props.superclusterOptions)).then(index => {
//                 this.index = index;
//                 this._update();
//             });
//         }
//     }
//
//     // endregion
//
//     // region React lifecycle methods
//
//     componentDidMount() {
//         // Call super.
//         super.componentDidMount();
//         // Mount component.
//         const {map} = this.props.leaflet;
//         const {format, url, data, zoomToBoundsOnClick} = this.props;
//
//         function handleClick(e) {
//             const clusterId = e.layer.feature.properties.cluster_id;
//             const center = e.latlng;
//             let expansionZoom;
//             // Zoom to bounds on cluster click.
//             if (zoomToBoundsOnClick && clusterId) {
//                 expansionZoom = this.index.getClusterExpansionZoom(clusterId);
//                 // This is the case where all markers cannot be shown.
//                 if (expansionZoom > this.index.options.maxZoom) {
//                     this.to_spiderfy = {"clusterId": clusterId};
//                     map.flyTo(center);
//                 } else {
//                     map.flyTo(center, expansionZoom);
//                 }
//             }
//         }
//
//         function initialize(index) {
//             this.index = index;
//             // Do initial update.
//             this._update();
//             // Bind update on map move (this is where the "magic" happens).
//             map.on('moveend', this._update.bind(this));
//             // Bind click event(s).
//             this.leafletElement.on('click', handleClick.bind(this));
//         }
//
//         assembleGeojson(data, url, format)
//             .then(geojson => buildIndex(geojson, map, this.props.superclusterOptions))
//             .then(initialize.bind(this));
//     }
//
//     componentWillUnmount() {
//         const {map} = this.props.leaflet;
//         // Remove manually added event handlers.
//         map.on('moveend', "_update");
//         this.leafletElement.off('click', 'handleClick');
//         // Call super.
//         super.componentWillUnmount();
//     }
//
//     // endregion
//
//     _update() {
//         const {map} = this.props.leaflet;
//         const {to_spiderfy} = this;
//         const {spiderfyOptions} = this.props;
//         const map_state = getMapState(map);
//         // Update the data.
//         let clusters = this.index.getClusters(map_state.bbox, map_state.zoom);
//         if (this.props.spiderfyOnMaxZoom && to_spiderfy) {
//             // If map has changes, drop the spiderfy state.
//             if (to_spiderfy.map_state && !equalMapState(to_spiderfy.map_state, map_state)) {
//                 this.to_spiderfy = null;  // TODO: Will this work?
//             }
//             // Otherwise, do spiderfy.
//             else {
//                 clusters = this._defaultSpiderfy(spiderfyOptions, map, this.index, clusters, to_spiderfy.clusterId);
//                 to_spiderfy.map_state = map_state;
//             }
//         }
//         this.leafletElement.clearLayers();
//         this.leafletElement.addData(clusters);
//     }
//
//     // region Drawing (maybe make all of these methods adjustable by the user?)
//
//     _defaultCreateClusterIcon(feature, latlng, dash) {
//         // TODO: Add options for other types of markers? Circles? Custom stuff? Functional injection?
//         if (!feature.properties.cluster) {
//             return this._defaultCreateMarker(feature, latlng, dash)
//         }
//         return this._defaultCreateCluster(feature, latlng)
//     }
//
//     _defaultCreateCluster(feature, latlng) {
//         let {iconSize, classNames} = this.props.clusterOptions;
//         const count = feature.properties.point_count;
//         let className = "";
//         for (let i in classNames) {
//             if (count > classNames[i]["minCount"]) {
//                 className = classNames[i]["className"]
//             }
//         }
//         const icon = L.divIcon({
//             html: '<div><span>' + feature.properties.point_count_abbreviated + '</span></div>',
//             className: className,
//             iconSize: L.point(iconSize, iconSize)
//         });
//         return L.marker(latlng, {
//             icon: icon
//         });
//     }
//
//     _defaultCreateMarker(feature, latlng, dash) {
//         // Resolve marker options.
//         const markerOptions = Object.assign({}, feature.properties.markerOptions);
//         // If we are calling via Dash (setProps check), create icons dynamically.
//         if (dash && markerOptions.icon) {
//             markerOptions.icon = L.icon(markerOptions.icon);
//         }
//         // Construct marker
//         const marker = L.marker(latlng, markerOptions);
//         // Add tooltip if present in feature properties.
//         if (feature.properties.tooltip) {
//             const tooltipOptions = feature.properties.tooltipOptions ? feature.properties.tooltipOptions : {}
//             marker.bindTooltip(feature.properties.tooltip, tooltipOptions)
//         }
//         // Add popup if present in feature properties.
//         if (feature.properties.popup) {
//             const popupOptions = feature.properties.popupOptions ? feature.properties.popupOptions : {}
//             marker.bindPopup(feature.properties.popup, popupOptions)
//         }
//         return marker;
//     }
//
//     _defaultSpiderfy(options, map, index, clusters, expanded_cluster) {
//
//         // Source: https://github.com/Leaflet/Leaflet.markercluster/blob/master/src/MarkerCluster.Spiderfier.js
//
//         const _2PI = Math.PI * 2;
//         const _circleFootSeparation = 25; //related to circumference of circle
//         const _circleStartAngle = 0;
//         const _spiralFootSeparation = 28; //related to size of spiral (experiment!)
//         const _spiralLengthStart = 11;
//         const _spiralLengthFactor = 5;
//         const _circleSpiralSwitchover = 9; //show spiral instead of circle from this marker count upwards.
//         // 0 -> always spiral; Infinity -> always circle
//
//         function _generatePointsCircle(count, centerPt) {
//             const circumference = options.spiderfyDistanceMultiplier * _circleFootSeparation * (2 + count),
//                 angleStep = _2PI / count,
//                 res = [];
//             let legLength = circumference / _2PI;  //radius from circumference
//             let i, angle;
//             legLength = Math.max(legLength, 35); // Minimum distance to get outside the cluster icon.
//             res.length = count;
//             for (i = 0; i < count; i++) { // Clockwise, like spiral.
//                 angle = _circleStartAngle + i * angleStep;
//                 res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
//             }
//             return res;
//         }
//
//         function _generatePointsSpiral(count, centerPt) {
//             const spiderfyDistanceMultiplier = options.spiderfyDistanceMultiplier;
//             const separation = spiderfyDistanceMultiplier * _spiralFootSeparation;
//             let legLength = spiderfyDistanceMultiplier * _spiralLengthStart;
//             let lengthFactor = spiderfyDistanceMultiplier * _spiralLengthFactor * _2PI;
//             let angle = 0;
//             const res = [];
//             let i;
//
//             res.length = count;
//
//             // Higher index, closer position to cluster center.
//             for (i = count; i >= 0; i--) {
//                 // Skip the first position, so that we are already farther from center and we avoid
//                 // being under the default cluster icon (especially important for Circle Markers).
//                 if (i < count) {
//                     res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
//                 }
//                 angle += separation / legLength + i * 0.0005;
//                 legLength += lengthFactor / angle;
//             }
//             return res;
//         }
//
//         const cluster = clusters.filter(item => item.properties.cluster_id === expanded_cluster)[0];
//         const lnglat = cluster.geometry.coordinates;
//         let center = map.latLngToLayerPoint([lnglat[1], lnglat[0]]);
//         const leaves = index.getLeaves(expanded_cluster, 1000, 0);
//         // Generate positions.
//         let positions, leaf, leg, newPos;
//         if (leaves.length >= _circleSpiralSwitchover) {
//             positions = _generatePointsSpiral(leaves.length, center);
//         } else {
//             center.y += 10; // Otherwise circles look wrong => hack for standard blue icon, renders differently for other icons.
//             positions = _generatePointsCircle(leaves.length, center);
//         }
//         // Create spiderfied leaves.
//         let legs = [];
//         for (let i = 0; i < leaves.length; i++) {
//             newPos = map.layerPointToLatLng(positions[i]);
//             leg = [cluster.geometry.coordinates, [newPos.lng, newPos.lat]];
//             legs.push({"type": "Feature", "geometry": {"type": "LineString", "coordinates": leg}});
//             // Update the marker position.
//             leaves[i] = update(leaves[i], {geometry: {coordinates: {$set: [newPos.lng, newPos.lat]}}})
//         }
//         // Remove expanded cluster.
//         let spiderfied = clusters.filter(item => item.properties.cluster_id !== expanded_cluster);
//         // Add leaves.
//         spiderfied = spiderfied.concat(leaves);
//         spiderfied = spiderfied.concat(legs);
//
//         return spiderfied
//     }
//
//     // endregion
//
// }
//
// export default withLeaflet(LeafletSuperCluster)