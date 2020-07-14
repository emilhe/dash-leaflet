import { GeoJSON } from 'leaflet'
import { withLeaflet, MapLayer } from 'react-leaflet';
import Supercluster from 'supercluster';
import {decode} from 'geobuf'

class LeafletSuperCluster extends MapLayer {

  componentDidMount() {
    // Call super.
    super.componentDidMount()
    // Mount component.
    const { map } = this.props.leaflet;
    const { zoomToBoundsOnClick, options, format, url, data} = this.props;
    const { leafletElement} = this;
    let index;

    function update() {
      // Get map state.
      const bounds = map.getBounds()
      const zoom = map.getZoom()
      const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
      // Update the data.
      var clusters = index.getClusters(bbox, zoom);
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
        map.flyTo(center, expansionZoom);
      }
    }

    // Fetch data.
    const asyncfunc = async () => {
      let geojson = data
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
      // Do any data transformations needed to arrive at geojson data.
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

  componentWillUnmount(){
    // Remove manually added event handlers.
    map.on('moveend', update);
    this.leafletElement.off('click', handleClick)
    // Call super.
    super.componentWillUnmount();
  }

  createLeafletElement(props) {
    return new GeoJSON(null, {pointToLayer: this._defaultCreateClusterIcon});
  }

  updateLeafletElement(fromProps, toProps) {
    // TODO: Implement this.
  }

  _defaultCreateClusterIcon(feature, latlng) {
    if (!feature.properties.cluster) {
      const marker_options = feature.properties.marker_options ? feature.properties.marker_options : {}
      const marker = L.marker(latlng, marker_options);
      // Add tooltip if present in feature properties.
      if (feature.properties.tooltip) {
        const tooltip_options = feature.properties.tooltip_options ? feature.properties.tooltip_options : {}
        marker.bindTooltip(feature.properties.tooltip, tooltip_options)
      }
      // Add popup if present in feature properties.
      if (feature.properties.popup) {
        const popup_options = feature.properties.popup_options ? feature.properties.popup_options : {}
        marker.bindPopup(feature.properties.popup, popup_options)
      }
      return marker;
    }

    var count = feature.properties.point_count;
    var size =
      count < 100 ? 'small' :
        count < 1000 ? 'medium' : 'large';
    var icon = L.divIcon({
      html: '<div><span>' + feature.properties.point_count_abbreviated + '</span></div>',
      className: 'marker-cluster marker-cluster-' + size,
      iconSize: L.point(40, 40)
    });

    return L.marker(latlng, {
      icon: icon
    });
  }

}

export default withLeaflet(LeafletSuperCluster)