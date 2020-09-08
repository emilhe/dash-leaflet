import { MapLayer, withLeaflet } from 'react-leaflet';
import L from "leaflet";

// The react-leaflet-markercluster does not work with react v2, hence this hack.
// https://github.com/yuzhva/react-leaflet-markercluster/issues/71

require("leaflet.markercluster");
require('react-leaflet-markercluster/dist/styles.min.css');

class LeafletMarkerClusterGroup extends MapLayer {

  createLeafletElement(props) {
    const el = new L.markerClusterGroup(props.options);
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el
    };
    return el;
  }

}

export default withLeaflet(LeafletMarkerClusterGroup);