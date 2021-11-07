import React, {Component} from 'react';
import Locate from "leaflet.locatecontrol";
import {propTypes} from '../components/LocateControl.react';
import {withLeaflet} from "react-leaflet";

require('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

/**
 * LocateControl is a wrapper of LocateControl in react-leaflet. The component requires linking font-awesome, i.e.
 * app = dash.Dash(external_stylesheets=['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'])
 */
class LocateControl extends Component {

  componentDidMount() {
    // Add component to map.
    const { options, startDirectly } = this.props;
    const { map } = this.props.leaflet;
    const lc = new Locate(options);
    lc.addTo(map);
    // Start if needed.
    if (startDirectly) {
      lc.start();
    }
  }

  render() {
    return null;
  }

}

export default withLeaflet(LocateControl);
LocateControl.propTypes = propTypes;
