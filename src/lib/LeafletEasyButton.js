import React from 'react';
import L from 'leaflet';
import { MapControl, withLeaflet } from 'react-leaflet';

require('leaflet-easybutton/src/easy-button')
require('leaflet-easybutton/src/easy-button.css')

export class LeafletEasyButton extends MapControl {

  // See https://github.com/PaulLeCam/react-leaflet/issues/275
  createLeafletElement(props) {
    const el = new L.easyButton(props.icon, props.action);
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el
    };
    return el;
  }

}

export default withLeaflet(LeafletEasyButton)