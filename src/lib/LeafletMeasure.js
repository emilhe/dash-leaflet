import React from 'react';
import L from 'leaflet';
import { MapControl, withLeaflet } from 'react-leaflet';


require('leaflet-measure')
require('leaflet-measure/dist/leaflet-measure.css')


export class LeafletMeasure extends MapControl {

  createLeafletElement(props) {
    var options = {}
    for (var key in props) {
        if (props[key] !== null && props[key] !== "") {
            options[key] = props[key]
        }
    }
    const el = new L.Control.Measure(options);
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el
    };
    return el;
  }

}

export default withLeaflet(LeafletMeasure)
