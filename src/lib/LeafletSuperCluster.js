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
    let {maxZoom} = this.props;
    let index;
    let expanded_cluster = null;

    function update() {
      // Get map state.
      const bounds = map.getBounds()
      const zoom = map.getZoom()
      const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
      // Update the data.
      let clusters = index.getClusters(bbox, zoom);
      if(zoom == index.options.maxZoom && spiderfy){
        clusters = _defaultSpiderfy(index, clusters, expanded_cluster)
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
        expansionZoom = expansionZoom <= index.options.maxZoom? expansionZoom : index.options.maxZoom
        expanded_cluster = clusterId;
        map.flyTo(center, expansionZoom);
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
      // Derive max zoom from map if not explicitly provided.
      if(!maxZoom && map){
        maxZoom = map.maxZoom
      }
      else{
        maxZoom = 20  // Some sane default.
      }
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
    // TODO: Implement this.
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
    console.log(clusters)
    if(expanded_cluster){
      const leaves = index.getLeaves(expanded_cluster);
      // Remove expanded cluster.
      clusters = clusters.filter(item => item.properties.cluster_id !== expanded_cluster);
      // Add leaves.
      clusters = clusters.concat(leaves);
    }
    return clusters
  }

}

export default withLeaflet(LeafletSuperCluster)