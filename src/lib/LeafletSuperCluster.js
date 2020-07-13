import {GeoJSON, ImageOverlay, Util, FeatureGroup} from 'leaflet'
import { withLeaflet, MapLayer } from 'react-leaflet';
import Supercluster from 'supercluster';

const LSuperCluster = FeatureGroup.extend({
	options: {
    createClusterIcon: null,
    },

    initialize: function (features, options) {
      Util.setOptions(this, options);
      // Set defaults.
      if (!this.options.createClusterIcon) {
        this.options.createClusterIcon = this._defaultCreateClusterIcon;
      }
        // Create index.
        const index = new Supercluster({
          radius: 60,
          extent: 256,
          maxZoom: 18
        })
        index.load(features);
        this._index = index;
        // Create markers container.
        const markers = new GeoJSON(null, {
          pointToLayer: this.options.createClusterIcon
        });
        this._markers = markers;
        // Do initial update.
        console.log(this._map)
        this._update()
        markers.addTo(this._map)
        // Bind events.

        // this._map.on('moveend', _update, this);
    },
    
    _update: function () {
        // Get map state.
        const bounds = this._map.getBounds()
        const zoom = this._map.getZoom()
        const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
        // Get the data.
        const clusters = this._index.getClusters(bbox, zoom);
        this._markers.clearLayers();
        this._markers.addData(clusters);
    },

    _defaultCreateClusterIcon(feature, latlng) {
      if (!feature.properties.cluster) return L.marker(latlng);
    
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
});

class LeafletSuperCluster extends MapLayer {

  createLeafletElement(props) {
    return new LSuperCluster(props.data.features, {})
  }

  updateLeafletElement(fromProps, toProps) {
  }

}

export default withLeaflet(LeafletSuperCluster)