import { GeoJSON } from 'leaflet'
import { withLeaflet, MapLayer } from 'react-leaflet';
import Supercluster from 'supercluster';
import { decode } from 'geobuf'
import { toByteArray } from 'base64-js';
import { max } from 'ramda';

class LeafletSuperCluster extends MapLayer {

  componentDidMount() {
    // Call super.
    super.componentDidMount()
    // Mount component.
    const { map } = this.props.leaflet;
    const { zoomToBoundsOnClick, options, format, url, data, spiderfy} = this.props;
    const { leafletElement, _defaultSpiderfy } = this;
    let index;
    let to_spiderfy;

    function equalMapState(a, b){
        // Compare zoom.
        if(a.zoom != b.zoom){
            return false
        }
        // Compare bbox.
        for(var i in a.bbox){
            if(a.bbox[i] != b.bbox[i]){
                return false
            }
        }
        return true
    }

    function getMapState(){
      const bounds = map.getBounds()
      const zoom = map.getZoom()
      const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
      return {bbox: bbox, zoom: zoom}
    }

    function update() {
      const map_state = getMapState();
      // Update the data.
      let clusters = index.getClusters(map_state.bbox, map_state.zoom);
      console.log("UPDATE")
      console.log(map_state)
      if(spiderfy && to_spiderfy){
        // If map has changes, drop the spiderfy state.
        console.log(map_state)
        console.log(to_spiderfy.map_state)
        console.log(to_spiderfy.map_state == map_state)
        if(to_spiderfy.map_state && !equalMapState(to_spiderfy.map_state, map_state)){
            to_spiderfy = null
        }
        // Otherwise, do spiderfy.
        else{
            clusters = _defaultSpiderfy(index, clusters, to_spiderfy.clusterId)
            to_spiderfy.map_state = map_state
        }
      }
      leafletElement.clearLayers();
      leafletElement.addData(clusters);
    }

    function handleClick(e) {
      var clusterId = e.layer.feature.properties.cluster_id;
      var center = e.latlng;
      var expansionZoom;
      // Zoom to bounds on cluster click.
      if (zoomToBoundsOnClick && clusterId) {
        expansionZoom = index.getClusterExpansionZoom(clusterId);
        // This is the case where all markers cannot be shown.
        if(expansionZoom > index.options.maxZoom){
            to_spiderfy = {"clusterId": clusterId};
            map.flyTo(center);
        }
        else{
            map.flyTo(center, expansionZoom);
        }
      }
    }

    // Fetch data.
    const asyncfunc = async () => {
      let geojson = data;
      // Download data if needed.
      if (!data && url) {
        const response = await fetch(url);
        if (format == "geojson") {
          geojson = await response.json();
        }
        if (format == "geobuf") {
          geojson = await response.arrayBuffer();
        }   
      }
      // Unless the data are geojson, do base64 decoding.
      if (format != "geojson") {
        geojson = toByteArray(geojson)
      }
      // Do any data transformations needed to arrive at geojson data. TODO: Might work only in node?
      if (format === "geobuf") {
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
      })
      // Create index.
      index = new Supercluster(options)
      index.load(geojson.features);
      // Do initial update.
      update();
      // Bind update on map move (this is where the "magic" happens).
      map.on('moveend', update);
    }

    // Load data.
    asyncfunc();
    // Bind click event(s).
    this.leafletElement.on('click', handleClick)
  }

  componentWillUnmount() {
    const { map } = this.props.leaflet;
    // Remove manually added event handlers.
    map.on('moveend', 'update');
    this.leafletElement.off('click', 'handleClick')
    // Call super.
    super.componentWillUnmount();
  }

  createLeafletElement(props) {
    const dash = props.setProps;
    return new GeoJSON(null, { pointToLayer: (x, y) => this._defaultCreateClusterIcon(x, y, dash) });
  }

  updateLeafletElement(fromProps, toProps) {
    // TODO: Implement this. So far, this method being empty just meant that ALL properties are considered static.
  }

  // TODO: Make these method adjustable by the user.

  _defaultCreateClusterIcon(feature, latlng, dash) {
    // TODO: Add options for other types of markers? Circles? Custom stuff? Functional injection?
    if (!feature.properties.cluster) {
        return this._defaultCreateMarker(feature, latlng, dash)
    }
    return this._defaultCreateCluster(feature, latlng, dash)
  }

  _defaultCreateCluster(feature, latlng, dash){
    let {iconSize, classNames} = this.props.clusterOptions;
    var count = feature.properties.point_count;
    let className = ""
    for (var i in classNames) {
        if(count > classNames[i]["minCount"]){
            className = classNames[i]["className"]
        }
    }
    var icon = L.divIcon({
      html: '<div><span>' + feature.properties.point_count_abbreviated + '</span></div>',
      className: className,
      iconSize: L.point(iconSize, iconSize)
    });
    return L.marker(latlng, {
      icon: icon
    });
  }

  _defaultCreateMarker(feature, latlng, dash){
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

  _defaultSpiderfy(index, clusters, expanded_cluster){
    console.log(expanded_cluster)
    console.log(index)
    const leaves = index.getLeaves(expanded_cluster, 1000, 0);
    // Remove expanded cluster.
    let spiderfied = clusters.filter(item => item.properties.cluster_id !== expanded_cluster);
    // Add leaves.
    spiderfied = spiderfied.concat(leaves);
    return spiderfied
  }

}

export default withLeaflet(LeafletSuperCluster)