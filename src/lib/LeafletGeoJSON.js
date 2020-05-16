import {GeoJSON as LGeoJSON} from 'leaflet'
import { withLeaflet, Path } from 'react-leaflet';

function getFeatureStyle(props, feature) {
    const {defaultStyle, featureStyle} = props;
    // If the feature has a value itself, it takes precedence.
    if (featureStyle && props.featureId in feature && feature[props.featureId] in featureStyle)
        return featureStyle[feature[props.featureId]];
    // Next, we look for a style in the featureOptions property.
    if (defaultStyle && key in defaultStyle)
        return defaultStyle
}

class LeafletGeoJSON extends Path {

  createLeafletElement(props) {
    // Setup style function to match signature of Leaflet GeoJSON object.
    let nProps = Object.assign({}, this.props);
    nProps.style = (feature) => getFeatureStyle(nProps, feature);
    return new LGeoJSON(nProps.data, this.getOptions(nProps))
  }

  updateLeafletElement(fromProps, toProps) {
      // Update style on change.
      if (toProps.featureStyle !== fromProps.featureStyle || toProps.defaultStyle !== fromProps.defaultStyle) {
          this.leafletElement.options.style = (feature) => getFeatureStyle(toProps, feature);
          this.leafletElement.setStyle((feature) => getFeatureStyle(toProps, feature));
      }
  }

}

export default withLeaflet(LeafletGeoJSON)