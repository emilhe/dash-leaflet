import { GeoJSON } from 'leaflet'
import { withLeaflet, MapLayer } from 'react-leaflet';
import {assembleGeojson} from "./utils";

class LeafletGeoJSON extends MapLayer {

    createLeafletElement(props) {
        return new GeoJSON(null, {...this.props.options});
    }

    updateLeafletElement(fromProps, toProps) {
      // // Update style on change.
      // if (toProps.featureStyle !== fromProps.featureStyle || toProps.defaultStyle !== fromProps.defaultStyle) {
      //     this.leafletElement.options.style = (feature) => getFeatureStyle(toProps, feature);
      //     this.leafletElement.setStyle((feature) => getFeatureStyle(toProps, feature));
      // }
    }

    componentDidMount() {
        // Call super.
        super.componentDidMount();
        // Get the data.
        const {format, url, data} = this.props;
        assembleGeojson(data, url, format).then(this._update.bind(this));
    }

    _update(geojson) {
        this.leafletElement.clearLayers();
        this.leafletElement.addData(geojson);
    }

}

export default withLeaflet(LeafletGeoJSON)