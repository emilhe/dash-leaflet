import React from 'react';
import L from 'leaflet';
import { MapControl, withLeaflet } from 'react-leaflet';

require('leaflet-measure/src/measure') // TODO Check leaflet-measure node package manager package structure (https://www.npmjs.com/package/leaflet-measure)
require('leaflet-measure/src/measure.css') // TODO Check leaflet-measure npm package structure (https://www.npmjs.com/package/leaflet-measure)

export class LeafletMeasure extends MapControl {

  // See https://github.com/PaulLeCam/react-leaflet/issues/275
  createLeafletElement(props) {
    const el = new L.easyButton(props.action);
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el
    };
    return el;
  }

}

export default withLeaflet(LeafletMeasure)
