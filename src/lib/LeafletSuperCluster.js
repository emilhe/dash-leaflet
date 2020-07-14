import { GeoJSON } from 'leaflet'
import { withLeaflet, MapLayer } from 'react-leaflet';
import Supercluster from 'supercluster';
import { decode } from 'geobuf'
import { toByteArray } from 'base64-js';

class LeafletSuperCluster extends MapLayer {

  componentDidMount() {
    // Call super.
    super.componentDidMount()
    // Mount component.
    const { map } = this.props.leaflet;
    const { zoomToBoundsOnClick, options, format, url, data } = this.props;
    const { leafletElement } = this;
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
      // Convert to binary array if needed.
      else {
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
    // TODO: Implement this.
  }

  _defaultCreateClusterIcon(feature, latlng, dash) {
    if (!feature.properties.cluster) {
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