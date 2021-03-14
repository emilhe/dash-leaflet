import React from 'react';
import L from 'leaflet';
import { MapControl, withLeaflet } from 'react-leaflet';

require('leaflet-draw')
require('leaflet-draw/dist/leaflet.draw.css')

export class LeafletDraw extends MapControl {

  createLeafletElement(props) {
    const el = new L.Control.Draw(props);
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el
    };
    return el;
  }

}

export default withLeaflet(LeafletDraw)
